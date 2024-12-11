import React from 'react'
import { PresentionChart, Bag2, Box1, I3DRotate, ArrowRight } from 'iconsax-react';
import { Link } from 'react-router-dom';

const DataCard = ({dataSum}) => {
    

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap -m-4">
             
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Total Penjualan</h1>
                                    <PresentionChart size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'> {dataSum.Total_Penjualan > 0 ? `Rp ${Number(dataSum.Total_Penjualan).toLocaleString('id-ID')}` : '0'}</p>
                                    {dataSum.Rata_Rata_Total_Penjualan_Per_Hari !== null && (
                                        <p className={`text-[12px] font-medium ${dataSum.Rata_Rata_Total_Penjualan_Per_Hari > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            Rp {Number(dataSum.Rata_Rata_Total_Penjualan_Per_Hari).toLocaleString('id-ID')} Rata-Rata Perhari
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Produk Terjual</h1>
                                    <Bag2 size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'>{dataSum.Produk_Terjual || 0}</p>
                                    {dataSum.Rata_Rata_Produk_Terjual_Per_Hari !== null && (
                                        <p className={`text-[12px] font-medium ${dataSum.Rata_Rata_Produk_Terjual_Per_Hari > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {dataSum.Rata_Rata_Produk_Terjual_Per_Hari } Rata-Rata Perhari
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Pembayaran Paling Sering</h1>
                                    <Box1 size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'>{dataSum.Pembayaran_Paling_Sering || '-'}</p>
                                    {dataSum.Transaksi_Pembayaran_Paling_Sering !== null && (
                                    <p className='text-[12px] font-medium text-emerald-500'>{dataSum.Transaksi_Pembayaran_Paling_Sering} transaksi</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Produk Terlaris</h1>
                                    <Box1 size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'>{dataSum.Produk_Terlaris || '-'}</p>
                                    {dataSum.Transaksi_Produk_Terlaris !== null && (
                                    <p className='text-[12px] font-medium text-emerald-500'>{dataSum.Transaksi_Produk_Terlaris} transaksi</p>
                                    )}
                                </div>
                            </div>
                        </div>
                
            </div>
        </div>
    );
}

export default DataCard
