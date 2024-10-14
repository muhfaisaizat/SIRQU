import React,{useState} from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Menu from './Menu'
import Order from './Order'

const Kasir = () => {
  const [DetailOrder, setDetailOrder] = useState([
    // { id: 'fagfsdua', name: 'baksoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', harga: 20000, foto: 'https://github.com/shadcn.png' }
  ]);
  const [Transaksi, setTransaksi] =useState([
    // {
    //   id: '00001',
    //   nama: 'aiz',
    //   tipeOrder:'Bayar Langsung',
    //   detailTransaksi: [
    //     {
    //     id: 'ajsdj',
    //     name: 'kopi',
    //     foto: 'dsa',
    //     harga: 10000,
    //     count: 2
    //   },
    //     {
    //     id: 'ajsdj',
    //     name: 'kopi',
    //     foto: 'asd',
    //     harga: 10000,
    //     count: 1
    //   },
    // ],
    // }
  ]);
  const [DaftarOrder, setDaftarOrder]=useState([])
  return (
    <div className='w-full h-full flex bg-slate-100'>
      <ScrollArea className='w-[72.8%] h-[100%]'>
        <Menu setDetailOrder={setDetailOrder} DaftarOrder={DaftarOrder}/>
      </ScrollArea>
      <div className='w-[27.2%] h-[100%] bg-white border-l'>
        <Order DetailOrder={DetailOrder} setDetailOrder={setDetailOrder} Transaksi={Transaksi} setTransaksi={setTransaksi} setDaftarOrder={setDaftarOrder} DaftarOrder={DaftarOrder}/>
      </div>
    </div>
  )
}

export default Kasir
