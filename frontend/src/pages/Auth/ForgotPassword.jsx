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
import axios from 'axios';
import { API_URL } from "../../helpers/networt";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster"

const obfuscateEmail = (email) => {
    const [localPart, domain] = email.split('@'); // Memisahkan bagian sebelum dan sesudah '@'
    if (localPart.length > 2) {
        return `${localPart.slice(0, 2)}${'*'.repeat(localPart.length - 2)}@${domain}`;
    }
    return email; // Jika email terlalu pendek, kembalikan apa adanya
};

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // OTP
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpString, setOtpString] = useState('');
    useEffect(() => {
        setOtpString(otp.join(''));
    }, [otp]);
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

            if (index < 5 && value) {
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
        if (/^\d{6}$/.test(text)) {
            const newOtp = text.split('');
            setOtp(newOtp);
            inputsRef.current[5].focus();
        }
    };

    // Fungsi untuk mengatur fokus pada input OTP pertama saat komponen di-render
    useEffect(() => {
        if (step === 2) {
            inputsRef.current[0].focus();
        }
    }, [step]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Fungsi untuk meng-handle pengiriman form OTP
    const handleOtpSubmit = (event) => {
        event.preventDefault();
        // Verifikasi OTP
        setStep(3); // Lanjut ke reset password setelah OTP benar
    };



    // State untuk countdown timer
    const [timer, setTimer] = useState(180); // Set timer awal ke 180 detik (3 menit)
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
            setIsTimerActive(false); // Timer selesai, matikan
        }
        return () => clearInterval(countdown);
    }, [timer, isTimerActive]);

    // Fungsi untuk meng-handle resend code
    const handleResendCode = () => {
        setTimer(180); // Set timer kembali ke 180 detik (3 menit)
        setIsTimerActive(true); // Aktifkan kembali countdown
    };

    // Format timer ke bentuk menit:detik (MM:SS)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60); // Dapatkan menit
        const seconds = time % 60; // Dapatkan detik
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Format MM:SS
    };


    const obfuscatedEmail = obfuscateEmail(email);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast({
                variant: "destructive",
                title: "Input email",
                description: "Email harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        try {
            await axios.post(`${API_URL}/api/auth/forgot-password`, {
                email,
            });
            toast({
                title: "Suscces",
                description: "Email berhasil terkirim , cek email anda.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            setStep(2);
            setTimer(180);
            setIsTimerActive(true);
        } catch (error) {
            console.error("Login failed:", error);
            const errorMessage = error.response ? error.response.data.message : "Something went wrong";
            toast({
                variant: "destructive",
                title: "!Error",
                description: errorMessage,  // Pesan error dari response atau fallback
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        }
    }
    const handleResetPassowrd = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                variant: "destructive",
                title: "Password Mismatch",
                description: "Kata sandi dan konfirmasi kata sandi tidak cocok.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        try {
            await axios.post(`${API_URL}/api/auth/reset-password`, {
                token:otpString,
                newPassword:password
            });
            toast({
                title: "Suscces",
                description: "Password sudah diperbarui , silakan login.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
            const errorMessage = error.response ? error.response.data.message : "Something went wrong";
            toast({
                variant: "destructive",
                title: "!Error",
                description: errorMessage,  // Pesan error dari response atau fallback
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
        }
    }

    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen">
            <Toaster />
            {step === 1 && (
                // Tahap send email
                <div className="mx-auto w-full max-w-[450px] pt-[52px] pb-[52px] ">
                    <h1 className='text-center text-[30px] font-semibold'>Lupa password?</h1>
                    <p className="text-[14px]  text-gray-500 mt-[16px] mb-[36px] self-stretch">
                        Masukkan alamat email yang Anda gunakan saat bergabung dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda.
                        <br />
                        <br />
                        Demi alasan keamanan, kami TIDAK menyimpan kata sandi Anda. Jadi, yakinlah bahwa kami tidak akan pernah mengirimkan kata sandi Anda melalui email.
                    </p>
                    <div className="grid gap-[36px]">
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
                        <Button onClick={handleEmailSubmit} className="w-full h-[40px]  font-medium">
                            Kirim instruksi rubah Kata Sandi
                        </Button>
                    </div>
                </div>
            )}

            {step === 2 && (
                // Tahap OTP
                <div className="mx-auto w-full max-w-[450px] pt-[52px] pb-[52px] ">
                    <h1 className='text-center text-[30px] font-semibold'>Lupa password?</h1>
                    <p className="text-[16px] text-center  text-gray-500 mt-[16px] text-[400] mb-[36px] self-stretch">
                        Silahkan memasukkan kode 6-digit angka yang dikirimkan ke <span className='text-black'>{obfuscatedEmail}</span>
                    </p>

                    <form onSubmit={handleOtpSubmit} className="grid gap-[32px]">
                        <div className="flex items-center justify-center gap-3">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border  hover:border-slate-200 appearance-none rounded-lg p-4 outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
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
                                <p>{formatTime(timer)}</p>
                            </div>
                        ) : (
                            <Link to="#" onClick={handleResendCode} className=" underline inline-block text-[14px] font-medium text-center mt-4">
                                Resend code
                            </Link>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-[40px]  text-[14px] font-medium"
                        >
                            Verifikasi Akun
                        </Button>
                        <Button
                            onClick={() => setStep(1)}
                            variant="outline"
                            className="w-full h-[40px]  text-[14px] font-medium"
                        >
                            Kembali ke Halaman Login
                        </Button>
                    </form>
                </div>
            )}

            {step === 3 && (
                // Tahap reset password
                <div className="mx-auto w-full max-w-[450px] pt-[52px] pb-[52px] ">

                    <h1 className='text-center text-[30px] font-semibold'>Daftar akun baru</h1>
                    <p className="text-[14px] text-center  text-gray-500 mt-[16px] text-[400] mb-[36px] self-stretch">
                        Silahkan masukkan Kata Sandi baru anda
                    </p>


                    <div className="grid gap-[36px]">
                        <div className='grid gap-4'>
                            <div className="grid gap-1">
                                <Label htmlFor="password" className="text-[14px]">Kata Sandi</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Tulis Kata Sandi baru"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-[40px] text-[14px] rounded-lg border-slate-300 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        {showPassword ? <Eye size="20" /> : <EyeSlash size="20" />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="confirmPassword" className="text-[14px]">Ulangi Kata Sandi Anda</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Ulangi Kata Sandi diatas"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="h-[40px] text-[14px] rounded-lg border-slate-300 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        {showConfirmPassword ? <Eye size="20" /> : <EyeSlash size="20" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-4'>
                            <Button type="submit" className="w-full h-[40px]  text-[14px] font-medium" onClick={handleResetPassowrd}>
                                Konfirmasi Kata Sandi
                            </Button>
                            <div className="text-center text-[14px] font-medium text-slate-500">
                                Dengan menekan tombol diatas, anda telah menyetujui{" "}
                                <Link className='underline text-black'  >
                                    Syarat dan Ketentuan
                                </Link>
                                {" "}serta{" "}
                                <Link className='underline text-black'  >
                                    Kebijakan Privasi
                                </Link>
                                {" "}kami
                            </div>
                        </div>
                    </div>


                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
