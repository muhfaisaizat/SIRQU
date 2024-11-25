import React, { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import ViewOutlet from './ViewOutlet'
import EditOutlet from './EditOutlet'
import AddOutlet from './AddOutlet'
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const DataTable = () => {
  const [data, setData] = useState([
    // { id: "1", outlet: 'Toko Utama', nama: 'Sate taichan pak bambamng subiatno yak', alamat: 'Jl. Kendalsari No.06, Jatimulyo ngantruu kabupaten', foto: 'https://github.com/shadcn.png' },
  ]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  const formatData = (apiData) => {
    return {
        id: apiData.id_outlet,
        outlet: apiData.posisi,
        nama: apiData.nama_outlet, 
        alamat: apiData.alamat,    
        foto: apiData.image,     
    };
};

const fetchData = async () => {
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
          const formattedData = response.data.data.map(formatData);
         
          setData(formattedData);
          
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

  // Fungsi untuk menyimpan perubahan data outlet
  const handleSaveOutlet = (updatedOutlet) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedOutlet.id ? updatedOutlet : item
      )
    );
    setSelectedOutlet(null); 
  };

  const handleViewOutlet = (outlet) => {
    setSelectedOutlet(outlet);
  };

  const handleAddOutlet = (newOutlet) => {
    const newId = (data.length + 1).toString().padStart(3, '0');
    const newOutletData = {
      id: newId,
      outlet: `Cabang ${data.length}`,
      ...newOutlet
    };
    setData((prevData) => [...prevData, newOutletData]);
  };

  return (
    <div className='flex flex-wrap gap-[24px]'>
      {data.map((item) => (
        <div key={item.id} className='w-[360px] h-[175px] border border-slate-300 rounded-[8px] p-[16px] grid gap-[17px]'>
          <div className='flex gap-[17px]'>
            <img src={item.foto ? `${API_URL}/images/${item.foto}` : "https://github.com/shadcn.png"} alt={item.nama} className='w-[86px] h-[86px] rounded-[6px]' />
            <div className='grid gap-[12px]'>
              <div className='flex justify-between h-[22px] w-full'>
                <Badge variant="secondary" className="text-[12px] px-[11px] text-slate-500 font-medium">No. 00{item.id}</Badge>
                <Badge variant="secondary" className="text-[12px] px-[11px]">{item.outlet}</Badge>
              </div>
              <h1 className='text-[16px] font-semibold'>{item.nama.length > 20 ? `${item.nama.slice(0, 20)}...` : item.nama}</h1>
              <p className='text-[14px] font-medium'>{item.alamat.length > 30 ? `${item.alamat.slice(0, 30)}...` : item.alamat}</p>
            </div>
          </div>
          <div className='flex gap-[12px] w-full'>
            <ViewOutlet outlet={item} onView={handleViewOutlet} />
            <EditOutlet outlet={item} onSave={handleSaveOutlet} fetchData={fetchData} />
          </div>
        </div>
      ))}
      <div className='w-[360px] h-[175px] border-2 border-dashed border-slate-300 rounded-[8px] p-[16px] grid gap-[17px] place-items-center'>
        <div className='text-center w-[320px]'>
          <h1 className='text-[16px] font-semibold'>Tambah cabang</h1>
          <p className='text-[14px] font-normal text-slate-500'>Tambahkan data toko jika anda ingin menambah cabang</p>
        </div>
        <AddOutlet onAddOutlet={handleAddOutlet} fetchData={fetchData}/>
      </div>
      {selectedOutlet && <ViewOutlet outlet={selectedOutlet} />}
    </div>
  )
}

export default DataTable;
