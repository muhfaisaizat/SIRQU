import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react";
import { CloseCircle, Clock, Calendar as CalendarIcon } from 'iconsax-react';
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const AddPromosi = ({ isOpen, setIsOpen }) => {
    const { toast } = useToast();
    const [deskripsi, setdeskripsi] = useState('');
    const [kategori, setKategori] = useState('');
    const [nilaiKategori, setNilaiKategori] = useState('');

    const handleSelectChangeKategori = (value) => {
        setKategori(value); 
      };

    const handleChangeNilaiKategori = (event) => {
        setNilaiKategori(event.target.value); 
      };
    
    const handleInputChangedeskripsi = (event) => {
        setdeskripsi(event.target.value);
    };
    const [DataOutlet, setDataOutlet] = useState([
        // { id: "m5gr84i9", name: 'Cabang 1' },
        // { id: "m5gr84i7", name: 'Cabang 2' },
        // { id: "m5gr84i8", name: 'Cabang 3' },
    ]);

    const [selectedOutlets, setSelectedOutlets] = useState([]);

    const formatOutletData = (apiData) => {
        return {
            id: apiData.id_outlet.toString(),
            name: apiData.nama_outlet
        };
    };

    const fetchDataOutlet = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/outlets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data.data)) {
                const formattedData = response.data.data.map(formatOutletData);

                setDataOutlet(formattedData);
                // console.log(formattedData)
                // setOriginalData(formattedData); // Set originalData di sini
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };


    useEffect(() => {
        fetchDataOutlet();
    }, []);

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
    const [datefinis, setDatefinis] = useState(null);
    const [formData, setFormData] = useState({
        time: '00:00',
        timefinis: '23:59',
    });

    const handleInputtextChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const timeInputRef = useRef(null);
    const timeInputRef1 = useRef(null);

    const handleIconClick = () => {
        // Trigger klik pada input saat ikon diklik
        if (timeInputRef.current) {
            timeInputRef.current.showPicker(); // showPicker memunculkan time picker (hanya di browser modern)
        }
    };

    const handleIconClick1 = () => {
        // Trigger klik pada input saat ikon diklik
        if (timeInputRef1.current) {
            timeInputRef1.current.showPicker(); // showPicker memunculkan time picker (hanya di browser modern)
        }
    };






    const [isAllChecked, setIsAllChecked] = useState(false);
    const [daysChecked, setDaysChecked] = useState({
        senin: false,
        selasa: false,
        rabu: false,
        kamis: false,
        jumat: false,
        minggu: false
    });
    const [hari, sethari] = useState('');
    const updateHariState = (updatedDays) => {
        const selectedDays = Object.keys(updatedDays).filter((day) => updatedDays[day]);
        sethari(selectedDays.join(", ")); // Gabungkan hari yang dipilih dengan tanda koma
    };

    // Ketika "Setiap hari" dicentang
    const handleAllCheckedChange = (checked) => {
        setIsAllChecked(checked);
        const updatedDays = {
            Senin: checked,
            Selasa: checked,
            Rabu: checked,
            Kamis: checked,
            Jumat: checked,
            Minggu: checked
        };
        setDaysChecked(updatedDays);
        updateHariState(updatedDays); // Update state hari
    };

    // Ketika hari spesifik dicentang
    const handleDayChange = (day, checked) => {
        const updatedDays = { ...daysChecked, [day]: checked };
        setDaysChecked(updatedDays);

        // Jika ada satu hari yang tidak dicentang, maka matikan "Setiap hari"
        if (!checked) {
            setIsAllChecked(false);
        } else {
            // Jika semua hari dicentang, aktifkan "Setiap hari"
            const allChecked = Object.values(updatedDays).every((val) => val);
            setIsAllChecked(allChecked);
        }

        updateHariState(updatedDays); // Update state hari
    };
    useEffect(() => {
        const allChecked = Object.values(daysChecked).every(Boolean);
        setIsAllChecked(allChecked); // Cek apakah semua checkbox hari dicentang
    }, [daysChecked]);

    const [namapromosi, setNamapromosi] = useState('');
    const handleInputChangenamapromosi = (event) => {
        setNamapromosi(event.target.value);
    };
    const [tipe, setTipe] = useState('')

    const handleSimpan = async () => {
        if (selectedOutlets.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus memilih setidaknya satu outlet.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!namapromosi) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama promosi harus di isi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!deskripsi) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Deskripsi promosi harus di isi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!tipe) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Tipe aktivitas harus di isi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!uang) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Minimal Pembelian harus di isi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!kategori) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Kategori harus di pilih.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!nilaiKategori) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nilai kategori harus di isi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!date) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Tanggal mulai harus di isi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!formData.time) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Tanggal berakhir harus di isi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!formData.timefinis) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Jam mulai harus di isi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!timefinis) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Jam berakhir harus di isi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!hari) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Pilih hari harus di isi, minimal satu.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        const formattedDate = new Date(date).toISOString().split('T')[0];
        const formattedDateFinis = new Date(datefinis).toISOString().split('T')[0];

        // const data = {
        //     tanggalMulai: formattedDate,
        //     minimalBeli: uang,
        //     pilihHari: hari,
        //     tanggalBerakhir: formattedDateFinis,
        //     kategori: kategori,
        //     tipeAktivasi: tipe,
        //     jamBerakhir: `${formData.timefinis}:00`,
        //     deskripsi: deskripsi,
        //     jamMulai: `${formData.time}:00`,
        //     namaPromosi: namapromosi,
        //     nilaiKategori: nilaiKategori,
        //     outlet:[selectedOutlets]
        //   };
        
        //   console.log("Data yang akan dikirim:", data);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${API_URL}/api/promosi`, {
                tanggalMulai: formattedDate,
                minimalBeli: uang,
                pilihHari: hari,
                tanggalBerakhir: formattedDateFinis,
                kategori: kategori,
                tipeAktivasi: tipe,
                jamBerakhir: `${formData.timefinis}:00`,
                deskripsi: deskripsi,
                jamMulai: `${formData.time}:00`,
                namaPromosi: namapromosi,
                nilaiKategori: nilaiKategori,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const promosiId = response.data.id;

            const promises = selectedOutlets.map(outlet =>
                axios.post(`${API_URL}/api/promosi/outlets`, {
                    promosisId: promosiId,
                    outletsId: outlet.id,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
            );

            await Promise.all([promises]);

            toast({
                title: "Sukses!",
                description: "Promosi berhasil ditambahkan.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });

            setDate(null);
            setDatefinis(null);
            setUang('');
            sethari('');
            setKategori('');
            setNilaiKategori('');
            setTipe('');
            setFormData({
                time: '00:00',
                timefinis: '23:59',
            });
            setNamapromosi('');
            setSelectedOutlets([]);
            setDaysChecked({
                senin: false,
                selasa: false,
                rabu: false,
                kamis: false,
                jumat: false,
                minggu: false
            });
            setdeskripsi('');

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
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[820px] my-[20px] p-[24px]">
                <div className='flex justify-between'>
                    <DialogHeader>
                        <DialogTitle className='text-[18px] py-[16px]'>Tambah Promosi</DialogTitle>
                    </DialogHeader>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                            <X className='h-[16px] w-[16px]' />
                        </Button>
                    </DialogClose>

                </div>
                <div className="grid gap-4 py-4">
                    <div className="flex gap-1 border-y py-[16px] my-[16px]">
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
                    <div className="grid gap-[16px]">
                        <h2 className='text-[16px] font-semibold'>Detail Promosi</h2>
                        <div className="flex gap-1">
                            <Label htmlFor="namaproduk" className="text-[14px] w-[240px] py-[8px]">Nama Promosi<span className='text-rose-500'>*</span></Label>
                            <Input
                                id="namapromosi"
                                placeholder="Masukkan Nama Promosi"
                                required
                                className="h-[36px] text-[14px]  border-slate-300"
                                value={namapromosi}
                                onChange={handleInputChangenamapromosi}
                            />
                        </div>
                        <div className="flex gap-1">
                            <Label htmlFor="deskripsi" className="text-[14px] w-[240px] py-[8px]">Deskripsi promosi<span className='text-rose-500'>*</span></Label>
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
                            <Label htmlFor="deskripsi" className="text-[14px] w-[240px] py-[8px]">Tipe Aktivasi<span className='text-rose-500'>*</span></Label>
                            <div className='w-full grid gap-[12px]'>
                                <RadioGroup defaultValue="comfortable" className='flex gap-[16px] ' onValueChange={(value) => setTipe(value)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Otomatis" id="r1" />
                                        <Label htmlFor="r1" className='text-[14px]'>Otomatis</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Manual" id="r2" />
                                        <Label htmlFor="r2" className='text-[14px]'>Manual</Label>
                                    </div>
                                </RadioGroup>
                                <div className="grid gap-[8px]">
                                    <Label htmlFor="uang" className="text-[14px] w-[240px] py-[8px]">Minimal Pembelian</Label>
                                    <div className="relative w-full">
                                        <Input
                                            type="text"
                                            placeholder="Masukkan nilai pembelian"
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
                        </div>
                        <div className="flex gap-1">
                            <Label htmlFor="deskripsi" className="text-[14px] w-[240px] py-[8px]">Kategori<span className='text-rose-500'>*</span></Label>
                            <div className='w-full flex gap-[8px]'>
                                <Select onValueChange={handleSelectChangeKategori}>
                                    <SelectTrigger className="w-[169px] h-[36px] text-[14px]" >
                                        <SelectValue placeholder="Pilih Potongan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem className='text-[14px]' value="%">Potongan  (%)</SelectItem>
                                            <SelectItem className='text-[14px]' value="Rp">Potongan  (Rp)</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Input
                                    type="text"
                                    placeholder="Nilai potongan (%)"
                                    required
                                    className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                                    value={nilaiKategori}
                                    onChange={handleChangeNilaiKategori}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-[16px]">
                        <h2 className='text-[16px] font-semibold'>Durasi promo</h2>
                        <div className='flex gap-[16px]'>
                            <div className='grid gap-[6px]'>
                                <Label htmlFor="deskripsi" className="text-[14px] w-[240px] py-[8px]">Tanggal Mulai</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[378px] justify-start font-normal h-[36px] text-[14px] ",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon size={20} className="mr-2" />
                                            <p className='w-full text-center'>{date ? format(date, "dd MMMM yyyy") : <span></span>}</p>
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
                            <div className='grid gap-[6px]'>
                                <Label htmlFor="deskripsi" className="text-[14px] w-[240px] py-[8px]">Tanggal Berakhir</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[378px] justify-start font-normal h-[36px] text-[14px]",
                                                !datefinis && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon size={20} className="mr-2" />
                                            <p className='w-full text-center'>{datefinis ? format(datefinis, "dd MMMM yyyy") : <span></span>}</p>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={datefinis}
                                            onSelect={setDatefinis}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className='flex gap-[16px] w-full'>
                            <div className='grid gap-[6px] w-full '>
                                <Label htmlFor="deskripsi" className="text-[14px]  py-[8px]">Jam Mulai</Label>
                                <div className="relative ">
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
                            <div className='grid gap-[6px] w-full'>
                                <Label htmlFor="deskripsi" className="text-[14px]  py-[8px]">Jam Berakhir</Label>
                                <div className="relative ">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center pl-3 cursor-pointer"
                                        onClick={handleIconClick1}
                                    >
                                        <Clock size={20} className="text-gray-500" />
                                    </div>

                                    {/* Input Time */}
                                    <Input
                                        ref={timeInputRef1}
                                        type="time"
                                        id="timefinis"
                                        className="h-[36px] text-[14px] pl-[35px] pr-2 w-full "

                                        min="09:00"
                                        max="18:00"
                                        required
                                        value={formData.timefinis}
                                        onChange={handleInputtextChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-[16px]'>
                            <Label htmlFor="hari" className="text-[14px] w-[240px] py-[8px]">Pilih hari</Label>
                            <div className='grid gap-[12px]'>
                                <div className="flex items-center space-x-[8px] py-[8px] px-[12px]">
                                    <Checkbox
                                        id="semua"
                                        checked={isAllChecked}
                                        onCheckedChange={(checked) => handleAllCheckedChange(checked)}
                                    />
                                    <label
                                        htmlFor="semua"
                                        className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                        Setiap hari
                                    </label>
                                </div>

                                <div className="flex flex-wrap gap-[12px]">
                                    {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Minggu"].map((day) => (
                                        <div
                                            key={day}
                                            className="flex items-center space-x-[8px] border-2 rounded-[6px] py-[8px] px-[12px]"
                                        >
                                            <Checkbox
                                                id={day}
                                                checked={daysChecked[day]}
                                                onCheckedChange={(checked) => handleDayChange(day, checked)}
                                            />
                                            <label
                                                htmlFor={day}
                                                className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                            >
                                                {day.charAt(0).toUpperCase() + day.slice(1)}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="text-[14px] h-[36px]">Batal</Button>
                    </DialogClose>
                    <Button className="text-[14px] h-[36px]" onClick={handleSimpan} >Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddPromosi
