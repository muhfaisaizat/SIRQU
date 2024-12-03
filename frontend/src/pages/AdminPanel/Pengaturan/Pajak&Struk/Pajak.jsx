import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"

const PengaturanPajak = () => {
    const { toast } = useToast()
    const [dataPajak, setDataPajak] = useState(null);
    const [pajak, setPajak] = useState('');
    const [dataBiaya, setDataBiaya] = useState(null);
    const [biaya, setBiaya] = useState('');
    const [isSwitchOn, setIsSwitchOn] = useState(false); 
    const [isSwitchOn1, setIsSwitchOn1] = useState(false); 

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/pajaks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
  
            const data = response.data.data;

            // Filter data untuk nama tertentu
            const filteredDataPajak = data.filter(item => item.name === 'Pajak');
            const filteredDataOperasional = data.filter(item => item.name === 'Biaya Operasional');
            setIsSwitchOn(filteredDataPajak[0].status);
            setIsSwitchOn1(filteredDataOperasional[0].status);
            setDataPajak(filteredDataPajak[0])
            setDataBiaya(filteredDataOperasional[0])
            if (filteredDataPajak[0].nilaiPajak === 'null') {
                setPajak('')
            } else {
                const nilaiPajak = filteredDataPajak[0].nilaiPajak.replace('%', '');
                setPajak(nilaiPajak);
            }
            if (filteredDataOperasional[0].nilaiPajak === 'null') {
                setBiaya('')
            } else {
                const nilaiOperasional = filteredDataOperasional[0].nilaiPajak.replace('%', '');
                setBiaya(nilaiOperasional)
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    // Ambil data dari API
    useEffect(() => {
    
        fetchData();
    }, []);


    const handleSwitchChange = async (checked) => {
        setIsSwitchOn(checked); // Mengubah status switch
        if (!dataPajak || dataPajak.length === 0) {
            console.error("Data Pajak tidak ditemukan");
            return;
        }
    
        const statusValue = checked ? "true" : "false"; // Set status berdasarkan nilai switch
        const token = localStorage.getItem("token");
    
        try {
            const response = await axios.put(
                `${API_URL}/api/pajaks/status/${dataPajak.id}?status=${statusValue}`,
                null, // Tidak ada body yang dikirimkan
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchData();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleSwitchChange1 = async (checked) => {
        setIsSwitchOn(checked); // Mengubah status switch
        if (!dataBiaya || dataBiaya.length === 0) {
            console.error("Data operasional tidak ditemukan");
            return;
        }
    
        const statusValue = checked ? "true" : "false"; // Set status berdasarkan nilai switch
        const token = localStorage.getItem("token");
    
        try {
            const response = await axios.put(
                `${API_URL}/api/pajaks/status/${dataBiaya.id}?status=${statusValue}`,
                null, // Tidak ada body yang dikirimkan
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchData();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const formatNumber = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '');
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        const numberValue = value.replace(/\D/g, '');
        setPajak(numberValue);
    };
    const handleInputChange1 = (e) => {
        const value = e.target.value;

        const numberValue = value.replace(/\D/g, '');
        setBiaya(numberValue);
    };


    const handleKeyDownPajak = async (e) => {
        if (e.key === 'Enter') {
            const token = localStorage.getItem("token");
            let nilaiPajak = pajak.trim() === '' ? 'null' : `${pajak}%`;
            try {
                const response = await axios.put(
                    `${API_URL}/api/pajaks/nilai-pajak/${dataPajak.id}?nilaiPajak=${nilaiPajak}`,
                    null, // Tidak ada body yang dikirimkan
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast({
                    title: "Sukses!",
                    description: "Nilai pajak berhasil di simpan.",
                    action: <ToastAction altText="Try again">Cancel</ToastAction>,
                  });
                fetchData();
            } catch (error) {
                console.error("Error updating nilai pajak:", error);
                toast({
                    variant: "destructive",
                    title: 'Error input nilai',
                    description: 'Please try again later.',
                    status: 'error',
                    action: <ToastAction altText="Try again">Cancel</ToastAction>,
                });
            }
        }
    };

    const handleKeyDownBiaya = async (e) => {
        if (e.key === 'Enter') {
            const token = localStorage.getItem("token");
            let nilaiBiaya = biaya.trim() === '' ? 'null' : `${biaya}%`;
            try {
                const response = await axios.put(
                    `${API_URL}/api/pajaks/nilai-pajak/${dataBiaya.id}?nilaiPajak=${nilaiBiaya}`,
                    null, // Tidak ada body yang dikirimkan
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast({
                    title: "Sukses!",
                    description: "Nilai biaya operasional berhasil di simpan.",
                    action: <ToastAction altText="Try again">Cancel</ToastAction>,
                  });
                fetchData();
            } catch (error) {
                console.error("Error updating nilai pajak:", error);
                toast({
                    variant: "destructive",
                    title: 'Error input nilai',
                    description: 'Please try again later.',
                    status: 'error',
                    action: <ToastAction altText="Try again">Cancel</ToastAction>,
                });
            }
        }
    };

    return (
        <div className='pr-[16px] grid gap-[16px]'>
            <div className='grid gap-[16px]'>
                <div className='flex justify-between'>
                    <h1 className='text-[16px] font-semibold'>Pajak</h1>
                    <Switch 
                        checked={isSwitchOn} 
                        onCheckedChange={handleSwitchChange}  
                    />
                </div>
                <div className='grid gap-[8px]'>
                    <h3 className={`text-[14px] font-medium ${isSwitchOn ? 'text-black' : 'text-slate-400'}`}>
                        Jumlah pajak
                    </h3>
                    <div className="relative w-full">
                        <Input
                            type="text"
                            placeholder="Masukkan persentase pajak"
                            required
                            className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                            value={formatNumber(pajak)}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDownPajak}
                            disabled={!isSwitchOn} 
                        />
                        <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-[14px] ${isSwitchOn ? 'text-black' : 'text-slate-400'}`}>
                            %
                        </span>
                    </div>
                </div>
            </div>
            <div className='border'/>
            <div className='grid gap-[16px]'>
                <div className='flex justify-between'>
                    <h1 className='text-[16px] font-semibold'>Biaya Operasional</h1>
                    <Switch 
                        checked={isSwitchOn1} 
                        onCheckedChange={handleSwitchChange1} 
                    />
                </div>
                <div className='grid gap-[8px]'>
                    <h3 className={`text-[14px] font-medium ${isSwitchOn1 ? 'text-black' : 'text-slate-400'}`}>
                    Jumlah biaya
                    </h3>
                    <div className="relative w-full">
                        <Input
                            type="text"
                            placeholder="Masukkan persentase biaya"
                            required
                            className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                            value={formatNumber(biaya)}
                            onChange={handleInputChange1}
                            onKeyDown={handleKeyDownBiaya}
                            disabled={!isSwitchOn1} 
                        />
                        <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-[14px] ${isSwitchOn1 ? 'text-black' : 'text-slate-400'}`}>
                            %
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PengaturanPajak;
