import React, { useEffect } from 'react';
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

const ViewTransaksi = ({ isOpen, setIsOpen, dataEdit }) => {


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
              <p>00{dataEdit?.penjualan_id || "Tidak tersedia"}</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Pelanggan</p>
              <p>{dataEdit?.transaksi_name || "Tidak tersedia"}</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Kasir</p>
              <p>{dataEdit?.kasir_name || "Tidak tersedia"}</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Metode Bayar</p>
              <p>{dataEdit?.tipe_bayar || "Tidak tersedia"}</p>
            </div>
            <div className='flex text-[14px] h-[36px] items-center'>
              <p className='w-[150px] text-slate-500'>Waktu & Tanggal</p>
              <p>{dataEdit?.tanggal || "Tidak tersedia"}</p>
            </div>
          </div>
          <div className='border' />
          <div className='grid gap-[12px] py-[16px]'>
            <h1 className='text-[16px] font-semibold'>Catatan Pelanggan</h1>
            <p>{dataEdit?.catatan || "-"}</p>
          </div>
          <div className='border' />
          <div className='grid gap-[12px] py-[16px]'>
            <h1 className='text-[16px] font-semibold'>Detail pesanan</h1>
            <div className='text-[14px] grid gap-[8px]'>
              {dataEdit && dataEdit.detailtransaksi && dataEdit.detailtransaksi.length > 0 ? (
                dataEdit.detailtransaksi.map((item, index) => (
                  <div key={item.id} className="flex text-[14px] font-medium h-[36px] items-center justify-between">
                    <div className="flex gap-[12px]">
                      <p>{index + 1}</p>
                      <p>{item.product_name}</p>
                    </div>
                    <p>Rp {item.product_price.toLocaleString('id-ID')}</p>
                  </div>
                ))
              ) : (
                ''
              )}

            </div>
            <div className='border' />
            <div className='text-[14px] grid gap-[8px]'>
              <div className='flex text-[14px]  h-[36px] items-center justify-between'>
                <p className='w-[150px] text-slate-500'>Subtotal</p>
                <p className='font-medium'>{dataEdit?.sub_total ? `Rp ${parseInt(dataEdit.sub_total).toLocaleString('id-ID')}` : ""}</p>
              </div>
              {dataEdit?.detailpajaks && dataEdit.detailpajaks.length > 0 ? (
                dataEdit.detailpajaks.map((item, index) => (
                  <div key={item.id} className="flex text-[14px] h-[36px] items-center justify-between">
                    <p className="w-[150px] text-slate-500">{item.pajak_name}</p>
                    <p className="font-medium">Rp {item.harga.toLocaleString('id-ID')}</p>
                  </div>
                ))
              ) : (
                ''
              )}

              {dataEdit?.detaildiskons && dataEdit.detaildiskons.length > 0 ? (
                dataEdit.detaildiskons.map((item, index) => (
                  <div key={item.id} className="flex text-[14px] h-[36px] items-center justify-between">
                    <p className="text-emerald-500">{item.diskon_name} </p>
                    <p className="font-medium">-Rp {item.harga.toLocaleString('id-ID')}</p>
                  </div>
                ))
              ) : (
                ''
              )}

              <div className='border-2 border-dashed' />
              <div className='flex text-[16px]  h-[36px] items-center justify-between font-semibold'>
                <p>Total</p>
                <p>{dataEdit?.total ? `Rp ${parseInt(dataEdit.total).toLocaleString('id-ID')}` : ""}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransaksi;
