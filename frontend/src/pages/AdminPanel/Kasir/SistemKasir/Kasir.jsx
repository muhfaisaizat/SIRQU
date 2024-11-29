import React, { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Menu from './Menu'
import Order from './Order'
import BukaToko from '../BukaTutupToko/BukaToko'
import TutupToko from '../BukaTutupToko/TutupToko'
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import dayjs from "dayjs";

const Kasir = () => {
  const [DetailOrder, setDetailOrder] = useState([]);
  const [Transaksi, setTransaksi] = useState([]);
  const [DaftarOrder, setDaftarOrder] = useState([]);
  const [persen, setPersen] = useState({ top: '72%', bottom: '28%' });
  const [clicked, setClicked] = useState(false);
  const [tipeOrder, setTipeOrder] = useState('');
  const [viewOrder, setViewOrder] = useState({ idOrder: 0, ketBayar: '' });
  const [namaCustomer, setNamaCustomer] = useState('');
  const [taxtdata, setTaxdata] = useState(0);
  const [orderDiskon, setOrderDiskon] = useState(0);
  const [textButton, setTextButton] = useState('Bayar');
  const [isDialogOpentutup, setIsDialogOpentutup] = useState(false);
  const [tanggalSekarang, setTanggalSekarang] = useState('');
  const [waktuSekarang, setWaktuSekarang] = useState('');
  const [waktuBuka, setWaktuBuka] = useState('');
  const [waktuTutup, setWaktuTutup] = useState('');
  const [uang, setUang] = useState('');
  const [item, setItem] = useState(0);
  const [pendapatanKotor, setPendapatanKotor] = useState(0);
  const [pendapatanBersih, setPendapatanBersih] = useState(0);
  const [namaToko, setnamaToko] = useState('');
  const [idOutlet, setIdOutlet] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const fetchDataKasir = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/api/kasir/${idOutlet}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data)
    if (response.data.data.length === 0) {
      setIsDialogOpen(true); 
      return; 
    }
    const waktuTutup = response.data.data[0].waktuTutup;
    const id = response.data.data[0].id;
    const waktuBuka = response.data.data[0].waktuBuka;
    const modal = response.data.data[0].uangModal;

    if (waktuTutup === null) {
      setIsDialogOpen(false); 
      // localStorage.setItem("id_kasir", id);
      setWaktuBuka(waktuBuka);
      setUang(modal)
    } else {
      setIsDialogOpen(true); 
    }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  
  

  const formatDaftarOrderData = (apiData) => {
    return {
      id: apiData.transaksi_id,
      nama: apiData.transaksi_name,
      tipeOrder: apiData.tipe_order,
      KetBayar: apiData.ket_bayar,
      pembayaran: apiData.tipe_bayar,
      waktu: apiData.createdAt,
      kasir: apiData.kasir_name,
      detailTransaksi: apiData.detailtransaksi || [],
      total: apiData.total,
      tax: apiData.detailpajaks || [],
      diskon: apiData.detaildiskons || [],
      subtotal: apiData.sub_total,
      bayar: apiData.bayar,
      kembalian: apiData.kembalian,
    };
  };

  const fetchDataDaftarOrder = async () => {
    const token = localStorage.getItem("token");
    const id_kasir = localStorage.getItem("id_kasir");
    try {
      const response = await axios.get(`${API_URL}/api/transaksi?status=active&id_kasir=${id_kasir}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cek jika `data` adalah array, dan lakukan map pada `response.data.data`
      if (Array.isArray(response.data.data)) {
        const formattedData = response.data.data.map(formatDaftarOrderData);
        setDaftarOrder(formattedData);
      } else {
        console.error("Data fetched is not an array");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  // Ambil data dari API
  useEffect(() => {
    fetchDataKasir();
    fetchDataDaftarOrder();
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(now);
      const formattedTime = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });
      setTanggalSekarang(formattedDate);
      setWaktuSekarang(formattedTime);
    };
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
          id_produk: item.product_id,
          foto: 'https://github.com/shadcn.png',
          count: item.stok,
          name: item.product_name,
          harga: item.product_price,
        }))
      };
      setDetailOrder(newTransaction.detailTransaksi);
    }

   

    // Proses tax
    if (Array.isArray(Tax)) {
      const taxList = Tax.map(item => item.harga || 0);
      const totaltax = taxList.reduce((sum, harga) => sum + harga, 0);
      setTaxdata(totaltax);
    } else {
      setTaxdata(0); // Set ke 0 jika diskon tidak valid
    }

    // Proses diskon
    if (Array.isArray(diskon)) {
      const diskonList = diskon.map(item => item.harga || 0);
      const totalDiskon = diskonList.reduce((sum, harga) => sum + harga, 0);
      setOrderDiskon(totalDiskon);
    } else {
      setOrderDiskon(0); // Set ke 0 jika diskon tidak valid
    }
  };

  const Buka = () => {
    setWaktuBuka(`${tanggalSekarang}, ${waktuSekarang}`)
  }
  const Tutup = () => {
    setWaktuTutup(`${tanggalSekarang}, ${waktuSekarang}`);
    const totalCount = DaftarOrder.reduce((accOrder, order) => {
      const orderTotalCount = order.detailTransaksi.reduce((accItem, item) => {
        return accItem + item.stok;
      }, 0);
      return accOrder + orderTotalCount;
    }, 0);
    setItem(totalCount)

    const totalSemuaOrder = DaftarOrder.reduce((accumulator, currentOrder) => {
      return accumulator + currentOrder.total;
    }, 0);

    setPendapatanKotor(totalSemuaOrder)

    const totalTax = DaftarOrder.reduce((accumulator, currentOrder) => {
      // Cek apakah currentOrder memiliki property tax
      if (currentOrder.tax && currentOrder.tax.length > 0) {
        // Loop melalui setiap pajak dalam currentOrder.tax
        currentOrder.tax.forEach((taxDetail) => {
          // Tambahkan harga pajak ke accumulator
          accumulator += taxDetail.harga;
        });
      }
      return accumulator; // Kembalikan accumulator setelah menjumlahkan pajak
    }, 0);

    console.log(DaftarOrder)

    const totalAkhir = totalSemuaOrder === 0 ? 0 : totalSemuaOrder - parseInt(uang) - totalTax;

    setPendapatanBersih(totalAkhir);

  }





  return (
    <div className='w-full h-full flex bg-slate-100'>
      <ScrollArea className='w-[72.8%] h-[100%]'>
        <Menu 
        setDetailOrder={setDetailOrder} 
        DaftarOrder={DaftarOrder} 
        handleSelectChange={handleSelectChange} 
        setViewOrder={setViewOrder} 
        isDialogOpen={isDialogOpentutup} 
        setIsDialogOpen={setIsDialogOpentutup} 
        setIdOutlet={setIdOutlet} 
        setnamaToko={setnamaToko} 
        setIsDialogOpenbukatoko={setIsDialogOpen} 
        setuangModal={setUang} />
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
          idOutlet={idOutlet}
          fetchDataDaftarOrder={fetchDataDaftarOrder}
        />
      </div>
      {isDialogOpen && (
        <BukaToko setIsDialogOpen={setIsDialogOpen} Buka={Buka} uang={uang} setUang={setUang} idOutlet={idOutlet} namaToko={namaToko} fetchDataDaftarOrder={fetchDataDaftarOrder} />
      )}
      {isDialogOpentutup && (
        <TutupToko setIsDialogOpentutup={setIsDialogOpentutup} waktuBuka={waktuBuka} uang={uang} waktuTutup={waktuTutup} Tutup={Tutup} item={item} pendapatanKotor={pendapatanKotor} pendapatanBersih={pendapatanBersih} setUang={setUang} setIsDialogOpenbuka={setIsDialogOpen} />
      )}
    </div>
  )
}

export default Kasir
