import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import logo from "../../assets/Logo.svg";
import { Eye, EyeSlash } from 'iconsax-react';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };




    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen">
            <div className="mx-auto w-full max-w-[450px] pt-[52px] pb-[52px] ">
                <h1 className='text-center text-[30px] font-semibold'>Masuk ke akun anda</h1>
                <p className="text-[14px] text-center font-medium  text-gray-500 mt-[16px] mb-[36px]">
                    Masukkan email dan password anda
                </p>

                <div className="grid gap-[36px]">
                    <div className='grid gap-4'>
                    <div className="grid gap-1">
                        <Label htmlFor="email" className="text-[14px]">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            required
                            className="h-[40px] text-[14px] rounded-lg border-slate-300"
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password" className="text-[14px]">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                required
                                className="h-[40px] text-[14px] rounded-lg border-slate-300 pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                {showPassword ? <EyeSlash size="16" color="#94A3B8" /> : <Eye size="16" color="#94A3B8" />}
                            </button>
                        </div>
                    </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Ingat Saya
                            </label>
                        </div>
                        <Link to="/auth/forgot-password" className="ml-auto inline-block text-[14px] font-medium ">
                            Lupa Password?
                        </Link>
                    </div>
                    <Button type="submit" className="w-full h-[40px]  text-[14px] font-medium" onClick={() => navigate('/admin-panel')}>
                        Masuk
                    </Button>
                    <Button variant="outline"  className="w-full h-[40px]  text-[14px] font-medium" >
                        Masuk Menggunakan ID Token Pegawai
                    </Button>
                    <div className="flex items-center text-center">
                        <div className="flex-1 border-b border-gray-300"></div>
                        <span className="px-2 text-gray-500 text-[14px]">atau</span>
                        <div className="flex-1 border-b border-gray-300"></div>
                    </div>
                    <div className='grid gap-4'>
                    <Button type="submit" className="w-full h-[40px]  text-[14px] font-medium" onClick={() => navigate('/auth/register')}>
                    Daftar Akun Baru
                    </Button>
                    <Button variant="outline"  className="w-full h-[40px]  text-[14px] font-medium" >
                    Mulai Berlangganan Sirqu
                    </Button>
                    <div className="text-center text-[14px] font-medium text-slate-500">
                        
                        <Link to="/register" className='underline text-black'  >
                        Hubungi Admin
                        </Link>
                        {" "}sekarang, agar anda dapat menggunakan Sirqu khusus untuk bisnis anda
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
