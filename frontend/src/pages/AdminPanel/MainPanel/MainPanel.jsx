import React, { useState, useEffect } from 'react';
import { Category, ShoppingCart, Diagram, User, Box, ArrowDown2, ArrowUp2, Celo, Shop, } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import DaftarPengguna from '../ManajemenUser/DaftarPengguna/DaftarPengguna';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Dashboard from '../Dashboard/Dashboard';
import { Toaster } from "@/components/ui/toaster"
import Kategori from '../ManajemenProduk&Stok/Kategori/Kategori';
import Produk from '../ManajemenProduk&Stok/Produk/Produk';
import Stok from '../ManajemenProduk&Stok/Stok/Stok';
import Outlet from '../ManajemenToko/Outlet/Outlet';

const MainPanel = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const savedLink = localStorage.getItem('activeLink');
        if (savedLink) {
            setActiveLink(savedLink);
        } else {
            setActiveLink('dashboard');
        }
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        localStorage.setItem('activeLink', linkName); 
    };

    const handlemenu = (name) => {
        setActiveLink(name);
        localStorage.setItem('activeLink', name); 
    };

    return (
        <div className='w-full'>
            <Toaster />
            {/* header */}
            <div className='fixed flex justify-between items-center w-[100%] border h-[60px] px-[32px] ps-6 bg-white'>
                <button className="flex text-center justify-center gap-[14px]">
                    <Celo size={30} variant="Bulk" />
                    <p className='text-[24px] font-semibold'>Sirqu</p>
                </button>
                <div className='flex gap-3'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className='text-[14px] font-medium pt-1 pb-1'>Daffa Fairuz</p>
                </div>
            </div>

            <div className='flex w-full h-screen pt-[60px]'>
                {/* Sidebar */}
                <div className='w-[264px] p-[12px]'>
                    <div>
                        <ul>
                            <li  className={`flex items-center ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px] ${activeLink === 'dashboard' ? 'bg-black hover:bg-slate-950 text-white' : ''}`} onClick={() => {handlemenu('dashboard'); navigate('/admin-panel/dashboard'); }}>
                                <Link  className='flex gap-3 justify-center'>
                                    <Category size={16} />
                                    <span className="font-medium text-[14px]">Dashboard</span>
                                </Link>
                            </li>
                            <li className={`flex items-center ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px] ${activeLink === 'kasir' ? 'bg-black hover:bg-slate-950 text-white' : ''}`} onClick={() => handlemenu('kasir')}>
                                <Link className='flex gap-3 justify-center'>
                                    <ShoppingCart size={16} />
                                    <span className="font-medium text-[14px]">Sistem Kasir</span>
                                </Link>
                            </li>
                            <li className={`flex items-center ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px] ${activeLink === 'uang' ? 'bg-black hover:bg-slate-950 text-white' : ''}`} onClick={() => handlemenu('uang')}>
                                <Link className='flex gap-3 justify-center'>
                                    <Diagram size={16} />
                                    <span className="font-medium text-[14px]">Keuangan</span>
                                </Link>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <Link
                                    className={`flex justify-between ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px]`}
                                    onClick={toggleDropdown}
                                >
                                    <div className='flex gap-3'>
                                        <Box size={16} />
                                        <span className='font-medium text-[14px]'>Produk dan stok</span>
                                    </div>
                                    {isOpen ? (
                                        <ArrowDown2 size={16} className='mt-1' />
                                    ) : (
                                        <ArrowUp2 size={16} className='mt-1' />
                                    )}
                                </Link>
                                {isOpen && (
                                    <ul>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-[6px] ${activeLink === 'kategori' ? 'bg-black hover:bg-slate-950 text-white' : ''}`}
                                                onClick={() => handleLinkClick('kategori')}
                                                to="/admin-panel/kategori"
                                            >
                                                <span className='font-medium text-[14px]'>Kategori</span>
                                            </Link>
                                        </li>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-[6px] ${activeLink === 'produk' ? 'bg-black hover:bg-slate-950 text-white' : ''}`}
                                                onClick={() => handleLinkClick('produk')}
                                                to="/admin-panel/produk"
                                            >
                                                <span className='font-medium text-[14px]'>Produk</span>
                                            </Link>
                                        </li>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-[6px] ${activeLink === 'stok' ? 'bg-black hover:bg-slate-950 text-white' : ''}`}
                                                onClick={() => handleLinkClick('stok')}
                                                 to="/admin-panel/stok"
                                            >
                                                <span className='font-medium text-[14px]'>Kelola stok</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <Link
                                    className={`flex justify-between ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px]`}
                                    onClick={toggleDropdown2}
                                >
                                    <div className='flex gap-3'>
                                        <User size={16} />
                                        <span className='font-medium text-[14px]'>Manajemen pengguna</span>
                                    </div>
                                    {isOpen2 ? (
                                        <ArrowDown2 size={16} className='mt-1' />
                                    ) : (
                                        <ArrowUp2 size={16} className='mt-1' />
                                    )}
                                </Link>
                                {isOpen2 && (
                                    <ul>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-[6px] ${activeLink === 'pengguna' ? 'bg-black hover:bg-slate-950 text-white' : ''}`}
                                                onClick={() => handleLinkClick('pengguna')}
                                                to="/admin-panel/daftar-pengguna"
                                            >
                                                <span className='font-medium text-[14px]'>Daftar pengguna</span>
                                            </Link>
                                        </li>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-[6px] ${activeLink === 'izin' ? 'bg-black hover:bg-slate-950 text-white' : ''}`}
                                                onClick={() => handleLinkClick('izin')}
                                            >
                                                <span className='font-medium text-[14px]'>Pengaturan izin akses</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li className={`flex items-center ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px] ${activeLink === 'toko' ? 'bg-black hover:bg-slate-950 text-white' : ''}`} onClick={() => {handlemenu('toko'); navigate('/admin-panel/kelola-outlet'); }}>
                                <Link className='flex gap-3 justify-center'>
                                    <Shop  size={16} />
                                    <span className="font-medium text-[14px]">Kelola Outlet</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Panel */}
                <div className='flex-1  bg-white border-l border-gray-200 '>
                    <Routes>
                        <Route path="*" element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="kategori" element={<Kategori />} />
                        <Route path="produk" element={<Produk />} />
                        <Route path="stok" element={<Stok />} />
                        <Route path="kelola-outlet" element={<Outlet />} />
                        <Route path="daftar-pengguna" element={<DaftarPengguna />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default MainPanel;
