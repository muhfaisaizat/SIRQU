import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shop } from 'iconsax-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const BukaToko = ({ setIsDialogOpen, Buka, uang, setUang, idOutlet, namaToko, fetchDataDaftarOrder }) => {
    const iduser = localStorage.getItem("id");
    const nama = localStorage.getItem("name");
    const dataOutletLocal = localStorage.getItem("dataOutletLocal");
    const data = JSON.parse(dataOutletLocal);
    const [contenstep, setcontenstep] = useState(0);
    const { toast } = useToast();
    const handelcontent = () => {
        setcontenstep((prevStep) => prevStep + 1);
    };

    

    // Fungsi untuk memformat angka menjadi format ribuan
    const formatNumber = (number) => {
        if (!number) return ''; // Cek jika number falsy (null, undefined, 0, dll)
        
        // Pastikan number adalah string
        const numberStr = String(number);
    
        // Menggunakan regex untuk format ribuan
        return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Fungsi untuk menangani perubahan input dan membatasi hanya angka
    const handleInputChange = (e) => {
        const value = e.target.value;

        // Hanya mengizinkan angka
        const numberValue = value.replace(/\D/g, ''); // Menghapus selain angka
        setUang(numberValue);
    };


    const handlecekError = async (e) => {
        e.preventDefault();
        if (!uang) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Uang modal harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${API_URL}/api/kasir`, {
                outletsId: data.id,
                usersId: iduser,
                uangModal: uang  
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            localStorage.setItem("id_kasir", response.data.data.id);
            localStorage.setItem("idOutletKasir", response.data.data.outletsId);
            console.log(response.data.data)

            toast({
                title: "Sukses!",
                description: `Toko berhasil dibuka.`,
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
    
            fetchDataDaftarOrder();
            setIsDialogOpen(false);
            Buka();
           
          } catch (error) {
            console.error("Login failed:", error);
            const errorMessage = error.response ? error.response.data.message : "Something went wrong";
            toast({
                variant: "destructive",
                title: "Buka Toko Failed",
                description: errorMessage,  // Pesan error dari response atau fallback
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
          }

       
    }


    return (
        <div className="fixed w-full h-full bg-black bg-opacity-50 grid items-center pr-[281px] justify-center">
            {contenstep === 0 && (
                <div className="w-[700px] bg-white p-[24px] rounded-[8px] grid gap-[16px]">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-[18px] font-semibold">Saat ini toko belum buka</h1>
                            <p className="text-[14px] text-slate-500">Jam operasional toko yang ditetapkan admin pukul 09.00 hingga tutup pada 21.00</p>
                        </div>
                    </div>
                    <div className="border"></div>
                    <div className="border p-[17px] rounded-[8px] grid gap-[12px] justify-items-center">
                        <Shop size={40} variant="Bold" />
                        <h2 className="text-[18px] font-semibold">Silahkan buka toko anda terlebih dahulu</h2>
                        <p className="text-[14px] text-slate-500">Anda {nama} akan melakukan buka pada kasir {data.name}</p>
                        <Button onClick={handelcontent} className="text-[14px] h-[36px]">Buka Toko</Button>
                    </div>
                </div>
            )}
            {contenstep === 1 && (
                <div className="w-[536px] bg-white p-[24px] rounded-[8px] grid gap-[16px]">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-[18px] font-semibold">Saat ini toko belum buka</h1>
                            <p className="text-[14px] text-slate-500">Jam operasional toko yang ditetapkan admin pukul 09.00 hingga tutup pada 21.00</p>
                        </div>
                    </div>
                    <div className="border-y pt-[16px] pb-[24px] grid gap-[12px]">
                        <h2 className="text-[16px] font-semibold">Masukkan uang modal</h2>
                        <div className="relative w-full">
                            <Input
                                type="text"
                                placeholder="Masukkan uang modal"
                                required
                                className="h-[36px] text-[14px] border-slate-300 pr-[12px] pl-[40px]"
                                value={formatNumber(uang)} // Menampilkan uang dengan format ribuan
                                onChange={handleInputChange}
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[14px]">
                                RP
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-[10px] py-[16px]">
                        <Button className="text-[14px] h-[36px]" onClick={() => setUang('50000')}>Buka Toko Menggunakan Uang Modal Rp 50.000</Button>
                        <Button onClick={handlecekError} variant="secondary" className="text-[14px] h-[36px]">Buka Toko Langsung</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BukaToko;
