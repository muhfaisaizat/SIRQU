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
import { ScrollArea } from '@/components/ui/scroll-area'
import AddBelanja from './AddBelanja';
import axios from 'axios';
import { API_URL } from "../../../helpers/networt";

const Belanja = () => {
  // data
  const [data, setData] = useState([
    {
        id: "0001",
        outletsId: '2',
        categoriesBelanjasId: '1',
        nama: 'Kuota listrik 1 bulan',
        kategori:'Pengeluaran bulanan',
        total: "500000",
        deskripsi: "-",
        date: "01 Oktober 2024, 13.00",
        outlet: 'Cabang 1',
    },
    {
        id: "0002",
        outletsId: '2',
        categoriesBelanjasId: '1',
        nama: 'Paket data karyawan',
        kategori:'Pengeluaran opsional',
        total: "500000",
        deskripsi: "paket data untuk hadiah ultah",
        date: "01 Oktober 2024, 13.00",
        outlet: 'Cabang 2',
    },
  
    
]);

const [originalData, setOriginalData] = useState(data); 

const [DataOutlet, setDataOutlet] = useState([
    // { id: "m5gr84i9", name: 'Cabang 1' },
    // { id: "m5gr84i7", name: 'Cabang 2' },
    // { id: "m5gr84i8", name: 'Cabang 3' },
]);

const [selectedOutlet, setSelectedOutlet] = useState([]);
const [filters, setFilters] = useState({ outlet: '', kategori: [] });
const [columnFilters, setColumnFilters] = useState([
    { id: 'outlet', value:  '' },
    { id: 'kategori', value: [] },
    { id: 'date', value: [] },
]);

const [idOutlet,setidOutlet]=useState(null);


// Fungsi untuk memformat data API
const formatUserData = (apiData) => {
    return {
        id: `${apiData.id}`,
        outletsId: apiData.outletsId,
        categoriesBelanjasId: apiData.categoriesBelanjasId, 
        nama: apiData.namaKegiatan,    
        kategori: apiData.kategoriNama,     
        total: apiData.totalBelanja, 
        deskripsi: apiData.deskripsi,  
        date: `${apiData.tanggal}, ${apiData.waktu}`,
        outlet: apiData.outletNama
    };
};

const formatOutletData = (apiData) => {
    return {
        id: apiData.id_outlet.toString(),
        name: apiData.nama_outlet
    };
};



const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/api/belanja`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

       // Log untuk memastikan data yang diterima

        // Pastikan response.data adalah array
        if (Array.isArray(response.data)) {
            const formattedData = response.data.map(formatUserData);
           
            setData(formattedData);
            setOriginalData(formattedData); // Set originalData di sini
        } else {
            console.error("Data yang diterima bukan array");
        }
    } catch (error) {
        console.error("Error fetching data", error);
    }
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

// Ambil data dari API
useEffect(() => {
    fetchDataOutlet();
    fetchData();
}, []);

useEffect(() => {
    if (DataOutlet.length > 0) {
        setSelectedOutlet(DataOutlet[0]); // Set outlet pertama setelah data tersedia
    }
}, [DataOutlet]);

// Update columnFilters saat selectedOutlet berubah
useEffect(() => {
    if (selectedOutlet) {
        setColumnFilters((prevFilters) => [
            { id: 'outlet', value: selectedOutlet.name },
            { id: 'kategori', value: [] },
            { id: 'date', value: [] },
        ]);
        setidOutlet(selectedOutlet.id)
    }
}, [selectedOutlet]);


// useEffect(() => {
//    console.log(idOutlet)
// }, [idOutlet]);




const DataBayar = [
    { id: "m5gr84i9", name: 'Cash' },
    { id: "m5gr84i7", name: 'QRIS' },
]
const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    const newFilters = { ...filters, outlet: outlet.name };
    setFilters(newFilters);
    setidOutlet(outlet.id)
    setColumnFilters((prev) => {
        const existingFilters = prev.filter(filter => filter.id !== 'outlet');
        return [...existingFilters, { id: 'outlet', value: outlet.name }];
    });
};
const handleFilterChange = (selectedValue) => {
    const newFilters = { ...filters, kategori: [selectedValue] };
    setFilters(newFilters);
    setColumnFilters((prev) => {
        const existingFilters = prev.filter(filter => filter.id !== 'kategori');
        return [...existingFilters, { id: 'kategori', value: [selectedValue] }];
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
    <ScrollArea className='h-[100%]'>
    <div className="px-[24px]">
        <div className='flex justify-between pt-[40px] pb-[36px]'>
            <h2 className='text-[36px] font-semibold'>Belanja</h2>
            <div className='flex gap-[16px]'>
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
                <AddBelanja idOutlet={idOutlet}/>
            </div>
        </div>
        <DataCard/>
        <DataTableHistory data={data} setData={setData} columnFilters={columnFilters} setColumnFilters={setColumnFilters} filters={filters} DataBayar={DataBayar} handleFilterChange={handleFilterChange} handleClearFilters={handleClearFilters} originalData={originalData} setOriginalData={setOriginalData}/>
    </div>
    </ScrollArea>
);
}

export default Belanja
