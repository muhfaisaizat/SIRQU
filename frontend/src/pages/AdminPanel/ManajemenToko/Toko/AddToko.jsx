import React, { useState, useRef } from 'react';
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
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

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
    const [imageFile, setImageFile] = useState(null); // Simpan file asli
    const fileInputRef = useRef(null); // Referensi untuk input file

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Simpan file asli
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Buka dialog file secara programatis
        }
    };

    const handleDelete = () => {
        setImageFile(null); // Hapus file
    };

    const handlecekError = async () => {

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
        if (imageFile.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus mengungah foto satu saja.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const formCreate = new FormData();
            formCreate.append('nama', nama);
            formCreate.append('alamat', alamat);
            formCreate.append('position', 'Toko Utama');
            if (imageFile) {
                formCreate.append("image", imageFile); // Tambahkan file gambar
            }
            formCreate.append('syaratKetentuan', false );
            const response = await axios.post(`${API_URL}/api/outlets`, formCreate, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            localStorage.setItem("syarat_ketentuan", 0 );
            localStorage.setItem("idTokoUtama", response.data.outlet.id);
            setcontenstep(2);
        } catch (error) {
            console.error('Error adding user:', error);
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error occurred";

            toast({
                variant: "destructive",
                title: "Error Adding User",
                description: errorMessage,
                status: "error",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        }


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
                                <div
                                    className="w-full flex flex-wrap gap-[12px]"
                                    onDrop={(e) => e.preventDefault()}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {imageFile ? (
                                        <div className="relative w-[120px] h-[120px] group">
                                            <img
                                                src={URL.createObjectURL(imageFile)}
                                                alt="Preview"
                                                className="w-full h-full border object-cover rounded-[8px]"
                                            />
                                            <button
                                                onClick={handleDelete}
                                                className="absolute top-2 right-2 bg-white text-red-500 text-xs p-[4px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="w-[120px] h-[120px] rounded-[8px] flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-300"
                                            onClick={handleUploadClick}
                                        >
                                            <GalleryAdd size="24" color="#717179" variant="Bulk" />
                                            <p className="whitespace-normal text-slate-500">Pilih atau letakkan gambar disini</p>
                                        </button>
                                    )}
                                    {/* Input File Hidden */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
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
