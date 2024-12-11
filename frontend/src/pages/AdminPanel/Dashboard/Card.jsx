import React from 'react';
import { PresentionChart, Bag2, Box1, I3DRotate, ArrowRight } from 'iconsax-react';
import { Link } from 'react-router-dom';

const Card = ({ handlemenu , dataSum}) => {
    

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap -m-4">
                
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Total Pendapatan</h1>
                                    <PresentionChart size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'> {dataSum.totalPendapatan > 0 ? `Rp ${dataSum.totalPendapatan.toLocaleString('id-ID')}` : '0'}</p>
                                    {dataSum.rataRataPendapatan !== 0 && (
                                        <p className={`text-[12px] font-medium text-emerald-500`}>
                                           Rp {dataSum?.rataRataPendapatan?.toLocaleString('id-ID') || '0'} Rata-Rata Perhari
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Total Transaksi</h1>
                                    <Bag2 size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                <p className='text-[24px] font-semibold'> {dataSum.totalTransaksi > 0 ? ` ${dataSum.totalTransaksi}` : '0'}</p>
                                    {dataSum.rataRataTransaksi !== 0 && (
                                        <p className={`text-[12px] font-medium text-emerald-500`}>
                                            {dataSum.rataRataTransaksi } Rata-Rata Perhari
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Jumlah Produk</h1>
                                    <Box1 size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                <p className='text-[24px] font-semibold'> {dataSum.jumlahProduk > 0 ? ` ${dataSum.jumlahProduk}` : '0'}</p>
                                    {dataSum.produkBaru !== 0 && (
                                        <p className={`text-[12px] font-medium text-emerald-500`}>
                                            {dataSum.produkBaru } produk baru
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Pengingat Stok</h1>
                                    <I3DRotate size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'>{dataSum.pengingatStok !== 0 ? `${dataSum.pengingatStok} Produk Habis` : '-'}</p>
                                    {dataSum.pengingatStok !== 0 && (
                                        <Link to="/admin-panel/stok" onClick={() => handlemenu('stok')} className='text-[12px] font-medium flex gap-[4px]'>
                                            Klik untuk mengatur stok <ArrowRight size="14" className='pt-[3px]' />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    
            </div>
        </div>
    );
};

export default Card;
