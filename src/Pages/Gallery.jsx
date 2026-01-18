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

  // Mengambil data dari Tabel Database, bukan List Storage langsung
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

    // Opsional: Realtime update jika ada yang upload foto baru
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
    dots: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "50px", arrows: false } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: "20px", arrows: false } },
    ],
  };

  return (
    <>
      <div className="text-white opacity-60 text-base font-semibold mb-4 mx-[10%] mt-10 lg:text-center lg:text-3xl lg:mb-8" id="Gallery">
        Class Gallery
      </div>

      <div id="Carousel" className="px-4">
        {images.length > 0 ? (
          <Slider {...settings}>
            {images.map((url, index) => (
              <div key={index} className="px-2 outline-none">
                <img
                  src={url}
                  alt={`Gallery ${index}`}
                  className="rounded-xl cursor-pointer hover:opacity-80 transition-opacity w-full h-64 object-cover"
                  onClick={() => { setSelectedImage(url); setOpen(true); }}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-white/40">Belum ada foto kenangan.</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-6 mt-10">
        <ButtonSend />
        <ButtonRequest />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} className="flex justify-center items-center p-4">
        <animated.div style={modalFade} className="relative outline-none">
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: -40, right: 0, color: "white" }}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Preview" className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" />
        </animated.div>
      </Modal>
    </>
  );
};

export default Carousel;
