import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import { supabase } from "../supabase"
import "slick-carousel/slick/slick.css" 
import "slick-carousel/slick/slick-theme.css"
import InstagramIcon from "@mui/icons-material/Instagram"
import EmailIcon from "@mui/icons-material/Email"

const MemberCarousel = () => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchMembers = async () => {
            const { data, error } = await supabase
                .from("members")
                .select("*")
                .order("nama", { ascending: true })
            if (data) setMembers(data)
        }
        fetchMembers()
    }, [])

    const settings = {
        dots: true,
        infinite: members.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { 
                    slidesToShow: 2, 
                    arrows: false,
                    dots: true 
                }
            },
            {
                breakpoint: 640,
                settings: { 
                    slidesToShow: 1, 
                    arrows: false, 
                    centerMode: true, 
                    centerPadding: "20px",
                    dots: false // Titik navigasi disembunyikan di mobile
                }
            }
        ]
    }

    return (
        <div className="py-16 px-[5%] lg:px-[10%]" id="Anggota">
            <h2 className="text-white text-center text-3xl font-bold mb-10" data-aos="fade-up">
                Anggota Angkatan
            </h2>
            
            <Slider {...settings}>
                {members.length > 0 ? members.map((member) => (
                    <div key={member.id} className="px-3 py-5">
                        {/* Card Container Utama */}
                        <div className="relative overflow-hidden bg-[#dfdfdf10] backdrop-blur-lg border border-purple-400/50 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] group h-full pb-8 shadow-[0_0_15px_rgba(192,132,252,0.4)] hover:shadow-[0_0_25px_rgba(192,132,252,0.6)]">
                            
                            {/* Background Ungu Atas */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-purple-600 rounded-b-[50px]"></div>

                            {/* Foto Profil */}
                            <div className="relative z-10 mt-12 mb-4">
                                <img
                                    src={member.foto_url || "/avatar.png"}
                                    alt={member.nama}
                                    className="w-32 h-32 rounded-full border-4 border-[#1a1a1a] object-cover shadow-xl"
                                />
                            </div>
                            
                            {/* Konten Teks */}
                            <div className="px-6 z-10 flex flex-col items-center">
                                <h3 className="text-white font-bold text-xl mb-3">{member.nama}</h3>
                                
                                {/* Badge Role dengan Efek Glow Ungu */}
                                <div className="inline-block px-4 py-1 rounded-full bg-purple-600/20 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.5)] mb-4">
                                    <span className="text-purple-300 text-xs font-semibold tracking-wide uppercase">
                                        {member.jabatan || "Anggota"}
                                    </span>
                                </div>

                                {/* Media Sosial */}
                                <div className="flex justify-center gap-5 mt-2">
                                    {member.instagram_url && (
                                        <a 
                                            href={member.instagram_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white/5 rounded-full text-white/60 hover:text-purple-400 hover:bg-white/10 transition-all shadow-sm"
                                        >
                                            <InstagramIcon fontSize="small" />
                                        </a>
                                    )}
                                    {member.email_address && (
                                        <a 
                                            href={`mailto:${member.email_address}`}
                                            className="p-2 bg-white/5 rounded-full text-white/60 hover:text-purple-400 hover:bg-white/10 transition-all shadow-sm"
                                        >
                                            <EmailIcon fontSize="small" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-white/40 text-center w-full py-10 italic">
                        Menunggu data anggota dari Supabase...
                    </div>
                )}
            </Slider>
        </div>
    )
}

export default MemberCarousel;
