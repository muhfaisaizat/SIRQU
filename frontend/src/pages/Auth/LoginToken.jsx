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
import axios from 'axios';
import { API_URL } from "../../helpers/networt";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster"


const LoginToken = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [token, settoken] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/login-token`, {
                tokenLogin: token,
            });
            const userRole = response.data.user.role;
            const info =response.data.message;
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("foto", response.data.user.image);
            
            const Outlet = await axios.get(`${API_URL}/api/outlets`, {
                headers: {
                    Authorization: `Bearer ${response.data.token}`,
                },
            });

            const hasTokoUtama = Outlet.data.data.some(outlet => outlet.posisi === "Toko Utama");
            const tokoUtamaOutlet = Outlet.data.data.find(outlet => outlet.posisi === "Toko Utama");

            if (tokoUtamaOutlet) {
                localStorage.setItem("syarat_ketentuan", tokoUtamaOutlet.syarat_ketentuan);
                localStorage.setItem("idTokoUtama", tokoUtamaOutlet.id_outlet);
                localStorage.setItem("idOutletKasir", tokoUtamaOutlet.id_outlet);
            
            } else {
                localStorage.setItem("syarat_ketentuan", null);
            
            }
            
            if (userRole === "Admin") {
                if (hasTokoUtama) {
                    navigate("/admin-panel");
                } else {
                    navigate("/admin-panel/wellcome");
                }
            } 
            else if(userRole === "Manager"){
                if (hasTokoUtama) {
                    navigate("/admin-panel");
                } else {
                    navigate("/admin-panel/wellcome");
                }
            } 
            else if(userRole === "Kasir"){
                if (hasTokoUtama) {
                    navigate("/admin-panel");
                } else {
                    navigate("/admin-panel/wellcome");
                }
            } 
            else {
              toast({
                variant: "destructive",
                title: "Error!",
                description: info,
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            }); 
            }
          } catch (error) {
            console.error("Login failed:", error);
            const errorMessage = error.response ? error.response.data.message : "Something went wrong";
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: errorMessage,  // Pesan error dari response atau fallback
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
          }
    }




    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen">
             <Toaster />
            <div className="mx-auto w-full max-w-[450px] pt-[52px] pb-[52px] ">
                <h1 className='text-center text-[30px] font-semibold'>Masukkan ID token anda</h1>
                <p className="text-[14px] text-center font-medium  text-gray-500 mt-[16px] mb-[36px]">
                Masukkan token ID token pegawai anda untuk masuk.
                </p>

                <div className="grid gap-[36px]">
                    <div className='grid gap-4'>
                    <div className="grid gap-1">
                        <Label htmlFor="email" className="text-[14px]">ID Token</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Masukkan 16 digit ID token anda"
                            required
                            value={token}
                            onChange={(e) => settoken(e.target.value)}
                            className="h-[40px] text-[14px] rounded-lg border-slate-300"
                        />
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
                    </div>
                    <Button onClick={handleLogin} className="w-full h-[40px]  text-[14px] font-medium">
                        Masuk
                    </Button>
                    <div className="flex items-center text-center">
                        <div className="flex-1 border-b border-gray-300"></div>
                        <span className="px-2 text-gray-500 text-[14px]">atau</span>
                        <div className="flex-1 border-b border-gray-300"></div>
                    </div>
                    <div className='grid gap-[36px]'>
                    <Button onClick={() => navigate('/auth/login')} variant="outline"  className="w-full h-[40px]  text-[14px] font-medium" >
                    Masuk ke Halaman Login
                    </Button>
                    <div className="text-center text-[14px] font-medium text-slate-500">
                        Lupa ID token?{" "}
                        <Link to="/register" className='underline text-black'  >
                        Hubungi admin toko
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginToken;
