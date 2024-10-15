import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, GalleryAdd, Trash } from 'iconsax-react';

const Priview = ({ urlImage, namaToko, alamtToko,kontakToko,sosialmedia1Toko, sosialmedia2Toko,catatanToko, isLogoChecked, isNamaChecked, isAlamatChecked, isKontakChecked, isMediaChecked, isCatatanChecked }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="text-[14px] h-[36px] gap-[8px]" > <Play size={16} />Priview</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[636px] my-[20px] p-[48px]">
                <div className='flex flex-col items-center justify-center p-[32px] gap-[24px]'>
                    <div className='p-[16px] grid justify-items-center items-center'>
                        {isLogoChecked && <img src={urlImage} alt="" className="w-[84px] h-[84px]" />}
                        {isNamaChecked && <h1 className='text-[20px] font-semibold py-[8px]'>{namaToko}</h1>}
                        {isAlamatChecked && <p className='text-[14px] font-medium'>{alamtToko}</p>}
                        {isKontakChecked && <p className='text-[14px] font-medium'>No. Telp {kontakToko}</p>}
                    </div>
                    <div >
                        <div className='py-[16px] border-t w-[390px]'>
                            <p className='text-[14px] font-medium'>No. Order : #0899</p>
                            <p className='text-[14px] font-medium'>Waktu : 12 Feb 2024, 08.30</p>
                            <p className='text-[14px] font-medium'>Kasir : Nama Kasir</p>
                            <p className='text-[14px] font-medium'>Pembayaran : -</p>
                        </div>
                        <div className='py-[16px] border-t w-[390px] text-[14px] font-medium grid gap-[8px]'>

                            <div className='flex justify-between' >
                                <div className='flex gap-[8px]'>
                                    <p>1</p>
                                    <p className='font-bold'>Nama Barang</p>
                                </div>
                                <p>Rp  10.000</p>
                            </div>
                            <div className='flex justify-between' >
                                <div className='flex gap-[8px]'>
                                    <p>2</p>
                                    <p className='font-bold'>Nama Barang</p>
                                </div>
                                <p>Rp  10.000</p>
                            </div>
                            <div className='flex justify-between' >
                                <div className='flex gap-[8px]'>
                                    <p>4</p>
                                    <p className='font-bold'>Nama Barang</p>
                                </div>
                                <p>Rp  10.000</p>
                            </div>

                        </div>
                        <div className='py-[16px] border-t-2 border-dashed w-[390px] text-[14px] font-medium grid gap-[8px]'>
                            <div className='flex justify-between'>
                                <p>Sub Total</p>
                                <p>Rp 30.000</p>
                            </div>

                            <div className='flex justify-between'>
                                <p>Pajak 10%</p>
                                <p>Rp 3.000</p>
                            </div>


                            <div className='flex justify-between'>
                                <p>Diskon 8.8</p>
                                <p>-Rp 13.000</p>
                            </div>
                            <div className='flex justify-between text-[20px] font-bold'>
                                <p>Total</p>
                                <p>Rp 20.000</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Bayar</p>
                                <p>Rp. 24.000</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Kembalian</p>
                                <p>Rp 2.000</p>
                            </div>
                        </div>
                    </div>
                    <div className='border  w-[390px]' />
                    {isMediaChecked &&
                        <div className=' grid justify-items-center items-center w-[390px]'>
                            <p className='text-[14px] font-medium'>{sosialmedia1Toko}</p>
                            <p className='text-[14px] font-medium'>{sosialmedia2Toko}</p>
                        </div>
                    }
                    <div className=' grid justify-items-center items-center w-[390px]'>
                        {isCatatanChecked &&
                                <p className='text-[14px] text-center font-medium'>{catatanToko}</p>
                        }
                        <p className='text-[10px] font-medium text-slate-500 mt-[24px]'>Powered by Sirqu POS</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Priview
