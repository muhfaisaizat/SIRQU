import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CloseCircle, ProfileCircle } from 'iconsax-react';
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Money from "../../../../assets/uang.png"
import Qris from "../../../../assets/QRIS.png"
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import Struk from './Struk'
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import { Skeleton } from '@/components/ui/skeleton'


const Bayar = ({ Transaksi, setTransaksi, fetchDataDaftarOrder, setDaftarOrder, DaftarOrder, setNamaCustomer, setDetailOrder, setCatatan, isOpen, setIsOpen, idOutlet }) => {
    const { toast } = useToast();
    const [contenstep, setcontenstep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Set loading selama beberapa detik sebelum konten Struk ditampilkan
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Sesuaikan dengan waktu loading yang diinginkan

        return () => clearTimeout(timer);
    }, []);

    const handelcontent = () => {
        setcontenstep((prevStep) => prevStep + 1);
    }

    const [Tax, setTax] = useState([
        // { id: '1', nama: 'Tax 10%', pajak: '10%' }
    ]);
    const [Discont, setDiscont] = useState([
        // { id: '1', nama: 'Promo Sale', diskon: '50%' },
        // { id: '2', nama: 'Ramadan', diskon: '40%' }
    ]);


    const fetchDataPajak = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/pajaks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data.data)) {
                // Filter hanya pajak dengan status true
                const activeTaxes = response.data.data.filter((item) => item.status);
                setTax(activeTaxes);
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const formatDataDiskon = (apiData) => {
        const formatBonus = (bonus) => {
            if (bonus.startsWith('Rp')) {
                // Ambil angka dari string 'Rp'
                const nominal = parseFloat(bonus.replace(/[^\d]/g, '')); // Hapus semua kecuali angka
                const percentage = (nominal / totalHarga) * 100; // Konversi ke %
                return `${percentage.toFixed(2)}%`; // Format menjadi persentase
            } else if (bonus.endsWith('%')) {
                // Jika sudah dalam format %, langsung kembalikan
                return bonus;
            }
            return bonus; // Jika format tidak dikenali, kembalikan apa adanya
        };
        return {
         id: apiData.id_promosi,
         nama: apiData.nama_promosi,
         diskon: apiData.bonus,
        };
    };

    const fetchDataDiskon = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/promosi`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data.data)) {
                const formattedData = response.data.data.map(formatDataDiskon);
                setDiscont(formattedData);
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchDataPajak();
        fetchDataDiskon();
    }, []);
    


    const [selectedDisconts, setSelectedDisconts] = useState([]);

    const handleSelectDiskon = (diskon) => {
        setSelectedDisconts((prevSelected) => {
            if (prevSelected.some((o) => o.id === diskon.id)) {
                return prevSelected.filter((o) => o.id !== diskon.id);
            } else {
                return [...prevSelected, diskon];
            }
        });
    };

    const handleRemoveDiskon = (id) => {
        setSelectedDisconts((prevSelected) => prevSelected.filter((diskon) => diskon.id !== id));
    };


    // Menghitung subtotal
    const totalHarga =
        Transaksi.length > 0 && Transaksi[0].detailTransaksi
            ? Transaksi[0].detailTransaksi.reduce((acc, item) => acc + item.harga * item.count, 0)
            : 0;

    // Menghitung pajak
    const totalPajak = Tax.reduce((acc, tax) => {
        const taxPercentage = parseFloat(tax.nilaiPajak.replace('%', '')) / 100;
        return acc + totalHarga * taxPercentage;
    }, 0);

    // Menghitung diskon
    const totalDiskon = selectedDisconts.reduce((acc, promo) => {
        let discountValue = 0;
    
        if (promo.diskon.includes('%')) {
            // Jika diskon dalam bentuk persen, ambil angka dan konversi ke persentase
            discountValue = parseFloat(promo.diskon.replace('%', '')) / 100;
        } else if (promo.diskon.includes('Rp')) {
            // Jika diskon dalam bentuk Rp, hapus "Rp" dan ambil angkanya
            const nominal = parseFloat(promo.diskon.replace('Rp', '').replace(/[^\d]/g, ''));
            discountValue = nominal / totalHarga; // Menghitung diskon berdasarkan totalHarga
        }
    
        return acc + totalHarga * discountValue;
    }, 0);

    // Menghitung total akhir
    const totalAkhir = totalHarga + totalPajak - totalDiskon;

    // Render Diskon
    const diskonList = selectedDisconts.map((promo) => {
        let discountValue = 0;
    
        if (promo.diskon.includes('%')) {
            // Jika diskon dalam bentuk persen, ambil angka dan konversi ke persentase
            discountValue = parseFloat(promo.diskon.replace('%', '')) / 100;
        } else if (promo.diskon.includes('Rp')) {
            // Jika diskon dalam bentuk Rp, hapus "Rp" dan ambil angkanya
            const nominal = parseFloat(promo.diskon.replace('Rp', '').replace(/[^\d]/g, ''));
            discountValue = nominal / totalHarga; // Menghitung diskon berdasarkan totalHarga
        }
    
        const diskon = totalHarga * discountValue;
    
        return {
            ...promo,
            hargaDiskon: diskon,
        };
    });
    


    // untuk input uang
    const [uang, setUang] = useState('');
    const [clicked, setClicked] = useState(false);
    const [metodePembayaran, setmetodePembayaran] = useState('');
    const [idDaftarOrder, setidDaftarOrder] = useState('');

    const handleButtonClick = () => {
        setClicked(true);
        setmetodePembayaran('cash');
        setUang('');
    };
    const handleQris = () => {
        setClicked(false);
        setmetodePembayaran('qris');
        setUang(totalAkhir);
    };


    // Fungsi untuk memformat angka menjadi format ribuan
    const formatNumber = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Fungsi untuk menangani perubahan input dan membatasi hanya angka
    const handleInputChange = (e) => {
        const value = e.target.value;

        // Hanya mengizinkan angka
        const numberValue = value.replace(/\D/g, '');
        setUang(numberValue);
    };

    const [tanggalSekarang, setTanggalSekarang] = useState('');
    const [waktuSekarang, setWaktuSekarang] = useState('');

    useEffect(() => {
        // Fungsi untuk memperbarui tanggal dan waktu
        const updateDateTime = () => {
            const now = new Date();

            // Format tanggal (dd/mm/yyyy)
            const formattedDate = now.toLocaleDateString('id-ID');

            // Format waktu (hh:mm:ss)
            const formattedTime = now.toLocaleTimeString('id-ID');

            // Set tanggal dan waktu ke dalam state
            setTanggalSekarang(formattedDate);
            setWaktuSekarang(formattedTime);
        };

        // Update tanggal dan waktu secara real-time setiap 1 detik
        const interval = setInterval(updateDateTime, 1000);

        // Cleanup untuk menghentikan interval saat komponen unmount
        return () => clearInterval(interval);
    }, []);



    const handleSubmitOrder = async () => {

        if (!metodePembayaran) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda belum memilih metode pembayaran.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (metodePembayaran === 'cash' && !uang) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda belum mengisi jumlah pembayaran.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        // const existingOrder = DaftarOrder.some(item => Number(item.id) === Number(Transaksi[0]?.id))


        if (DaftarOrder.some(item => Number(item.id) === Number(Transaksi[0]?.id))) {
            const token = localStorage.getItem("token");
            const iduser = localStorage.getItem("id");
            const id_kasir = localStorage.getItem("id_kasir");

            try {
                // Buat transaksi baru terlebih dahulu
                const createTransaksi = await axios.put(`${API_URL}/api/transaksi/${Transaksi[0]?.id}`, {
                    outlet_id: idOutlet,
                    kasir_id: id_kasir,
                    user_id: iduser,
                    tipe_order: Transaksi[0]?.tipeOrder,
                    name: Transaksi[0]?.nama,
                    catatan: Transaksi[0]?.catatan,
                    tipe_bayar: metodePembayaran,
                    ket_bayar: "Sudah Bayar",
                    sub_total: totalHarga,
                    total: totalAkhir,
                    bayar: isNaN(Number(uang)) || uang === '' ? 0 : Number(uang),
                    kembalian: isNaN(Number(uang)) || uang === ''
                        ? 0
                        : (Number(uang) - totalAkhir) < 0
                            ? Math.abs(Number(uang) - totalAkhir)
                            : Number(uang) - totalAkhir,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });



                // Looping untuk mengirim detail transaksi
                const promises = Transaksi[0]?.detailTransaksi.map(async (item) => {

                    return axios.put(`${API_URL}/api/transaksi/detail/${Transaksi[0]?.id}/${item.id}`, {
                        product_id: item.id_produk,         // ID produk dari array
                        stok: item.count             // Jumlah stok dari array
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                });

                // Cek apakah Tax[0] ada dan memiliki id
                if (Tax.length > 0) {
                    // Loop melalui semua pajak yang ada di Tax
                    for (const pajakItem of Tax) {
                        // Hitung pajak jika nilai pajak valid
                        const taxPercentage =  parseFloat(pajakItem.nilaiPajak.replace('%', '')) / 100;
                        const calculatedPajak = totalHarga * taxPercentage; // Misalnya pajak dihitung berdasarkan totalHarga
                
                        // Kirimkan data pajak ke API
                        const createPajak = await axios.post(`${API_URL}/api/transaksi/detail-pajak`, {
                            transaksi_id: Transaksi[0]?.id,
                            pajak_id: pajakItem.id, // Menggunakan ID pajak dari array Tax
                            harga: calculatedPajak, // Menggunakan hasil perhitungan pajak
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    }
                }

                if (diskonList.length > 0) {
                    const creatediskon = diskonList.map(async (item) => {
                        return axios.post(`${API_URL}/api/transaksi/detail-diskon`, {
                            transaksi_id: Transaksi[0]?.id,
                            diskon_id: item.id,
                            harga: item.hargaDiskon
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    });
                }

                // Tunggu hingga semua request POST selesai
                await Promise.all(promises);
                setTransaksi([]);
                setidDaftarOrder(Transaksi[0]?.id)
                // Reset state setelah transaksi ditambahkan
                setNamaCustomer('');
                setDetailOrder([]);
                setCatatan('');
                setcontenstep(1);
                setUang('');
                setmetodePembayaran('');
                setClicked(false);
                setSelectedDisconts([]);
                fetchDataDaftarOrder();

            } catch (error) {
                console.error("Error saat membuat transaksi atau detail transaksi:", error);
            }
        } else {
            const token = localStorage.getItem("token");
            const iduser = localStorage.getItem("id");
            const id_kasir = localStorage.getItem("id_kasir");

            try {
                // Buat transaksi baru terlebih dahulu
                const createTransaksi = await axios.post(`${API_URL}/api/transaksi`, {
                    outlet_id: idOutlet,
                    kasir_id: id_kasir,
                    user_id: iduser,
                    tipe_order: Transaksi[0]?.tipeOrder,
                    name: Transaksi[0]?.nama,
                    catatan: Transaksi[0]?.catatan,
                    tipe_bayar: metodePembayaran,
                    ket_bayar: "Sudah Bayar",
                    sub_total: totalHarga,
                    total: totalAkhir,
                    bayar: isNaN(Number(uang)) || uang === '' ? 0 : Number(uang),
                    kembalian: isNaN(Number(uang)) || uang === ''
                        ? 0
                        : (Number(uang) - totalAkhir) < 0
                            ? Math.abs(Number(uang) - totalAkhir)
                            : Number(uang) - totalAkhir,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const transaksi_id = createTransaksi.data.data.id;  // Mengambil id dari data


                // Looping untuk mengirim detail transaksi
                const promises = Transaksi[0]?.detailTransaksi.map(async (item) => {

                    return axios.post(`${API_URL}/api/transaksi/detail`, {
                        transaksi_id: transaksi_id,  // ID transaksi yang baru dibuat
                        product_id: item.id,         // ID produk dari array
                        stok: item.count             // Jumlah stok dari array
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                });

                // Cek apakah Tax[0] ada dan memiliki id
                if (Tax.length > 0) {
                    // Loop melalui semua pajak yang ada di Tax
                    for (const pajakItem of Tax) {
                        // Hitung pajak jika nilai pajak valid
                        const taxPercentage =  parseFloat(pajakItem.nilaiPajak.replace('%', '')) / 100;
                        const calculatedPajak = totalHarga * taxPercentage; // Misalnya pajak dihitung berdasarkan totalHarga
                
                        // Kirimkan data pajak ke API
                        const createPajak = await axios.post(`${API_URL}/api/transaksi/detail-pajak`, {
                            transaksi_id: transaksi_id,
                            pajak_id: pajakItem.id, // Menggunakan ID pajak dari array Tax
                            harga: calculatedPajak, // Menggunakan hasil perhitungan pajak
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    }
                }

                if (diskonList.length > 0) {
                    const creatediskon = diskonList.map(async (item) => {
                        return axios.post(`${API_URL}/api/transaksi/detail-diskon`, {
                            transaksi_id: transaksi_id,
                            diskon_id: item.id,
                            harga: item.hargaDiskon
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    });
                }

                // Tunggu hingga semua request POST selesai
                await Promise.all(promises);
                setTransaksi([]);

                // Reset state setelah transaksi ditambahkan
                setNamaCustomer('');
                setDetailOrder([]);
                setCatatan('');
                setcontenstep(1);
                setUang('');
                setmetodePembayaran('');
                setClicked(false);
                setSelectedDisconts([]);
                fetchDataDaftarOrder();
                setidDaftarOrder(Transaksi[0]?.id)

            } catch (error) {
                console.error("Error saat membuat transaksi atau detail transaksi:", error);
            }
        }






        // const orderData = {
        //   id: Transaksi[0]?.id || 0,
        //   nama: Transaksi[0]?.nama || ' ',
        //   tipeOrder: Transaksi[0]?.tipeOrder || ' ',
        //   KetBayar:'Sudah Bayar',
        //   waktu: `${tanggalSekarang}, ${waktuSekarang}`,
        //   pembayaran: metodePembayaran,
        //   kasir: 'Dafa',
        //   detailTransaksi: Transaksi[0]?.detailTransaksi.map((item) => ({
        //     id: item.id,
        //     foto: item.foto,
        //     count: item.count,
        //     name: item.name,
        //     harga: item.harga,
        //   })) || [],
        //   subtotal: totalHarga,
        //   tax: Tax.length > 0 ? { nama: Tax[0].nama, harga: pajak } : null,
        //   diskon: diskonList.length > 0 ? diskonList.map((promo) => ({
        //     nama: promo.nama,
        //     hargaDiskon: promo.hargaDiskon,
        //   })) : null,
        //   total: totalAkhir,
        //   bayar: isNaN(Number(uang)) || uang === '' ? 0 : Number(uang),
        //   kembalian: isNaN(Number(uang)) || uang === ''
        //     ? 0
        //     : (Number(uang) - totalAkhir) < 0
        //     ? Math.abs(Number(uang) - totalAkhir)
        //     : Number(uang) - totalAkhir,
        // };

        // // Simpan data ke DaftarOrder
        // setDaftarOrder((prevOrder) => {
        //     const existingOrderIndex = prevOrder.findIndex(order => order.id === orderData.id);

        //     if (existingOrderIndex !== -1) {
        //         // Jika ID sudah ada, update data transaksi yang sesuai
        //         const updatedOrder = [...prevOrder];
        //         updatedOrder[existingOrderIndex] = { ...updatedOrder[existingOrderIndex], ...orderData };
        //         return updatedOrder;
        //     } else {
        //         // Jika ID belum ada, tambahkan transaksi baru
        //         return [...prevOrder, orderData];
        //     }
        // });



    };


    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {contenstep === 0 && (
                    <DialogContent className="sm:max-w-[888px] my-[20px]">
                        <div className='flex justify-between'>
                            <DialogHeader>
                                <DialogTitle className='text-[18px] py-[16px]'>Pembayaran Order</DialogTitle>
                            </DialogHeader>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost">
                                    <X className='h-[16px] w-[16px]' />
                                </Button>
                            </DialogClose>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className='flex w-full border-t'>
                                <div className='w-[50%] h-full  mt-[16px]  gap-[16px] flex flex-col justify-between'>
                                    <div className='px-[16px]'>
                                        <div className='flex justify-between'>
                                            <h1 className='text-[14px] font-semibold'>#{Transaksi[0]?.id.padStart(4, '0') ? Transaksi[0].id.padStart(4, '0') : 0}</h1>
                                            <div className='flex gap-3'>
                                                <ProfileCircle size="24" variant="Bulk" />
                                                <p className='text-[14px] font-medium pt-1 pb-1'>  {Transaksi[0]?.nama ? Transaksi[0].nama : ' '}</p>
                                            </div>
                                        </div>
                                        <div className='w-full '>
                                            {Transaksi.length === 0 ? (
                                                <div className="text-center text-slate-500">Data tidak tersedia</div>
                                            ) : (
                                                Transaksi[0].detailTransaksi.map((item) => (
                                                    <div key={item.id} className='h-[60px] w-full flex justify-between items-center text-[14px] font-medium border-b'>
                                                        <div className='flex gap-[12px]'>
                                                            <p>{item.count}</p>
                                                            <p>{item.name}</p>
                                                        </div>
                                                        <h2 className='text-slate-500'>Rp {item.harga.toLocaleString('id-ID')}</h2>
                                                    </div>
                                                )))}
                                        </div>
                                    </div>
                                    <div className='px-[16px] py-[12px] border-t'>
                                        <div className='h-[40px] w-full flex justify-between items-center text-[14px] '>
                                            <h2 className='text-slate-500'>sub total</h2>
                                            <h2 className=' font-semibold'>Rp {totalHarga.toLocaleString('id-ID')}</h2>
                                        </div>
                                        {Tax.length > 0 && (
                                            <div className='w-full'>
                                                {Tax.map((tax) => {
                                                    const taxPercentage = parseFloat(tax.nilaiPajak.replace('%', '')) / 100;
                                                    const nominalPajak = totalHarga * taxPercentage;
                                                    return (
                                                        <div
                                                            key={tax.id}
                                                            className='h-[40px] w-full flex justify-between items-center text-[14px]'
                                                        >
                                                            <h2 className='text-slate-500'>{tax.name} {tax.nilaiPajak}</h2>
                                                            <h2 className='font-semibold'>Rp {nominalPajak.toLocaleString('id-ID')}</h2>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        <div className='pb-[12px] border-b-2 border-dashed'>
                                            {diskonList.map((promo) => (
                                                <div key={promo.id} className='h-[40px] w-full flex justify-between items-center text-[14px] '>
                                                    <h2 className='text-green-500'>{promo.nama} {promo.diskon}</h2>
                                                    <h2 className=' font-semibold'>-Rp {promo.hargaDiskon.toLocaleString('id-ID')}</h2>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='h-[40px] w-full flex justify-between items-center text-[16px]  mt-[12px]'>
                                            <h2 className='font-semibold'>Total</h2>
                                            <h2 className=' font-semibold'>Rp {totalAkhir.toLocaleString('id-ID')}</h2>
                                        </div>
                                        <div className='h-[40px] w-full flex justify-between items-center text-[14px] '>
                                            <h2 className='text-slate-500'>Bayar</h2>
                                            <h2 className=' font-semibold'>Rp  {isNaN(Number(uang)) || uang === '' ? '0' : Number(uang).toLocaleString('id-ID')}</h2>
                                        </div>
                                        <div className='h-[40px] w-full flex justify-between items-center text-[14px] '>
                                            <h2 className='text-slate-500'>Kembalian</h2>
                                            <h2 className=' font-semibold'>
                                                {isNaN(Number(uang)) || uang === ''
                                                    ? 'Rp 0'
                                                    : (Number(uang) - totalAkhir) < 0
                                                        ? `-Rp ${Math.abs(Number(uang) - totalAkhir).toLocaleString('id-ID')}`
                                                        : Number(uang) - totalAkhir === 0
                                                            ? 'Rp 0'
                                                            : `Rp ${(Number(uang) - totalAkhir).toLocaleString('id-ID')}`}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[50%] px-[16px] mt-[16px] flex flex-col justify-between border-l'>
                                    <div className='grid gap-[16px]'>
                                        <h1 className='text-[16px] font-semibold'>Diskon (opsional)</h1>
                                        <div className='w-full grid gap-4'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" className="mr-auto w-full h-[36px] text-[14px] text-left border-slate-300 justify-between text-slate-500">
                                                        {selectedDisconts.length > 0 ? "Diskon dipilih" : "Tidak ada diskon terpasang"} <ChevronDown size={16} className="mr-2" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className='w-[239px] rounded-[6px]'>
                                                    {Discont.map((diskon) => (
                                                        <DropdownMenuItem key={diskon.id} className="capitalize p-[12px]" onClick={() => handleSelectDiskon(diskon)}>
                                                            <Checkbox
                                                                checked={selectedDisconts.some((o) => o.id === diskon.id)}
                                                                onChange={() => handleSelectDiskon(diskon)}
                                                                className='w-[16px] h-[16px]'
                                                            />
                                                            <span className="ml-[12px] text-[14px]">{diskon.nama}</span>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <div className='flex flex-wrap gap-[12px]'>
                                                {selectedDisconts.map((diskon) => (
                                                    <Badge key={diskon.id} variant="secondary" className="h-[36px] px-[12px] text-[14px] gap-[8px]">
                                                        {diskon.nama}
                                                        <CloseCircle
                                                            size={16}
                                                            variant="Bold"
                                                            className='cursor-pointer'
                                                            onClick={() => handleRemoveDiskon(diskon.id)}
                                                        />
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <h1 className='text-[16px] font-semibold'>Metode pembayaran</h1>
                                        <div className='flex justify-between'>
                                            <div className='grid gap-[8px]'>
                                                <Button onClick={handleButtonClick} variant="outline" className="py-[19px] px-[57px] h-[107] w-[182]"><span className='w-[68px] h-[68px] flex items-center justify-center'><img src={Money} alt="qris" /></span></Button>
                                                <p className='text-center text-[14px] font-medium'>Cash</p>
                                            </div>
                                            <div className='grid gap-[8px]'>
                                                <Button onClick={handleQris} variant="outline" className="py-[19px] px-[57px] h-[107] w-[182]"> <span className='w-[68px] h-[68px] flex items-center justify-center'><img src={Qris} alt="qris" /></span></Button>
                                                <p className='text-center text-[14px] font-medium'>QRIS</p>
                                            </div>
                                        </div>
                                        <div className='border-t border-b py-[16px] grid gap-[16px]'>
                                            <h1 className='text-[16px] font-semibold'>Masukkan jumlah bayar</h1>
                                            {clicked ? (
                                                <div className="relative w-full">
                                                    <Input
                                                        type="text"
                                                        placeholder=""
                                                        required
                                                        className="h-[36px] text-[14px] border-slate-300 pr-[12px] pl-[40px] "
                                                        value={formatNumber(uang)}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[14px] ">
                                                        RP
                                                    </span>
                                                </div>
                                            ) : (
                                                <p className='text-center text-[14px] text-slate-500 my-[23px] mx-[38px]'>Pilih metode pembayaran terlebih dahulu</p>
                                            )}
                                        </div>
                                    </div>
                                    <DialogFooter className="h-[168px] flex justify-end items-end py-[16px]">
                                        <Button type="submit" className="w-full h-[36px] text-[17px]" onClick={handleSubmitOrder}>Bayar</Button>
                                    </DialogFooter>
                                </div>
                            </div>
                        </div>

                    </DialogContent>
                )}
                {contenstep === 1 && (
                    isLoading ? (
                        // Tampilan loading dengan Skeleton dari Shadcn
                        <DialogContent className="space-y-4">
                            <Skeleton className="h-4 w-3/4 bg-gray-300 rounded-md" />
                            <Skeleton className="h-4 w-full bg-gray-300 rounded-md" />
                            <Skeleton className="h-4 w-1/2 bg-gray-300 rounded-md" />
                        </DialogContent>
                    ) : (
                        <Struk setIsOpen={setIsOpen} setcontenstep={setcontenstep} idDaftarOrder={idDaftarOrder} />
                    )
                )}
            </Dialog>
        </div>
    )
}

export default Bayar
