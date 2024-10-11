import React, { useState, useEffect, useRef } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { FiEdit2 } from "react-icons/fi";
import { Textarea } from "@/components/ui/textarea"
import { Add, Minus } from 'iconsax-react';

const Order = ({ DetailOrder, setDetailOrder }) => {

    const [showTextarea, setShowTextarea] = useState(false);

    const handleTambahCatatan = () => {
        setShowTextarea(true);
    };

    const handleBatal = () => {
        setShowTextarea(false);
    };

    // const [count, setCount] = useState(1);
    const handleIncrement = (orderId) => {
        setDetailOrder((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, count: order.count + 1 } : order
            )
        );
    };

    const handleDecrement = (orderId) => {
        setDetailOrder((prevOrders) =>
            prevOrders.map((order) => {
                if (order.id === orderId) {
                    if (order.count === 1) {
                        // Jika jumlah item 1, maka hapus item dari daftar
                        return null;
                    } else {
                        return { ...order, count: order.count - 1 };
                    }
                }
                return order;
            }).filter(order => order !== null) // Hapus item yang null dari daftar
        );
    };

    const scrollAreaRef = useRef(null);
    const sectionRefs = useRef([]);


    // Mengatur scroll saat DetailOrder kosong
    useEffect(() => {
        if (DetailOrder.length === 0 && scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = 0;
            sectionRefs.current = [];
        }
    }, [DetailOrder]);
    useEffect(() => {
        if (sectionRefs.current.length > 0) {
            const lastSection = sectionRefs.current[sectionRefs.current.length - 1];
            if (lastSection) {
                lastSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [DetailOrder]);



    const Tax = [
        { id: 'hcbsas', nama: 'Tax 10%', pajak: '10%' }
    ];
    const Discont = [
        // { id: 'hsjsj', nama: 'Promo Sale', diskon: '50%' }
    ];

    // menghitung sub total
    const totalHarga = DetailOrder.reduce((acc, order) => acc + order.harga * order.count, 0);

    // Menghitung pajak
    let pajak = 0; 
    if (Tax.length > 0) { 
        const taxPercentage = parseFloat(Tax[0].pajak) / 100;
        pajak = totalHarga * taxPercentage;
    }

    // Menghitung diskon
    let diskon = 0; 
    if (Discont.length > 0) { 
        const discountPercentage = parseFloat(Discont[0].diskon) / 100;
        diskon = totalHarga * discountPercentage;
    }

    // Menghitung total akhir
    const totalAkhir = totalHarga + pajak - diskon;


    return (
        <div className='w-full h-full' >
            <ScrollArea ref={scrollAreaRef} className=' h-[72%] '>
                <div className='px-[16px] pb-[24px] mt-[32px] grid gap-[16px] border-b border-slate-200'>
                    <h1 className='text-[16px] font-semibold'>Tipe Order</h1>
                    <Select>
                        <SelectTrigger className="w-full h-[36px] text-[14px]">
                            <SelectValue placeholder="Pilih tipe Order" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Langsung bayar" className='text-[14px]'>Langsung bayar</SelectItem>
                                <SelectItem value="banana" className='text-[14px]'>Open Bill</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='px-[16px] py-[24px] grid gap-[16px] border-b border-slate-200'>
                    <h1 className='text-[16px] font-semibold'>Customer Information</h1>
                    <Input className=" text-[14px] h-[36px]" placeholder="Nama customer" />
                    {!showTextarea ? (
                        <Button
                            variant="secondary"
                            className="text-[14px] h-[36px] gap-[8px]"
                            onClick={handleTambahCatatan}
                        >
                            <FiEdit2 size={16} />Tambah catatan
                        </Button>
                    ) : (
                        <div>
                            <Textarea placeholder="Catatan" className="text-[14px]" />
                            <div className='flex justify-end gap-[12px] mt-[16px]'>
                                <Button
                                    variant="outline"
                                    className="text-[14px] h-[36px]"
                                    onClick={handleBatal}
                                >
                                    Batal
                                </Button>
                                <Button className="text-[14px] h-[36px]">
                                    Simpan
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='px-[16px] pt-[24px]  grid gap-[16px]'>
                    <h1 className='text-[16px] font-semibold'>Detail Order</h1>
                    {DetailOrder.length > 0 ? (

                        DetailOrder.map((order, index) => (
                            <section key={index} ref={el => sectionRefs.current[index] = el} className='flex gap-[11px] pb-[16px] border-b border-slate-300 w-full'>
                                <img src={order.foto} alt={order.name} className='w-[74px] h-[76px] rounded-[6px]' />
                                <div className='grid gap-[12px] w-full'>
                                    <h1 className='text-[16px] font-semibold'>{order.name.length > 21 ? `${order.name.slice(0, 21)}...` : order.name}</h1>
                                    <div className='flex justify-between'>
                                        <p className='text-[14px] font-semibold text-slate-500 py-[11px]'>Rp {order.harga.toLocaleString('id-ID')}</p>
                                        <div className="flex items-center space-x-2 bg-zinc-100 rounded-lg border-2 border-zinc-100 h-[36px]">
                                            <button
                                                onClick={() => handleDecrement(order.id)}
                                                className="bg-white text-black rounded-md p-2"
                                            >
                                                <Minus size="16" />
                                            </button>
                                            <input
                                                type="number"
                                                value={order.count}
                                                readOnly
                                                className=" w-[40px] text-center font-medium text-[14px] pl-[8px] bg-transparent border-0 focus:outline-none"
                                            />
                                            <button
                                                onClick={() => handleIncrement(order.id)}
                                                className="bg-white text-black rounded-md p-2"
                                            >
                                                <Add size="16" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className=' text-center border-b border-slate-200 py-[40px] text-[14px] text-slate-500'><p>Tidak ada item yang dipilih</p></div>
                    )}
                </div>
            </ScrollArea>
            <div className='px-[16px] py-[24px] border-t h-[28%] grid gap-[16px]'>
                <div>
                    <div className='flex justify-between pb-[8px] border-dashed border-b-2'>
                        <p className='text-[14px] text-slate-500'>Sub Total</p>
                        <p className='text-[14px] font-semibold'>Rp {totalHarga.toLocaleString('id-ID')}</p>
                    </div>
                    <div className='flex justify-between pt-[8px] text-[16px] font-semibold'>
                        <p>Total</p>
                        <p>Rp {totalAkhir.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <Button className="w-full h-[36px] text-[14px]">Bayar</Button>
            </div>
        </div>
    )
}

export default Order
