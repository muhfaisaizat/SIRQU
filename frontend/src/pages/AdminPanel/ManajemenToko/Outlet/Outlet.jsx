import React from 'react'
import {
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import { ScrollArea } from "@/components/ui/scroll-area"

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
               
            </div>
        </ScrollArea>
    )
}

export default Outlet
