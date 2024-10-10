import React from 'react'
import {
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Routes, Route } from 'react-router-dom';
import SyaratKetentuan from './SyaratKetentuan';
import DataTable from './DataTable';

const Outlet = () => {
    
    return (
        <ScrollArea className='w-full h-[90vh]'>
            <div className="px-[24px]">
                <div className='grid gap-2 pt-[40px]  pb-[16px]'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbLink
                                onClick={(e) => e.preventDefault()}
                                className={`text-[14px] font-medium text-black`}>
                                Kelola outlet
                            </BreadcrumbLink>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className='flex justify-between'>
                        <h2 className='text-[36px] font-semibold '>Kelola outlet</h2>
                    </div>
                </div>
                <Routes>
                        <Route path="syarat-ketentuan" element={<SyaratKetentuan/>} />
                        <Route path="data" element={<DataTable/>} />
                </Routes>
            </div>
        </ScrollArea>
    )
}

export default Outlet
