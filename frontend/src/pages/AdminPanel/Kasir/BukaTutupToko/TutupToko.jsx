import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InfoCircle } from 'iconsax-react';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import dayjs from "dayjs";


const TutupToko = ({ setIsDialogOpentutup, waktuBuka, waktuTutup, uang, setUang, Tutup, item, pendapatanKotor, pendapatanBersih, setIsDialogOpenbuka }) => {
    const [contenstep, setcontenstep] = useState(0);
    const nama = localStorage.getItem("name");
    const id_kasir = localStorage.getItem("id_kasir");
    const token = localStorage.getItem("token");
    const formattedWaktuBuka = dayjs(waktuBuka).format('DD MMMM YYYY, HH.mm');
    const handelcontent = () => {
        setcontenstep((prevStep) => prevStep + 1);
    };

    const handelTutuptoko = async () => {
        try {
            const update = await axios.put(`${API_URL}/api/kasir/${id_kasir}`, {
                itemTerjual: item,
                totalKotor: pendapatanKotor,
                totalBersih: pendapatanBersih
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsDialogOpentutup(false);
            setIsDialogOpenbuka(true);
            setUang('');
        } catch (error) {
            console.error("Error fetching data", error);
        }

    }



    return (
        <div className="absolute w-[81.6%] h-[91.8%] py-[16px] bg-black bg-opacity-50 grid items-center justify-center overflow-y-auto hide-scrollbar" >
            {contenstep === 0 && (
                <div className="w-[512px] bg-white p-[24px] rounded-[8px] grid gap-[16px]">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-[18px] font-semibold">Tutup Toko?</h1>
                            <p className="text-[14px] text-slate-500">Dengan menutup toko, Anda telah mengakhiri penjualan pada hari ini</p>
                        </div>
                    </div>
                    <div className='flex justify-end gap-[12px]'>
                        <Button variant="outline" onClick={() => setIsDialogOpentutup(false)} className="text-[14px] h-[36px]">Batal</Button>
                        <Button onClick={() => { handelcontent(); Tutup(); }} className="text-[14px] h-[36px]">Tutup toko</Button>
                    </div>
                </div>
            )}
            {contenstep === 1 && (
                <div className="w-[492px] bg-white p-[24px] rounded-[8px] grid gap-[16px]">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-[18px] font-semibold">Rekap Penjualan</h1>
                            <p className="text-[14px] text-slate-500">Dibawah adalah rekap penjualan dalam sesi Anda.</p>
                        </div>
                    </div>
                    <div className="border-y pt-[16px] pb-[24px] grid gap-[12px]">
                        <h2 className="text-[16px] font-semibold">Detail Kasir</h2>
                        <div className='flex text-[14px]'>
                            <p className='w-[150px] text-slate-500'>Kasir</p>
                            <p className=''>{nama}</p>
                        </div>
                        <div className='flex text-[14px]'>
                            <p className='w-[150px] text-slate-500'>Waktu buka</p>
                            <p className=''>{formattedWaktuBuka}</p>
                        </div>
                        <div className='flex text-[14px]'>
                            <p className='w-[150px] text-slate-500'>Waktu tutup</p>
                            <p className=''>{waktuTutup}</p>
                        </div>
                    </div>
                    <div className="border-b pt-[16px] pb-[24px] grid gap-[12px]">
                        <h2 className="text-[16px] font-semibold">Rekap Penjualan</h2>
                        <div className='flex text-[14px] justify-between'>
                            <p className=' text-slate-500'>Item terjual</p>
                            <p className=''>{item} item</p>
                        </div>
                        <div className='flex text-[14px] justify-between'>
                            <p className=' text-slate-500'>Uang modal</p>
                            <p className=''>Rp {parseInt(uang).toLocaleString('id-ID')}</p>
                        </div>
                        <div className='flex text-[14px] justify-between'>
                            <p className=' text-slate-500'>Total pendapatan kotor</p>
                            <p className=''>Rp {pendapatanKotor.toLocaleString('id-ID')}</p>
                        </div>
                        <div className='flex text-[14px] justify-between'>
                            <p className=' text-slate-500'>Total pendapatan Bersih</p>
                            <p className=''>Rp {pendapatanBersih.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                    <div className=" pt-[16px] pb-[24px] grid gap-[12px] bg-slate-200 justify-items-center text-center">
                        <InfoCircle size="32" color='#717179' />
                        <p className='text-[14px] font-medium text-slate-500'>
                            Apabila ada kesalahan sistem dalam hal perhitungan atau pelaporan. Silahkan melapor kepada Admin Kasir atau ke Help desk
                        </p>
                    </div>
                    <div className='flex justify-end gap-[12px]'>
                        <Button variant="outline" className="text-[14px] h-[36px]">Buka Laporan Penjualan</Button>
                        <Button onClick={handelTutuptoko} className="text-[14px] h-[36px]">Buka toko kembali</Button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default TutupToko;
