import React, { useState } from 'react'
import { Shop } from 'iconsax-react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const SyaratKetentuan = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isChecked) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus menyetujui syarat dan ketentuan di atas.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const id = localStorage.getItem("idTokoUtama");
            const response = await axios.put(`${API_URL}/api/outlets/syarat-ketentuan/${id}`, {
                syarat_ketentuan: true
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            localStorage.setItem("syarat_ketentuan", 1 );
            toast({
                title: "Sukses!",
                description: "Cabang berhasil dibuka.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        } catch (error) {
            console.error('Error adding user:', error);
            toast({
                variant: "destructive",
                title: 'Error Adding User',
                description: 'An internal server error occurred. Please try again later.',
                status: 'error',
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        }

        

        setIsOpen(false);
        navigate('/admin-panel/kelola-outlet/data');
    };

    return (
        <div className="flex flex-col items-center justify-center py-[80px] border border-dashed rounded-[16px] border-slate-300 gap-[24px]">
            <Shop size="40" variant="Bold" />
            <div className='grid gap-[12px]'>
                <h1 className="text-center text-[18px] font-semibold">Saat ini anda belum memiliki cabang</h1>
                <p className="text-center text-[14px] font-normal text-slate-500">Tambahkan data toko jika anda ingin menambah cabang</p>
                <div className='w-[556px] p-[17px] border rounded-[8px] grid gap-[12px]'>
                    <h1 className='text-[16px] font-[500]'>Gunakan sirqu untuk mengelola cabang anda</h1>
                    <div>
                        <p className='text-[14px]'>Saat ini, Anda belum memiliki cabang yang terdaftar. Fitur kelola cabang memungkinkan Anda untuk:</p>
                        <div className='pl-[10px]'>
                            <ul className="list-disc text-[14px] ml-[10px]">
                                <li>Menambahkan, mengubah, dan menghapus cabang dengan mudah.</li>
                                <li>Mengelola stok, transaksi, dan laporan operasional untuk setiap cabang secara terpisah.</li>
                                <li>Menetapkan akses dan peran khusus bagi karyawan di masing-masing cabang.</li>
                            </ul>
                        </div>
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <div className="flex justify-center items-center h-full">
                            <DialogTrigger asChild>
                                <Button className="w-[111px] h-[36px]">Buka cabang</Button>
                            </DialogTrigger>
                        </div>
                        <DialogContent className="sm:max-w-[561px] grid gap-[16px] p-[24px]">
                            <div className='flex justify-between'>
                                <DialogHeader>
                                    <DialogTitle className='text-[18px] py-[16px] w-[294px]'>Syarat dan Ketentuan Pengelolaan Cabang di Sirqu</DialogTitle>
                                </DialogHeader>
                                <DialogClose asChild>
                                    <Button type="button" variant="ghost">
                                        <X className='h-[16px] w-[16px]' />
                                    </Button>
                                </DialogClose>
                            </div>
                            <div className="grid gap-4 py-4 pt-[6px] text-[14px]">
                                <div>
                                    <p>Fitur Kelola Cabang di Sirqu memungkinkan pengguna untuk menambahkan, mengelola, dan menghapus cabang bisnis dengan mudah.
                                        Pengguna bertanggung jawab penuh atas data yang dikelola serta harus memastikan bahwa setiap cabang beroperasi sesuai hukum yang berlaku..Sirqu berhak untuk memperbarui ketentuan ini sewaktu-waktu.
                                    </p>
                                    <p>Poin ketentuan:</p>
                                    <div className='pl-[10px]'>
                                        <ul className="list-disc text-[14px] ml-[10px]">
                                            <li>Pendaftaran Cabang: Pengguna wajib mengisi data cabang dengan lengkap dan akurat.</li>
                                            <li>Pengelolaan Data: Administrator bertanggung jawab atas transaksi, laporan, dan pengaturan karyawan di setiap cabang.</li>
                                            <li>Akses Otorisasi: Hanya pengguna dengan hak akses yang dapat mengelola cabang.</li>
                                            <li>Keamanan Data: Pengguna wajib menjaga keamanan akun dan data cabang.</li>
                                            <li>Kepatuhan Hukum: Pengguna harus memastikan cabang memenuhi regulasi setempat.</li>
                                            <li>Penghapusan Cabang: Cabang yang tidak aktif dapat dihapus, namun data terkait tetap disimpan.</li>
                                            <li>Perubahan Syarat: Sirqu dapat memperbarui syarat dan ketentuan sesuai kebutuhan</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="items-top flex space-x-2 p-[10px]">
                                    <Checkbox
                                        id="terms1"
                                        className='w-[16px] h-[16px]'
                                        checked={isChecked}
                                        onCheckedChange={handleCheckboxChange} 
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor="terms1"
                                            className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Paham dan setuju
                                        </label>
                                        <p className="text-[12px] text-muted-foreground">
                                            Saya telah membaca dan menyetujui syarat  dan ketentuan diatas
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline" className='text-[14px] h-[36px]'>
                                        Batal
                                    </Button>
                                </DialogClose>
                                <Button className='text-[14px] h-[36px]' onClick={handleSubmit}>Lanjutkan</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default SyaratKetentuan;
