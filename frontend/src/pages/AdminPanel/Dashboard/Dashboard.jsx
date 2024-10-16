import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Shop } from 'iconsax-react';
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
import Card from './Card';
import Garfik from './Garfik';
import DataPenjualan from './DataPenjualan';
import { ScrollArea } from "@/components/ui/scroll-area"

const Dashboard = ({ handlemenu }) => {
  const DataKategori = [
    { id: "m5gr84i9", name: 'Semua' },
    { id: "m5gr84ig", name: 'Kategori 1' },
    { id: "m5gr84i7", name: 'Kategori 2' },
    { id: "m5gr84i8", name: 'Kategori 3' },
  ];
  const DataOutlet = [
    { id: "m5gr84i9", name: 'Cabang 1' },
    { id: "m5gr84i7", name: 'Cabang 2' },
    { id: "m5gr84i8", name: 'Cabang 3' }
  ];
  const [selectedOutlet, setSelectedOutlet] = useState(DataOutlet[0]);
  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet);
  };
  const Datahari = [
    { id: "m5gr84i9", name: 'Hari ini' },
    { id: "m5gr84i7", name: 'Minngu ini' },
    { id: "m5gr84i8", name: 'Bulan ini' }
  ];
  const [selectedHari, setSelectedHari] = useState(Datahari[0]);
  const handleSelectHari = (hari) => {
    setSelectedHari(hari);
  };

  return (
    <ScrollArea className='w-full h-[100%]'>
      <div className="px-[24px] grid ">
        <div className='grid gap-2 pt-[40px]  pb-[36px]'>
          <div className='flex justify-between'>
            <h2 className='text-[36px] font-semibold '>Dashboard</h2>
            <div className='flex gap-[16px]'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="mr-auto w-[130px] h-[36px] text-[14px] text-left  ">
                    <ChevronDown size={16} className="mr-2" />
                    {selectedHari ? selectedHari.name : "Pilih outlet"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className='w-[130px]'>
                  {Datahari.map((hari) => (
                    <DropdownMenuCheckboxItem
                      key={hari.id}
                      className="capitalize p-[12px]"
                      onClick={() => handleSelectHari(hari)}
                      checked={selectedHari?.id === hari.id}
                    >
                      <span className="ml-[12px] text-[14px]">{hari.name}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="mr-auto w-auto h-[36px] text-[14px] text-left  ">
                    <Shop size={16} className="mr-2" />
                    {selectedOutlet ? selectedOutlet.name : "Pilih outlet"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className='w-auto'>
                  <DropdownMenuLabel className='ml-[12px] text-[14px]'>Pilih Outlet</DropdownMenuLabel>
                  {DataOutlet.map((outlet) => (
                    <DropdownMenuCheckboxItem
                      key={outlet.id}
                      className="capitalize p-[12px]"
                      onClick={() => handleSelectOutlet(outlet)}
                      checked={selectedOutlet?.id === outlet.id}
                    >
                      <span className="ml-[12px] text-[14px]">{outlet.name}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className='grid gap-[26px]'>
          <Card handlemenu={handlemenu} />
          <div className='flex gap-[16px]'>
            <Garfik />
            <DataPenjualan DataKategori={DataKategori} />
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default Dashboard
