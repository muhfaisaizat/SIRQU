import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoPlus } from "react-icons/go";
import ImageUpload from '@/components/ui/ImageUpload'
import { Eye, EyeSlash } from 'iconsax-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { X } from "lucide-react"

const AddPengguna = ({ buttonProps, title, showIcon }) => {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nama, email, password, confirmPassword, role } = formData;

    // Validasi
    if (!nama) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Nama pengguna harus diisi.",
        action: <ToastAction altText="Try again">Cancel</ToastAction>,
      });
      return;
    }

    if (!email) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Email harus diisi.",
        action: <ToastAction altText="Try again">Cancel</ToastAction>,
      });
      return;
    }

    if (!password) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Kata sandi harus diisi.",
        action: <ToastAction altText="Try again">Cancel</ToastAction>,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Kata sandi tidak cocok.",
        action: <ToastAction altText="Try again">Cancel</ToastAction>,
      });
      return;
    }

    if (!role) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Role harus dipilih.",
        action: <ToastAction altText="Try again">Cancel</ToastAction>,
      });
      return;
    }

    // Logika penyimpanan data di sini
    // Misalnya: simpanData(formData);

    toast({
      title: "Sukses!",
      description: "Pengguna berhasil ditambahkan.",
      action: <ToastAction altText="Try again">Cancel</ToastAction>,
    });

    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button  {...buttonProps}>{showIcon && <GoPlus size={16} />} {title}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[505px]">
          <div className='flex justify-between'>
            <DialogHeader>
              <DialogTitle className='text-[18px] py-[16px]'>Tambah Pengguna</DialogTitle>
            </DialogHeader>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                <X className='h-[16px] w-[16px]' />
              </Button>
            </DialogClose>

          </div>
          <div className="grid gap-[16px] py-4">
            <div className='h-[154px] w-[154px]'>
              <ImageUpload />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="nama" className="text-[14px]">Nama pengguna<span className='text-rose-500'>*</span></Label>
              <Input
                id="nama"
                placeholder="Masukkan Nama pengguna"
                required
                className="h-[36px] text-[14px] rounded-lg border-slate-300"
                value={formData.nama}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email" className="text-[14px]">Email<span className='text-rose-500'>*</span></Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email anda"
                required
                className="h-[36px] text-[14px] rounded-lg border-slate-300"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password" className="text-[14px]">Kata Sandi<span className='text-rose-500'>*</span></Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tulis Kata Sandi baru"
                  required
                  className="h-[36px] text-[14px] rounded-lg border-slate-300 pr-10"
                  value={formData.password}
                  onChange={handleInputChange}
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
            <div className="grid gap-1">
              <Label htmlFor="confirm-password" className="text-[14px]">Ulangi Kata Sandi Anda<span className='text-rose-500'>*</span></Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Ulangi Kata Sandi diatas"
                  required
                  className="h-[36p} text-[14px] rounded-lg border-slate-300 pr-10"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  {showConfirmPassword ? <EyeSlash size="16" color="#94A3B8" /> : <Eye size="16" color="#94A3B8" />}
                </button>
              </div>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="role" className="text-[14px]">Role<span className='text-rose-500'>*</span></Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full h-[36px] text-[14px] rounded-lg border-slate-300 ">
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Admin" className='text-[14px]'>Admin</SelectItem>
                    <SelectItem value="Manager" className='text-[14px]'>Manager</SelectItem>
                    <SelectItem value="Kasir" className='text-[14px]'>Kasir</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddPengguna;
