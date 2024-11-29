import React from 'react';
import { PresentionChart, Bag2, Box1, I3DRotate, ArrowRight } from 'iconsax-react';
import { Link } from 'react-router-dom';

const Card = ({ handlemenu }) => {
    const dataSum = [
        { id: 656, nama: 'Outlet 1', pendapatan: 400000000, Pnaikturun: -20, order: 200, Onaikturun: +20, produk: 20, stokhabis: 10 }
        // { id: 656, nama: 'Outlet 1', pendapatan: 0, Pnaikturun: null, order: 0, Onaikturun: null, produk: 0, stokhabis: null }
    ];

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap -m-4">
                {dataSum.map((data) => (
                    <React.Fragment key={data.id}>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px]'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Total Pendapatan</h1>
                                    <PresentionChart size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'> {data.pendapatan > 0 ? `Rp ${data.pendapatan.toLocaleString('id-ID')}` : '0'}</p>
                                    {data.Pnaikturun !== null && (
                                        <p className={`text-[12px] font-medium ${data.Pnaikturun > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {data.Pnaikturun > 0 ? `+${data.Pnaikturun}%` : `${data.Pnaikturun}%`} dari kemarin
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px]'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Jumlah Order</h1>
                                    <Bag2 size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'>{data.order || 0}</p>
                                    {data.Onaikturun !== null && (
                                        <p className={`text-[12px] font-medium ${data.Onaikturun > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {data.Onaikturun > 0 ? `+${data.Onaikturun}%` : `${data.Onaikturun}%`} dari kemarin
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px]'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Jumlah Produk</h1>
                                    <Box1 size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'>{data.produk || 0}</p>
                                    <p className='text-[12px] font-medium text-emerald-500'>{data.produk > 0 ? "2 produk baru" : ""}</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <div className=' border-2 rounded-[8px] grid gap-[8px] p-[24px]'>
                                <div className='flex justify-between'>
                                    <h1 className='text-[14px] font-semibold'>Pengingat Stok</h1>
                                    <I3DRotate size="16" color="#717179" />
                                </div>
                                <div className='grid gap-[4px]'>
                                    <p className='text-[24px] font-semibold'>{data.stokhabis !== null ? `${data.stokhabis} Produk Habis` : '-'}</p>
                                    {data.stokhabis !== null && (
                                        <Link to="/admin-panel/stok" onClick={() => handlemenu('stok')} className='text-[12px] font-medium flex gap-[4px]'>
                                            Klik untuk mengatur stok <ArrowRight size="14" className='pt-[3px]' />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Card;
