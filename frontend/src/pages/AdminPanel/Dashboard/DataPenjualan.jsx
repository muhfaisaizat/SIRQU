import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Folder2 } from 'iconsax-react';
import { API_URL } from "../../../helpers/networt";

const DataPenjualan = ({ DataKategori, DataProdukTerjual, selectedKategori, setSelectedKategori, handleSelectKategoei, fetchDataPenjualanTertinggiAll }) => {
    

    return (
        <div className='border-2 rounded-[8px] h-[352px] w-[33%] p-[24px]'>
            <div className='flex justify-between w-full mb-[24px]' >
                <h1 className='text-[16px] font-semibold'>Penjualan Tertinggi</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className=" w-auto h-[36px] text-[14px] flex justify-between">
                            <ChevronDown size={16} className="mr-2" />
                            {selectedKategori ? selectedKategori.name : "Semua"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className='w-[130px]'>
                            <DropdownMenuCheckboxItem
                               
                                className="capitalize p-[12px]"
                                onClick={() => {handleSelectKategoei({id:'semua', name:'Semua'}); fetchDataPenjualanTertinggiAll();}}
                                checked={selectedKategori?.id === 'semua'}
                            >
                                <span className="ml-[12px] text-[14px]">Semua</span>
                            </DropdownMenuCheckboxItem>
                        {DataKategori.map((kategori) => (
                            <DropdownMenuCheckboxItem
                                key={kategori.id}
                                className="capitalize p-[12px]"
                                onClick={() => handleSelectKategoei(kategori)}
                                checked={selectedKategori?.id === kategori.id}
                            >
                                <span className="ml-[12px] text-[14px]">{kategori.name}</span>
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ScrollArea className='w-full h-[80%]'>
                {DataProdukTerjual.length > 0 ? (
                    <div className='grid w-full gap-[16px]'>
                        {DataProdukTerjual.map((produk) => (
                            <div key={produk.nama} className='flex justify-between w-full h-[36px] items-center'>
                                <div className='flex items-center gap-[12px]'>
                                    <Avatar>
                                        <AvatarImage  src={produk.foto ? `${API_URL}/images/${produk.foto}` : "https://github.com/shadcn.png"} alt={produk.nama} />
                                        <AvatarFallback>{produk.nama[0]}</AvatarFallback>
                                    </Avatar>
                                    <h3 className='text-[14px] font-medium'>{produk.nama}</h3>
                                </div>
                                <h3 className='text-[14px] font-medium text-slate-500'>{produk.terjual} Terjual</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center h-full'>
                        <Folder2 size="40" variant="Bulk" />
                        <div className='flex flex-col items-center gap-[12px]'>
                            <h1 className="text-center text-[18px] font-semibold">Data tidak tersedia</h1>
                            <p className="text-center text-[14px] font-normal text-slate-500">Belum ada data yang tersedia untuk halaman ini</p>
                        </div>
                    </div>

                )}
            </ScrollArea>
        </div>
    )
}

export default DataPenjualan
