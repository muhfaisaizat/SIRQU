import React, { useState, useRef, useEffect } from 'react';
import { FiPlus } from "react-icons/fi";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { Play, GalleryAdd, Trash } from 'iconsax-react';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Priview from './Priview';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";


const PengaturanStruk = () => {
    const [dataStruk, setDataStruk] = useState(null);
    const [dataLogo, setDataLogo] = useState(null);
    const [isLogoChecked, setIsLogoChecked] = useState(false);
    const [isNamaChecked, setIsNamaChecked] = useState(false);
    const [isAlamatChecked, setIsAlamatChecked] = useState(false);
    const [isKontakChecked, setIsKontakChecked] = useState(false);
    const [isMediaChecked, setIsMediaChecked] = useState(false);
    const [isCatatanChecked, setIsCtatanChecked] = useState(false);
    const [image, setImage] = useState(null);
    const [hovered, setHovered] = useState(false);
    const fileInputRef = useRef(null);
    const [urlImage, setUrlImage] = useState('');
    const [namaToko, setNamaToko] = useState('')
    const [datanamaToko, setdataNamaToko] = useState(null)
    const [alamtToko, setAlamatToko] = useState('')
    const [dataalamtToko, setdataAlamatToko] = useState(null)
    const [kontakToko, setKontakToko] = useState('')
    const [datakontakToko, setdataKontakToko] = useState(null)
    const [sosialmedia1Toko, setsosialmedia1Toko] = useState('')
    const [datasosialmedia1Toko, setdatasosialmedia1Toko] = useState(null)
    const [sosialmedia2Toko, setsosialmedia2Toko] = useState('')
    const [datasosialmedia2Toko, setdatasosialmedia2Toko] = useState(null)
    const [Kategorisosialmedia1, setKategorisosialmedia1] = useState('')
    const [Kategorisosialmedia2, setKategorisosialmedia2] = useState('')
    const [catatanToko, setCatatanToko] = useState('')
    const [datacatatanToko, setdataCatatanToko] = useState(null)
    const { toast } = useToast();
    const isAnyChecked = isLogoChecked || isNamaChecked || isAlamatChecked || isKontakChecked || isMediaChecked || isCatatanChecked;


    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/setting-struk`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // console.log(response.data.data);
            // console.log(response.data.data.detailStrukLogo[0]);

            setDataStruk(response.data.data.struks);
           
            const filteredLogo = response.data.data.struks.filter(item => item.name === 'Logo');
            const filteredNama = response.data.data.struks.filter(item => item.name === 'Nama Toko');
            const filteredAlamat = response.data.data.struks.filter(item => item.name === 'Alamat');
            const filteredKontak = response.data.data.struks.filter(item => item.name === 'Kontak');
            const filteredSosialMedia = response.data.data.struks.filter(item => item.name === 'Sosial Media');
            const filteredCatatan = response.data.data.struks.filter(item => item.name === 'Catatan');

            const textNama = response.data.data.detailStrukTeks.filter(item => item.name === 'Nama Toko');
            const textAlamat = response.data.data.detailStrukTeks.filter(item => item.name === 'Alamat');
            const textKontak = response.data.data.detailStrukTeks.filter(item => item.name === 'Kontak');
            const textCatatan = response.data.data.detailStrukTeks.filter(item => item.name === 'Catatan');

            const mediaSosial1 = response.data.data.detailStrukMedia[0];
            const mediaSosial2 = response.data.data.detailStrukMedia[1];
            
            setIsLogoChecked(JSON.parse(filteredLogo[0].status));
            setIsNamaChecked(JSON.parse(filteredNama[0].status));
            setIsAlamatChecked(JSON.parse(filteredAlamat[0].status));
            setIsKontakChecked(JSON.parse(filteredKontak[0].status));
            setIsMediaChecked(JSON.parse(filteredSosialMedia[0].status));
            setIsCtatanChecked(JSON.parse(filteredCatatan[0].status));

            if (textNama[0].text === 'null') {
                setNamaToko(''); 
              } else {
                setNamaToko(textNama[0].text); 
              }
            if (textAlamat[0].text === 'null') {
                setAlamatToko(''); 
              } else {
                setAlamatToko(textAlamat[0].text) 
              }
            if (textKontak[0].text === 'null') {
                setKontakToko(''); 
              } else {
                setKontakToko(textKontak[0].text) 
              }
            if (textCatatan[0].text === 'null') {
                setCatatanToko(''); 
              } else {
                setCatatanToko(textCatatan[0].text) 
              }
            
            
              if (mediaSosial1.nameMedia === 'null') {
                setsosialmedia1Toko(''); 
              } else {
                setsosialmedia1Toko(mediaSosial1.nameMedia)
              }
              if (mediaSosial2.nameMedia === 'null') {
                setsosialmedia2Toko(''); 
              } else {
                setsosialmedia2Toko(mediaSosial2.nameMedia)
              }
            
            setKategorisosialmedia1(mediaSosial1.kategori)
            setKategorisosialmedia2(mediaSosial2.kategori)
            

            setdataNamaToko(textNama[0])
            setdataAlamatToko(textAlamat[0])
            setdataKontakToko(textKontak[0])
            setdataCatatanToko(textCatatan[0])
            setdatasosialmedia1Toko(mediaSosial1)
            setdatasosialmedia2Toko(mediaSosial2)


            if (response.data.data.detailStrukLogo[0]) {
                setImage(`${API_URL}/images/${response.data.data.detailStrukLogo[0].logo}`);
                setDataLogo(response.data.data.detailStrukLogo[0])
            } else{
                setImage('')
                setDataLogo(null)
            }


           
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    // Ambil data dari API
    useEffect(() => {
    
        fetchData();
    }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setUrlImage(URL.createObjectURL(file));
            };
            reader.readAsDataURL(file);
        }
        const token = localStorage.getItem("token");
        if (dataLogo) {
            try {
                 await axios.put(`${API_URL}/api/setting-struk/detail-struk-logo/${dataLogo.detailStrukLogo_Id}`,
                    {
                        struksId: dataLogo.struks_Id,
                        image: file

                    }, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        },
                    }
                );

                toast({
                    title: "Sukses!",
                    description: "Logo berhasil diperbarui.",
                    action: <ToastAction altText="Try again">Cancel</ToastAction>,
                });
                fetchData();

            } catch (error) {
                console.error("Error logo:", error);
                toast({
                    variant: "destructive",
                    title: 'Error logo',
                    description: 'Please try again later and check console log',
                    status: 'error',
                    action: <ToastAction altText="Try again">Cancel</ToastAction>,
                });
            }
        } else {
            const filteredLogo = dataStruk?.filter(item => item.name === 'Logo');
            try {
                await axios.post(`${API_URL}/api/setting-struk/detail-struk-logo`,
                   {
                       struksId: filteredLogo[0].id,
                       image: file

                   }, 
                   {
                       headers: {
                           Authorization: `Bearer ${token}`,
                           'Content-Type': 'multipart/form-data'
                       },
                   }
               );

               toast({
                   title: "Sukses!",
                   description: "Logo berhasil diupload.",
                   action: <ToastAction altText="Try again">Cancel</ToastAction>,
               });
               fetchData();

           } catch (error) {
               console.error("Error logo:", error);
               toast({
                   variant: "destructive",
                   title: 'Error logo',
                   description: 'Please try again later and check console log',
                   status: 'error',
                   action: <ToastAction altText="Try again">Cancel</ToastAction>,
               });
           }
        }
        
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const removeImage = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${API_URL}/api/setting-struk/detail-struk-logo/${dataLogo.detailStrukLogo_Id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });
              toast({
                title: "Sukses!",
                description: "Logo berhasil dihapus.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            fetchData();
            setImage(null);
        } catch (error) {
            console.error("Error hapus logo:", error);
                    toast({
                        variant: "destructive",
                        title: 'Error hapus logo',
                        description: 'Please try again later and check console log',
                        status: 'error',
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                    });
        }
        
    };


    const handleSelectChange1 = (value) => {
        setKategorisosialmedia1(value); 
      };
    const handleSelectChange2 = (value) => {
        setKategorisosialmedia2(value); 
      };



      const updateStatus = async (id, status) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `${API_URL}/api/setting-struk/status/${id}?status=${status}`,
                null, // Tidak ada body yang dikirimkan
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
          fetchData()
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };


      const filteredLogo = dataStruk?.filter(item => item.name === 'Logo');
      const filteredNama = dataStruk?.filter(item => item.name === 'Nama Toko');
      const filteredAlamat = dataStruk?.filter(item => item.name === 'Alamat');
      const filteredKontak = dataStruk?.filter(item => item.name === 'Kontak');
      const filteredSosialMedia = dataStruk?.filter(item => item.name === 'Sosial Media');
      const filteredCatatan = dataStruk?.filter(item => item.name === 'Catatan');

       // Update status Logo
        useEffect(() => {
            if (filteredLogo && filteredLogo[0]) {
            updateStatus(filteredLogo[0].id, isLogoChecked);
            }
        }, [isLogoChecked]);

        // Update status Nama Toko
        useEffect(() => {
            if (filteredNama && filteredNama[0]) {
            updateStatus(filteredNama[0].id, isNamaChecked);
            }
        }, [isNamaChecked]);

        // Update status Alamat
        useEffect(() => {
            if (filteredAlamat && filteredAlamat[0]) {
            updateStatus(filteredAlamat[0].id, isAlamatChecked);
            }
        }, [isAlamatChecked]);

        // Update status Kontak
        useEffect(() => {
            if (filteredKontak && filteredKontak[0]) {
            updateStatus(filteredKontak[0].id, isKontakChecked);
            }
        }, [isKontakChecked]);

        // Update status Sosial Media
        useEffect(() => {
            if (filteredSosialMedia && filteredSosialMedia[0]) {
            updateStatus(filteredSosialMedia[0].id, isMediaChecked);
            }
        }, [isMediaChecked]);

        // Update status Catatan
        useEffect(() => {
            if (filteredCatatan && filteredCatatan[0]) {
            updateStatus(filteredCatatan[0].id, isCatatanChecked);
            }
        }, [isCatatanChecked]);


        const handleKeyDownNama = async (e) => {
            if (e.key === 'Enter') {
                const token = localStorage.getItem("token");
                let value = namaToko.trim() === '' ? 'null' : namaToko;
                try {
                    const response = await axios.put(
                        `${API_URL}/api/setting-struk/detail-struk-text/${datanamaToko.detailStrukTeks_Id}`,
                        {
                            struksId: datanamaToko.struks_Id,
                            text: value
                        }, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                        }
                    );
                    toast({
                        title: "Sukses!",
                        description: "Nama toko berhasil di simpan.",
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                      });
                    fetchData();
                } catch (error) {
                    console.error("Error updating nilai pajak:", error);
                    toast({
                        variant: "destructive",
                        title: 'Error input nilai',
                        description: 'Please try again later.',
                        status: 'error',
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                    });
                }
            }
        };

        const handleKeyDownAlamat = async (e) => {
            if (e.key === 'Enter') {
                const token = localStorage.getItem("token");
                let value = alamtToko.trim() === '' ? 'null' : alamtToko;
                try {
                    const response = await axios.put(
                        `${API_URL}/api/setting-struk/detail-struk-text/${dataalamtToko.detailStrukTeks_Id}`,
                        {
                            struksId: dataalamtToko.struks_Id,
                            text: value
                        }, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                        }
                    );
                    toast({
                        title: "Sukses!",
                        description: "Alamat berhasil di simpan.",
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                      });
                    fetchData();
                } catch (error) {
                    console.error("Error updating nilai pajak:", error);
                    toast({
                        variant: "destructive",
                        title: 'Error input nilai',
                        description: 'Please try again later.',
                        status: 'error',
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                    });
                }
            }
        };

        const handleKeyDownKontak = async (e) => {
            if (e.key === 'Enter') {
                const token = localStorage.getItem("token");
                let value = kontakToko.trim() === '' ? 'null' : kontakToko;
                try {
                    const response = await axios.put(
                        `${API_URL}/api/setting-struk/detail-struk-text/${datakontakToko.detailStrukTeks_Id}`,
                        {
                            struksId: datakontakToko.struks_Id,
                            text: value
                        }, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                        }
                    );
                    toast({
                        title: "Sukses!",
                        description: "Kontak berhasil di simpan.",
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                      });
                    fetchData();
                } catch (error) {
                    console.error("Error updating nilai pajak:", error);
                    toast({
                        variant: "destructive",
                        title: 'Error input nilai',
                        description: 'Please try again later.',
                        status: 'error',
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                    });
                }
            }
        };

        const handleKeyDownMedia1 = async (e) => {
            if (e.key === 'Enter') {
                const token = localStorage.getItem("token");
                let value = sosialmedia1Toko.trim() === '' ? 'null' : sosialmedia1Toko;
                try {
                    const response = await axios.put(
                        `${API_URL}/api/setting-struk/detail-struk-media/${datasosialmedia1Toko.detailStrukMedia_Id}?struksId=${datasosialmedia1Toko.struks_Id}&kategori=${Kategorisosialmedia1}&nameMedia=${value}`,
                        null,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    toast({
                        title: "Sukses!",
                        description: "Sosial Media berhasil di simpan.",
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                      });
                    fetchData();
                } catch (error) {
                    console.error("Error updating nilai pajak:", error);
                    toast({
                        variant: "destructive",
                        title: 'Error input nilai',
                        description: 'Please try again later.',
                        status: 'error',
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                    });
                }
            }
        };

        const handleKeyDownMedia2 = async (e) => {
            if (e.key === 'Enter') {
                const token = localStorage.getItem("token");
                let value = sosialmedia2Toko.trim() === '' ? 'null' : sosialmedia2Toko;
                try {
                    const response = await axios.put(
                        `${API_URL}/api/setting-struk/detail-struk-media/${datasosialmedia2Toko.detailStrukMedia_Id}?struksId=${datasosialmedia2Toko.struks_Id}&kategori=${Kategorisosialmedia2}&nameMedia=${value}`,
                        null,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    toast({
                        title: "Sukses!",
                        description: "Sosial Media berhasil di simpan.",
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                      });
                    fetchData();
                } catch (error) {
                    console.error("Error updating nilai pajak:", error);
                    toast({
                        variant: "destructive",
                        title: 'Error input nilai',
                        description: 'Please try again later.',
                        status: 'error',
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                    });
                }
            }
        };

        const handleKeyDownCatatan = async (e) => {
            if (e.key === 'Enter') {
                const token = localStorage.getItem("token");
                let value = catatanToko.trim() === '' ? 'null' : catatanToko;
                try {
                    const response = await axios.put(
                        `${API_URL}/api/setting-struk/detail-struk-text/${datacatatanToko.detailStrukTeks_Id}`,
                        {
                            struksId: datacatatanToko.struks_Id,
                            text: value
                        }, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                        }
                    );
                    toast({
                        title: "Sukses!",
                        description: "Kontak berhasil di simpan.",
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                      });
                    fetchData();
                } catch (error) {
                    console.error("Error updating nilai pajak:", error);
                    toast({
                        variant: "destructive",
                        title: 'Error input nilai',
                        description: 'Please try again later.',
                        status: 'error',
                        action: <ToastAction altText="Try again">Cancel</ToastAction>,
                    });
                }
            }
        };

    return (
        <div className='pl-[16px] grid gap-[16px]'>
            <div className='grid gap-[16px]'>
                <h1 className='text-[16px] font-semibold'>Atur Tampilan Struk</h1>
                <div className='flex flex-wrap gap-[16px]'>
                    <div className="flex items-center space-x-[8px] border-2 rounded-[6px] py-[8px] px-[12px]">
                        <Checkbox
                            id="logo"
                            checked={isLogoChecked}
                            onCheckedChange={(checked) => {
                                setIsLogoChecked(checked);
                            }} />
                        <label
                            htmlFor="logo"
                            className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            Logo
                        </label>
                    </div>
                    <div className="flex items-center space-x-[8px] border-2 rounded-[6px] py-[8px] px-[12px]">
                        <Checkbox
                         id="toko" 
                         checked={isNamaChecked} 
                         onCheckedChange={(checked) => {
                            setIsNamaChecked(checked);
                            if (!checked) {
                                setNamaToko('');
                            }
                        }}
                         />
                        <label
                            htmlFor="toko"
                            className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            Nama Toko
                        </label>
                    </div>
                    <div className="flex items-center space-x-[8px] border-2 rounded-[6px] py-[8px] px-[12px]">
                        <Checkbox 
                        id="alamat" 
                        checked={isAlamatChecked} 
                        onCheckedChange={(checked) => {
                            setIsAlamatChecked(checked);
                            if (!checked) {
                                setAlamatToko('');
                            }
                        }} />
                        <label
                            htmlFor="alamat"
                            className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            Alamat
                        </label>
                    </div>
                    <div className="flex items-center space-x-[8px] border-2 rounded-[6px] py-[8px] px-[12px]">
                        <Checkbox
                         id="kontak" 
                         checked={isKontakChecked} 
                         onCheckedChange={(checked) => {
                            setIsKontakChecked(checked);
                            if (!checked) {
                                setKontakToko('');
                            }
                        }} />
                        <label
                            htmlFor="kontak"
                            className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            Kontak
                        </label>
                    </div>
                    <div className="flex items-center space-x-[8px] border-2 rounded-[6px] py-[8px] px-[12px]">
                        <Checkbox 
                        id="media" 
                        checked={isMediaChecked} 
                        onCheckedChange={(checked) => {
                            setIsMediaChecked(checked);
                            if (!checked) {
                                setsosialmedia1Toko('');
                                setsosialmedia2Toko('');
                            }
                        }} />
                        <label
                            htmlFor="media"
                            className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            Sosial Media
                        </label>
                    </div>
                    <div className="flex items-center space-x-[8px] border-2 rounded-[6px] py-[8px] px-[12px]">
                        <Checkbox 
                        id="catatan" 
                        checked={isCatatanChecked} 
                        onCheckedChange={(checked) => {
                            setIsCtatanChecked(checked);
                            if (!checked) {
                                setCatatanToko('');
                            }
                        }} />
                        <label
                            htmlFor="catatan"
                            className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            Catatan
                        </label>
                    </div>
                </div>
            </div>
            <div className='border' />
            <div className='grid gap-[16px]'>
                <div className='flex justify-between'>
                    <h1 className='text-[16px] font-semibold'>Detail Struk</h1>
                    <Priview isAnyChecked={isAnyChecked}/>
                </div>
                <div className='grid gap-[8px]'>
                    <h1 className={`text-[14px] font-medium ${isLogoChecked ? 'text-black' : 'text-slate-400'}`}>Logo</h1>
                    <div className='flex gap-[12px] '>
                        <div
                            className={`relative flex items-center justify-center h-[120px] w-[120px] rounded-lg overflow-hidden ${image ? '' : 'border-dashed border-2 border-slate-300'}`}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            {!image ? (
                                <button
                                    onClick={triggerFileInput}
                                    disabled={!isLogoChecked}
                                    className={`flex flex-col items-center justify-center text-center gap-2  hover:text-black bg-transparent  ${isLogoChecked ? '':'cursor-not-allowed'}`}
                                >
                                    <GalleryAdd size="24" color='#717179' variant="Bulk" />
                                    <p className="whitespace-normal text-slate-500">Pilih atau letakkan gambar disini</p>
                                </button>
                            ) : (
                                <div className="relative w-[120px] h-[120px] group">
                                    <img
                                        src={image}
                                        alt="Uploaded"
                                        className="w-full h-full object-cover rounded-[8px] cursor-pointer"
                                        onClick={triggerFileInput}
                                    />
                                    <button disabled={!isLogoChecked} onClick={triggerFileInput} className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[8px] opacity-0  transition-opacity duration-200 ${isLogoChecked ? 'group-hover:opacity-100':'cursor-not-allowed'} `}>
                                        <div className='bg-white text-[12px] px-[8px] rounded-full'>Ubah</div>
                                    </button>
                                    <button disabled={!isLogoChecked} onClick={removeImage} className={`absolute top-2 right-2 bg-white text-red-500 text-xs p-[4px] rounded-lg opacity-0  transition-opacity duration-200 ${isLogoChecked ? 'group-hover:opacity-100':'cursor-not-allowed'}`}>
                                        <Trash size="12" />
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                        </div>
                        <div className='w-[180px] h-[120px] grid justify-center items-center'>
                            <p className='text-[12px] font-medium text-slate-400'>Gunakan foto dengan rasio 1:1, Upload dalam format .jpg/.pngukuran maksimal 5 mb</p>
                        </div>
                    </div>
                </div>
                <div className='grid gap-[8px]'>
                    <h1 className={`text-[14px] font-medium ${isNamaChecked ? 'text-black' : 'text-slate-400'}`}>Nama Toko</h1>
                    <Input
                        type="text"
                        placeholder="Masukkan nama toko"
                        required
                        className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                        disabled={!isNamaChecked}
                        value={namaToko}
                        onKeyDown={handleKeyDownNama}
                        onChange={(e) => setNamaToko(e.target.value)}
                    />
                </div>
                <div className='grid gap-[8px]'>
                    <h1 className={`text-[14px] font-medium ${isAlamatChecked ? 'text-black' : 'text-slate-400'}`}>Alamat</h1>
                    <Input
                        type="text"
                        placeholder="Masukkan alamat"
                        required
                        className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                        disabled={!isAlamatChecked}
                        value={alamtToko}
                        onKeyDown={handleKeyDownAlamat}
                        onChange={(e) => setAlamatToko(e.target.value)}
                    />
                </div>
                <div className='grid gap-[8px]'>
                    <h1 className={`text-[14px] font-medium ${isKontakChecked ? 'text-black' : 'text-slate-400'}`}>Kontak</h1>
                    <Input
                        type="text"
                        placeholder="Masukkan No. Telp "
                        required
                        className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                        disabled={!isKontakChecked}
                        value={kontakToko}
                        onKeyDown={handleKeyDownKontak}
                        onChange={(e) => setKontakToko(e.target.value)}
                    />
                </div>
                <div className='grid gap-[8px]'>
                    <h1 className={`text-[14px] font-medium ${isMediaChecked ? 'text-black' : 'text-slate-400'}`}>Sosial Media</h1>
                    <div className='flex gap-[8px]'>
                        <Select  value={Kategorisosialmedia1} onValueChange={handleSelectChange1} >
                            <SelectTrigger className="w-[100px] h-[36px] text-[14px]" disabled={!isMediaChecked}>
                                <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem className='text-[14px]' value="FB">FB</SelectItem>
                                    <SelectItem className='text-[14px]' value="IG">IG</SelectItem>
                                    <SelectItem className='text-[14px]' value="TW">TW</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input
                            type="text"
                            placeholder="con: @SirquPOS "
                            required
                            className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                            disabled={!isMediaChecked}
                            value={sosialmedia1Toko}
                            onKeyDown={handleKeyDownMedia1}
                            onChange={(e) => setsosialmedia1Toko(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-[8px]'>
                        <Select value={Kategorisosialmedia2} onValueChange={handleSelectChange2}>
                            <SelectTrigger className="w-[100px] h-[36px] text-[14px]" disabled={!isMediaChecked}>
                                <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem className='text-[14px]' value="FB">FB</SelectItem>
                                    <SelectItem className='text-[14px]' value="IG">IG</SelectItem>
                                    <SelectItem className='text-[14px]' value="TW">TW</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input
                            type="text"
                            placeholder="con: @SirquPOS "
                            required
                            className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                            disabled={!isMediaChecked}
                            value={sosialmedia2Toko}
                            onKeyDown={handleKeyDownMedia2}
                            onChange={(e) => setsosialmedia2Toko(e.target.value)}
                        />
                    </div>
                </div>
                <div className='grid gap-[8px]'>
                    <h1 className={`text-[14px] font-medium ${isCatatanChecked ? 'text-black' : 'text-slate-400'}`}>Catatan</h1>
                    <Textarea
                        type="text"
                        placeholder="Masukkan catatan tambahan"
                        required
                        className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                        disabled={!isCatatanChecked}
                        value={catatanToko}
                        onKeyDown={handleKeyDownCatatan}
                        onChange={(e) => setCatatanToko(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PengaturanStruk
