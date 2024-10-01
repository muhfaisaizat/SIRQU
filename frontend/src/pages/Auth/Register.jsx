import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import logo from "../../assets/Logo.svg";
import { Eye, EyeSlash } from 'iconsax-react'; 

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen">
            <Card className="mx-auto w-full max-w-[442px] pt-10 pb-10 px-8 shadow-xl shadow-gray-100">
                <div className="flex text-center justify-center gap-[14px]">
                    <img src={logo} alt="Logo" />
                    <p className='text-[24px] font-semibold'>Sirqu</p>
                </div>
                <p className="text-[30px] text-center font-semibold text-black mt-[32px] mb-[32px]">
                Create New Account
                </p>

                <div className="grid gap-[32px]">
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
                        <Label htmlFor="password" className="text-[14px]">Create Password</Label>
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
                                className="absolute inset-y-0 right-0 flex items-center pr-3" 
                            >
                                {showPassword ? <EyeSlash size="16" color="#94A3B8"/> : <Eye size="16" color="#94A3B8"/>}
                            </button>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="confirm-password" className="text-[14px]">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'} 
                                placeholder="Enter password"
                                required
                                className="h-[40px] text-[14px] rounded-lg border-slate-300 pr-10" 
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3" 
                            >
                                {showConfirmPassword ? <EyeSlash size="16" color="#94A3B8"/> : <Eye size="16" color="#94A3B8"/>}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgot" className="ml-auto inline-block text-[14px] font-medium text-teal-500">
                            Forgot password?
                        </Link>
                    </div>
                    <Button type="submit" className="w-full h-[40px] bg-teal-500 text-[14px] font-medium">
                    Register
                    </Button>
                    <div className="text-center text-[14px] font-medium">
                    Have an account?{" "}
                        <Link to="/" className="text-teal-500">
                        Login Here
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Register;
