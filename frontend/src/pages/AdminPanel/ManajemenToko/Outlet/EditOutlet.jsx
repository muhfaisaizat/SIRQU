import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Trash } from 'iconsax-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import { CloseCircle, GalleryAdd } from 'iconsax-react';

const EditOutlet = ({ outlet, onSave , fetchData}) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const [imageFile, setImageFile] = useState(null); // Simpan file asli
    const fileInputRef = useRef(null); // Referensi untuk input file
    useEffect(() => {
        if (outlet.foto === null) {
            setImageFile(null);
        } else {
            setImageFile(`${API_URL}/images/${outlet.foto}`);
        }
    }, [outlet]);
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


    // Inisialisasi state untuk menyimpan nilai input
    const [outletData, setOutletData] = useState({
        id: outlet?.id || '',
        nama: outlet?.nama || '',
        alamat: outlet?.alamat || '',
        foto: outlet.foto,
        outlet: outlet.outlet
    });

    // Fungsi untuk menangani perubahan input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOutletData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Fungsi untuk menyimpan perubahan data outlet
    const handleSave = async () => {

        if (!outletData.nama) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama outlet harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!outletData.alamat) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Alamat outlet harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const formCreate = new FormData();
            formCreate.append('nama', outletData.nama);
            formCreate.append('alamat', outletData.alamat);
            if (imageFile && typeof imageFile !== "string") {
                formCreate.append("image", imageFile);
            }
            formCreate.append('syaratKetentuan', false );
            const response = await axios.put(`${API_URL}/api/outlets/${outletData.id}`, formCreate, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast({
                title: "Sukses!",
                description: `${outlet.outlet} berhasil diperbarui.`,
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            
            fetchData();
        } catch (error) {
            console.error('Error adding user:', error);
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error occurred";

            toast({
                variant: "destructive",
                title: "Error ",
                description: errorMessage,
                status: "error",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        }

        // if (onSave) {
           
        //     onSave(outletData);
          
        // }
        setIsOpen(false);
    };

    if (!outlet) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' className='h-[36px] w-[158px] text-[14px] font-medium'>
                    Kelola outlet
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[505px] my-[20px] p-[24px]">
                <div className='flex justify-between'>
                    <DialogHeader>
                        <DialogTitle className='text-[18px] py-[16px]'>Edit Outlet</DialogTitle>
                    </DialogHeader>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                            <X className='h-[16px] w-[16px]' />
                        </Button>
                    </DialogClose>
                </div>
                <div className="grid gap-[16px] text-[14px]">
                    <div className='w-full flex flex-wrap gap-[12px]'>
                        <div
                            className="w-full flex flex-wrap gap-[12px]"
                            onDrop={(e) => e.preventDefault()}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {imageFile ? (
                                <div className="relative w-[120px] h-[120px] group">
                                    <img
                                        src={typeof imageFile === "string" ? imageFile : URL.createObjectURL(imageFile)}
                                        alt="Preview"
                                        className="w-full h-full border object-cover rounded-[8px]"
                                    />
                                    <button  onClick={handleUploadClick} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className='bg-white text-[12px] px-[8px] rounded-full'>Ubah</div>
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="absolute top-2 right-2 bg-white text-red-500 text-xs p-[4px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <Trash size="12" />
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
                        {/* <div className="relative w-[120px] h-[120px] group">
                            <img
                                src={outletData.foto ? `${API_URL}/images/${outletData.foto}` : "https://github.com/shadcn.png"}
                                alt={outletData.nama}
                                className="w-full h-full border object-cover rounded-[8px]"
                            />
                            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className='bg-white text-[12px] px-[8px] rounded-full'>Ubah</div>
                            </button>
                            <button className="absolute top-2 right-2 bg-white text-red-500 text-xs p-[4px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Trash size="12"/>
                            </button>
                        </div> */}

                    </div>
                    <div className='grid gap-[16px] py-[16px]'>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">No. Outlet</p>
                            <Input
                                value={`00${outletData.id}`}
                                name="id"
                                disabled
                                className="w-[317px] text-[14px]"
                            />
                        </div>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px]">Nama Outlet</p>
                            <Input
                                value={outletData.nama}
                                name="nama"
                                onChange={handleInputChange}
                                className="w-[317px] text-[14px]"
                            />
                        </div>
                        <div className="flex align-middle h-auto">
                            <p className="w-[150px]">Alamat</p>
                            <Textarea
                                value={outletData.alamat}
                                name="alamat"
                                onChange={handleInputChange}
                                className="w-[317px] text-[14px]"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex gap-[12px]">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className='text-[14px] h-[36px]'>
                                Batal
                            </Button>
                        </DialogClose>
                        <Button onClick={handleSave} className='text-[14px] h-[36px]'>Simpan Perubahan</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditOutlet;
