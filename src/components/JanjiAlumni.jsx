import React from "react";

const JanjiAlumni = () => {
  const janjiPoints = [
    "Menjaga nama baik almamater dan angkatan XII TKJ 3 di manapun berada.",
    "Terus menjalin tali silaturahmi dan persaudaraan antar sesama alumni.",
    "Saling membantu dan mendukung dalam perkembangan karir dan kehidupan.",
    "Menjadi pribadi yang bermanfaat bagi masyarakat, nusa, dan bangsa."
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
          <div className="h-1 w-24 bg-purple-500 mx-auto rounded-full shadow-[0_0_10px_#a855f7]"></div>
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
          — KELUARGA BESAR XII TKJ 3 —
        </div>
      </div>
    </div>
  );
};

export default JanjiAlumni;
