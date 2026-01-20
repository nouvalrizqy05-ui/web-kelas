import React, { useEffect, useState } from "react"
import Calendar from "react-calendar"
import { supabase } from "../supabase"
import "react-calendar/dist/Calendar.css"
import "./CalendarCustom.css" // Kita akan buat styling custom di bawah

const Schedule = () => {
    const [date, setDate] = useState(new Date())
    const [agendas, setAgendas] = useState([])
    const [selectedAgenda, setSelectedAgenda] = useState(null)

    useEffect(() => {
        fetchAgendas()
    }, [])

    const fetchAgendas = async () => {
        const { data, error } = await supabase
            .from("agendas")
            .select("*")
        if (data) setAgendas(data)
    }

    // Fungsi untuk menandai tanggal yang punya agenda
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const event = agendas.find(a => 
                new Date(a.event_date).toDateString() === date.toDateString()
            )
            return event ? <div className="h-1.5 w-1.5 bg-purple-400 rounded-full mx-auto mt-1 shadow-[0_0_5px_#c084fc]"></div> : null
        }
    }

    // Tampilkan detail saat tanggal diklik
    const handleDateChange = (newDate) => {
        setDate(newDate)
        const event = agendas.find(a => 
            new Date(a.event_date).toDateString() === newDate.toDateString()
        )
        setSelectedAgenda(event || null)
    }

    return (
        <div className="min-h-screen py-20 px-[5%] lg:px-[15%] text-white" id="Agenda">
            <h2 className="text-3xl font-bold text-center mb-10" data-aos="fade-up">
                Agenda
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Kalender */}
                <div className="bg-[#dfdfdf10] backdrop-blur-xl p-6 rounded-2xl border border-purple-400/30 shadow-[0_0_20px_rgba(192,132,252,0.1)]" data-aos="fade-right">
                    <Calendar 
                        onChange={handleDateChange} 
                        value={date}
                        tileContent={tileContent}
                        className="custom-calendar"
                    />
                </div>

                {/* Detail Agenda */}
                <div className="space-y-6" data-aos="fade-left">
                    <div className="bg-[#dfdfdf10] backdrop-blur-xl p-8 rounded-2xl border border-purple-400/30 min-h-[250px] flex flex-col justify-center shadow-[0_0_20px_rgba(192,132,252,0.1)]">
                        {selectedAgenda ? (
                            <div>
                                <span className="text-purple-400 text-sm font-mono mb-2 block">
                                    {new Date(selectedAgenda.event_date).toLocaleDateString('id-ID', { dateStyle: 'full' })}
                                </span>
                                <h3 className="text-2xl font-bold mb-3">{selectedAgenda.title}</h3>
                                <p className="text-white/60 leading-relaxed">{selectedAgenda.description}</p>
                            </div>
                        ) : (
                            <div className="text-center italic text-white/40">
                                <p>Klik pada tanggal untuk melihat agenda</p>
                                <p className="text-xs mt-2">(Jika ada titik ungu, berarti ada acara!)</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule
