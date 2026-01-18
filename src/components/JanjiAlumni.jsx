import React from "react";

const JanjiAlumni = () => {
  const janjiPoints = [
    "Senantiasa bertaqwa kepada Allah SWT. dengan mengamalkan syariat islam.",
    "Berperan aktif dalam mewujudkan cita-cita pembangunan Nasional.",
    "Selalu berusaha mengembangkan ilmu pengetahuan dan teknologi serta mengabdikannya kepada masyarakat sesuai dengan kaidah, norma, dan etika.",
    "Mengutamakan kepentingan islam, Bangsa dan Negara diatas kepentingan pribadi.",
    "Selalu menjaga dan memuja nama baik almamater MTI Pesantren Al-Ishlah Tajug serta menghormati guru-guru kami."
  ];

  return (
    <div className="py-20 px-[5%] lg:px-[15%] relative" id="JanjiAlumni">
      {/* Efek Cahaya Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 blur-[120px] -z-10"></div>

      <div 
        className="bg-[#dfdfdf10] backdrop-blur-xl border border-purple-400/40 rounded-3xl p-8 lg:p-12 shadow-[0_0_20px_rgba(192,132,252,0.3)]"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-wider">
            JANJI ALUMNI
          </h2>
          <div className="h-1 w-24 bg-purple-500 mx-auto rounded-full shadow-[0_0_10px_#a855f7] mb-6"></div>
          
          {/* Kalimat Pengantar */}
          <p className="text-purple-200/80 text-sm lg:text-base italic font-medium max-w-lg mx-auto leading-relaxed">
            "Kami Alumni MTI Pesantren Al-Ishlah Tajug dengan penuh kesadaran berjanji:"
          </p>
        </div>

        <div className="space-y-6">
          {janjiPoints.map((poin, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full border-2 border-purple-400 flex items-center justify-center group-hover:bg-purple-500 transition-all duration-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:bg-white"></div>
              </div>
              <p className="text-white/80 text-lg lg:text-xl leading-relaxed group-hover:text-white transition-colors italic font-light">
                "{poin}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-purple-300 font-mono text-sm tracking-widest opacity-60">
          — KELUARGA BESAR DIGNIFIED GENERATION —
        </div>
      </div>
    </div>
  );
};

export default JanjiAlumni;
