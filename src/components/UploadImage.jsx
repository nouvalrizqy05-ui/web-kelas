import React, { useState } from "react";
import { supabase } from "../supabase";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

function UploadImage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const maxUploadSizeInBytes = 10 * 1024 * 1024; // 10MB
  const maxUploadsPerDay = 20;

  const uploadImage = async () => {
    if (!imageUpload) return;

    // Logika Limitasi Harian
    const userIp = localStorage.getItem("userIp") || "anonymous";
    const uploadedImagesCount = parseInt(localStorage.getItem(`uploadCount_${userIp}`)) || 0;
    const lastUploadDate = localStorage.getItem(`lastUploadDate_${userIp}`);
    const currentDate = new Date().toDateString();

    if (lastUploadDate === currentDate && uploadedImagesCount >= maxUploadsPerDay) {
      Swal.fire({
        icon: "error",
        title: "Limit Tercapai",
        text: "Anda telah mencapai batas maksimal 20 unggahan hari ini.",
      });
      return;
    }

    if (imageUpload.size > maxUploadSizeInBytes) {
      Swal.fire({
        icon: "error",
        title: "File Terlalu Besar",
        text: "Ukuran maksimal foto adalah 10MB",
      });
      return;
    }

    setIsUploading(true);
    const fileName = `${uuidv4()}-${imageUpload.name}`;
    const filePath = `GambarAman/${fileName}`;

    try {
      // 1. Upload ke Supabase Storage (Bucket: images)
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, imageUpload);

      if (uploadError) throw uploadError;

      // 2. Ambil Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      // 3. Simpan ke Tabel Database 'gallery' agar muncul di Carousel
      const { error: dbError } = await supabase
        .from("gallery")
        .insert([{ image_url: publicUrl }]);

      if (dbError) throw dbError;

      // Update Limit Lokal
      const newCount = lastUploadDate === currentDate ? uploadedImagesCount + 1 : 1;
      localStorage.setItem(`uploadCount_${userIp}`, newCount);
      localStorage.setItem(`lastUploadDate_${userIp}`, currentDate);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Foto kenangan kelas Anda berhasil diunggah.",
      });

      setImageUpload(null);
    } catch (error) {
      console.error("Error uploading:", error);
      Swal.fire({ icon: "error", title: "Gagal", text: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-white">
          Upload Your Classroom Memories
        </h1>
      </div>

      <div className="mx-auto p-4">
        <input 
          type="file" 
          id="imageUpload" 
          className="hidden" 
          onChange={(e) => setImageUpload(e.target.files[0])} 
          accept="image/*" 
        />
        <label
          htmlFor="imageUpload"
          className="cursor-pointer border-dashed border-2 border-white/30 rounded-lg p-4 w-56 h-40 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all"
        >
          {imageUpload ? (
            <img
              src={URL.createObjectURL(imageUpload)}
              alt="Preview"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="text-center text-white/60">
              <p className="text-4xl mb-2">+</p>
              <p className="text-xs">Klik untuk pilih gambar</p>
            </div>
          )}
        </label>
      </div>

      <button
        type="button"
        disabled={isUploading || !imageUpload}
        className={`py-2.5 w-[60%] rounded-lg font-medium transition-all ${
          isUploading ? "bg-gray-600" : "bg-white text-gray-900 hover:bg-gray-200"
        }`}
        onClick={uploadImage}
      >
        {isUploading ? "UPLOADING..." : "UPLOAD"}
      </button>
    </div>
  );
}

export default UploadImage;
