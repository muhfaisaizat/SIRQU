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
import { id } from "date-fns/locale";

const Penjualan = () => {
     // data
     const [data, setData] = useState([
        {
            id: "0001",
            name: 'Alinea',
            item:'Kopi, Taichan Premium, Mi indomie',
            harga: "5000",
            bayar: "Cash",
            date: "01 Oktober 2024, 13.00",
            outlet: 'Cabang 1',
        },
        {
            id: "0002",
            name: 'Bayu',
            item:'Kopi, Taichan Premium, Mi indomie',
            harga: "5000",
            bayar: "QRIS",
            date: "09 Oktober 2024, 13.00",
            outlet: 'Cabang 2',
        },
        {
            id: "0003",
            name: 'Putri',
            item:'Kopi, Taichan Premium, Mi indomie',
            harga: "5000",
            bayar: "Cash",
            date: "21 Oktober 2024, 13.00",
            outlet: 'Cabang 2',
        },
        {
            id: "0004",
            name: 'Sasa',
            item:'Kopi, Taichan Premium, Mi indomie',
            harga: "5000",
            bayar: "QRIS",
            date: "20 Oktober 2024, 13.00",
            outlet: 'Cabang 1',
        },
        {
            id: "0009",
            name: 'wawa',
            item:'Kopi, Taichan Premium, Mi indomie',
            harga: "5000",
            bayar: "Cash",
            date: "20 Oktober 2024, 13.00",
            outlet: 'Cabang 1',
        },
        {
            id: "0008",
            name: 'anii',
            item:'Kopi, Taichan Premium, Mi indomie',
            harga: "5000",
            bayar: "Cash",
            date: "20 Oktober 2024, 13.00",
            outlet: 'Cabang 1',
        },
        {
            id: "0005",
            name: 'Abimayu',
            item:'Kopi, Taichan Premium, Mi indomie',
            harga: "5000",
            bayar: "QRIS",
            date: "10 Oktober 2024, 13.00",
            outlet: 'Cabang 1',
        },
        {
            id: "0006",
            name: 'Abimayu',
            item:'Kopi, Taichan Premium, Mi indomie',
            harga: "5000",
            bayar: "QRIS",
            date: "21 Oktober 2024, 13.00",
            outlet: 'Cabang 2',
        },
        
    ]);

    

    const [date, setDate] = useState({
        from: null,
        to: addDays(null, 0),
    });

    const DataOutlet = [
        { id: "m5gr84i9", name: 'Cabang 1' },
        { id: "m5gr84i7", name: 'Cabang 2' },
        { id: "m5gr84i8", name: 'Cabang 3' }
    ];
    const [selectedOutlet, setSelectedOutlet] = useState(DataOutlet[0]);
    const [filters, setFilters] = useState({ outlet: 'Cabang 1', bayar: [] });
    const [columnFilters, setColumnFilters] = useState([
        { id: 'outlet', value:  selectedOutlet.name },
        { id: 'bayar', value: [] },
        { id: 'date', value: [] },
    ]);

    const handleDateFilterChange = (from, to) => {
        setDate({ from, to });
        setColumnFilters((prev) => {
            const existingFilters = prev.filter(filter => filter.id !== 'date');
            return [...existingFilters, { id: 'date', value: format(from, "dd MMMM y", { locale: id }) }];
        });
    };

    const handleDateSelect = (selectedDate) => {
        const { from, to } = selectedDate;
        handleDateFilterChange(from, to);
    };

    const handleToday = () => {
        const today = new Date();
        handleDateFilterChange(today);
      };
    
      const handleYesterday = () => {
        const yesterday = addDays(new Date(), -1);
        handleDateFilterChange(yesterday);
      };
    
      const handleThisWeek = () => {
        const today = new Date();
        const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Asumsi minggu mulai dari Senin
        handleDateFilterChange(startOfThisWeek, today);
      };
    
      const handleThisMonth = () => {
        const today = new Date();
        const startOfThisMonth = startOfMonth(today);
        handleDateFilterChange(startOfThisMonth, today);
      };
    
      const handleReset = () => {
        setDate({
            from: null,
            to: null,
        });
        setColumnFilters((prevFilters) => {
            return prevFilters.filter(filter => filter.id !== 'date');
        });
      };
   
    const DataBayar = [
        { id: "m5gr84i9", name: 'Cash' },
        { id: "m5gr84i7", name: 'QRIS' },
    ]
    const handleSelectOutlet = (outlet) => {
        setSelectedOutlet(outlet);
        const newFilters = { ...filters, outlet: outlet.name };
        setFilters(newFilters);
        setColumnFilters((prev) => {
            const existingFilters = prev.filter(filter => filter.id !== 'outlet');
            return [...existingFilters, { id: 'outlet', value: outlet.name }];
        });
    };
    const handleFilterChange = (selectedValue) => {
        const newFilters = { ...filters, bayar: [selectedValue] };
        setFilters(newFilters);
        setColumnFilters((prev) => {
            const existingFilters = prev.filter(filter => filter.id !== 'bayar');
            return [...existingFilters, { id: 'bayar', value: [selectedValue] }];
        });
      };
      const handleClearFilters = () => {
        setFilters({ outlet: selectedOutlet.name, bayar: [] });  
        setColumnFilters(prevFilters => {
            const newFilters = [
                { id: 'outlet', value: selectedOutlet.name },
                { id: 'bayar', value: [] }
            ];
    
            // Jika filter tanggal sudah ada, tetap tambahkan filter tanggal yang sama
            const dateFilter = prevFilters.find(filter => filter.id === 'date');
            if (dateFilter) {
                newFilters.push(dateFilter); // Menambahkan filter tanggal yang ada
            }
    
            return newFilters; // Mengembalikan array filter yang baru
        });
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
                                            {format(date.from, "dd LLL y", { locale: id })} - {format(date.to, "dd LLL y", { locale: id })}
                                        </>
                                    ) : (
                                        format(date.from, "dd LLL y", { locale: id })
                                    )
                                ) : (
                                    <span>Pilih tanggal</span>
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
                                onSelect={handleDateSelect}
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
            <DataTableHistory data={data} setData={setData} columnFilters={columnFilters} setColumnFilters={setColumnFilters} filters={filters} DataBayar={DataBayar} handleFilterChange={handleFilterChange} handleClearFilters={handleClearFilters}/>
        </div>
    );
};

export default Penjualan;
