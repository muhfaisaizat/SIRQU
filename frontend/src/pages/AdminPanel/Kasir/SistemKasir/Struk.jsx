import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TickCircle, Printer } from 'iconsax-react';
import { Button } from '@/components/ui/button';

const Struk = ({ DaftarOrder, setIsOpen, setcontenstep, idDaftarOrder }) => {
    return (
        <DialogContent className="sm:max-w-[638px] my-[20px] grid gap-[16px]">
            <DialogHeader className='grid gap-[16px] justify-items-center items-center py-[16px]'>
                <TickCircle size="40" variant="Bold" />
                <DialogTitle className='text-[16px] font-semibold'>Order Sukses !</DialogTitle>
                <p className='text-[14px] text-slate-500'>Selesaikan order atau cetak struk</p>
                <Button
                    onClick={() => {
                        setIsOpen(false);
                        setcontenstep(0);
                    }}
                    className="w-[232px] h-[36px] text-[14px]"
                >Selesai</Button>
                <Button
                    onClick={() => {
                        setIsOpen(false);
                        setcontenstep(0);
                    }}
                    variant="outline"
                    className="w-[232px] h-[36px] text-[14px] flex gap-[12px]">
                    <Printer size={20} /> Cetak Struk
                </Button>
            </DialogHeader>
            <div className='flex flex-col items-center justify-center'>
                <div className='p-[16px] grid justify-items-center items-center'>
                    <img src="" alt="" className='w-[84px] h-[84px]' />
                    <h1 className='text-[20px] font-semibold py-[8px]'>Sirqu Jaya CoffeShop</h1>
                    <p className='text-[14px] font-medium'>Jl. Dr. H. Sokarno No. 19 Pakel Tulungagung</p>
                    <p className='text-[14px] font-medium'>No. Telp 081545983</p>
                    <p className='text-[14px] font-medium'>www.kopikita.com</p>
                </div>
                {
                    DaftarOrder.filter((daftarOrder) => daftarOrder.id === idDaftarOrder).map((filteredOrder) => (
                        <div key={filteredOrder.id}>
                            <div className='py-[16px] border-t w-[390px]'>
                                <p className='text-[14px] font-medium'>No. Order : #{filteredOrder.id}</p>
                                <p className='text-[14px] font-medium'>Waktu : {filteredOrder.waktu}</p>
                                <p className='text-[14px] font-medium'>Kasir : {filteredOrder.kasir}</p>
                                <p className='text-[14px] font-medium'>Pembayaran : {filteredOrder.pembayaran}</p>
                            </div>
                            <div className='py-[16px] border-t w-[390px] text-[14px] font-medium grid gap-[8px]'>
                                {filteredOrder.detailTransaksi.map((item, index) => (
                                    <div className='flex justify-between' key={index}>
                                        <div className='flex gap-[8px]'>
                                            <p>{item.count}</p>
                                            <p className='font-bold'>{item.name}</p>
                                        </div>
                                        <p>Rp  {item.harga.toLocaleString('id-ID')}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='py-[16px] border-t-2 border-dashed w-[390px] text-[14px] font-medium grid gap-[8px]'>
                                <div className='flex justify-between'>
                                    <p>Sub Total</p>
                                    <p>Rp {filteredOrder.subtotal.toLocaleString('id-ID')}</p>
                                </div>
                                {filteredOrder.tax && filteredOrder.tax.harga && (
                                    <div className='flex justify-between'>
                                        <p>{filteredOrder.tax.nama}</p> {/* Tampilkan nama pajak */}
                                        <p>Rp {filteredOrder.tax.harga.toLocaleString('id-ID')}</p> {/* Tampilkan harga pajak */}
                                    </div>
                                )}
                                {filteredOrder.diskon && filteredOrder.diskon.length > 0 && (
                                    <>
                                        {filteredOrder.diskon.map((item, index) => (
                                            <div key={index} className='flex justify-between'>
                                                <p>{item.nama}</p> {/* Nama diskon */}
                                                <p>-Rp {item.hargaDiskon.toLocaleString('id-ID')}</p> {/* Harga diskon */}
                                            </div>
                                        ))}
                                    </>
                                )}

                                <div className='flex justify-between text-[20px] font-bold'>
                                    <p>Total</p>
                                    <p>Rp {filteredOrder.total.toLocaleString('id-ID')}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Bayar</p>
                                    <p>Rp {filteredOrder.bayar.toLocaleString('id-ID')}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Kembalian</p>
                                    <p>Rp {filteredOrder.kembalian.toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className='p-[16px] grid justify-items-center items-center border-t w-[390px]'>
                    <p className='text-[14px] font-medium'>Password wifi : akucintakamu,</p>
                    <p className='text-[14px] font-medium'>Terimakasih telah berbelanja</p>
                    <p className='text-[10px] font-medium text-slate-500 mt-[24px]'>Powered by Sirqu POS</p>
                </div>
            </div>
        </DialogContent>
    );
};

export default Struk;
