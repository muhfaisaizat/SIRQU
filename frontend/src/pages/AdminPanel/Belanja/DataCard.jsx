import React from 'react'
import { PresentionChart, Bag2, Box1, I3DRotate, ArrowRight } from 'iconsax-react';
import { Link } from 'react-router-dom';

const DataCard = ({dataSum}) => {
   
    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap -m-4">

                        <div className="lg:w-1/3 md:w-1/2 p-4 w-full ">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Total Belanja Tahun Ini</h1>
                                    <PresentionChart size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'> {dataSum.Total_Belanja_Tahun_Ini > 0 ? `Rp ${dataSum.Total_Belanja_Tahun_Ini.toLocaleString('id-ID')}` : '0'}</p>
                                    {dataSum.Banding_Persentase_Total_Belanja_Tahun_Ini !== null && (
                                        <p  className={`text-[12px] font-medium ${
                                            dataSum?.Banding_Persentase_Total_Belanja_Tahun_Ini?.startsWith('+')
                                              ? 'text-emerald-500' // Hijau jika diawali '+'
                                              : dataSum?.Banding_Persentase_Total_Belanja_Tahun_Ini?.startsWith('-')
                                              ? 'text-rose-500' // Merah jika diawali '-'
                                              : 'text-gray-500' // Abu-abu jika tidak ada tanda
                                          }`}>
                                            {dataSum.Banding_Persentase_Total_Belanja_Tahun_Ini} dari kemarin
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Total Belanja Bulan Ini</h1>
                                    <PresentionChart size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'> {dataSum.Total_Belanja_Bulan_Ini > 0 ? `Rp ${dataSum.Total_Belanja_Bulan_Ini.toLocaleString('id-ID')}` : '0'}</p>
                                    {dataSum.Banding_Persentase_Total_Belanja_Bulan_Ini !== null && (
                                        <p  className={`text-[12px] font-medium ${
                                            dataSum?.Banding_Persentase_Total_Belanja_Bulan_Ini?.startsWith('+')
                                              ? 'text-emerald-500' // Hijau jika diawali '+'
                                              : dataSum?.Banding_Persentase_Total_Belanja_Bulan_Ini?.startsWith('-')
                                              ? 'text-rose-500' // Merah jika diawali '-'
                                              : 'text-gray-500' // Abu-abu jika tidak ada tanda
                                          }`}>
                                            {dataSum.Banding_Persentase_Total_Belanja_Bulan_Ini} dari kemarin
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Pengeluaran Rata-Rata  Bulan Ini</h1>
                                    <Bag2 size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'> {dataSum.Pengeluaran_Rata_Rata_Bulan_Ini > 0 ? `Rp ${dataSum.Pengeluaran_Rata_Rata_Bulan_Ini.toLocaleString('id-ID')}` : '0'}</p>
                                    {dataSum.Banding_Persentase_Pengeluaran_Rata_Rata_Bulan_Ini !== null && (
                                        <p  className={`text-[12px] font-medium ${
                                            dataSum?.Banding_Persentase_Pengeluaran_Rata_Rata_Bulan_Ini?.startsWith('+')
                                              ? 'text-emerald-500' // Hijau jika diawali '+'
                                              : dataSum?.Banding_Persentase_Pengeluaran_Rata_Rata_Bulan_Ini?.startsWith('-')
                                              ? 'text-rose-500' // Merah jika diawali '-'
                                              : 'text-gray-500' // Abu-abu jika tidak ada tanda
                                          }`}>
                                            {dataSum.Banding_Persentase_Pengeluaran_Rata_Rata_Bulan_Ini} dari kemarin
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    
            </div>
        </div>
    );
}

export default DataCard
