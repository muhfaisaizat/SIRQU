import React, { useState } from 'react'
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


const Promosi = () => {
  
  const [isOpen, setIsOpen] = useState(false);

 
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
          <Button onClick={() => setIsOpen(true)} className='text-[14px] h-[36px]'><GoPlus size={16}/> Tambah promosi</Button>
        </div>
      </div>
      <DataTable/>
      <AddPromosi isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default Promosi
