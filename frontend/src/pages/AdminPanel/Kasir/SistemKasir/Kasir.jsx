import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Menu from './Menu'
import Order from './Order'

const Kasir = () => {
  const [DetailOrder, setDetailOrder] = useState([]);
  const [Transaksi, setTransaksi] = useState([]);
  const [DaftarOrder, setDaftarOrder] = useState([])
  const [persen, setPersen] = useState({ top: '72%', bottom: '28%' });
  const [clicked, setClicked] = useState(false);
  const [tipeOrder, setTipeOrder] = useState('');
  const [viewOrder, setViewOrder] = useState({ idOrder: 0, ketBayar: '' });
  const [namaCustomer, setNamaCustomer] = useState('');
  const [taxtdata, setTaxdata] = useState(0);
  const [orderDiskon, setOrderDiskon]= useState(0);
  const [textButton, setTextButton]=useState('Bayar');

  // Fungsi untuk menangani perubahan persentase
  const handleSelectChange = (value, id, ketBayar, detailTransaksi, nama, Tax, diskon) => {

    if (value === 'Open Bill') {
      setPersen({ top: '65%', bottom: '35%' });
      setClicked(true);
      setTextButton('Selesaikan Order')
    } else if (value === 'Langsung bayar') {
      setPersen({ top: '72%', bottom: '28%' });
      setClicked(false);
      setTextButton('Bayar')
    }
  
    setTipeOrder(value);
    setViewOrder({
      idOrder: id,
      ketBayar: ketBayar
    });
  
    setNamaCustomer(nama || '');
  
    setDetailOrder([]);
  
    // Pastikan detailTransaksi adalah array sebelum memanggil map
    if (Array.isArray(detailTransaksi)) {
      const newTransaction = {
        detailTransaksi: detailTransaksi.map((item) => ({
          id: item.id,
          foto: item.foto,
          count: item.count,
          name: item.name,
          harga: item.harga,
        }))
      };
      setDetailOrder(newTransaction.detailTransaksi);
    }
  
    // Set nilai Tax jika ada, jika tidak, set ke 0
    setTaxdata(Tax || 0);
  
    // Proses diskon
    if (Array.isArray(diskon)) {
      const diskonList = diskon.map(item => item.hargaDiskon || 0);
      const totalDiskon = diskonList.reduce((sum, hargaDiskon) => sum + hargaDiskon, 0);
      setOrderDiskon(totalDiskon);
    } else {
      setOrderDiskon(0); // Set ke 0 jika diskon tidak valid
    }
  };
  




  return (
    <div className='w-full h-full flex bg-slate-100'>
      <ScrollArea className='w-[72.8%] h-[100%]'>
        <Menu setDetailOrder={setDetailOrder} DaftarOrder={DaftarOrder} handleSelectChange={handleSelectChange} setViewOrder={setViewOrder} />
      </ScrollArea>
      <div className='w-[27.2%] h-[100%] bg-white border-l'>
        <Order
          DetailOrder={DetailOrder}
          setDetailOrder={setDetailOrder}
          Transaksi={Transaksi}
          setTransaksi={setTransaksi}
          setDaftarOrder={setDaftarOrder}
          DaftarOrder={DaftarOrder}
          persen={persen}
          setPersen={setPersen}
          clicked={clicked}
          setClicked={setClicked}
          tipeOrder={tipeOrder}
          setTipeOrder={setTipeOrder}
          handleSelectChange={handleSelectChange}
          viewOrder={viewOrder}
          namaCustomer={namaCustomer}
          setNamaCustomer={setNamaCustomer}
          taxData={taxtdata}
          orderDiskon={orderDiskon}
          textButton={textButton}
        />
      </div>
    </div>
  )
}

export default Kasir
