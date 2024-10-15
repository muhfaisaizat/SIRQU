import React, { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import DataTableAktif from './DataTableAktif';
import DataTableHistory from './DataTableHistory';


const DaftarOrder = () => {
  const [activeTab, setActiveTab] = useState('aktif');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="px-[24px]">
      <div className='grid gap-2 pt-[40px]  pb-[16px]'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink
              href="/admin-panel/sistem-kasir"
              className="text-[14px] font-medium cursor-pointer">
              Sistem Kasir
            </BreadcrumbLink>
            <BreadcrumbSeparator>
              <ArrowRight2 size={24} color='#64748B' />
            </BreadcrumbSeparator>
            <BreadcrumbLink
              onClick={(e) => e.preventDefault()}
              className="text-[14px] font-medium text-black">
              Daftar Order
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex justify-between'>
          <h2 className='text-[36px] font-semibold '>Daftar Order</h2>
          <div className='bg-muted h-[40px] w-[133px] p-[4px] rounded-[6px]'>
            <Button
              variant={activeTab === 'aktif' ? 'outline' : 'solid'} // Menyoroti tombol yang aktif
              className="h-[32px] w-[50%]"
              onClick={() => handleTabChange('aktif')} // Ubah ke tab Aktif
            >
              Aktif
            </Button>
            <Button
              variant={activeTab === 'history' ? 'outline' : 'solid'} // Menyoroti tombol yang aktif
              className="h-[32px] w-[50%]"
              onClick={() => handleTabChange('history')} // Ubah ke tab Histori
            >
              Histori
            </Button>
          </div>
        </div>
      </div>
      {activeTab === 'aktif' ? <DataTableAktif /> : <DataTableHistory />}
    </div>
  )
}

export default DaftarOrder
