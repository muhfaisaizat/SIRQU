import React, { useState } from 'react';
import { addDays, format, startOfWeek, startOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DataTableHistory from './DataTable';
import { Calendar as CalendarIcon, Shop } from 'iconsax-react';
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

const Penjualan = () => {
    const [date, setDate] = useState({
        from: new Date(),
        to: addDays(new Date(), 0),
    });

    const handleToday = () => {
        const today = new Date();
        setDate({
          from: today,
          to: today,
        });
      };
    
      const handleYesterday = () => {
        const yesterday = addDays(new Date(), -1);
        setDate({
          from: yesterday,
          to: yesterday,
        });
      };
    
      const handleThisWeek = () => {
        const today = new Date();
        const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Asumsi minggu mulai dari Senin
        setDate({
          from: startOfThisWeek,
          to: today,
        });
      };
    
      const handleThisMonth = () => {
        const today = new Date();
        const startOfThisMonth = startOfMonth(today);
        setDate({
          from: startOfThisMonth,
          to: today,
        });
      };
    
      const handleReset = () => {
        const today = new Date();
        setDate({
          from: today,
          to: today,
        });
      };

    const DataOutlet = [
        { id: "m5gr84i9", name: 'Cabang 1' },
        { id: "m5gr84i7", name: 'Cabang 2' },
        { id: "m5gr84i8", name: 'Cabang 3' }
    ];
    const [selectedOutlet, setSelectedOutlet] = useState(DataOutlet[0]);
    const handleSelectOutlet = (outlet) => {
        setSelectedOutlet(outlet);
    };


    return (
        <div className="px-[24px]">
            <div className='flex justify-between pt-[40px] pb-[16px]'>
                <h2 className='text-[36px] font-semibold'>Penjualan</h2>
                <div className='flex gap-[16px]'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant="outline"
                                className={`w-[250px] justify-start text-left text-[14px] font-normal h-[36px] ${!date ? "text-muted-foreground" : ""}`}
                            >
                                <CalendarIcon size={16} className="mr-2" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 flex" align="end">
                            <div className='grid justify-between h-full pt-[16px] pl-[8px] pr-[16px]'>
                                <div className='grid'>
                                    <Button variant="ghost" className="text-[12px] text-left font-normal justify-start p-[8px]" onClick={handleToday}>Hari ini</Button>
                                    <Button variant="ghost" className="text-[12px] text-left font-normal justify-start p-[8px]" onClick={handleYesterday}>Kemarin</Button>
                                    <Button variant="ghost" className="text-[12px] text-left font-normal justify-start p-[8px]" onClick={handleThisWeek}>Minggu ini</Button>
                                    <Button variant="ghost" className="text-[12px] text-left font-normal justify-start p-[8px]" onClick={handleThisMonth}>Bulan ini</Button>
                                </div>
                                <Button variant="ghost" className="text-[14px] text-left font-semibold justify-start p-[8px] mt-[50px]" onClick={handleReset}>Reset</Button>
                            </div>
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={1}
                            />
                        </PopoverContent>
                    </Popover>
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
            <DataTableHistory />
        </div>
    );
};

export default Penjualan;
