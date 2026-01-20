import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ButtonSend from "../components/ButtonSend";
import ButtonRequest from "../components/ButtonRequest";
import { supabase } from "../supabase";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSpring, animated } from "@react-spring/web";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const modalFade = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? "scale(1)" : "scale(0.9)",
    config: { duration: 300 },
  });

  const fetchImagesFromDatabase = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("image_url")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data.map((item) => item.image_url));
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  useEffect(() => {
    fetchImagesFromDatabase();

    const channel = supabase
      .channel("gallery_changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "gallery" }, (payload) => {
        setImages((prev) => [payload.new.image_url, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const settings = {
    centerMode: true,
    centerPadding: "30px",
    slidesToShow: images.length > 3 ? 3 : images.length,
    slidesToScroll: 1,
    autoplay: true,
    dots: true, // Dots aktif di desktop
    responsive: [
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 1, 
          centerPadding: "50px", 
          arrows: false,
          dots: false // REVISI: Dots dihilangkan di tablet/mobile
        } 
      },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 1, 
          centerPadding: "20px", 
          arrows: false,
          dots: false // REVISI: Dots dihilangkan di HP kecil
        } 
      },
    ],
  };

  return (
    <>
      <div className="text-white opacity-60 text-base font-semibold mb-4 mx-[10%] mt-10 lg:text-center lg:text-3xl lg:mb-8" id="Gallery">
        Dignified Gallery
      </div>

      <div id="Carousel" className="px-4">
        {images.length > 0 ? (
          <Slider {...settings}>
            {images.map((url, index) => (
              <div key={index} className="px-2 outline-none">
                <img
                  src={url}
                  alt={`Gallery ${index}`}
                  className="rounded-xl cursor-pointer hover:opacity-80 transition-opacity w-full h-64 object-cover border border-white/10 shadow-[0_0_15px_rgba(192,132,252,0.1)]"
                  onClick={() => { setSelectedImage(url); setOpen(true); }}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-white/40 italic">Belum ada foto kenangan.</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-6 mt-10">
        <ButtonSend />
        <ButtonRequest />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} className="flex justify-center items-center p-4 backdrop-blur-sm">
        <animated.div style={modalFade} className="relative outline-none">
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ 
                position: "absolute", 
                top: -45, 
                right: 0, 
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
                '&:hover': { bgcolor: "rgba(255,255,255,0.2)" }
            }}
          >
            <CloseIcon />
          </IconButton>
          <img 
            src={selectedImage} 
            alt="Preview" 
            className="max-w-[95vw] max-h-[80vh] rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-white/20" 
          />
        </animated.div>
      </Modal>
    </>
  );
};

export default Carousel;
