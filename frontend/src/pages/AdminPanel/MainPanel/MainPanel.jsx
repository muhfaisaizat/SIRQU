import React, { useState } from 'react'
import logo from "../../../assets/Logo.svg";
import { Category, ShoppingCart, Diagram, User, Shop, Box, ArrowDown2, ArrowUp2, ArrowRight2 } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import DaftarPengguna from '../ManajemenUser/DaftarPengguna/DaftarPengguna';
import {
    Breadcrumb,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const MainPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const [breadcrumb, setBreadcrumb] = useState(['Menu']);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        updateBreadcrumb(linkName);
    };

    const handlemenu = (name) => {
        updateBreadcrumb(name);
    }


    const updateBreadcrumb = (linkName) => {
        let newBreadcrumb = [];

        if (linkName === 'kategori') {
            newBreadcrumb.push('Pengaturan', 'Produk dan stok', 'Daftar kategori');
        } else if (linkName === 'produk') {
            newBreadcrumb.push('Pengaturan', 'Produk dan stok', 'Daftar produk');
        } else if (linkName === 'stok') {
            newBreadcrumb.push('Pengaturan', 'Produk dan stok', 'Tambah stok');
        } else if (linkName === 'terbuang') {
            newBreadcrumb.push('Pengaturan', 'Produk dan stok', 'Stok terbuang');
        } else if (linkName === 'pengguna') {
            newBreadcrumb.push('Pengaturan', 'Manajemen pengguna', 'Daftar pengguna');
        } else if (linkName === 'izin') {
            newBreadcrumb.push('Pengaturan', 'Manajemen pengguna', 'Pengaturan izin akses');
        } else if (linkName === 'dashboard') {
            newBreadcrumb.push('Menu', 'Dashboard');
        } else if (linkName === 'kasir') {
            newBreadcrumb.push('Menu', 'Sistem Kasir');
        } else if (linkName === 'uang') {
            newBreadcrumb.push('Menu', 'Keuangan');
        } else if (linkName === 'toko') {
            newBreadcrumb.push('Pengaturan', 'Toko');
        }

        setBreadcrumb(newBreadcrumb);
    };



    return (
        <div className='w-full'>


            {/* header */}
            <div className='fixed flex justify-between items-center w-[100%] border h-[60px] px-[32px] ps-[32px] bg-white'>
                <button className="flex text-center justify-center gap-[14px]">
                    <img src={logo} alt="Logo" className='pt-1' />
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

            <div className='flex w-full h-screen bg-slate-50 pt-[60px]'>


                {/* Sidebar */}
                <div className='w-[288px] bg-slate-50  px-[32px] ps-[32px] pt-[10px] pb-[10px]'>
                    <div className=''>
                        <h2 className='text-slate-500 text-[11px] mb-4 pl-2'>MENU</h2>
                        <ul>
                            <li className=' flex items-center text-gray-700 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-md' onClick={() => handlemenu('dashboard')}>
                                <Link className='flex gap-3 justify-center' >
                                    <Category size={16} color='#64748B' />
                                    <span className="text-slate-500 font-medium text-[14px]">Dashboard</span>
                                </Link>
                            </li>
                            <li className=' flex items-center text-gray-700 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-md' onClick={() => handlemenu('kasir')}>
                                <Link className='flex gap-3 justify-center' >
                                    <ShoppingCart size={16} color='#64748B' />
                                    <span className="text-slate-500 font-medium text-[14px]">Sistem Kasir</span>
                                </Link>
                            </li>
                            <li className=' flex items-center text-gray-700 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-md' onClick={() => handlemenu('uang')}>
                                <Link className='flex gap-3 justify-center' >
                                    <Diagram size={16} color='#64748B' />
                                    <span className="text-slate-500 font-medium text-[14px]">Keuangan</span>
                                </Link>
                            </li>

                        </ul>

                        <h2 className='text-slate-500 text-[11px] mt-[24px] mb-4 ps-2'>PENGATURAN</h2>
                        <ul>
                            <li className=''>

                                <Link
                                    className={`flex justify-between ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-md ${isOpen ? 'bg-slate-200 hover:bg-slate-200' : ''}`}
                                    onClick={toggleDropdown}
                                >
                                    <div className='flex gap-3'>
                                        <Box size={16} color='#64748B' />
                                        <span className='text-slate-500 font-medium text-[14px]'>Produk dan stok</span>
                                    </div>
                                    {isOpen ? (
                                        <ArrowDown2 size={16} color='#64748B' className='mt-1' />
                                    ) : (
                                        <ArrowUp2 size={16} color='#64748B' className='mt-1' />
                                    )}
                                </Link>
                                {isOpen && (
                                    <ul>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-md text-slate-500 ${activeLink === 'kategori' ? 'bg-teal-500 hover:bg-teal-500 text-white' : ''
                                                    }`}
                                                onClick={() => handleLinkClick('kategori')}
                                            >
                                                <span className=' font-medium text-[14px]'>Daftar kategori</span>
                                            </Link>
                                        </li>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-md text-slate-500  ${activeLink === 'produk' ? 'bg-teal-500 hover:bg-teal-500 text-white' : ''
                                                    }`}
                                                onClick={() => handleLinkClick('produk')}
                                            >
                                                <span className=' font-medium text-[14px]'>Daftar produk</span>
                                            </Link>
                                        </li>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-md text-slate-500 ${activeLink === 'stok' ? 'bg-teal-500 hover:bg-teal-500 text-white' : ''
                                                    }`}
                                                onClick={() => handleLinkClick('stok')}
                                            >
                                                <span className=' font-medium text-[14px]'>Tambah stok</span>
                                            </Link>
                                        </li>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-md text-slate-500 ${activeLink === 'terbuang' ? 'bg-teal-500 hover:bg-teal-500 text-white' : ''
                                                    }`}
                                                onClick={() => handleLinkClick('terbuang')}
                                            >
                                                <span className=' font-medium text-[14px]'>Stok terbuang</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li className=''>

                                <Link
                                    className={`flex justify-between ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-md ${isOpen2 ? 'bg-slate-200 hover:bg-slate-200' : ''}`}
                                    onClick={toggleDropdown2}
                                >
                                    <div className='flex gap-3'>
                                        <User size={16} color='#64748B' />
                                        <span className='text-slate-500 font-medium text-[14px]'>Manajemen pengguna</span>
                                    </div>
                                    {isOpen2 ? (
                                        <ArrowDown2 size={16} color='#64748B' className='mt-1' />
                                    ) : (
                                        <ArrowUp2 size={16} color='#64748B' className='mt-1' />
                                    )}
                                </Link>
                                {isOpen2 && (
                                    <ul>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-md text-slate-500 ${activeLink === 'pengguna' ? 'bg-teal-500 hover:bg-teal-500 text-white' : ''
                                                    }`}
                                                onClick={() => handleLinkClick('pengguna')}
                                                to="/admin-panel/daftar-pengguna"
                                            >
                                                <span className=' font-medium text-[14px]'>Daftar pengguna</span>
                                            </Link>
                                        </li>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-md text-slate-500  ${activeLink === 'izin' ? 'bg-teal-500 hover:bg-teal-500 text-white' : ''
                                                    }`}
                                                onClick={() => handleLinkClick('izin')}
                                            >
                                                <span className=' font-medium text-[14px]'>Pengaturan izin akses</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li className=' flex items-center text-gray-700 ps-2 px-2 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-md' onClick={() => handlemenu('toko')}>
                                <Link className='flex gap-3 justify-center' >
                                    <Shop size={16} color='#64748B' />
                                    <span className="text-slate-500 font-medium text-[14px]">Toko</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>



                {/* Main Panel */}
                <div className='flex-1 pt-8 ps-6 px-6 bg-white rounded-l-3xl border-l-2 border-gray-200'>


                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumb.map((item, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && (
                                        <BreadcrumbSeparator>
                                            <ArrowRight2 size={20} color='#64748B' />
                                        </BreadcrumbSeparator>
                                    )}
                                    <BreadcrumbLink
                                        href="#"
                                        className={`text-[14px] font-medium ${index > 0 ? 'text-black font-medium' : 'text-gray-500'}`}>
                                        {item}
                                    </BreadcrumbLink>
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>


                    <Routes>
                        {/* <Route path="*" element={<DaftarPengguna />}/> */}
                        <Route path="daftar-pengguna" element={<DaftarPengguna />} />
                    </Routes>
                </div>
            </div>


        </div>
    )
}

export default MainPanel
