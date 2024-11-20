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
import { CloseCircle, Clock, Calendar as CalendarIcon} from 'iconsax-react';
import { MoreVertical } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"

const EditBelanja = ({ isOpen, setIsOpen }) => {
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
        { id: 1, name: "Izin Usaha" },
        { id: 2, name: "Persiapan Bangun" },
        { id: 3, name: "Izin Bangun" },
        { id: 4, name: "SLF" },
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [selectkategori, setselectkategori] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);

    // Menambahkan kategori baru
    const handleAddCategory = () => {
        if (newCategory.trim() !== "") {
            const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
            setCategories([...categories, { id: newId, name: newCategory.trim() }]);
            setNewCategory("");
            setIsAdding(false);
        }
    };

    // Mengubah kategori yang dipilih
    const handleEditCategory = (id, newName) => {
        setCategories(categories.map(category =>
            category.id === id ? { ...category, name: newName } : category
        ));
        setEditingCategory(null); // Tutup input edit setelah perubahan
        setselectkategori("");
    };

    // Menghapus kategori yang dipilih
    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
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
                                                className='w-full text-[14px] focus:bg-transparent'
                                                checked={selectkategori === category.name}
                                                onCheckedChange={(checked) => {
                                                    setNewCategory(checked ? category.name : '');
                                                    setselectkategori(checked ? category.name : '');
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
                                    defaultValue="00:00"
                                    required
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
                                        <p >{date ? format(date, "dd MMMM yyyy") : <span>DD/MM/YYYY</span>}</p>
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
                    <Button type="submit" className='gap-2 h-[36px] text-[14px] font-medium' >Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditBelanja
