import React, { useState, useEffect, useRef } from 'react'
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

const AddOutlet = ({ onAddOutlet, fetchData }) => {
    const { toast } = useToast();
    const [idoutlet, setidoutlet] = useState(null);
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


    const handleSave = () => {
        if (nama && alamat && imageFile.length > 0) {
       
            handleBatal();
        }
    };

    const [currentStep, setCurrentStep] = useState(0); // Mengatur langkah saat ini


    const handleLanjutkan = () => {
        setCurrentStep((prevStep) => prevStep + 1); // Naik ke langkah berikutnya
    };

    const handleLewati = () => {
        setCurrentStep((prevStep) => prevStep + 1); // Naik ke langkah berikutnya
    };

    const [contenstep, setcontenstep] = useState(0)
    const handelcontent = () => {
        setcontenstep((prevStep) => prevStep + 1);
    }


    const handleBatal = () => {
        setCurrentStep(0);
        setNama('');
        setAlamat('');
        setImageFile(null);
        setcontenstep(0);
        fetchData();
    };

    const handlecekError = async () => {

        if (!nama) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama cabang harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!alamat) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Alamat cabang harus diisi.",
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
            formCreate.append('position', 'Toko Cabang');
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
            setidoutlet(response.data.outlet.id);
            setCurrentStep(1);
           
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
        

    };

    const [dataKordinator,setdataKordinator] = useState([
        // { id: '1', nama: 'Dafa' },
        // { id: '2', nama: 'Fajar' },
        // { id: '3', nama: 'Aizat' },
    ]);


    const fetchDataKategori = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
  
           // Log untuk memastikan data yang diterima
  
            // Pastikan response.data adalah array
            if (Array.isArray(response.data)) {
                const filteredData = response.data.filter(user => user.role === "Manager");
                setdataKordinator(filteredData);
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    // Ambil data dari API
    useEffect(() => {
    
        fetchDataKategori();
    }, []);



    const handleImpor = async () =>{
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const products = response.data.data; 
            const productIds = products.map(product => product.product_id); 

            for (const productId of productIds) {
            const create = await axios.post( `${API_URL}/api/products/outlets`,
            {
                productsId: productId,
                outletsId: idoutlet, 
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
            );
            }

            console.log(productIds);
            setidoutlet(null);
            setcontenstep(2);
  
            
        } catch (error) {
            console.error("Error import data", error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='h-[36px] w-[158px] text-[14px] font-medium'>Tambah</Button>
            </DialogTrigger>
            {contenstep === 0 && (
                <DialogContent className="sm:max-w-[680px] p-[24px]">
                    <div className='flex justify-between py-[16px]'>
                        <DialogHeader>
                            <DialogTitle className='text-[18px] '>Detail Outlet</DialogTitle>
                            <DialogDescription className='text-[14px] '>
                                Ikuti langkah-langkah berikut untuk membuka cabang baru
                            </DialogDescription>
                        </DialogHeader>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost" className="p-0 focus:bg-white" onClick={handleBatal}>
                                <X className='h-[16px] w-[16px]' />
                            </Button>
                        </DialogClose>
                    </div>
                    <div className="grid gap-[16px]">

                        <div className='flex gap-[16px] pt-[16px] pb-[32px]'>
                            <div className='w-[200px] border-t-4 border-black py-[4px] text-[14px] font-semibold'>Detail cabang</div>
                            <div className={`w-[200px] border-t-4 py-[4px] text-[14px] font-semibold ${currentStep === 1 || currentStep === 2 ? 'border-black' : 'border-slate-300'}`}>
                                Pilih Koordiantor cabang
                            </div>
                            <div className={`w-[200px] border-t-4 py-[4px] text-[14px] font-semibold ${currentStep === 2 ? 'border-black' : 'border-slate-300'}`}>
                                Tambah Produk
                            </div>
                        </div>


                        {/* batas awal Detail cabang */}
                        {currentStep === 0 && (
                            <div className='grid gap-[16px]'>
                                <div className="flex align-middle h-[36px] gap-[16px]">
                                    <Label className="text-[14px] w-[200px] py-[8px]">Nama cabang<span className='text-rose-500'>*</span></Label>
                                    <Input
                                        name="nama"
                                        className="w-[416px] text-[14px] h-[36px]"
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                    />
                                </div>
                                <div className="flex align-middle h-auto gap-[16px]">
                                    <Label className="text-[14px] w-[200px] py-[8px]">Alamat cabang<span className='text-rose-500'>*</span></Label>
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
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline" className='text-[14px] h-[36px]' onClick={handleBatal}>
                                            Batal
                                        </Button>
                                    </DialogClose>
                                    <Button className='text-[14px] h-[36px]' onClick={handlecekError}>Lanjutkan</Button>
                                </DialogFooter>
                            </div>
                        )}
                        {/* batas akhir Detail cabang */}

                        {/* batas awal Koordinator cabang */}
                        {currentStep === 1 && (
                            <div className='grid gap-[16px] '>
                                <div className="flex align-middle h-[36px] gap-[16px] my-[16px]">
                                    <Label className="text-[14px] w-[200px] py-[8px]">Koordinator cabang</Label>
                                    <Select>
                                        <SelectTrigger className="w-[416px] h-[36px] text-[14px]">
                                            <SelectValue className='text-slate-500' placeholder="Pilih nama" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {dataKordinator.map((koordinator) => (
                                                    <SelectItem className="text-[14px]" key={koordinator.id} value={koordinator.id}>
                                                        {koordinator.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline" className='text-[14px] h-[36px]' onClick={handleBatal}>
                                            Batal
                                        </Button>
                                    </DialogClose>
                                    <Button className='text-[14px] h-[36px]' onClick={handleLewati}>Lewati</Button>
                                </DialogFooter>
                            </div>
                        )}
                        {/* batas akhir Koordinator cabang */}

                        {/* batas awal tambah produk */}
                        {currentStep === 2 && (
                            <>
                                <div className='py-[16px] border-2 border-dashed border-slate-300 rounded-[8px] grid gap-[16px] place-items-center'>
                                    <LoginCurve size="24" variant="Bulk" />
                                    <h1 className='text-[16px] font-semibold'>Import data produk</h1>
                                    <p className='text-[14px] font-normal text-slate-500'>Impor data produk dari cabang utama</p>
                                    <Button onClick={handleImpor}>Import</Button>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline" className='text-[14px] h-[36px]' onClick={handleBatal}>
                                            Batal
                                        </Button>
                                    </DialogClose>
                                    <Button className='text-[14px] h-[36px]' onClick={handelcontent}>Lewati</Button>
                                </DialogFooter>
                            </>
                        )}
                        {/* batas akhir tambah produk */}

                    </div>
                </DialogContent>
            )}

            {contenstep === 1 && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-[18px] '>Apa anda yakin?</DialogTitle>
                        <DialogDescription className='text-[14px] '>
                            Dengan tidak mengimpor data produk dari toko utama anda diharuskan memasukkan data produk secara manual
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className='text-[14px] h-[36px]' onClick={handleBatal}>
                                Batal
                            </Button>
                        </DialogClose>
                        <Button className='text-[14px] h-[36px]' onClick={handelcontent}>Lanjutkan</Button>
                    </DialogFooter>
                </DialogContent>
            )}

            {contenstep === 2 && (
                <DialogContent>
                    <div className='py-[16px]  grid gap-[16px] place-items-center'>
                        <TickCircle size="40" variant="Bold" />
                        <h1 className='text-[16px] font-semibold'>Sukses membuat cabang baru</h1>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" className='text-[14px] h-[36px]' onClick={handleBatal}>
                                    Selesai
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </DialogContent>
            )}

        </Dialog>
    )
}

export default AddOutlet;

