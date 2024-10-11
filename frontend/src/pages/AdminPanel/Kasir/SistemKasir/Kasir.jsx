import React,{useState} from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Menu from './Menu'
import Order from './Order'

const Kasir = () => {
  const [DetailOrder, setDetailOrder] = useState([
    // { id: 'fagfsdua', name: 'baksoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', harga: 20000, foto: 'https://github.com/shadcn.png' }
  ]);
  return (
    <div className='w-full h-full flex bg-slate-100'>
      <ScrollArea className='w-[72.8%] h-[100%]'>
        <Menu setDetailOrder={setDetailOrder}/>
      </ScrollArea>
      <div className='w-[27.2%] h-[100%] bg-white border-l'>
        <Order DetailOrder={DetailOrder} setDetailOrder={setDetailOrder}/>
      </div>
    </div>
  )
}

export default Kasir
