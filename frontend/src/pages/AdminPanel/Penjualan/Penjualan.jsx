import React, { useState, useEffect } from 'react';
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
import DataCard from './DataCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import { API_URL } from "../../../helpers/networt";
import dayjs from "dayjs";

const Penjualan = () => {

    const [DataOutlet, setDataOutlet] = useState([
        // { id: "m5gr84i9", name: 'Cabang 1' },
        // { id: "m5gr84i7", name: 'Cabang 2' },
        // { id: "m5gr84i8", name: 'Cabang 3' },
    ]);

    const [selectedOutlet, setSelectedOutlet] = useState(null);
    const [filters, setFilters] = useState({ bayar: [] });
    const [columnFilters, setColumnFilters] = useState([
        { id: 'bayar', value: [] },
        { id: 'date', value: [] },
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
                setSelectedOutlet(formattedData[0])
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
    // useEffect(() => {
    //    console.log(selectedOutlet)
    // }, [selectedOutlet]);


    // data
    const [data, setData] = useState([
        // {
        //     id: "0001",
        //     name: 'Alinea',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "Cash",
        //     date: "01 Oktober 2024, 13.00",
        //     outlet: 'Cabang 1',
        // },
        // {
        //     id: "0002",
        //     name: 'Bayu',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "QRIS",
        //     date: "09 Oktober 2024, 13.00",
        //     outlet: 'Cabang 2',
        // },
        // {
        //     id: "0003",
        //     name: 'Putri',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "Cash",
        //     date: "21 Oktober 2024, 13.00",
        //     outlet: 'Cabang 2',
        // },
        // {
        //     id: "0004",
        //     name: 'Sasa',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "QRIS",
        //     date: "20 Oktober 2024, 13.00",
        //     outlet: 'Cabang 1',
        // },
        // {
        //     id: "0009",
        //     name: 'wawa',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "Cash",
        //     date: "20 Oktober 2024, 13.00",
        //     outlet: 'Cabang 1',
        // },
        // {
        //     id: "0008",
        //     name: 'anii',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "Cash",
        //     date: "20 Oktober 2024, 13.00",
        //     outlet: 'Cabang 1',
        // },
        // {
        //     id: "0005",
        //     name: 'Abimayu',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "QRIS",
        //     date: "10 Oktober 2024, 13.00",
        //     outlet: 'Cabang 1',
        // },
        // {
        //     id: "0006",
        //     name: 'Abimayu',
        //     item:'Kopi, Taichan Premium, Mi indomie',
        //     harga: "5000",
        //     bayar: "QRIS",
        //     date: "21 Oktober 2024, 13.00",
        //     outlet: 'Cabang 2',
        // },

    ]);

    const [originalData, setOriginalData] = useState(data); // Tambahkan state untuk data asli
    const formatDate = (date) => {
        return dayjs(date).format("D MMMM YYYY, HH.mm");
    };
    const formatData = (apiData) => {
        return {
            ...apiData,
            id: apiData.penjualan_id,
            name: apiData.transaksi_name,
            item: apiData.detailtransaksi.map((item) => item.product_name).join(', '),
            harga: apiData.total,
            bayar: apiData.tipe_bayar,
            date: formatDate(apiData.createdAt),
            outlet: apiData.outlet_name,

        };
    };

    const fetchData = async (id) => {
        const token = localStorage.getItem("token");
        try {

            const response = await axios.get(`${API_URL}/api/penjualan?id_outlet=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data.data)) {
                const formattedData = response.data.data.map(formatData);

                setData(formattedData);
                setOriginalData(formattedData); // Set originalData di sini
            } else {
                // console.error("Data yang diterima bukan array");

                setData([]);
                setOriginalData([]);
            }


        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const fetchDataByDate = async (id, startDate, endDate) => {
        const token = localStorage.getItem("token");
        try {

            const response = await axios.get(`${API_URL}/api/penjualan?id_outlet=${id}&start_date=${startDate}&end_date=${endDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data.data)) {
                const formattedData = response.data.data.map(formatData);

                setData(formattedData);
                setOriginalData(formattedData); // Set originalData di sini
            } else {
                // console.error("Data yang diterima bukan array");

                setData([]);
                setOriginalData([]);
            }


        } catch (error) {
            console.error("Error fetching data", error);
        }
    };


    useEffect(() => {
        if (selectedOutlet) {
            fetchData(selectedOutlet.id);
        }
    }, [selectedOutlet]);

    const [date, setDate] = useState({
        from: null,
        to: null,
    });



    const handleDateFilterChange = (from, to) => {
        setDate({ from, to });
        // setColumnFilters((prev) => {
        //     const existingFilters = prev.filter(filter => filter.id !== 'date');
        //     return [...existingFilters, { id: 'date', value: format(from, "dd MMMM y", { locale: id }) }];
        // });
    };

    const handleDateSelect = (selectedDate) => {
        const { from, to } = selectedDate;
        const formattedDate = from ? from.toISOString().split('T')[0] : '';
        const formattedDateto = to ? to.toISOString().split('T')[0] : '';
        setDate({ from: from, to: to });
        fetchDataByDate(selectedOutlet.id, formattedDate, formattedDateto);
        // handleDateFilterChange(from, to);
    };

    const handleToday = async () => {
        const today = new Date();
        setDate({ from: today, to: today });
        const formattedDate = today.toISOString().split('T')[0];
        fetchDataByDate(selectedOutlet.id, formattedDate, formattedDate);
    };

    const handleYesterday = () => {
        const yesterday = addDays(new Date(), -1);
        setDate({ from: yesterday, to: yesterday });
        const formattedDate = yesterday.toISOString().split('T')[0];
        fetchDataByDate(selectedOutlet.id, formattedDate, formattedDate);
    };

    const handleThisWeek = () => {
        const today = new Date();
        const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Asumsi minggu mulai dari Senin
        setDate({ from: today, to: startOfThisWeek });
        const formattedDatetoday = today.toISOString().split('T')[0];
        const formattedstartOfThisWeek = startOfThisWeek.toISOString().split('T')[0];
        fetchDataByDate(selectedOutlet.id, formattedDatetoday, formattedstartOfThisWeek);
    };

    const handleThisMonth = () => {
        const today = new Date();
        const startOfThisMonth = startOfMonth(today);
        setDate({ from:  startOfThisMonth, to:  today });
        const formattedDatetoday = today.toISOString().split('T')[0];
        const formattedstartOfThisWeek = startOfThisMonth.toISOString().split('T')[0];
        fetchDataByDate(selectedOutlet.id, formattedstartOfThisWeek, formattedDatetoday);
    };

    const handleReset = () => {
        fetchData(selectedOutlet.id);
        setDate({
            from: null,
            to: null,
        });
    };

    const DataBayar = [
        { id: "m5gr84i9", name: 'Cash' },
        { id: "m5gr84i7", name: 'QRIS' },
    ]
    const handleSelectOutlet = (outlet) => {
        setSelectedOutlet(outlet);
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
        setFilters({ bayar: [] });
        setColumnFilters(prevFilters => {
            const newFilters = [
                { id: 'bayar', value: [] }
            ];

            // // Jika filter tanggal sudah ada, tetap tambahkan filter tanggal yang sama
            // const dateFilter = prevFilters.find(filter => filter.id === 'date');
            // if (dateFilter) {
            //     newFilters.push(dateFilter); // Menambahkan filter tanggal yang ada
            // }

            return newFilters; // Mengembalikan array filter yang baru
        });
    };



    return (
        <ScrollArea className='h-[100%] pb-[10px]'>
            <div className="px-[24px]">
                <div className='flex justify-between pt-[40px] pb-[36px]'>
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
                <DataCard />
                <DataTableHistory data={data} setData={setData} columnFilters={columnFilters} setColumnFilters={setColumnFilters} filters={filters} DataBayar={DataBayar} handleFilterChange={handleFilterChange} handleClearFilters={handleClearFilters} originalData={originalData} setOriginalData={setOriginalData} />
            </div>
        </ScrollArea>
    );
};

export default Penjualan;
