import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Celo } from 'iconsax-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { TickCircle } from 'iconsax-react';

const PricingPlan = () => {
    const packages = [
        {
            name: 'Stater',
            price: '99.000',
            description: 'Cocok untuk bisnis kecil atau individu',
            features: [
                '1 pengguna',
                'Pencatatan transaksi harian',
                'Laporan penjualan mingguan (sederhana)',
                'Dukungan email',
                'Pengguna akun tidak terbatas'
            ]
        },
        {
            name: 'Standard',
            price: '349.000',
            description: 'Cocok untuk bisnis kecil atau individu',
            features: [
                '1 pengguna',
                'Pencatatan transaksi harian',
                'Laporan penjualan mingguan (sederhana)',
                'Dukungan prioritas via chat',
                'Pengguna akun tidak terbatas',
                'Laporan penjualan harian & bulanan'
            ]
        },
        {
            name: 'Advanced',
            price: '499.000',
            discount: 'Hemat 20%',
            description: 'Cocok untuk bisnis kecil atau individu',
            features: [
                '1 pengguna',
                'Pencatatan transaksi harian',
                'Laporan penjualan mingguan (sederhana)',
                'Dukungan prioritas via chat',
                'Pengguna akun tidak terbatas',
                'Laporan penjualan harian & bulanan'
            ]
        },
        {
            name: 'Advanced',
            price: '499.000',
            discount: 'Hemat 20%',
            description: 'Cocok untuk bisnis kecil atau individu',
            features: [
                '1 pengguna',
                'Pencatatan transaksi harian',
                'Laporan penjualan mingguan (sederhana)',
                'Dukungan prioritas via chat',
                'Pengguna akun tidak terbatas',
                'Laporan penjualan harian & bulanan'
            ]
        },
        {
            name: 'Advanced',
            price: '499.000',
            discount: 'Hemat 20%',
            description: 'Cocok untuk bisnis kecil atau individu',
            features: [
                '1 pengguna',
                'Pencatatan transaksi harian',
                'Laporan penjualan mingguan (sederhana)',
                'Dukungan prioritas via chat',
                'Pengguna akun tidak terbatas',
                'Laporan penjualan harian & bulanan'
            ]
        },
        {
            name: 'Advanced',
            price: '499.000',
            discount: 'Hemat 20%',
            description: 'Cocok untuk bisnis kecil atau individu',
            features: [
                '1 pengguna',
                'Pencatatan transaksi harian',
                'Laporan penjualan mingguan (sederhana)',
                'Dukungan prioritas via chat',
                'Pengguna akun tidak terbatas',
                'Laporan penjualan harian & bulanan'
            ]
        },

    ];

    return (
        <ScrollArea className='h-screen'>
            <Tabs defaultValue="perbulan" className='flex flex-col  gap-[64px] py-[64px] w-full bg-[#F8FAFC]'>
                <div className='gap-[25px] flex flex-col items-center justify-center'>
                    <div className='flex gap-2 items-center'>
                        <Celo size="30" variant="Bulk" className="mt-[10px] mb-[10px]" />
                        <h3 className='text-[24px] font-bold'>Sirqu</h3>
                    </div>
                    <h1 className='text-[36px] font-semibold'>Upgrade Bisnis Anda dengan Sirqu</h1>
                    <p className=' text-[20px] font-medium text-[#717179]'>Pilih paket terbaik untuk mengelola transaksi dan meningkatkan penjualan Anda.</p>
                    <TabsList className="h-[32px] text-[14px] font-medium bg-[#F4F4F5]">
                        <TabsTrigger value="perbulan" className=' w-[179px] px-[12px] py-[6px] rounded-[4px]'>Perbulan</TabsTrigger>
                        <TabsTrigger value="pertahun" className=' w-[179px] px-[12px] py-[6px] rounded-[4px]'>Pertahun</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="perbulan">
                    <ScrollArea>
                        <div className="w-full h-[619px] px-[72px] justify-start items-center gap-6 inline-flex py-[15px] mb-[10px]">
                            {packages.map((pkg, index) => (
                                <div key={index} className="w-[306px] h-[619px] bg-white rounded-lg border border-slate-300 flex-col justify-start items-start inline-flex">
                                    <div className="self-stretch p-4 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                                        <div className="text-[#717179] text-[20px] font-medium ">{pkg.name}</div>
                                        {pkg.discount && (
                                            <div className="px-[11px] py-[3px] bg-zinc-900 rounded justify-center items-center flex">
                                                <div className="text-white text-[12px] font-semibold  leading-none">{pkg.discount}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="self-stretch h-[166px] p-4 flex-col justify-start items-start gap-4 flex">
                                        <div className="self-stretch justify-start items-center gap-1 inline-flex">
                                            <div className="text-slate-900 text-[32px] font-semibold ">Rp</div>
                                            <div className="text-slate-900 text-[32px] font-semibold ">{pkg.price}</div>
                                            <div className="justify-start items-end gap-2.5 flex">
                                                <div className="text-[#717179] text-xl font-medium  leading-[14px]">/bulan</div>
                                            </div>
                                        </div>
                                        <div className="self-stretch text-[#717179] text-[14px] font-medium  leading-tight">{pkg.description}</div>
                                        <Button variant='outline' className="self-stretch h-10 px-[17px] pt-[9.50px] pb-[10.50px] rounded-md border border-zinc-200 justify-center items-center inline-flex">
                                            <div className="text-center text-[#08080a] text-[14px] font-medium  leading-tight">Pilih paket</div>
                                        </Button>
                                    </div>
                                    <div className="self-stretch h-[204px] p-4 border-t border-slate-300 flex-col justify-start items-start gap-4 flex">
                                        {pkg.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="self-stretch justify-start items-center gap-2 inline-flex">
                                                <div className="w-4 h-4 justify-center items-center flex">
                                                    <div className="w-4 h-4 justify-center items-center inline-flex">
                                                        <TickCircle size={16} variant='Bold' color='#717179' />
                                                    </div>
                                                </div>
                                                <div className="text-slate-900 text-[14px] font-medium ">{feature}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className='p-0 h-0'/>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="pertahun">
                    <ScrollArea>
                        <div className="w-full h-[619px] px-[72px] justify-start items-center gap-6 inline-flex py-[15px] mb-[10px]">
                            {packages.map((pkg, index) => (
                                <div key={index} className="w-[306px] h-[619px] bg-white rounded-lg border border-slate-300 flex-col justify-start items-start inline-flex">
                                    <div className="self-stretch p-4 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                                        <div className="text-[#717179] text-[20px] font-medium ">{pkg.name}</div>
                                        {pkg.discount && (
                                            <div className="px-[11px] py-[3px] bg-zinc-900 rounded justify-center items-center flex">
                                                <div className="text-white text-[12px] font-semibold  leading-none">{pkg.discount}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="self-stretch h-[166px] p-4 flex-col justify-start items-start gap-4 flex">
                                        <div className="self-stretch justify-start items-center gap-1 inline-flex">
                                            <div className="text-slate-900 text-[32px] font-semibold ">Rp</div>
                                            <div className="text-slate-900 text-[32px] font-semibold ">{pkg.price}</div>
                                            <div className="justify-start items-end gap-2.5 flex">
                                                <div className="text-[#717179] text-xl font-medium  leading-[14px]">/tahun</div>
                                            </div>
                                        </div>
                                        <div className="self-stretch text-[#717179] text-[14px] font-medium  leading-tight">{pkg.description}</div>
                                        <Button variant='outline' className="self-stretch h-10 px-[17px] pt-[9.50px] pb-[10.50px] rounded-md border border-zinc-200 justify-center items-center inline-flex">
                                            <div className="text-center text-[#08080a] text-[14px] font-medium  leading-tight">Pilih paket</div>
                                        </Button>
                                    </div>
                                    <div className="self-stretch h-[204px] p-4 border-t border-slate-300 flex-col justify-start items-start gap-4 flex">
                                        {pkg.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="self-stretch justify-start items-center gap-2 inline-flex">
                                                <div className="w-4 h-4 justify-center items-center flex">
                                                    <div className="w-4 h-4 justify-center items-center inline-flex">
                                                        <TickCircle size={16} variant='Bold' color='#717179' />
                                                    </div>
                                                </div>
                                                <div className="text-slate-900 text-[14px] font-medium ">{feature}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className='p-0 h-0'/>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </ScrollArea>
    )
}

export default PricingPlan
