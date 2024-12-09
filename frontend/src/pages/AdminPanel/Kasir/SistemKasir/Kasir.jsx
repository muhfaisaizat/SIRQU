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
  const dataOutletLocal = localStorage.getItem("dataOutletLocal");
  const idOutletKasir = localStorage.getItem("idOutletKasir");
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
  const [DataOutlet, setDataOutlet] = useState([
    // { id: "m5gr84i9", name: 'Outlet 1' },
    // { id: "m5gr84i7", name: 'Outlet 2' },
    // { id: "m5gr84i8", name: 'Outlet 3' }
]);
const [selectedOutlet, setSelectedOutlet] = useState(null);
  

const formatOutletData = (apiData) => {
    return {
        id: apiData.id_outlet.toString(),
        name: apiData.nama_outlet
    };
};


const fetchDataOutlet = async () => {
    const token = localStorage.getItem("token");
    // const dataOutletLocal = localStorage.getItem("dataOutletLocal");
    try {
        const response = await axios.get(`${API_URL}/api/outlets`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

       // Log untuk memastikan data yang diterima

        // Pastikan response.data adalah array
        if (Array.isArray(response.data.data)) {
            const formattedData = response.data.data.map(formatOutletData);
           
            setDataOutlet(formattedData);
            if (dataOutletLocal) {
              setSelectedOutlet(JSON.parse(dataOutletLocal) || null);
          } else {
              setSelectedOutlet(formattedData[0] || null);
          }
        setnamaToko(formattedData[0]?.name || ''); // Fallback to empty string if no data
        setIdOutlet(formattedData[0]?.id || ''); 
            // console.log(formattedData)
            // setOriginalData(formattedData); // Set originalData di sini
        } else {
            console.error("Data yang diterima bukan array");
        }
    } catch (error) {
        console.error("Error fetching data", error);
    }
};


useEffect(() => {
  if (dataOutletLocal) {
    setSelectedOutlet(dataOutletLocal)
    fetchDataOutlet();
  } else {
    fetchDataOutlet();
  }
}, [dataOutletLocal]);





const handleSelectOutlet = async (outlet) => {
  const token = localStorage.getItem("token");
  const idOutletKasir = localStorage.getItem("idOutletKasir");
  localStorage.setItem('activeLink', outlet.name); 
  window.dispatchEvent(new Event('storage'));
  try {
      const response = await axios.get(`${API_URL}/api/kasir/${outlet.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data.length === 0) {
          localStorage.setItem("idOutletKasir", outlet.id);
          setIsDialogOpen(true);
          setSelectedOutlet(outlet);
          setnamaToko(outlet.name);
          setIdOutlet(outlet.id);
          setUang('')
          fetchDataDaftarOrder();
          return; 
        }

      const waktuTutup = response.data.data[0].waktuTutup;
      const id = response.data.data[0].outletsId;
      const idKasir = response.data.data[0].id;
      const waktuBuka = response.data.data[0].waktuBuka;
      const modal = response.data.data[0].uangModal;
      // console.log(response.data.data[0])
      // console.log(idKasir)
      // console.log(outlet.id)
      // console.log(id)
      // console.log(waktuTutup)
      // console.log(typeof id, typeof outlet.id);
      // console.log("Kondisi:", waktuTutup === null && id === Number(outlet.id)); 

      if (waktuTutup === null && id === Number(outlet.id)) {
          setIsDialogOpen(false); 
          localStorage.setItem("idOutletKasir", outlet.id);
          localStorage.setItem("id_kasir", idKasir);
          setWaktuBuka(waktuBuka);
          setUang(modal);
          localStorage.setItem('dataOutletLocal', JSON.stringify(outlet));
          setnamaToko(outlet.name);
          setIdOutlet(outlet.id);
          fetchDataDaftarOrder();
      } else {
          localStorage.setItem("idOutletKasir", outlet.id);
          setIsDialogOpen(true);
          localStorage.setItem('dataOutletLocal', JSON.stringify(outlet));
          setnamaToko(outlet.name);
          setIdOutlet(outlet.id);
          setUang('')
          fetchDataDaftarOrder();
      }

  } catch (error) {
      console.error("Error fetching data", error);
  }
  
  
  
};


  const fetchDataKasir = async () => {
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.get(`${API_URL}/api/kasir/${idOutletKasir}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data)
    if (response.data.data.length === 0) {
      localStorage.setItem("id_kasir", 0);
      setIsDialogOpen(true); 
      return; 
    }
    const waktuTutup = response.data.data[0].waktuTutup;
    const idOutlet = response.data.data[0].outletsId;
    const idKasir = response.data.data[0].id;
    const outlet_name = response.data.data[0].outlet_name;
    const waktuBuka = response.data.data[0].waktuBuka;
    const modal = response.data.data[0].uangModal;
    // console.log(response.data.data[0])
    // console.log(idOutletKasir)
    // console.log(id)
    // console.log(waktuTutup)
    // console.log(typeof id, typeof idOutletKasir);
    // console.log("Kondisi:", waktuTutup === null && id === idOutletKasir); 

    if (waktuTutup === null && idOutlet === Number(idOutletKasir)) {
      setIsDialogOpen(false); 
      localStorage.setItem("id_kasir", idKasir);
      localStorage.setItem("idOutletKasir", idOutlet);
      setIdOutlet(idOutlet)
      setWaktuBuka(waktuBuka);
      setUang(modal);
      setnamaToko(outlet_name);
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
        // console.log(response.data.data)
        const formattedData = response.data.data.map(formatDaftarOrderData);
        setDaftarOrder(formattedData);
      } else {
        console.error("Data fetched is not an array");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
 

  useEffect(() => {
    // fetchDataKasir();
    fetchDataKasir().then(() => {
      fetchDataDaftarOrder();  // Panggil setelah fetchDataKasir selesai
  });
  }, [dataOutletLocal]);

  // useEffect(() => {
  //   fetchDataDaftarOrder();
  // }, [idOutletKasir]);

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
          foto: item.foto,
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





  return {
    fetchDataKasir,
    fetchDataDaftarOrder
  }, (
    <div className='w-full h-full flex bg-slate-100'>
      <ScrollArea className='w-[72.8%] h-[100%]'>
        <Menu 
        setDetailOrder={setDetailOrder} 
        DaftarOrder={DaftarOrder} 
        handleSelectChange={handleSelectChange} 

        setIsDialogOpen={setIsDialogOpentutup} 
        
        DataOutlet={DataOutlet}
        setDataOutlet={setDataOutlet}
        selectedOutlet={selectedOutlet}
        setSelectedOutlet={setSelectedOutlet}
        handleSelectOutlet={handleSelectOutlet}
        />
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
