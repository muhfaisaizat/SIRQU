import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Input } from '@/components/ui/input';

const PengaturanPajak = () => {
  
    const [pajak, setPajak] = useState('');
    const [biaya, setBiaya] = useState('');
    const [isSwitchOn, setIsSwitchOn] = useState(false); 
    const [isSwitchOn1, setIsSwitchOn1] = useState(false); 

    const formatNumber = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        const numberValue = value.replace(/\D/g, '');
        setPajak(numberValue);
    };
    const handleInputChange1 = (e) => {
        const value = e.target.value;

        const numberValue = value.replace(/\D/g, '');
        setBiaya(numberValue);
    };

    return (
        <div className='pr-[16px] grid gap-[16px]'>
            <div className='grid gap-[16px]'>
                <div className='flex justify-between'>
                    <h1 className='text-[16px] font-semibold'>Pajak</h1>
                    <Switch 
                        checked={isSwitchOn} 
                        onCheckedChange={(checked) => setIsSwitchOn(checked)} 
                    />
                </div>
                <div className='grid gap-[8px]'>
                    <h3 className={`text-[14px] font-medium ${isSwitchOn ? 'text-black' : 'text-slate-400'}`}>
                        Jumlah pajak
                    </h3>
                    <div className="relative w-full">
                        <Input
                            type="text"
                            placeholder="Masukkan persentase pajak"
                            required
                            className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                            value={formatNumber(pajak)}
                            onChange={handleInputChange}
                            disabled={!isSwitchOn} 
                        />
                        <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-[14px] ${isSwitchOn ? 'text-black' : 'text-slate-400'}`}>
                            %
                        </span>
                    </div>
                </div>
            </div>
            <div className='border'/>
            <div className='grid gap-[16px]'>
                <div className='flex justify-between'>
                    <h1 className='text-[16px] font-semibold'>Biaya Operasional</h1>
                    <Switch 
                        checked={isSwitchOn1} 
                        onCheckedChange={(checked) => setIsSwitchOn1(checked)} 
                    />
                </div>
                <div className='grid gap-[8px]'>
                    <h3 className={`text-[14px] font-medium ${isSwitchOn1 ? 'text-black' : 'text-slate-400'}`}>
                    Jumlah biaya
                    </h3>
                    <div className="relative w-full">
                        <Input
                            type="text"
                            placeholder="Masukkan persentase biaya"
                            required
                            className="h-[36px] text-[14px] border-slate-300 pl-[12px] pr-[40px]"
                            value={formatNumber(biaya)}
                            onChange={handleInputChange1}
                            disabled={!isSwitchOn1} 
                        />
                        <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-[14px] ${isSwitchOn1 ? 'text-black' : 'text-slate-400'}`}>
                            %
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PengaturanPajak;
