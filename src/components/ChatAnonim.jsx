import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase"; // Memastikan koneksi ke client supabase
import axios from "axios";
import Swal from "sweetalert2";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userIp, setUserIp] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);

  // 1. Fungsi mengambil daftar IP yang diblokir dari tabel 'blacklist_ips'
  const fetchBlockedIPs = async () => {
    try {
      const { data, error } = await supabase
        .from("blacklist_ips")
        .select("ip_address");

      if (error) throw error;
      return data.map((item) => item.ip_address);
    } catch (error) {
      console.error("Gagal mengambil daftar IP yang diblokir:", error);
      return [];
    }
  };

  // 2. Mengambil pesan awal dan set up Realtime Subscription
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .order("created_at", { ascending: true }); // Menggunakan 'created_at' sesuai standar PostgreSQL

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
        scrollToBottom();
      }
    };

    fetchMessages();

    // Berlangganan perubahan data secara realtime
    const subscription = supabase
      .channel("chats_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chats" },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // 3. Inisialisasi data pengguna (IP & Limit Pesan)
  useEffect(() => {
    const initializeUser = async () => {
      await getUserIp();
      checkMessageCount();
      scrollToBottom();
    };
    initializeUser();
  }, [userIp]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getUserIp = async () => {
    try {
      const cachedIp = localStorage.getItem("userIp");
      if (cachedIp) {
        setUserIp(cachedIp);
        return;
      }
      const response = await axios.get("https://api.ipify.org?format=json"); // Alternatif yang lebih stabil
      const newUserIp = response.data.ip;
      setUserIp(newUserIp);
      localStorage.setItem("userIp", newUserIp);
    } catch (error) {
      console.error("Gagal mendapatkan alamat IP:", error);
    }
  };

  const checkMessageCount = () => {
    if (!userIp) return;
    const currentDateString = new Date().toDateString();
    const storedDateString = localStorage.getItem("messageCountDate");

    if (currentDateString === storedDateString) {
      const userSentMessageCount = parseInt(localStorage.getItem(userIp)) || 0;
      setMessageCount(userSentMessageCount);
    } else {
      localStorage.removeItem(userIp);
      localStorage.setItem("messageCountDate", currentDateString);
      setMessageCount(0);
    }
  };

  // 4. Logika Pengiriman Pesan
  const sendMessage = async () => {
    if (message.trim() === "") return;

    // Cek Blokir
    const blockedIPs = await fetchBlockedIPs();
    if (blockedIPs.includes(userIp)) {
      Swal.fire({
        icon: "error",
        title: "Akses Ditolak",
        text: "IP Anda telah diblokir dari mengirim pesan.",
      });
      return;
    }

    // Cek Limit Pesan (Maksimal 20)
    if (messageCount >= 20) {
      Swal.fire({
        icon: "warning",
        title: "Limit Tercapai",
        text: "Anda telah mencapai batas 20 pesan per hari.",
      });
      return;
    }

    const trimmedMessage = message.trim().substring(0, 60);

    // Insert ke Supabase
    const { error } = await supabase.from("chats").insert([
      {
        message: trimmedMessage,
        sender_image: "/AnonimUser.png",
        user_ip: userIp,
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
      Swal.fire({ icon: "error", title: "Gagal Mengirim" });
      return;
    }

    // Update Local Storage untuk limit
    const updatedCount = messageCount + 1;
    localStorage.setItem(userIp, updatedCount.toString());
    setMessageCount(updatedCount);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4" id="ChatAnonim">
      <div className="text-center text-4xl font-semibold mb-6" id="Glow">
        Text Anonim
      </div>

      {/* Container Pesan */}
      <div 
        className="mt-5 max-h-[400px] overflow-y-auto custom-scrollbar" 
        id="KotakPesan"
      >
        {messages.map((msg, index) => (
          <div key={msg.id || index} className="flex items-start text-sm py-2 animate-fade-in">
            <img 
              src={msg.sender_image || "/AnonimUser.png"} 
              alt="User" 
              className="h-8 w-8 mr-3 rounded-full" 
            />
            <div className="bg-white/10 p-2 rounded-lg max-w-[80%] break-words">
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Field */}
      <div id="InputChat" className="flex items-center mt-6 bg-white/5 p-2 rounded-full border border-white/20">
        <input
          className="bg-transparent flex-grow px-4 py-2 outline-none text-white placeholder:text-white/40"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tulis pesan anonim..."
          maxLength={60}
        />
        <button 
          onClick={sendMessage} 
          className="p-2 hover:scale-110 transition-transform"
        >
          <img src="/paper-plane.png" alt="Send" className="h-6 w-6" />
        </button>
      </div>
      
      <p className="text-[10px] text-white/30 mt-2 text-center">
        Sisa kuota pesan hari ini: {20 - messageCount}
      </p>
    </div>
  );
}

export default Chat;
