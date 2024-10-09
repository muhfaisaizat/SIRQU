import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoPlus } from "react-icons/go";
import { CloseCircle, GalleryAdd } from 'iconsax-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { Switch } from "@/components/ui/switch"



const AddProduk = ({ buttonProps, title, showIcon }) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [namaproduk, setNamaproduk] = useState('');
    const [deskripsi, setdeskripsi] = useState('');

    const handleInputChangenamaproduk = (event) => {
        setNamaproduk(event.target.value);
    };
    const handleInputChangedeskripsi = (event) => {
        setdeskripsi(event.target.value);
    };
    


    const DataOutlet = [
        { id: "m5gr84i9", name: 'Outlet 1' },
        { id: "m5gr84i7", name: 'Outlet 2' },
        { id: "m5gr84i8", name: 'Outlet 3' }
    ];

    const [selectedOutlets, setSelectedOutlets] = useState([]);

    const handleSelectOutlet = (outlet) => {
        setSelectedOutlets((prevSelected) => {
            if (prevSelected.some((o) => o.id === outlet.id)) {
                return prevSelected.filter((o) => o.id !== outlet.id);
            } else {
                return [...prevSelected, outlet];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedOutlets.length === DataOutlet.length) {
            setSelectedOutlets([]); // Unselect all if all are selected
        } else {
            setSelectedOutlets(DataOutlet); // Select all outlets
        }
    };

    const handleRemoveOutlet = (id) => {
        setSelectedOutlets((prevSelected) => prevSelected.filter((outlet) => outlet.id !== id));
    };


    const DataKategori = [
        { id: "m5gr84i9", name: 'Makanan Ringan' },
        { id: "m5gr84i7", name: 'Populer' },
        { id: "m5gr84i8", name: 'sayur-sayuran' }
    ]

    const [selectedKategori, setSelectedKategori] = useState([]);

    const handleSelectkategori = (kategori) => {
        setSelectedKategori((prevSelected) => {
            if (prevSelected.some((o) => o.id === kategori.id)) {
                return prevSelected.filter((o) => o.id !== kategori.id);
            } else {
                return [...prevSelected, kategori];
            }
        });
    };

    const handleSelectAllkategori = () => {
        if (selectedKategori.length === DataKategori.length) {
            setSelectedKategori([]); // Unselect all if all are selected
        } else {
            setSelectedKategori(DataKategori); // Select all outlets
        }
    };

    const handleRemoveKategori = (id) => {
        setSelectedKategori((prevSelected) => prevSelected.filter((kategori) => kategori.id !== id));
    };



    // untuk input uang
    const [uang, setUang] = useState('');

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


// stok
    const [stock, setStock] = useState('');
    const [isUnlimitedStock, setIsUnlimitedStock] = useState(false);


    // Fungsi untuk menangani input angka
    const handleStockChange = (e) => {
        const { value } = e.target;
         // Izinkan input angka dan tanda "-"
    if (/^-?\d*$/.test(value)) {
        setStock(value);
    }
    };



    // upload image
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

    const handleEdit = (index) => {
        // Logika untuk mengedit gambar
        // Misalnya: memunculkan dialog untuk mengganti gambar
        console.log(`Edit image at index ${index}`);
    };





    // validasi error
    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedOutlets.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus memilih setidaknya satu outlet.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!namaproduk) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama produk harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!deskripsi) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "deskripsi harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (images.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus mengungah foto setidaknya satu.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (selectedKategori.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus memilih setidaknya satu kategori.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!uang || isNaN(uang) || Number(uang) <= 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Harga harus diisi dengan angka valid dan lebih dari 0.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!isUnlimitedStock && (!stock || (stock !== "-" && (isNaN(stock) || Number(stock) < 0)))) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Stok harus diisi dengan angka valid.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        



        toast({
            title: "Sukses!",
            description: "Produk berhasil ditambahkan.",
            action: <ToastAction altText="Try again">Cancel</ToastAction>,
        });

        setIsOpen(false);
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogTrigger asChild>
                    <Button {...buttonProps}>{showIcon && <GoPlus size={16} />} {title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[820px] my-[20px] p-[24px]">
                    <div className='flex justify-between'>
                        <DialogHeader>
                            <DialogTitle className='text-[18px] py-[16px]'>Tambah produk</DialogTitle>
                        </DialogHeader>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                <X className='h-[16px] w-[16px]' />
                            </Button>
                        </DialogClose>

                    </div>
                    <div className="grid gap-[16px] py-[32px] border-y border-slate-300">
                        <h3 className='text-[16px] font-semibold'>Detail produk</h3>
                        <div className="flex gap-1">
                            <Label htmlFor="role" className="text-[14px] w-[240px] py-[8px]">Daftar Outlet<span className='text-rose-500'>*</span></Label>
                            <div className='w-full grid gap-4'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="mr-auto w-full h-[36px] text-[14px] text-left border-slate-300 justify-between text-slate-500">
                                            Pilih outlet <ChevronDown size={16} className="mr-2" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className='w-[239px]'>
                                        <DropdownMenuItem className="capitalize p-[12px]" onClick={() => handleSelectAll()}>
                                            <Checkbox
                                                checked={selectedOutlets.length === DataOutlet.length}
                                                onCheckedChange={handleSelectAll}
                                                className='w-[16px] h-[16px]'
                                            />
                                            <span className="ml-[12px] text-[14px]">Pilih Semua</span>
                                        </DropdownMenuItem>
                                        {DataOutlet.map((outlet) => (
                                            <DropdownMenuItem key={outlet.id} className="capitalize p-[12px]" onClick={() => handleSelectOutlet(outlet)}>
                                                <Checkbox
                                                    checked={selectedOutlets.some((o) => o.id === outlet.id)}
                                                    onChange={() => handleSelectOutlet(outlet)}
                                                    className='w-[16px] h-[16px]'
                                                />
                                                <span className="ml-[12px] text-[14px]">{outlet.name}</span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className='flex flex-wrap gap-[12px]'>
                                    {selectedOutlets.map((outlet) => (
                                        <Badge key={outlet.id} variant="secondary" className="h-[36px] px-[12px] text-[14px] gap-[8px]">
                                            {outlet.name}
                                            <CloseCircle
                                                size={16}
                                                variant="Bold"
                                                className='cursor-pointer'
                                                onClick={() => handleRemoveOutlet(outlet.id)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Label htmlFor="namaproduk" className="text-[14px] w-[240px] py-[8px]">Nama Produk<span className='text-rose-500'>*</span></Label>
                            <Input
                                id="namaproduk"
                                placeholder="Masukkan Nama Produk"
                                required
                                className="h-[36px] text-[14px]  border-slate-300"
                                value={namaproduk}
                                onChange={handleInputChangenamaproduk}
                            />
                        </div>
                        <div className="flex gap-1">
                            <Label htmlFor="deskripsi" className="text-[14px] w-[240px] py-[8px]">Deskripsi produk<span className='text-rose-500'>*</span></Label>
                            <div className='w-full grid gap-[10px]'>
                                <Textarea id="message-2" className='border-slate-300 text-[14px]'
                                    value={deskripsi}
                                    onChange={handleInputChangedeskripsi}
                                    maxLength={200}
                                />
                                <p className="text-[14px] text-muted-foreground flex justify-end">
                                {deskripsi.length}/200 char
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <div className='w-[240px] h-auto'>
                                <p className="text-[14px] h-[40px] py-[13px]">Foto<span className='text-rose-500'>*</span></p>
                                <p className='w-[176px] text-[12px] font-normal text-slate-500 '>Gunakan foto dengan rasio 1:1,
                                    Upload dalam format .jpg/.png
                                    ukuran maksimal 5 mb</p>
                            </div>
                            <div className='w-full flex flex-wrap gap-[12px]' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                                {images.map((image, index) => (
                                    <div key={index} className="relative w-[120px] h-[120px]">
                                        <img
                                            src={image}
                                            alt={`Pilih gambar ${index + 1}`}
                                            className="w-full h-full border object-cover rounded-[8px]"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <Button onClick={() => handleDelete(index)} className="mr-2 bg-red-500 text-white rounded-[8px]">Delete</Button>
                                            <Button onClick={() => handleEdit(index)} className="bg-blue-500 text-white rounded-[8px]">Ubah</Button>
                                        </div>
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
                        <div className="flex gap-1">
                            <Label htmlFor="role" className="text-[14px] w-[240px] py-[8px]">Kategori<span className='text-rose-500'>*</span></Label>
                            <div className='w-full grid gap-4'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="mr-auto w-full h-[36px] text-[14px] text-left border-slate-300 justify-between text-slate-500">
                                            Pilih kategori <ChevronDown size={16} className="mr-2" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className='w-[239px]'>
                                        <DropdownMenuItem className="capitalize p-[12px]" onClick={() => handleSelectAllkategori()}>
                                            <Checkbox
                                                checked={selectedKategori.length === DataKategori.length}
                                                onCheckedChange={handleSelectAllkategori}
                                                className='w-[16px] h-[16px]'
                                            />
                                            <span className="ml-[12px] text-[14px]">Pilih Semua</span>
                                        </DropdownMenuItem>
                                        {DataKategori.map((kategori) => (
                                            <DropdownMenuItem key={kategori.id} className="capitalize p-[12px]" onClick={() => handleSelectkategori(kategori)}>
                                                <Checkbox
                                                    checked={selectedKategori.some((o) => o.id === kategori.id)}
                                                    onChange={() => handleSelectkategori(kategori)}
                                                    className='w-[16px] h-[16px]'
                                                />
                                                <span className="ml-[12px] text-[14px]">{kategori.name}</span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className='flex flex-wrap gap-[12px]'>
                                    {selectedKategori.map((kategori) => (
                                        <Badge key={kategori.id} variant="secondary" className="h-[36px] px-[12px] text-[14px] gap-[8px]">
                                            {kategori.name}
                                            <CloseCircle
                                                size={16}
                                                variant="Bold"
                                                className='cursor-pointer'
                                                onClick={() => handleRemoveKategori(kategori.id)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Label htmlFor="Kategori" className="text-[14px] w-[240px] py-[8px]">Harga Produk<span className='text-rose-500'>*</span></Label>
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
                        </div>
                    </div>
                    <div className="grid gap-[16px] py-[32px]">
                        <h3 className='text-[16px] font-semibold'>Tambah produk</h3>
                        <div className="flex gap-1">
                            <Label className="text-[14px] w-[240px] py-[8px]">Stok produk<span className='text-rose-500'>*</span></Label>
                            <div className="grid gap-1 w-full">
                                <p className={`text-[14px] ${isUnlimitedStock ? 'text-slate-300' : ''}`}>Stok awal produk</p>
                                <Input
                                    id="stokproduk"
                                    placeholder="Masukkan stok produk"
                                    required
                                    disabled={isUnlimitedStock}
                                    className="h-[36px] text-[14px] border-slate-300"
                                    value={isUnlimitedStock ? '-' : stock}
                                    onChange={handleStockChange}
                                />
                                <div className="flex items-center space-x-2 mt-[16px]">
                                    <Switch
                                        id="airplane-mode"
                                        checked={isUnlimitedStock}
                                        onCheckedChange={(checked) => setIsUnlimitedStock(checked)}
                                    />
                                    <Label htmlFor="airplane-mode" className='text-[14px] font-medium'>
                                        Aktifkan stok tak terbatas
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className='text-[14px] h-[36px]' onClick={handleSubmit}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddProduk;
