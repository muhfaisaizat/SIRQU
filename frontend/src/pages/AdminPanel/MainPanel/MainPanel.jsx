import React, { useState, useEffect } from 'react';
import { Category, ShoppingCart, Diagram, User, Box, ArrowDown2, ArrowUp2, Celo, Shop,ReceiptItem, EmptyWalletChange } from 'iconsax-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import DaftarPengguna from '../ManajemenUser/DaftarPengguna/DaftarPengguna';
import Dashboard from '../Dashboard/Dashboard';
import { Toaster } from "@/components/ui/toaster"
import Kategori from '../ManajemenProduk&Stok/Kategori/Kategori';
import Produk from '../ManajemenProduk&Stok/Produk/Produk';
import Stok from '../ManajemenProduk&Stok/Stok/Stok';
import Outlet from '../ManajemenToko/Outlet/Outlet';
import AddToko from '../ManajemenToko/Toko/AddToko';
import Kasir from '../Kasir/SistemKasir/Kasir';
import DaftarOrder from '../Kasir/ManajemenKasir/DaftarOrder';
import PajakStruk from '../Pengaturan/Pajak&Struk/PajakStruk';
import Promosi from '../Pengaturan/Promosi/Promosi';
import Penjualan from '../Penjualan/Penjualan';
import Logout from './Logout';
import Belanja from '../Belanja/Belanja';
import axios from 'axios';
import { API_URL } from "../../../helpers/networt";
import { ScrollArea } from '@/components/ui/scroll-area';

const MainPanel = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();
    const [showAddToko, setShowAddToko] = useState(false);
    const syarat_ketentuan = localStorage.getItem("syarat_ketentuan");
    const role = localStorage.getItem("role");
    const savedLink = localStorage.getItem('activeLink');

    const handleRedirect = () => {
        if (syarat_ketentuan === "0") {
          // Arahkan ke halaman syarat dan ketentuan
          handlemenu('toko');
          navigate('/admin-panel/kelola-outlet/syarat-ketentuan');
        } else if (syarat_ketentuan === "1") {
          // Arahkan ke halaman data
          handlemenu('toko');
          navigate('/admin-panel/kelola-outlet/data');
        } else {
          console.warn("Nilai 'syarat_ketentuan' tidak valid:", syarat_ketentuan);
        }
      };

      useEffect(() => {
        const handleStorageChange = () => {
            const newLink = localStorage.getItem('activeLink');
            console.log('storage event triggered. activeLink:', newLink); // Cek nilai di sini
            setActiveLink(newLink || 'dashboard');
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    useEffect(() => {
        const savedLink = localStorage.getItem('activeLink');
        if (savedLink) {
            setActiveLink(savedLink);
        } else {
            setActiveLink('dashboard');
        }
    }, []);
    

    useEffect(() => {
        if (location.pathname === '/admin-panel/wellcome') {
            setShowAddToko(true); 
        } else {
            setShowAddToko(false); 
        }
    }, [location.pathname]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
    };

    const toggleDropdown3 = () => {
        setIsOpen3(!isOpen3);
    };

    const toggleDropdown4 = () => {
        setIsOpen4(!isOpen4);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        localStorage.setItem('activeLink', linkName); 
    };

    const handlemenu = (name) => {
        setActiveLink(name);
        localStorage.setItem('activeLink', name); 
    };

    const [DataOutlet, setDataOutlet] = useState([]);

    const formatOutletData = (apiData) => {
        return {
            id: apiData.id_outlet.toString(),
            name: apiData.nama_outlet
        };
    };

    const fetchDataOutlet = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/outlets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
           // Log untuk memastikan data yang diterima
    
            // Pastikan response.data adalah array
            if (Array.isArray(response.data.data)) {
                const formattedData = response.data.data.map(formatOutletData);
               
                setDataOutlet(formattedData);
                // setOriginalData(formattedData); // Set originalData di sini
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };


    useEffect(() => {
        fetchDataOutlet();
    }, []);



    const handleLinkClickKasir = (outlet) => {
        localStorage.setItem('idOutletKasir', Number(outlet.id));  
        localStorage.setItem('dataOutletLocal', JSON.stringify(outlet));
        window.dispatchEvent(new CustomEvent('kasir', { detail: outlet }));
    };

    return (
        <div >
            <Toaster />
            {/* header */}
            <div className='fixed flex justify-between items-center w-[100%] border h-[60px] px-[32px] ps-6 bg-white'>
                <button className="flex text-center justify-center gap-[14px]">
                    <Celo size={30} variant="Bulk" />
                    <p className='text-[24px] font-semibold'>Sirqu</p>
                </button>
                    <Logout/>
            </div>

            <div className='flex w-[100%] h-screen pt-[60px]'>
                {/* Sidebar */}
                <ScrollArea className='w-[18.33%] h-[100%] p-[12px]'>
                    <div>
                        <ul>
                            <li  className={`flex items-center ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px] ${activeLink === 'dashboard' ? 'bg-black hover:bg-slate-950 text-white' : ''}`} onClick={() => {handlemenu('dashboard'); navigate('/admin-panel/dashboard'); }}>
                                <Link  className='flex gap-3 justify-center'>
                                    <Category size={16} />
                                    <span className="font-medium text-[14px]">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`flex justify-between ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px]`}
                                    onClick={toggleDropdown4}
                                >
                                    <div className='flex gap-3'>
                                        <ShoppingCart size={16} />
                                        <span className="font-medium text-[14px]">Sistem Kasir</span>
                                    </div>
                                    {isOpen4 ? (
                                        <ArrowUp2 size={16} className='mt-1' />
                                    ) : (
                                        <ArrowDown2 size={16} className='mt-1' />
                                    )}
                                </Link>
                                {isOpen4 && (
                                    <>
                                    {DataOutlet.length > 0 ? (
                                        <ul>
                                          {DataOutlet.map((outlet) => (
                                            <li key={outlet.id} className="pl-[25px]">
                                              <Link
                                                className={`flex gap-3 ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-[6px] ${
                                                  activeLink === outlet.name ? 'bg-black hover:bg-slate-950 text-white' : ''
                                                }`}
                                                
                                                onClick={() => {
                                                    handleLinkClick(outlet.name);
                                                    handleLinkClickKasir(outlet); 
                                                    
                                                }}
                                                to="/admin-panel/sistem-kasir"
                                              >
                                                <span className="font-medium text-[14px]">{outlet.name}</span>
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      ) : null}
                                      </>
                                )}
                            </li>
                            <li className={`flex items-center ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px] ${activeLink === 'uang' ? 'bg-black hover:bg-slate-950 text-white' : ''}`} onClick={() => {handlemenu('uang'); navigate('/admin-panel/penjualan'); }}>
                                <Link className='flex gap-3 justify-center'>
                                    <ReceiptItem size={16} />
                                    <span className="font-medium text-[14px]">Penjualan</span>
                                </Link>
                            </li>
                            {role !== "Kasir" && (
                            <li className={`flex items-center ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px] ${activeLink === 'belanja' ? 'bg-black hover:bg-slate-950 text-white' : ''}`} onClick={() => {handlemenu('belanja'); navigate('/admin-panel/belanja'); }}>
                                <Link className='flex gap-3 justify-center'>
                                    <EmptyWalletChange size={16} />
                                    <span className="font-medium text-[14px]">Belanja</span>
                                </Link>
                            </li>
                            )}
                        </ul>

                        <ul>
                        {role !== "Kasir" && (
                            <li>
                                <Link
                                    className={`flex justify-between ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px]`}
                                    onClick={toggleDropdown3}
                                >
                                    <div className='flex gap-3'>
                                        <Box size={16} />
                                        <span className='font-medium text-[14px]'>Pengaturan</span>
                                    </div>
                                    {isOpen3 ? (
                                        <ArrowUp2 size={16} className='mt-1' />
                                    ) : (
                                        <ArrowDown2 size={16} className='mt-1' />
                                    )}
                                </Link>
                                {isOpen3 && (
                                    <ul>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-[6px] ${activeLink === 'pajak&struk' ? 'bg-black hover:bg-slate-950 text-white' : ''}`}
                                                onClick={() => handleLinkClick('pajak&struk')}
                                                to="/admin-panel/pajak&struk"
                                            >
                                                <span className='font-medium text-[14px]'>Pajak &  Struk</span>
                                            </Link>
                                        </li>
                                        <li className='pl-[25px]'>
                                            <Link
                                                className={`flex gap-3 ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 rounded-[6px] ${activeLink === 'promosi' ? 'bg-black hover:bg-slate-950 text-white' : ''}`}
                                                onClick={() => handleLinkClick('promosi')}
                                                to="/admin-panel/promosi"
                                            >
                                                <span className='font-medium text-[14px]'>Promosi</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        )}
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
                                        <ArrowUp2 size={16} className='mt-1' />
                                    ) : (
                                        <ArrowDown2 size={16} className='mt-1' />
                                    )}
                                </Link>
                                {isOpen && (
                                    <ul>
                                        {role !== "Kasir" && (
                                            <>
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
                                        </>
                                        )}
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
                            {role !== "Kasir" && (
                                <>
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
                                        <ArrowUp2 size={16} className='mt-1' />
                                    ) : (
                                        <ArrowDown2 size={16} className='mt-1' />
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
                            <li className={`flex items-center ps-3 px-3 pt-[10px] pb-[10px] hover:bg-slate-100 cursor-pointer rounded-[6px] ${activeLink === 'toko' ? 'bg-black hover:bg-slate-950 text-white' : ''}`}  onClick={handleRedirect}>
                                <Link className='flex gap-3 justify-center'>
                                    <Shop  size={16} />
                                    <span className="font-medium text-[14px]">Kelola Outlet</span>
                                </Link>
                            </li>
                            </>
                            )}
                        </ul>
                    </div>
                </ScrollArea>

                {/* Main Panel */}
                <div className='flex-1 w-[81.67%]  bg-white border-l border-gray-200 '>
                    <Routes>
                        <Route path="*" element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard handlemenu={handlemenu} />} />
                        <Route path="penjualan" element={<Penjualan />} />
                        <Route path="belanja" element={<Belanja />} />
                        <Route path="pajak&struk" element={<PajakStruk />} />
                        <Route path="promosi" element={<Promosi />} />
                        <Route path="sistem-kasir" element={<Kasir/>} />
                        <Route path="sistem-kasir/daftar-order" element={<DaftarOrder />} />
                        <Route path="kategori" element={<Kategori />} />
                        <Route path="produk" element={<Produk />} />
                        <Route path="stok" element={<Stok />} />
                        <Route path="kelola-outlet/*" element={<Outlet />} />
                        <Route path="daftar-pengguna" element={<DaftarPengguna />} />
                    </Routes>
                </div>
                {showAddToko && <AddToko open={showAddToko} onClose={() => setShowAddToko(false)} />}
            </div>
        </div>
    );
};

export default MainPanel;
