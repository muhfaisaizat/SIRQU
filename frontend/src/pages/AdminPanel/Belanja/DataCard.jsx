import React from 'react'
import { PresentionChart, Bag2, Box1, I3DRotate, ArrowRight } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { IoIosTrendingUp, IoIosTrendingDown  } from "react-icons/io";

const DataCard = ({dataSum}) => {
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
        //   style: 'currency',
          currency: 'IDR',
        }).format(angka);
      };
      
      const formatStringWithSign = (str) => {
        // Memeriksa apakah string diawali dengan tanda > atau <
        const sign = str.charAt(0); // > atau <
        const numberStr = str.slice(1); // Mengambil angka setelah tanda
        
        const number = parseInt(numberStr, 10); // Mengubah string menjadi angka
        const formattedNumber = formatRupiah(number); // Format angka menjadi format rupiah
        
        // Gabungkan kembali tanda dengan angka yang sudah diformat
        return `${sign} Rp ${formattedNumber}`;
      };

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
                                    {dataSum.Perbandingan_Belanja_Dari_Tahun_Lalu !== null && (
                                        <p  className={`text-[12px] font-medium flex gap-[4px] items-center ${
                                            dataSum?.Perbandingan_Belanja_Dari_Tahun_Lalu?.startsWith('<')
                                              ? 'text-emerald-500' // Hijau jika diawali '+'
                                              : dataSum?.Perbandingan_Belanja_Dari_Tahun_Lalu?.startsWith('>')
                                              ? 'text-rose-500' // Merah jika diawali '-'
                                              : 'text-gray-500' // Abu-abu jika tidak ada tanda
                                          }`}>
                                          {
                                            dataSum?.Perbandingan_Belanja_Dari_Tahun_Lalu?.startsWith('<')
                                                ? <IoIosTrendingDown size={17} />
                                                : dataSum?.Perbandingan_Belanja_Dari_Tahun_Lalu?.startsWith('>')
                                                ? <IoIosTrendingUp size={17} />
                                                : '' // Default jika tidak ada tanda
                                            }
                                            {formatStringWithSign(dataSum.Perbandingan_Belanja_Dari_Tahun_Lalu)} dari tahun lalu
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
                                    {dataSum.Perbandingan_Belanja_Dari_Bulan_Lalu !== null && (
                                        <p  className={`text-[12px] font-medium flex gap-[4px] items-center ${
                                            dataSum?.Perbandingan_Belanja_Dari_Bulan_Lalu?.startsWith('<')
                                              ? 'text-emerald-500' // Hijau jika diawali '+'
                                              : dataSum?.Perbandingan_Belanja_Dari_Bulan_Lalu?.startsWith('>')
                                              ? 'text-rose-500' // Merah jika diawali '-'
                                              : 'text-gray-500' // Abu-abu jika tidak ada tanda
                                          }`}>
                                             {
                                            dataSum?.Perbandingan_Belanja_Dari_Bulan_Lalu?.startsWith('<')
                                                ? <IoIosTrendingDown size={17} />
                                                : dataSum?.Perbandingan_Belanja_Dari_Bulan_Lalu?.startsWith('>')
                                                ? <IoIosTrendingUp size={17} />
                                                : '' // Default jika tidak ada tanda
                                            }
                                            {formatStringWithSign(dataSum.Perbandingan_Belanja_Dari_Bulan_Lalu)} dari bulan lalu
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
                                    {dataSum.Perbandingan_Pengeluaran_Rata2_Dari_Bulan_Lalu !== null && (
                                        <p  className={`text-[12px] font-medium flex gap-[4px] items-center ${
                                            dataSum?.Perbandingan_Pengeluaran_Rata2_Dari_Bulan_Lalu?.startsWith('<')
                                              ? 'text-emerald-500' // Hijau jika diawali '+'
                                              : dataSum?.Perbandingan_Pengeluaran_Rata2_Dari_Bulan_Lalu?.startsWith('>')
                                              ? 'text-rose-500' // Merah jika diawali '-'
                                              : 'text-gray-500' // Abu-abu jika tidak ada tanda
                                          }`}>
                                             {
                                            dataSum?.Perbandingan_Pengeluaran_Rata2_Dari_Bulan_Lalu?.startsWith('<')
                                                ? <IoIosTrendingDown size={17} />
                                                : dataSum?.Perbandingan_Pengeluaran_Rata2_Dari_Bulan_Lalu?.startsWith('>')
                                                ? <IoIosTrendingUp size={17} />
                                                : '' // Default jika tidak ada tanda
                                            }
                                            {formatStringWithSign(dataSum.Perbandingan_Pengeluaran_Rata2_Dari_Bulan_Lalu)} dari bulan lalu
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
