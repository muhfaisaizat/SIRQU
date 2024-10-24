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


  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/api/kasir`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("buka tanggal:", response.data); 
      const today = dayjs().startOf("day"); // Dapatkan tanggal hari ini tanpa jam

      // Loop melalui semua data dalam response.data
      const isAnyKasirOpenToday = response.data.length === 0 || response.data.some((kasir) => {
        const waktuBuka = kasir.waktuBuka;
        const waktuTutup = kasir.waktuTutup;
    
        // Cek apakah waktuBuka adalah hari ini
        if (dayjs(waktuBuka).isSame(today, "day")) {
            // Jika waktuBuka adalah hari ini, cek apakah waktuTutup ada
            if (waktuTutup) {
                return true; // Jika waktuTutup terisi, dialog dibuka
            } else {
                return false; // Jika waktuTutup tidak terisi, dialog tidak akan dibuka
            }
        }
        return false; // Jika tidak ada waktu buka pada hari ini, lanjutkan
    });

      // Set dialog terbuka atau tertutup berdasarkan hasil pencarian
      setIsDialogOpen(isAnyKasirOpenToday);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  // Ambil data dari API
  useEffect(() => {
    fetchData();
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

  const Buka = () => {
    setWaktuBuka(`${tanggalSekarang}, ${waktuSekarang}`)
  }
  const Tutup = () => {
    setWaktuTutup(`${tanggalSekarang}, ${waktuSekarang}`);
    const totalCount = DaftarOrder.reduce((accOrder, order) => {
      const orderTotalCount = order.detailTransaksi.reduce((accItem, item) => {
        return accItem + item.count;
      }, 0);
      return accOrder + orderTotalCount;
    }, 0);
    setItem(totalCount)

    const totalSemuaOrder = DaftarOrder.reduce((accumulator, currentOrder) => {
      return accumulator + currentOrder.total;
    }, 0);

    setPendapatanKotor(totalSemuaOrder)

    const totalTax = DaftarOrder.reduce((accumulator, currentOrder) => {
      if (currentOrder.tax && currentOrder.tax.harga) {
        return accumulator + currentOrder.tax.harga;
      }
      return accumulator;
    }, 0);

    const totalAkhir = totalSemuaOrder === 0 ? 0 : totalSemuaOrder - parseInt(uang) - totalTax;

    setPendapatanBersih(totalAkhir);

  }





  return (
    <div className='w-full h-full flex bg-slate-100'>
      <ScrollArea className='w-[72.8%] h-[100%]'>
        <Menu setDetailOrder={setDetailOrder} DaftarOrder={DaftarOrder} handleSelectChange={handleSelectChange} setViewOrder={setViewOrder} isDialogOpen={isDialogOpentutup} setIsDialogOpen={setIsDialogOpentutup} setIdOutlet={setIdOutlet} setnamaToko={setnamaToko} setIsDialogOpenbukatoko={setIsDialogOpen} setuangModal={setUang} />
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
      {isDialogOpen && (
        <BukaToko setIsDialogOpen={setIsDialogOpen} Buka={Buka} uang={uang} setUang={setUang} idOutlet={idOutlet} namaToko={namaToko} />
      )}
      {isDialogOpentutup && (
        <TutupToko setIsDialogOpentutup={setIsDialogOpentutup} waktuBuka={waktuBuka} uang={uang} waktuTutup={waktuTutup} Tutup={Tutup} item={item} pendapatanKotor={pendapatanKotor} pendapatanBersih={pendapatanBersih} setUang={setUang} setIsDialogOpenbuka={setIsDialogOpen} />
      )}
    </div>
  )
}

export default Kasir
