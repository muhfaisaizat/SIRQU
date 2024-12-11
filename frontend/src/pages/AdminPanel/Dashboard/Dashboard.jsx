import React, { useState, useEffect } from 'react'
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
import axios from 'axios';
import { API_URL } from "../../../helpers/networt";

const Dashboard = ({ handlemenu }) => {
  const DataKategori = [
    { id: "m5gr84i9", name: 'Semua' },
    { id: "m5gr84ig", name: 'Kategori 1' },
    { id: "m5gr84i7", name: 'Kategori 2' },
    { id: "m5gr84i8", name: 'Kategori 3' },
  ];
  const [DataOutlet, setDataOutlet] = useState([
    // { id: "m5gr84i9", name: 'Cabang 1' },
    // { id: "m5gr84i7", name: 'Cabang 2' },
    // { id: "m5gr84i8", name: 'Cabang 3' },
]);

const [dataSum, setDataSum] = useState([]);

const fetchDataCardOutlet = async (id) => {
  const token = localStorage.getItem("token");
  try {
      const response = await axios.get(`${API_URL}/api/dashboard/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      setDataSum(response.data.data)

  } catch (error) {
      console.error("Error fetching data", error);
  }
};

const fetchDataCardDays = async (hari) => {
  const token = localStorage.getItem("token");
  try {
      const response = await axios.get(`${API_URL}/api/dashboard/${selectedOutlet.id}?periode=${hari}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      setDataSum(response.data.data)

  } catch (error) {
      console.error("Error fetching data", error);
  }
};

  const [selectedOutlet, setSelectedOutlet] = useState(DataOutlet[0]);
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

  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    fetchDataCardOutlet(outlet.id);
  };
  const Datahari = [
    { id: "hari-ini", name: 'Hari ini' },
    { id: "minggu-ini", name: 'Minngu ini' },
    { id: "bulan-ini", name: 'Bulan ini' },
    { id: "tahun-ini", name: 'Tahun ini' }
  ];
  const [selectedHari, setSelectedHari] = useState(Datahari[0]);
  const handleSelectHari = (hari) => {
    setSelectedHari(hari);
    fetchDataCardDays(hari.id)
  };

  useEffect(() => {
    if (selectedOutlet) {
      fetchDataCardDays(selectedHari.id);
    }
}, [selectedHari, selectedOutlet]);

  


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
          <Card handlemenu={handlemenu} dataSum={dataSum}/>
          <div className='flex gap-[16px]'>
            <Garfik selectedOutlet={selectedOutlet}/>
            <DataPenjualan DataKategori={DataKategori} />
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default Dashboard
