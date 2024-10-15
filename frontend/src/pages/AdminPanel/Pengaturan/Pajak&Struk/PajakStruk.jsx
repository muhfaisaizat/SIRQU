import React from 'react'
import {
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight2, } from 'iconsax-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import PengaturanPajak from './Pajak';
import PengaturanStruk from './Struk';

const PajakStruk = () => {
    return (
        <ScrollArea className='w-full h-[90vh]'>
            <div className="px-[24px]">
                <div className='grid gap-2 pt-[40px]  pb-[36px]'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbLink
                                className="text-[14px] font-medium">
                                pengaturan
                            </BreadcrumbLink>
                            <BreadcrumbSeparator>
                                <ArrowRight2 size={24} color='#64748B' />
                            </BreadcrumbSeparator>
                            <BreadcrumbLink
                                onClick={(e) => e.preventDefault()}
                                className="text-[14px] font-medium text-black">
                                Pajak & Struk
                            </BreadcrumbLink>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className='flex justify-between'>
                        <h2 className='text-[36px] font-semibold '>Pajak & Struk</h2>
                    </div>
                </div>
                <div className='w-full h-full flex my-[24px]'>
                    <div className='w-[50%] border-r-2'><PengaturanPajak/></div>
                    <div className='w-[50%]'><PengaturanStruk/></div>
                </div>
            </div>
        </ScrollArea>
    )
}

export default PajakStruk
