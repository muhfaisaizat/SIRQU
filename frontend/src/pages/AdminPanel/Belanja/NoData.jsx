import React from 'react'
import { Folder2 } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";


const NoData = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-[80px] border border-dashed rounded-[16px] border-slate-300 gap-[24px]">
    <Folder2 size="40" variant="Bulk" />
    <div className='grid gap-[12px]'>
    <h1 className="text-center text-[18px] font-semibold">Data tidak tersedia</h1>
    <p className="text-center text-[14px] font-normal text-slate-500">Belum ada data yang tersedia untuk halaman ini</p>
    </div>

   </div>

  )
}

export default NoData
