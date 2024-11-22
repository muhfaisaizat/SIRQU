import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Add, TickCircle } from 'iconsax-react';
import { Textarea } from '@/components/ui/textarea';
import { X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GoPlus } from "react-icons/go";
import { format } from "date-fns";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CloseCircle, Clock, Calendar as CalendarIcon } from 'iconsax-react';
import { MoreVertical } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { API_URL } from "../../../helpers/networt";
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"

const EditBelanja = ({ isOpen, setIsOpen, idOutlet, fetchDataBelanja, formDataBelanja, fetchDataKategori }) => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        nama_projec: '',
        deskripsi: '',
        time: '',
    });

    const handleInputtextChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };


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

    const [date, setDate] = useState(null);


    const timeInputRef = useRef(null);

    const handleIconClick = () => {
        // Trigger klik pada input saat ikon diklik
        if (timeInputRef.current) {
            timeInputRef.current.showPicker(); // showPicker memunculkan time picker (hanya di browser modern)
        }
    };


    const [categories, setCategories] = useState([
        // { id: 1, name: "Izin Usaha" },
        // { id: 2, name: "Persiapan Bangun" },
        // { id: 3, name: "Izin Bangun" },
        // { id: 4, name: "SLF" },
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [selectkategori, setselectkategori] = useState("");
    const [selectidOutlet, setselectidOutlet] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/categoriesbelanjas/outlet/${idOutlet}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data)) {
                setCategories(response.data)
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        setCategories([]);
        if (idOutlet) {
            // console.log('idOutlet:', idOutlet);
            fetchData();
        }
    }, [idOutlet]);

    useEffect(() => {
        if (formDataBelanja) {
            const timeOnly = formDataBelanja.date
                ? formDataBelanja.date.split(", ")[1]?.slice(0, 5) || ""
                : "";
            const [datePart] = formDataBelanja.date.split(", ");
            const formattedDate = new Date(datePart);
            setFormData({
                nama_projec: formDataBelanja.nama || "",
                deskripsi: formDataBelanja.deskripsi || "",
                time: timeOnly,
            });
            setUang(formDataBelanja.total);
            setselectidOutlet(formDataBelanja.categoriesBelanjasId);
            setNewCategory(formDataBelanja.kategori);
            setselectkategori(formDataBelanja.kategori);
            setDate(formattedDate);
        }
    }, [formDataBelanja]);

    // Menambahkan kategori baru
    const handleAddCategory = async () => {
        if (newCategory.trim() !== "") {
            const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
            setCategories([...categories, { id: newId, name: newCategory.trim() }]);
            setNewCategory("");
            setIsAdding(false);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(`${API_URL}/api/categoriesbelanjas`, {
                    outletsId: idOutlet,
                    name: newCategory.trim()
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                fetchData();
                fetchDataKategori();
            } catch (error) {
                console.error('Error adding user:', error);
            }
        }
    };

    // Mengubah kategori yang dipilih
    const handleEditCategory = async (id, newName) => {
        setCategories(categories.map(category =>
            category.id === id ? { ...category, name: newName } : category
        ));
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${API_URL}/api/categoriesbelanjas/${id}`, {
                outletsId: idOutlet,
                name: newCategory.trim()
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            fetchData();
            fetchDataKategori();
        } catch (error) {
            console.error('Error:', error);
        }
        setEditingCategory(null); // Tutup input edit setelah perubahan
        setselectkategori("");
        setselectidOutlet('')
    };

    // Menghapus kategori yang dipilih
    const handleDeleteCategory = async (id) => {
        setCategories(categories.filter(category => category.id !== id));
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}/api/categoriesbelanjas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            fetchData();
            fetchDataKategori();
        } catch (error) {
            console.error('Error:', error);
        }
        setNewCategory("");
        setselectkategori("");
    };

    // Menangani perubahan input baru atau edit
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (editingCategory) {
                handleEditCategory(editingCategory.id, newCategory);
            } else {
                handleAddCategory();
            }
        }
    };

    const toggleInput = () => {
        setIsAdding(!isAdding);
        setNewCategory(""); // Reset input saat membuka
        setEditingCategory(null); // Reset edit saat membuka input
        setselectidOutlet('')
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nama_projec, deskripsi, time } = formData;
        const token = localStorage.getItem("token");

        // Validasi
        if (!nama_projec) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama kegiatan harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!selectidOutlet) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Kategori Belanja harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!deskripsi) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Deskripsi harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!uang) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Total Belanja harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }



        if (!time) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Waktu harus dipilih.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (date === null || date === undefined) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "tanggal harus dipilih.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        try {
            const formattedDate = new Date(date).toISOString().split('T')[0];

            const response = await axios.put(`${API_URL}/api/belanja/${formDataBelanja.id}`, {
                outletsId: idOutlet,
                categoriesBelanjasId: selectidOutlet,
                namaKegiatan: formData.nama_projec,
                deskripsi: formData.deskripsi,
                totalBelanja: uang,
                waktu: formData.time,
                tanggal: formattedDate
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,

                }
            });
            toast({
                title: "Sukses!",
                description: "Belanja berhasil ditambahkan.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });


           

            fetchDataBelanja();
        } catch (error) {
            console.error('Error adding :', error);
            toast({
                variant: "destructive",
                title: 'Error Adding ',
                description: 'An internal server error occurred. Please try again later.',
                status: 'error',
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        }



        setIsOpen(false);
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[820px] my-[20px] p-[25px]">
                <div className='flex justify-between'>
                    <DialogHeader>
                        <DialogTitle className='text-[18px] '>Edit Belanja</DialogTitle>
                    </DialogHeader>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                            <X className='h-[16px] w-[16px]' />
                        </Button>
                    </DialogClose>
                </div>
                <div className='grid gap-[16px] py-[16px]'>
                    <div className='w-full border' />
                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                <h4>Nama Kegiatan<span className='text-rose-500'>*</span></h4>

                            </div>
                        </div>
                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                            <Input
                                id="nama_projec"
                                placeholder="Masukkan nama kegiatan"
                                className='h-[36px] text-[14px]'
                                value={formData.nama_projec}
                                onChange={handleInputtextChange}
                            />
                        </div>
                    </div>
                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                <h4>Kategori Belanja<span className='text-rose-500'>*</span></h4>
                            </div>
                        </div>
                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full h-[36px] text-[14px] justify-start">
                                        {selectkategori ? selectkategori : <span className='text-slate-500'>Pilih kategori</span>}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-[314px]">
                                    {categories.map((category) => (
                                        <div
                                            key={category.id}
                                            className="text-[14px] flex justify-between w-full p-[12px] hover:bg-accent items-center"
                                        >

                                            <DropdownMenuCheckboxItem
                                                className='w-full text-[14px] focus:bg-transparent cursor-pointer'
                                                checked={selectidOutlet === category.id}
                                                onCheckedChange={(checked) => {
                                                    setNewCategory(checked ? category.name : '');
                                                    setselectkategori(checked ? category.name : '');
                                                    setselectidOutlet(checked ? category.id : '');
                                                }}
                                                onClick={() => { setIsAdding(false); setEditingCategory(null); }}
                                            >
                                                {category.name}
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                                        <MoreVertical className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[100px]">
                                                    <DropdownMenuItem
                                                        className="p-3 gap-3 text-[14px] font-medium"
                                                        onClick={() => {
                                                            setEditingCategory(category);
                                                            setNewCategory(category.name);
                                                            setselectidOutlet(category.id);
                                                        }}
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="p-3 gap-3 text-[14px] font-medium text-rose-500 focus:text-rose-500"
                                                        onClick={() => handleDeleteCategory(category.id)}
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    ))}

                                    <div className="py-2">
                                        {isAdding || editingCategory ? (
                                            <div className="grid gap-[8px]">
                                                <input
                                                    type="text"
                                                    className="w-full h-[36px] text-[14px] focus:border-0 rounded-md px-[35px] "
                                                    placeholder={editingCategory ? "Edit kategori" : "Tambah kategori baru"}
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    autoFocus
                                                />
                                                <div className="w-full border" />
                                                <Button
                                                    variant="ghost"
                                                    onClick={toggleInput}
                                                    className="h-[36px] text-[14px] px-2 w-full"
                                                >
                                                    {editingCategory ? "Selesai Edit" : "Tutup Tambah Kategori"}
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="grid gap-[8px]">
                                                <div className="w-full border" />
                                                <Button
                                                    variant="ghost"
                                                    onClick={toggleInput}
                                                    className="w-full text-[14px] flex gap-2 h-[36px] rounded-md"
                                                >
                                                    <Add size={20} />
                                                    Tambah Kategori
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                <h4>Deskripsi<span className='text-rose-500'>*</span></h4>
                            </div>
                        </div>
                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                            <Textarea
                                id="deskripsi"
                                name="alamat"
                                className="w-full text-[14px]"
                                value={formData.deskripsi}
                                onChange={handleInputtextChange}
                            />
                            <p className='text-[14px] text-slate-500 font-medium flex justify-end'>0/200 char</p>
                        </div>
                    </div>
                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                <h4>Total Belanja<span className='text-rose-500'>*</span></h4>
                            </div>
                        </div>
                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                            <div className="relative w-full">
                                <Input
                                    type="text"
                                    placeholder="Masukkan total belanja"
                                    required
                                    className="h-[36px] text-[14px] border-slate-300 pr-[12px] pl-[35px] "
                                    value={formatNumber(uang)}
                                    onChange={handleInputChange}
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[14px] ">
                                    RP
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full border' />
                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                <h4>Waktu<span className='text-rose-500'>*</span></h4>
                            </div>
                        </div>
                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 start-0 flex items-center pl-3 cursor-pointer"
                                    onClick={handleIconClick}
                                >
                                    <Clock size={20} className="text-gray-500" />
                                </div>

                                {/* Input Time */}
                                <Input
                                    ref={timeInputRef}
                                    type="time"
                                    id="time"
                                    className="h-[36px] text-[14px] pl-[35px] pr-2 w-full "

                                    min="09:00"
                                    max="18:00"
                                    required
                                    value={formData.time}
                                    onChange={handleInputtextChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap -m-4 pt-[16px] pb-[32px]'>
                        <div className='lg:w-[32%] md:w-1/2 w-full px-4'>
                            <div className='w-full text-[14px] font-semibold grid gap-[8px] pb-[8px]'>
                                <h4>Tanggal<span className='text-rose-500'>*</span></h4>
                            </div>
                        </div>
                        <div className='lg:w-[68%] md:w-1/2 w-full px-4'>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start font-normal h-[36px] text-[14px] ",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon size={20} className="mr-2" />
                                        <p >
                                            {date && !isNaN(new Date(date)) ? (
                                                format(new Date(date), "dd MMMM yyyy")
                                            ) : (
                                                <span>DD/MM/YYYY</span>
                                            )}
                                        </p>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} className='gap-2 h-[36px] text-[14px] font-medium' >Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditBelanja
