import { useEffect, useState } from "react"
import BorderStruktur from "../components/BorderStruktur"
import AOS from "aos"
import "aos/dist/aos.css"

const StrukturKelas = () => {
    const [aosLoaded, setAosLoaded] = useState(false)

    useEffect(() => {
        if (!aosLoaded) {
            AOS.init()
            AOS.refresh()
            setAosLoaded(true)
        }
    }, [aosLoaded])

    return (
        // Menambah padding lateral agar lebih lebar di layar besar
        <div className="z-1 relative h-auto lg:overflow-hidden pb-24 bg-transparent px-4 md:px-10">
            
            {/* --- BAGIAN ATAS --- */}
            <div className="flex flex-col items-center mt-16 md:mt-20">
                <div className="flex flex-col items-center" data-aos="fade-up">
                    {/* Ukuran Font Judul diperbesar (text-lg md:text-xl) */}
                    <h2 className="text-purple-400 font-black mb-4 uppercase tracking-[0.2em] text-lg md:text-xl">Penasihat</h2>
                    <BorderStruktur Jabatan="" Nama="KH. Muhammad Basuki Adnan, M.Pd." Width="250px" />
                    <div className="py-2"></div>
                    <BorderStruktur Jabatan="" Nama="Ust. Rifki Romdhoni, M.Pd." Width="250px" />
                    
                    {/* Garis dipertebal (w-[3px]) */}
                    <div className="h-14 w-[3px] bg-gray-500 relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]"></div>
                    </div>
                </div>

                <div className="flex flex-col items-center" data-aos="fade-up">
                    <div className="h-14 w-[3px] bg-gray-500"></div>
                    <h2 className="text-purple-400 font-black mb-4 uppercase tracking-[0.2em] text-lg md:text-xl">Generation Guide</h2>
                    <BorderStruktur Jabatan="" Nama="Ust. Bahrudin Syueb, M.Pd." Width="250px" />
                    <div className="py-2"></div>
                    <BorderStruktur Jabatan="" Nama="Ust. Lutfi Faisal Hakim, M.E." Width="250px" />
                    
                    <div className="h-24 w-[3px] bg-gray-500 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]"></div>
                    </div>
                </div>
            </div>

            {/* --- AREA CABANG (KETUA s/d BENDAHARA) --- */}
            <div className="relative flex flex-col items-center w-full max-w-[1400px] mx-auto">
                
                {/* Baris Ketua & Wakil */}
                <div className="flex justify-center w-full relative">
                    {/* SISI KIRI (PA) */}
                    <div className="flex flex-col items-center w-1/2 relative">
                        {/* Garis Horizontal dipertebal (h-[3px]) */}
                        <div className="absolute top-0 right-0 w-1/2 h-[3px] bg-gray-500"></div>
                        <div className="h-14 w-[3px] bg-gray-500"></div>
                        
                        <div data-aos="fade-right" className="flex flex-col items-center">
                            <h2 className="text-purple-400 font-black mb-3 uppercase tracking-widest text-sm md:text-base">Ketua/Wakil (PA)</h2>
                            <BorderStruktur Jabatan="" Nama="Angga Maulana" Width="150px" />
                            <div className="py-1.5"></div>
                            <BorderStruktur Jabatan="" Nama="Dwi Lingga Febriandi" Width="150px" />
                        </div>
                        
                        <div className="h-24 w-[3px] bg-gray-500 relative">
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-[3px] bg-gray-500"></div>
                    </div>

                    {/* Garis Vertikal Tengah Dekurasi */}
                    <div className="w-[3px] bg-gray-500 opacity-20 self-stretch"></div>

                    {/* SISI KANAN (PI) */}
                    <div className="flex flex-col items-center w-1/2 relative">
                        <div className="absolute top-0 left-0 w-1/2 h-[3px] bg-gray-500"></div>
                        <div className="h-14 w-[3px] bg-gray-500"></div>
                        
                        <div data-aos="fade-left" className="flex flex-col items-center">
                            <h2 className="text-purple-400 font-black mb-3 uppercase tracking-widest text-sm md:text-base">Ketua/Wakil (PI)</h2>
                            <BorderStruktur Jabatan="" Nama="Syaidatul Amanda" Width="150px" />
                            <div className="py-1.5"></div>
                            <BorderStruktur Jabatan="" Nama="Naura Kaisah M." Width="150px" />
                        </div>

                        <div className="h-24 w-[3px] bg-gray-500 relative">
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-1/2 h-[3px] bg-gray-500"></div>
                    </div>
                </div>

                {/* Baris Sekretaris & Bendahara */}
                <div className="flex justify-center w-full">
                    {/* Sekretaris */}
                    <div className="flex flex-col items-center w-1/2">
                        <div className="h-14 w-[3px] bg-gray-500"></div>
                        <div data-aos="fade-up" className="flex flex-col items-center">
                            <h2 className="text-purple-400 font-black mb-3 uppercase tracking-widest text-sm md:text-base">Sekretaris</h2>
                            <BorderStruktur Jabatan="" Nama="Muh. Nouval Ar-Rizqy" Width="160px" />
                            <div className="py-1.5"></div>
                            <BorderStruktur Jabatan="" Nama="Nadzifah Ramadhani G." Width="163px" />
                        </div>
                    </div>

                    {/* Bendahara */}
                    <div className="flex flex-col items-center w-1/2">
                        <div className="h-14 w-[3px] bg-gray-500"></div>
                        <div data-aos="fade-up" className="flex flex-col items-center">
                            <h2 className="text-purple-400 font-black mb-3 uppercase tracking-widest text-sm md:text-base">Bendahara</h2>
                            <BorderStruktur Jabatan="" Nama="Indra Maulana" Width="150px" />
                            <div className="py-1.5"></div>
                            <BorderStruktur Jabatan="" Nama="Siti Solehah" Width="150px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StrukturKelas
