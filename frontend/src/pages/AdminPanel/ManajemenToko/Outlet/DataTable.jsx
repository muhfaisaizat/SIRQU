import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import ViewOutlet from './ViewOutlet'
import EditOutlet from './EditOutlet'
import AddOutlet from './AddOutlet'

const DataTable = () => {
  const [data, setData] = useState([
    { id: "001", outlet: 'Toko Utama', nama: 'Sate taichan pak bambamng subiatno yak', alamat: 'Jl. Kendalsari No.06, Jatimulyo ngantruu kabupaten', foto: 'https://github.com/shadcn.png' },
  ]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);

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
            <img src={item.foto} alt={item.nama} className='w-[86px] h-[86px] rounded-[6px]' />
            <div className='grid gap-[12px]'>
              <div className='flex justify-between h-[22px] w-full'>
                <Badge variant="secondary" className="text-[12px] px-[11px] text-slate-500 font-medium">No. {item.id}</Badge>
                <Badge variant="secondary" className="text-[12px] px-[11px]">{item.outlet}</Badge>
              </div>
              <h1 className='text-[16px] font-semibold'>{item.nama.length > 20 ? `${item.nama.slice(0, 20)}...` : item.nama}</h1>
              <p className='text-[14px] font-medium'>{item.alamat.length > 30 ? `${item.alamat.slice(0, 30)}...` : item.alamat}</p>
            </div>
          </div>
          <div className='flex gap-[12px] w-full'>
            <ViewOutlet outlet={item} onView={handleViewOutlet} />
            <EditOutlet outlet={item} onSave={handleSaveOutlet} />
          </div>
        </div>
      ))}
      <div className='w-[360px] h-[175px] border-2 border-dashed border-slate-300 rounded-[8px] p-[16px] grid gap-[17px] place-items-center'>
        <div className='text-center w-[320px]'>
          <h1 className='text-[16px] font-semibold'>Tambah cabang</h1>
          <p className='text-[14px] font-normal text-slate-500'>Tambahkan data toko jika anda ingin menambah cabang</p>
        </div>
        <AddOutlet onAddOutlet={handleAddOutlet} />
      </div>
      {selectedOutlet && <ViewOutlet outlet={selectedOutlet} />}
    </div>
  )
}

export default DataTable;
