import React, { useState, useEffect } from 'react'
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import DataTable from './DataTable';
import { GoPlus } from "react-icons/go";
import AddPromosi from './AddPromosi';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const Promosi = () => {

  const [isOpen, setIsOpen] = useState(false);
  // data
  const [data, setData] = useState([
    // {
    //   id: "0001",
    //   name: 'Promo Sale',
    //   tipe: 'Manual',
    //   bonus: 50,
    //   outlet: "Outlet 1",
    //   date: "23 October 2024 - 30 December 2024",
    // },
    // {
    //   id: "0002",
    //   name: 'Kemerdekaan',
    //   tipe: 'Otomatis',
    //   bonus: 50,
    //   outlet: "Outlet 1, Outlet 2",
    //   date: "23 October 2024 - 30 December 2024",
    // },


  ]);

  // status
  const [originalData, setOriginalData] = useState(data); // Tambahkan state untuk data asli

  const formatData = (apiData) => {
    return {
        ...apiData,
        id: apiData.id_promosi,
        name: apiData.nama_promosi,
        tipe: apiData.tipe_aktivasi, 
        outlet: apiData.detailOutlet.map((outlet) => outlet.nama).join(', '),     
        date: apiData.durasi, 
        
    };
};

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/api/promosi`, {
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
            console.error("Data yang diterima bukan array");
        }
    } catch (error) {
        console.error("Error fetching data", error);
    }
};


useEffect(() => {
  fetchData();
}, []);

  return (
    <div className="px-[24px]">
      <div className='grid gap-2 pt-[40px]  pb-[16px]'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink
              className="text-[14px] font-medium cursor-pointer">
              Pengaturan
            </BreadcrumbLink>
            <BreadcrumbSeparator>
              <ArrowRight2 size={24} color='#64748B' />
            </BreadcrumbSeparator>
            <BreadcrumbLink
              onClick={(e) => e.preventDefault()}
              className="text-[14px] font-medium text-black">
              Promosi
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex justify-between'>
          <h2 className='text-[36px] font-semibold '>Promosi</h2>
          <Button onClick={() => setIsOpen(true)} className='text-[14px] h-[36px]'><GoPlus size={16} /> Tambah promosi</Button>
        </div>
      </div>
      <DataTable data={data} setData={setData} originalData={originalData} setOriginalData={setOriginalData} />
      <AddPromosi isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Promosi
