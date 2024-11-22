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

const View = ({ isOpen, setIsOpen, formData }) => {

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[509px] my-[20px] p-[25px]">
        <div className='flex justify-between'>
          <DialogHeader>
            <DialogTitle className='text-[18px] py-[16px]'>Detail Belanja</DialogTitle>
          </DialogHeader>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <X className='h-[16px] w-[16px]' />
            </Button>
          </DialogClose>
        </div>
        <div className="grid gap-[16px] text-[14px]">
         
          <div className='grid gap-[12px] py-[16px]'>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Nama kegiatan</p>
              <p>{formData.nama}</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Kategori</p>
              <p>{formData.kategori}</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[153px] text-slate-500'>Deskripsi</p>
              <p>{formData.deskripsi}</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Total belanja</p>
              <p>Rp {parseInt(formData.total).toLocaleString('id-ID')}</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Tanggal & waktu</p>
              <p>{formData.date}</p>
            </div>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default View;
