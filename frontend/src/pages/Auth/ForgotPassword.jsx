import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../../assets/Logo.svg";
import { ArrowLeft } from 'iconsax-react';
import { Eye, EyeSlash } from 'iconsax-react';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // OTP
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputsRef = useRef([]);

    // State untuk menampilkan tahap (1 = send email, 2 = otp, 3 = reset password)
    const [step, setStep] = useState(1);

    // Fungsi untuk meng-handle perubahan input OTP
    const handleOtpInputChange = (index, event) => {
        const value = event.target.value;
        if (/^\d{1}$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < 3 && value) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    // Fungsi untuk meng-handle aksi tombol Backspace atau Delete pada input OTP
    const handleOtpKeyDown = (index, event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            if (index > 0) {
                inputsRef.current[index - 1].focus();
            }
        }
    };

    // Fungsi untuk meng-handle aksi paste pada input OTP
    const handleOtpPaste = (event) => {
        event.preventDefault();
        const text = event.clipboardData.getData('text');
        if (/^\d{4}$/.test(text)) {
            const newOtp = text.split('');
            setOtp(newOtp);
            inputsRef.current[3].focus();
        }
    };

    // Fungsi untuk mengatur fokus pada input OTP pertama saat komponen di-render
    useEffect(() => {
        if (step === 2) {
            inputsRef.current[0].focus();
        }
    }, [step]);

    const [email, setEmail] = useState('');

    // Fungsi untuk meng-handle pengiriman form OTP
    const handleOtpSubmit = (event) => {
        event.preventDefault();
        // Verifikasi OTP
        setStep(3); // Lanjut ke reset password setelah OTP benar
    };

    // Fungsi untuk meng-handle submit email
    const handleEmailSubmit = (event) => {
        event.preventDefault();
        // Logika untuk mengirimkan email
        setStep(2); // Lanjut ke tahap OTP setelah email terkirim
        setTimer(5);
        setIsTimerActive(true);
    };


    // State untuk countdown timer
    const [timer, setTimer] = useState(5);
    const [isTimerActive, setIsTimerActive] = useState(false);

    // Logika untuk timer
    useEffect(() => {
        let countdown = null;
        if (isTimerActive && timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(countdown);
        }
        return () => clearInterval(countdown);
    }, [timer, isTimerActive]);

    // Fungsi untuk meng-handle resend code
    const handleResendCode = () => {
        setTimer(5); // Set timer kembali ke 5 detik
        setIsTimerActive(true); // Aktifkan kembali countdown
    };



    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen">
            {step === 1 && (
                // Tahap send email
                <Card className="mx-auto w-full max-w-[442px] pt-10 pb-10 px-8 shadow-xl shadow-gray-100">
                    <div className="flex w-full">
                        <Link to="/" className='w-4/12 pt-2'><ArrowLeft size="24" /></Link>
                        <div className='flex gap-[14px] w-8/12'>
                            <img src={logo} alt="Logo" />
                            <p className='text-[24px] font-semibold'>Sirqu</p>
                        </div>
                    </div>
                    <p className="text-[30px] text-center font-semibold text-black mt-[32px] mb-[32px]">
                        Forgot Password
                    </p>
                    <p className='mb-[32px] text-center font-medium text-[14px]'>Enter your email for instruction</p>

                    <form onSubmit={handleEmailSubmit} className="grid gap-[32px]">
                        <div className="grid gap-1">
                            <Label htmlFor="email" className="text-[14px]">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                required
                                className="h-[40px] text-[14px] rounded-lg border-slate-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full h-[40px] bg-teal-500 text-[14px] font-medium">
                            Send Code
                        </Button>
                    </form>
                </Card>
            )}

            {step === 2 && (
                // Tahap OTP
                <Card className="mx-auto w-full max-w-[442px] pt-10 pb-10 px-8 shadow-xl shadow-gray-100">
                    <div className="flex w-full">
                        <button onClick={() => setStep(1)} className='w-4/12 pt-2'><ArrowLeft size="24" /></button>
                        <div className='flex gap-[14px] w-8/12'>
                            <img src={logo} alt="Logo" />
                            <p className='text-[24px] font-semibold'>Sirqu</p>
                        </div>
                    </div>
                    <p className="text-[30px] text-center font-semibold text-black mt-[32px] mb-[32px]">
                        Verify Email
                    </p>
                    <p className='mb-[32px] text-center font-medium text-[14px]'>Code has been sent to {email}</p>

                    <form onSubmit={handleOtpSubmit} className="grid gap-[32px]">
                        <div className="flex items-center justify-center gap-3">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border  hover:border-slate-200 appearance-none rounded-lg p-4 outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                                    value={value}
                                    onChange={(e) => handleOtpInputChange(index, e)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    onPaste={handleOtpPaste}
                                    maxLength="1"
                                    ref={(el) => (inputsRef.current[index] = el)}
                                />
                            ))}
                        </div>

                        {timer > 0 ? (
                            <div className='flex text-center justify-center gap-1 text-[14px] font-medium mt-4'>
                                <p className='text-slate-500'>Resend code in</p>
                                <p>{`00:0${timer}`}</p>
                            </div>
                        ) : (
                            <Link to="#" onClick={handleResendCode} className=" underline inline-block text-[14px] font-medium text-center mt-4">
                                Resend code
                            </Link>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-[40px] bg-teal-500 text-[14px] font-medium"
                        >
                            Verify
                        </Button>
                    </form>
                </Card>
            )}

            {step === 3 && (
                // Tahap reset password
                <Card className="mx-auto w-full max-w-[442px] pt-10 pb-10 px-8 shadow-xl shadow-gray-100">
                    <div className="flex justify-center">
                        <div className='flex gap-[14px]'>
                            <img src={logo} alt="Logo" />
                            <p className='text-[24px] font-semibold'>Sirqu</p>
                        </div>
                    </div>
                    <p className="text-[30px] text-center font-semibold text-black mt-[32px] mb-[32px]">
                        Create New Password
                    </p>
                    <div>
                        <div className="grid gap-[32px]">
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
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                                    >
                                        {showPassword ? <Eye size="20" /> : <EyeSlash size="20" />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="confirmPassword" className="text-[14px]">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Enter confirm password"
                                        required
                                        className="h-[40px] text-[14px] rounded-lg border-slate-300 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                                    >
                                        {showConfirmPassword ? <Eye size="20" /> : <EyeSlash size="20" />}
                                    </button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-[40px] bg-teal-500 text-[14px] font-medium" onClick={() => navigate('/')}>
                                Reset Password
                            </Button>
                        </div>

                    </div>
                </Card>
            )}
        </div>
    );
};

export default ForgotPassword;
