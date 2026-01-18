const BorderStruktur = (props) => {
    const Jabatan = props.Jabatan;
    const Nama = props.Nama;
    const Width = props.Width;

    return (
        <div className="flex flex-col justify-center items-center"> 
            {/* Jabatan: Ukuran sedikit diperkecil agar tidak mendominasi Nama */}
            {Jabatan && (
                <div className="text-purple-400 text-xs md:text-sm mb-1.5 font-bold uppercase tracking-widest">
                    {Jabatan}
                </div>
            )}
            
            {/* Kotak Nama: Ukuran Font sedang (Base ke Large) dan Font Bold (bukan Black) */}
            <div 
                className="bg-white text-black rounded-full text-base md:text-lg px-5 py-2.5 text-center font-bold shadow-md flex items-center justify-center" 
                style={{ 
                    width: Width,
                    lineHeight: "1.2" 
                }}
            >
                {Nama}
            </div>
        </div>
    )
}

export default BorderStruktur;
