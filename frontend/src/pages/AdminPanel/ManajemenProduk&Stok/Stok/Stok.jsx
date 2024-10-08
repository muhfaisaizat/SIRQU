import React from 'react'
import {
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import DataTable from './DataTable';
import { ScrollArea } from "@/components/ui/scroll-area"

const Stok = () => {
    return (
        <ScrollArea className='w-full h-[90vh]'>
            <div className="px-[24px]">
                <div className='grid gap-2 pt-[40px]  pb-[16px]'>
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
                                Stok
                            </BreadcrumbLink>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className='flex justify-between'>
                        <h2 className='text-[36px] font-semibold '>Stok</h2>
                    </div>
                    <p className='text-[14px] text-slate-500 font-medium'>Pastikan menentukan outlet yang sesuai sebelum mengatur stok !</p>
                </div>
                <DataTable />
            </div>
        </ScrollArea>
    )
}

export default Stok
