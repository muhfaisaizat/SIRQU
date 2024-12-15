import React ,{useState, useEffect} from 'react'
import DataTableDemo from './DataTable';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import AddKategori from './AddKategori';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";


const Kategori = () => {
   // data
   const [data, setData] = useState([
    // {
    //     id: "m5gr84i9",
    //     name: 'jairo vernandes',
    //     jumlah: "12",
    //     outlet: "Oulet 1, Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "3u1reuv4",
    //     name: 'jairo vernandes',
    //     jumlah: "12",
    //     outlet: "Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "derv1ws0",
    //     name: 'jairo vernandes',
    //     jumlah: "12",
    //     outlet: "Oulet 1, Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "5kma53ae",
    //     name: 'jairo vernandes',
    //     jumlah: "89",
    //     outlet: "Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "bhqecj4p",
    //     name: 'jairo vernandes',
    //     jumlah: "9",
    //     outlet: "Oulet 1, Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "bhqecj4p234",
    //     name: 'jairo vernandes',
    //     jumlah: "12",
    //     outlet: "Oulet 1, Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "bhqecj4p23467",
    //     name: 'jairo vernandes',
    //     jumlah: "12",
    //     outlet: "Oulet 1, Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "bhqecj4p23467g",
    //     name: 'jairo vernandes',
    //     jumlah: "12",
    //     outlet: "Oulet 1, Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "bhqecj4p23467g7",
    //     name: 'jairo vernandes',
    //     jumlah: "12",
    //     outlet: "Oulet 1, Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "bhqecj4p23467g76",
    //     name: 'jairo vernandes',
    //     jumlah: "12",
    //     outlet: "Oulet 1, Outlet 2",
    //     date: "23 Oktober 2024",
    // },
    // {
    //     id: "bhqecj4p23467g76",
    //     name: 'jairo vernandes',
    //     jumlah: "12",
    //     outlet: "Oulet 1, Outlet 2",
    //     date: "23 Oktober 2024",
    // },
]);

// status
const [originalData, setOriginalData] = useState(data); // Tambahkan state untuk data asli

const formatData = (apiData) => {
    return {
     ...apiData,
     id: apiData.id_kategori,
     name: apiData.nama_kategori,
     jumlah: apiData.jumlah_product,
     outlet: apiData.detailOutlet.map((outlet) => outlet.nama).join(', '),     
     date: new Date(apiData.created_at).toLocaleDateString('id-ID', { 
       day: 'numeric', 
       month: 'long', 
       year: 'numeric' 
   }),
    };
};

const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/api/categories`, {
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
           //  console.log(formattedData)
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
              Produk dan stok
            </BreadcrumbLink>
            <BreadcrumbSeparator>
              <ArrowRight2 size={20} color='#64748B' />
            </BreadcrumbSeparator>
            <BreadcrumbLink
              onClick={(e) => e.preventDefault()}
              className={`text-[14px] font-medium text-black`}>
              Kategori
            </BreadcrumbLink>

          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex justify-between'>
        <h2 className='text-[36px] font-semibold '>Kategori</h2>
        <AddKategori buttonProps={{ className: 'gap-2 h-[36px] text-[14px] font-medium' }}  title="Tambah kategori" showIcon={true}  fetchData={fetchData}/>
        </div>
        
      </div>

      <DataTableDemo data={data} setData={setData} originalData={originalData} setOriginalData={setOriginalData} fetchData={fetchData}/>
    </div>
  )
}

export default Kategori

