import React from 'react'
import DataTableDemo from './DataTable';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import AddKategori from './AddKategori';



const Kategori = () => {
  const [position, setPosition] = React.useState("bottom")
  return (
    <div>
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
        <AddKategori buttonProps={{ className: 'gap-2 h-[36px] text-[14px] font-medium' }}  title="Tambah kategori" showIcon={true} />
        </div>
        
      </div>

      <DataTableDemo />
    </div>
  )
}

export default Kategori

