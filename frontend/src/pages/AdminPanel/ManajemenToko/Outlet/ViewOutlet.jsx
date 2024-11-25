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
import { API_URL } from "../../../../helpers/networt";

const ViewOutlet = ({ outlet }) => {
  if (!outlet) return null; 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='h-[36px] w-[158px] text-[14px] font-medium'>
          Lihat outlet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[505px] my-[20px] p-[25px]">
        <div className='flex justify-between'>
          <DialogHeader>
            <DialogTitle className='text-[18px] py-[16px]'>Detail Outlet</DialogTitle>
          </DialogHeader>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <X className='h-[16px] w-[16px]' />
            </Button>
          </DialogClose>
        </div>
        <div className="grid gap-[16px] text-[14px]">
          <div className='w-full flex flex-wrap gap-[12px]'>
            <div className="relative w-[120px] h-[120px]">
              <img
                src={outlet.foto ? `${API_URL}/images/${outlet.foto}` : "https://github.com/shadcn.png"}
                alt={outlet.nama}
                className="w-full h-full border object-cover rounded-[8px]"
              />
            </div>
          </div>
          <div className="flex align-middle h-auto">
            <p className="w-[150px] text-slate-500">No. Outlet</p>
            <p>00{outlet.id}</p>
          </div>
          <div className="flex align-middle h-auto">
            <p className="w-[150px] text-slate-500">Nama Outlet</p>
            <p className="h-auto w-[305px]">{outlet.nama}</p>
          </div>
          <div className="flex align-middle h-auto">
            <p className="w-[150px] text-slate-500">Alamat</p>
            <p className="h-auto w-[305px]">{outlet.alamat}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOutlet;
