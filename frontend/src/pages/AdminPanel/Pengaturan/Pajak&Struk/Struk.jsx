import React, { useState, useRef } from 'react';
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


const PengaturanStruk = () => {
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
    const [alamtToko, setAlamatToko] = useState('')
    const [kontakToko, setKontakToko] = useState('')
    const [sosialmedia1Toko, setsosialmedia1Toko] = useState('')
    const [sosialmedia2Toko, setsosialmedia2Toko] = useState('')
    const [catatanToko, setCatatanToko] = useState('')
    const { toast } = useToast();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setUrlImage(URL.createObjectURL(file));
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const removeImage = () => {
        setImage(null);
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
                                if (!checked) {
                                    removeImage();
                                    setUrlImage('');
                                }
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
                    <Priview 
                    isLogoChecked={isLogoChecked}
                    isNamaChecked={isNamaChecked}
                    isAlamatChecked={isAlamatChecked}
                    isKontakChecked={isKontakChecked}
                    isMediaChecked={isMediaChecked}
                    isCatatanChecked={isCatatanChecked}
                    urlImage={urlImage} 
                    namaToko={namaToko} 
                    alamtToko={alamtToko}
                    kontakToko={kontakToko}
                    sosialmedia1Toko={sosialmedia1Toko}
                    sosialmedia2Toko={sosialmedia2Toko}
                    catatanToko={catatanToko}
                    />
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
                                    className="flex flex-col items-center justify-center text-center gap-2  hover:text-black bg-transparent"
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
                                    <button onClick={triggerFileInput} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className='bg-white text-[12px] px-[8px] rounded-full'>Ubah</div>
                                    </button>
                                    <button onClick={removeImage} className="absolute top-2 right-2 bg-white text-red-500 text-xs p-[4px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                        onChange={(e) => setKontakToko(e.target.value)}
                    />
                </div>
                <div className='grid gap-[8px]'>
                    <h1 className={`text-[14px] font-medium ${isMediaChecked ? 'text-black' : 'text-slate-400'}`}>Sosial Media</h1>
                    <div className='flex gap-[8px]'>
                        <Select>
                            <SelectTrigger className="w-[100px] h-[36px] text-[14px]" disabled={!isMediaChecked}>
                                <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem className='text-[14px]' value="Facebook">FB</SelectItem>
                                    <SelectItem className='text-[14px]' value="Instragram">IG</SelectItem>
                                    <SelectItem className='text-[14px]' value="Twiter">TW</SelectItem>
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
                            onChange={(e) => setsosialmedia1Toko(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-[8px]'>
                        <Select>
                            <SelectTrigger className="w-[100px] h-[36px] text-[14px]" disabled={!isMediaChecked}>
                                <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem className='text-[14px]' value="Facebook">FB</SelectItem>
                                    <SelectItem className='text-[14px]' value="Instragram">IG</SelectItem>
                                    <SelectItem className='text-[14px]' value="Twiter">TW</SelectItem>
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
                        onChange={(e) => setCatatanToko(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PengaturanStruk
