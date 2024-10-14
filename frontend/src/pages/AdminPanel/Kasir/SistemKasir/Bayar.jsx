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
import { CloseCircle, GalleryAdd } from 'iconsax-react';
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Money from "../../../../assets/uang.png"
import Qris from "../../../../assets/QRIS.png"
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import Struk from './Struk'


const Bayar = ({ Transaksi, setTransaksi, setDaftarOrder, DaftarOrder, setNamaCustomer, setDetailOrder, setCatatan, isOpen, setIsOpen}) => {
    const { toast } = useToast();
    const [contenstep, setcontenstep] = useState(0)
    const handelcontent = () => {
        setcontenstep((prevStep) => prevStep + 1);
    }

    const Tax = [
        { id: 'hcbsas', nama: 'Tax 10%', pajak: '10%' }
    ];
    const Discont = [
        { id: 'hsjsj', nama: 'Promo Sale', diskon: '50%' },
        { id: 'hsjss', nama: 'Ramadan', diskon: '40%' }
    ];

    
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


    // menghitung sub total
    const totalHarga = Transaksi.length > 0 && Transaksi[0].detailTransaksi
        ? Transaksi[0].detailTransaksi.reduce((acc, item) => acc + item.harga * item.count, 0)
        : 0;



    // Menghitung pajak
    let pajak = 0;
    if (Tax.length > 0) {
        const taxPercentage = parseFloat(Tax[0].pajak) / 100;
        pajak = totalHarga * taxPercentage;
    }

    // Menghitung diskon
    const diskonList = selectedDisconts.map((promo) => {
        const discountPercentage = parseFloat(promo.diskon) / 100;
        const diskon = totalHarga * discountPercentage;
        return {
            ...promo,
            hargaDiskon: diskon
        };
    });
    const totalDiskon = selectedDisconts.reduce((acc, promo) => {
        const discountPercentage = parseFloat(promo.diskon) / 100;
        const diskon = totalHarga * discountPercentage;
        return acc + diskon;
    }, 0);

    // Menghitung total akhir
    const totalAkhir = totalHarga + pajak - totalDiskon;


    // untuk input uang
    const [uang, setUang] = useState('');
    const [clicked, setClicked] = useState(false);
    const [metodePembayaran, setmetodePembayaran]= useState('');
    const [idDaftarOrder, setidDaftarOrder]=useState('');

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



    const handleSubmitOrder = () => {
       
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

        const orderData = {
          id: Transaksi[0]?.id || 0,
          nama: Transaksi[0]?.nama || ' ',
          tipeOrder: Transaksi[0]?.tipeOrder || ' ',
          KetBayar:'Sudah Bayar',
          waktu: `${tanggalSekarang}, ${waktuSekarang}`,
          pembayaran: metodePembayaran,
          kasir: 'Dafa',
          detailTransaksi: Transaksi[0]?.detailTransaksi.map((item) => ({
            id: item.id,
            foto: item.foto,
            count: item.count,
            name: item.name,
            harga: item.harga,
          })) || [],
          subtotal: totalHarga,
          tax: Tax.length > 0 ? { nama: Tax[0].nama, harga: pajak } : null,
          diskon: diskonList.length > 0 ? diskonList.map((promo) => ({
            nama: promo.nama,
            hargaDiskon: promo.hargaDiskon,
          })) : null,
          total: totalAkhir,
          bayar: isNaN(Number(uang)) || uang === '' ? 0 : Number(uang),
          kembalian: isNaN(Number(uang)) || uang === ''
            ? 0
            : (Number(uang) - totalAkhir) < 0
            ? Math.abs(Number(uang) - totalAkhir)
            : Number(uang) - totalAkhir,
        };
      
        // Simpan data ke DaftarOrder
        setDaftarOrder((prevOrder) => [...prevOrder, orderData]);
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
                                        <h1 className='text-[14px] font-semibold'>#{Transaksi[0]?.id ? Transaksi[0].id : 0}</h1>
                                        <div className='flex gap-3'>
                                            <Avatar className="w-[24px] h-[24px]">
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
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
                                        <div className='h-[40px] w-full flex justify-between items-center text-[14px]'>
                                            <h2 className='text-slate-500'>{Tax[0].nama}</h2>
                                            <h2 className='font-semibold'>Rp {pajak.toLocaleString('id-ID')}</h2>
                                        </div>
                                    )}
                                    <div className='pb-[12px] border-b-2 border-dashed'>
                                        {diskonList.map((promo) => (
                                            <div key={promo.id} className='h-[40px] w-full flex justify-between items-center text-[14px] '>
                                                <h2 className='text-green-500'>{promo.nama}</h2>
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
                  <Struk DaftarOrder={DaftarOrder} setIsOpen={setIsOpen} setcontenstep={setcontenstep} idDaftarOrder={idDaftarOrder}/>
            )}
            </Dialog>
        </div>
    )
}

export default Bayar
