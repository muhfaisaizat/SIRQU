import React from 'react'
import DataTableDemo from './DataTable';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import AddProduk from './AddProduk';



const Produk = () => {
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
              Produk
            </BreadcrumbLink>

          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex justify-between'>
        <h2 className='text-[36px] font-semibold '>Produk</h2>
        <AddProduk buttonProps={{ className: 'gap-2 h-[36px] text-[14px] font-medium' }}  title="Tambah Produk" showIcon={true} />
        </div>
        
      </div>

      <DataTableDemo />
    </div>
  )
}

export default Produk

