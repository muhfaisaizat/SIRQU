import React, { useState } from 'react';
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"
import { CloseCircle, GalleryAdd } from 'iconsax-react';
import { Trash, LoginCurve, TickCircle } from 'iconsax-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const AddToko = ({ open, onClose }) => {
    const handleOverlayClick = (e) => {
        e.stopPropagation();
    };

    const [contenstep, setcontenstep] = useState(0)
    const handelcontent = () => {
        setcontenstep((prevStep) => prevStep + 1);
    }

    const { toast } = useToast();
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [images, setImages] = useState([]);

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleUploadClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            const newImages = files.map((file) => URL.createObjectURL(file));
            setImages((prevImages) => [...prevImages, ...newImages]);
        };
        input.click();
    };

    const handleDelete = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handlecekError = () => {

        if (!nama) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama Toko harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!alamat) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Alamat harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (images.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus mengungah foto satu saja.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        setcontenstep(2);

    };


    return (
        open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                {contenstep === 0 && (
                    <div
                        className="bg-white p-[25px] shadow-lg w-[425px] max-w-[425px] rounded-[8px] grid gap-[16px]"
                        onClick={handleOverlayClick}
                    >
                        <div className='grid gap-[6px]'>
                            <h2 className="text-[18px] font-semibold">Selamat Datang di Sirqu!</h2>
                            <p className="text-[13.563px] font-normal text-slate-500">Untuk melanjutkan menggunakan aplikasi anda harus mengisi data toko utama anda terlebih dahulu.</p>
                        </div>
                        <div className="flex justify-end">
                            <Button className="h-[36px] text-[14px]" onClick={handelcontent}>Lanjutkan</Button>
                        </div>
                    </div>
                )}
                {contenstep === 1 && (
                    <div
                        className="bg-white p-[25px] shadow-lg w-full max-w-[680px] rounded-[8px] grid gap-[16px]"
                        onClick={handleOverlayClick}
                    >
                        <div className='grid gap-[6px]'>
                            <h2 className="text-[18px] font-semibold">Detail Toko</h2>
                            <p className="text-[13.563px] font-normal text-slate-500">Lengkapi data - data dibawah</p>
                        </div>
                        <div className='grid gap-[16px]'>
                            <div className="flex align-middle h-[36px] gap-[16px]">
                                <Label className="text-[14px] w-[200px] py-[8px]">Nama toko<span className='text-rose-500'>*</span></Label>
                                <Input
                                    name="nama"
                                    className="w-[416px] text-[14px] h-[36px]"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                            <div className="flex align-middle h-auto gap-[16px]">
                                <Label className="text-[14px] w-[200px] py-[8px]">Alamat<span className='text-rose-500'>*</span></Label>
                                <Textarea
                                    name="alamat"
                                    className="w-[416px] text-[14px]"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>
                            <div className="flex align-middle h-auto gap-[16px] w-[632px]">
                                <div className='w-[200px] h-auto'>
                                    <p className="text-[14px] h-[40px] py-[13px]">Foto<span className='text-rose-500'>*</span></p>
                                    <p className='w-[200px] text-[12px] font-normal text-slate-500'>Gunakan foto dengan rasio 1:1,
                                        Upload dalam format .jpg/.png
                                        ukuran maksimal 5 mb</p>
                                </div>
                                <div className='w-full flex flex-wrap gap-[12px]' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                                    {images.map((image, index) => (
                                        <div key={index} className="relative w-[120px] h-[120px] group">
                                            <img
                                                src={image}
                                                alt={`Pilih gambar ${index + 1}`}
                                                className="w-full h-full border object-cover rounded-[8px]"
                                            />
                                            <button onClick={() => handleDelete(index)} className="absolute top-2 right-2 bg-white text-red-500 text-xs p-[4px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <Trash size="12" />
                                            </button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        className='w-[120px] h-[120px] rounded-[8px] flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-300'
                                        onClick={handleUploadClick}
                                    >
                                        <GalleryAdd size="24" color='#717179' variant="Bulk" />
                                        <p className="whitespace-normal text-slate-500">Pilih atau letakkan gambar disini</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-[16px]">
                            <Button variant="outline" className="h-[36px] text-[14px]" onClick={() => setcontenstep(0)}>Batal</Button>
                            <Button className="h-[36px] text-[14px]" onClick={handlecekError}>Lanjutkan</Button>
                        </div>
                    </div>
                )}
                {contenstep === 2 && (
                    <div
                        className="bg-white p-[25px] shadow-lg w-[425px] max-w-[425px] rounded-[8px] grid gap-[16px]"
                        onClick={handleOverlayClick}
                    >
                        <div className='grid gap-[6px]'>
                            <h2 className="text-[18px] font-semibold">Apa anda yakin?</h2>
                            <p className="text-[13.563px] font-normal text-slate-500">Pastikan data yang anda masukkan sesuai dan valid</p>
                        </div>
                        <div className="flex justify-end">
                            <Button className="h-[36px] text-[14px]" onClick={handelcontent}>Simpan</Button>
                        </div>
                    </div>
                )}
                {contenstep === 3 && (
                    <div
                        className="bg-white p-[25px] shadow-lg w-[550px] max-w-[550] rounded-[8px] grid gap-[16px]"
                        onClick={handleOverlayClick}
                    >
                        <div className='grid gap-[16px] place-items-center mt-[24px]'>
                        <TickCircle size="40" variant="Bold" />
                        <h1 className='text-[16px] font-semibold'>Proses Berhasil! Selamat datang di Sirqu</h1>
                        </div>
                        <div className="flex justify-center mb-[24px]">
                            <Button className="h-[36px] text-[14px]" onClick={onClose}>Selesai</Button>
                        </div>
                    </div>
                )}
            </div>
        )
    );
};


export default AddToko
