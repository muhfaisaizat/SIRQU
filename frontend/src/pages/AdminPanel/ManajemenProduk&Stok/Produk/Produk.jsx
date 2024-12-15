import React,{useState, useEffect} from 'react'
import DataTableDemo from './DataTable';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import AddProduk from './AddProduk';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import { ScrollArea } from '@/components/ui/scroll-area';


const Produk = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState(data); // Tambahkan state untuk data asli

 // Fungsi untuk memformat data API
 const formatData = (apiData) => {
     return {
      id: apiData.product_id,
      name: apiData.product_name,
      kategori: apiData.category_names,
      harga: apiData.price,
      outlet: apiData.outlet_names,
      date: new Date(apiData.product_created_at).toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }),
      deskripsi: apiData.description,
      foto: [apiData.detailImages],
      detailOutlet: [apiData.detailOutlets],
      detailKategori: [apiData.detailCategories],
      stock: apiData.stock,
      unlimited_stock: apiData.unlimited_stock
     };
 };

 const fetchData = async () => {
     const token = localStorage.getItem("token");
     try {
         const response = await axios.get(`${API_URL}/api/products`, {
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
    <ScrollArea className='h-[100%] pb-[10px]'>
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
              Produk
            </BreadcrumbLink>

          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex justify-between'>
        <h2 className='text-[36px] font-semibold '>Produk</h2>
        <AddProduk fetchDataProduk={fetchData} buttonProps={{ className: 'gap-2 h-[36px] text-[14px] font-medium' }}  title="Tambah Produk" showIcon={true} />
        </div>
      </div>

      <DataTableDemo data={data} setData={setData} originalData={originalData} setOriginalData={setOriginalData} fetchDataProduk={fetchData}/>
    </div>
    </ScrollArea>
  )
}

export default Produk

