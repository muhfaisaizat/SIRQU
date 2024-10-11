import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar2 } from 'iconsax-react';

const BadgeDateTime = () => {
    const [time, setTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    // Fungsi untuk mendapatkan waktu sekarang dan memformatnya
    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0"); // Menambahkan 0 jika angka kurang dari 10
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${hours}.${minutes}`;
    };

    // Fungsi untuk mendapatkan dan memformat tanggal sekarang
    const getCurrentDate = () => {
        const now = new Date();

        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

        const dayName = days[now.getDay()];
        const day = now.getDate().toString().padStart(2, "0");
        const month = months[now.getMonth()];
        const year = now.getFullYear();

        return `${dayName}, ${day} ${month} ${year}`;
    };

    useEffect(() => {
        // Set waktu dan tanggal saat komponen pertama kali dirender
        setTime(getCurrentTime());
        setCurrentDate(getCurrentDate());

        // Perbarui waktu dan tanggal setiap detik
        const interval = setInterval(() => {
            setTime(getCurrentTime());
            setCurrentDate(getCurrentDate());
        }, 1000); // 1000 ms = 1 detik

        // Bersihkan interval saat komponen di-unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex gap-[12px]'>
            <Badge variant="outline" className="bg-white px-[16px] gap-[8px] text-[14px] font-normal">
                <Clock size="16" /> {time}
            </Badge>
            <Badge variant="outline" className="bg-white px-[16px] gap-[8px] text-[14px] font-normal">
                <Calendar2 size="16" /> {currentDate}
            </Badge>
        </div>
    );
};

export default BadgeDateTime;
