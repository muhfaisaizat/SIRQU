import React from 'react'
import DataTableDemo from './data-table';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import { GoPlus } from "react-icons/go";
import { Button } from "@/components/ui/button"

const DaftarPengguna = () => {
  const [position, setPosition] = React.useState("bottom")
  return (
    <div>
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
        <Button className='gap-2 h-[36px]  text-[14px] font-medium'>
                        <GoPlus size={16} />
                        Tambah pengguna
                    </Button>
        </div>
        
      </div>

      <DataTableDemo />
    </div>
  )
}

export default DaftarPengguna

