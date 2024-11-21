import React,{useState, useEffect} from 'react'
import DataTableDemo from './data-table';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import AddPengguna from './AddPengguna';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";



const DaftarPengguna = () => {

  const [data, setData] = useState([]);
   const [originalData, setOriginalData] = useState(data); // Tambahkan state untuk data asli

  // Fungsi untuk memformat data API
  const formatUserData = (apiData) => {
      return {
          id: `${apiData.id}`,  // Menambahkan "m" pada ID
          name: apiData.name,     // Nama pengguna
          role: apiData.role,     // Peran pengguna
          status: apiData.status, // Mengubah status "Active" menjadi "Aktif"
          email: apiData.email,   // Email pengguna
          date: new Date(apiData.createdAt).toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
          }), // Format tanggal menjadi format Indonesia
          image: apiData.image
      };
  };

  const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
          const response = await axios.get(`${API_URL}/api/users`, {
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
  // Ambil data dari API
  useEffect(() => {
  
      fetchData();
  }, []);
  return (
    <div className="px-[24px]">
      <div className='grid gap-2 pt-[40px]  pb-[36px]'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink
              onClick={(e) => e.preventDefault()}
              className={`text-[14px] font-medium hover:text-slate-500`}>
              Manajemen pengguna
            </BreadcrumbLink>
            <BreadcrumbSeparator>
              <ArrowRight2 size={20} color='#64748B' />
            </BreadcrumbSeparator>
            <BreadcrumbLink
              onClick={(e) => e.preventDefault()}
              className={`text-[14px] font-medium text-black`}>
              Daftar pengguna
            </BreadcrumbLink>

          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex justify-between'>
        <h2 className='text-[36px] font-semibold '>List pengguna</h2>
        <AddPengguna fetchData={fetchData} buttonProps={{ className: 'gap-2 h-[36px] text-[14px] font-medium' }}  title="Tambah pengguna" showIcon={true} />
        </div>
        
      </div>

      <DataTableDemo data={data} setData={setData} fetchData={fetchData} originalData={originalData} setOriginalData={setOriginalData}/>
    </div>
  )
}

export default DaftarPengguna

