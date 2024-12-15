import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoPlus } from "react-icons/go";
import { CloseCircle } from 'iconsax-react';
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
import { X } from "lucide-react"
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const AddKategori = ({ buttonProps, title, showIcon, fetchData }) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [kategori, setKategori] = useState('');



    


    const [DataOutlet, setDataOutlet] = useState([
        // { id: "m5gr84i9", name: 'Cabang 1' },
        // { id: "m5gr84i7", name: 'Cabang 2' },
        // { id: "m5gr84i8", name: 'Cabang 3' },
    ]);

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi untuk nama kategori
        if (!kategori) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama kategori harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        // Validasi untuk outlet yang dipilih
        if (selectedOutlets.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus memilih setidaknya satu outlet.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API_URL}/api/categories`, {
                name: kategori,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            const categoriesId = response.data.id;

            const promises = selectedOutlets.map(outlet =>
                axios.post(`${API_URL}/api/categories/outlets`, {
                    categoriesId: categoriesId,
                    outletsId: outlet.id,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
            );

            await Promise.all(promises);

            toast({
                title: "Sukses!",
                description: "Kategori berhasil ditambahkan.",
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

       

        setIsOpen(false);
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button {...buttonProps}>{showIcon && <GoPlus size={16} />} {title}</Button>
                </DialogTrigger>
                
                    <DialogContent className="sm:max-w-[505px]">
                        <div className='flex justify-between'>
                            <DialogHeader>
                                <DialogTitle className='text-[18px] py-[16px]'>Tambah Kategori</DialogTitle>
                            </DialogHeader>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost">
                                    <X className='h-[16px] w-[16px]' />
                                </Button>
                            </DialogClose>

                        </div>
                        <div className="grid gap-[16px] py-[16px]">
                            <div className="grid gap-1">
                                <Label htmlFor="Kategori" className="text-[14px]">Nama kategori<span className='text-rose-500'>*</span></Label>
                                <Input
                                    id="Kategori"
                                    placeholder="Masukkan Nama kategori"
                                    required
                                    className="h-[36px] text-[14px] rounded-lg border-slate-300"
                                    value={kategori}
                                    onChange={(e) => setKategori(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="role" className="text-[14px]">Atur outlet<span className='text-rose-500'>*</span></Label>
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
                            </div>
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
                            <div>
                                <p className='text-[14px] font-normal text-slate-500'>* Kategori ini membantu mengelompokkan produk sesuai keinginan. Jika produk tidak memiliki kategori, akan masuk ke <span className='text-black'>‘Uncategorized’</span></p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSubmit} className='text-[14px] h-[36px]'>Simpan</Button>
                        </DialogFooter>
                    </DialogContent>
                
            </Dialog>
        </div>
    );
};

export default AddKategori;
