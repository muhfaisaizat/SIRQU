import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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

const AddKategori = ({ buttonProps, title, showIcon }) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [kategori, setKategori] = useState('');



    const handleSubmit = (e) => {
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

        toast({
            title: "Sukses!",
            description: "Kategori berhasil ditambahkan.",
            action: <ToastAction altText="Try again">Cancel</ToastAction>,
        });

        setIsOpen(false);
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

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button {...buttonProps}>{showIcon && <GoPlus size={16} />} {title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[505px]">
                    <DialogHeader>
                        <DialogTitle className='text-[18px]'>Tambah kategori</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
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
                            <Button type="submit" className='text-[14px] h-[36px]'>Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddKategori;
