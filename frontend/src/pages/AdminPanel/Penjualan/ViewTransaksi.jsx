import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const ViewTransaksi = ({ isOpen, setIsOpen }) => {


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[509px] my-[20px] p-[25px]">
        <div className='flex justify-between'>
          <DialogHeader>
            <DialogTitle className='text-[18px] py-[16px]'>Detail Transaksi</DialogTitle>
          </DialogHeader>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <X className='h-[16px] w-[16px]' />
            </Button>
          </DialogClose>
        </div>
        <div className="grid gap-[16px] text-[14px]">
          <div className='border' />
          <div className='grid gap-[12px] py-[16px]'>
            <h1 className='text-[16px] font-semibold'>Detail pemesanan</h1>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Id Order</p>
              <p>12020312</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Pelanggan</p>
              <p>Aliena Coy</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Kasir</p>
              <p>Wahab</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Metode Bayar</p>
              <p>Cash</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Waktu & Tanggal</p>
              <p>13 Oktober 2024, 13.00</p>
            </div>
          </div>
          <div className='border' />
          <div className='grid gap-[12px] py-[16px]'>
            <h1 className='text-[16px] font-semibold'>Catatan Pelanggan</h1>
            <p>Sambalnya dikit, pakek saos yang banyak bakso nya ngga pakek bakso</p>
          </div>
          <div className='border' />
          <div className='grid gap-[12px] py-[16px]'>
            <h1 className='text-[16px] font-semibold'>Detail pesanan</h1>
            <div className='text-[14px] grid gap-[8px]'>
              <div className='flex text-[14px] font-medium h-[36px] items-center justify-between'>
                <div className='flex gap-[12px]'>
                  <p>1</p>
                  <p>Susu Kudanil</p>
                </div>
                <p>Rp 15.000</p>
              </div>
              <div className='flex text-[14px] font-medium h-[36px] items-center justify-between'>
                <div className='flex gap-[12px]'>
                  <p>4</p>
                  <p>Sate Jerapah khas Afrika</p>
                </div>
                <p>Rp 15.000</p>
              </div>
            </div>
            <div className='border' />
            <div className='text-[14px] grid gap-[8px]'>
              <div className='flex text-[14px]  h-[36px] items-center justify-between'>
              <p className='w-[150px] text-slate-500'>Subtotal</p>
              <p className='font-medium'>Rp 20.000</p>
              </div>
              <div className='flex text-[14px]  h-[36px] items-center justify-between'>
              <p className='w-[150px] text-slate-500'>Tax 10%</p>
              <p className='font-medium'>Rp 2000</p>
              </div>
              <div className='flex text-[14px]  h-[36px] items-center justify-between'>
              <p className='w-[150px] text-emerald-500'>Diskon 8.8 (30%)</p>
              <p className='font-medium'>-Rp 2000</p>
              </div>
              <div className='border-2 border-dashed' />
              <div className='flex text-[16px]  h-[36px] items-center justify-between font-semibold'>
              <p>Total</p>
              <p>Rp 30.000</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransaksi;
