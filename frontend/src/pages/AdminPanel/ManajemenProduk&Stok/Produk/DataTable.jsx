import React, { useState, useEffect } from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { MoreVertical } from "lucide-react"
import { GoPlus } from "react-icons/go";
import { User, } from 'iconsax-react';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { FiEdit2 } from "react-icons/fi";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import ImageUpload from '@/components/ui/ImageUpload'
import { GalleryAdd } from 'iconsax-react';
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import NoData from "./NoData";
import { CloseCircle } from 'iconsax-react';
import { Trash } from 'iconsax-react';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";







// Main component
const DataTableDemo = () => {

    // data
    const [data, setData] = useState([
        {
            id: "m5gr84i9",
            name: 'kopi',
            kategori: "Makanan ringan, Populer",
            harga: "50000000",
            outlet: "Oulet 1, Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "3u1reuv4",
            name: 'susu',
            kategori: "Populer",
            harga: "50000",
            outlet: "Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png, https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "derv1ws0",
            name: 'onde-onde',
            kategori: "Makanan ringan, Populer",
            harga: "50000",
            outlet: "Oulet 1, Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "5kma53ae",
            name: 'bakwan',
            kategori: "Makanan ringan",
            harga: "50000",
            outlet: "Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "bhqecj4p",
            name: 'soto',
            kategori: "Populer",
            outlet: "Oulet 1, Outlet 2",
            harga: "50000",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "bhqecj4p234",
            name: 'jairo vernandes',
            kategori: "12",
            harga: "50000",
            outlet: "Oulet 1, Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "bhqecj4p23467",
            name: 'jairo vernandes',
            kategori: "12",
            harga: "50000",
            outlet: "Oulet 1, Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "bhqecj4p23467g",
            name: 'jairo vernandes',
            kategori: "12",
            harga: "50000",
            outlet: "Oulet 1, Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "bhqecj4p23467g7",
            name: 'jairo vernandes',
            kategori: "12",
            harga: "50000",
            outlet: "Oulet 1, Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "bhqecj4p23467g76",
            name: 'jairo vernandes',
            kategori: "12",
            harga: "50000",
            outlet: "Oulet 1, Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
        {
            id: "bhqecj4p23467g76",
            name: 'jairo vernandes',
            kategori: "12",
            harga: "50000",
            outlet: "Oulet 1, Outlet 2",
            date: "23 Oktober 2024",
            deskripsi: 'Ini adalah makanan sejeni sate hanya saja tidak memiliki kuah sehingga makanan ini cocok untuk dimakan bersama kucing',
            foto: 'https://github.com/shadcn.png, https://github.com/shadcn.png'
        },
    ]);

    // status
    const [originalData, setOriginalData] = useState(data); // Tambahkan state untuk data asli

    // Define columns
    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="h-[16px] w-[16px]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="h-[16px] w-[16px]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: "Nama Produk",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "kategori",
            header: "Kategori",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("kategori")}</div>
            ),
        },
        {
            accessorKey: "harga",
            header: "Harga",
            cell: ({ row }) => {
                const harga = row.getValue("harga");
                const formattedHarga = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                }).format(harga);

                return <div className=" font-medium">{formattedHarga}</div>;
            },
        },
        {
            accessorKey: "outlet",
            header: "Outlet",
            cell: ({ row }) => <div className=" font-medium">{row.getValue("outlet")}</div>,
        },
        {
            accessorKey: "date",
            header: "Tanggal dibuat",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("date")}</div>
            ),
        },
        {
            accessorKey: "id",
            header: "id",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("id")}</div>
            ),
            enableSorting: true,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const id = row.getValue("id");
                const outlet = row.getValue("outlet")

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[164px]">
                            <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium" onClick={() => handleviewClick(id)}>View Produk</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium" onClick={() => handleEditClick(id)}>Edit Produk</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium text-rose-500 focus:text-rose-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]



    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [selectedOutlets, setSelectedOutlets] = useState([]); // State untuk menyimpan outlet yang dipilih

const handleOutletChange = (outletId) => {
    setSelectedOutlets((prevSelected) => {
        if (prevSelected.includes(outletId)) {
            return prevSelected.filter(id => id !== outletId); // Hapus outlet jika sudah ada
        } else {
            return [...prevSelected, outletId]; // Tambah outlet yang baru dipilih
        }
    });
};


    // Tentukan jumlah halaman berdasarkan total data dan pageSize
    const pageCount = Math.ceil(data.length / pagination.pageSize);

    // Tentukan data untuk halaman saat ini berdasarkan pageIndex dan pageSize
    const startIdx = pagination.pageIndex * pagination.pageSize;
    const endIdx = startIdx + pagination.pageSize;
    const pageData = originalData.slice(startIdx, endIdx);

    const table = useReactTable({
        data: pageData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
        pageCount, // Total halaman
        manualPagination: true,  // Menggunakan pagination manual
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        onPaginationChange: setPagination,
    })

    const totalPages = Math.ceil(data.length / pagination.pageSize);

    const [selectedId, setSelectedId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogOpenview, setIsDialogOpenview] = useState(false);
    const [formData, setFormData] = useState({
        nama: '',
        deskripsi: '',
        kategori: '',
        harga: '',
        outlet: '',
        date: '',
        foto: ''
    });
    const { toast } = useToast();
    const [deskripsi, setdeskripsi] = useState('');

    const handleInputChangedeskripsi = (event) => {
        setdeskripsi(event.target.value);
    };


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };



    const [DataOutlet, setDataOutlet] = useState([
        // { id: "m5gr84i9", name: 'Cabang 1' },
        // { id: "m5gr84i7", name: 'Cabang 2' },
        // { id: "m5gr84i8", name: 'Cabang 3' },
    ]);

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
                // console.log(formattedData)
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

    const handleSelectOutlet = (outlet) => {
        setSelectedOutlets((prevSelected) => {
            // Memeriksa apakah outlet sudah terpilih
            const isSelected = prevSelected.some((o) => o.id === outlet.id);
            if (isSelected) {
                // Jika outlet sudah terpilih, hapus dari selectedOutlets
                return prevSelected.filter((o) => o.id !== outlet.id);
            } else {
                // Jika outlet belum terpilih, tambahkan ke selectedOutlets
                return [...prevSelected, outlet];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedOutlets.length === DataOutlet.length) {
            setSelectedOutlets([]);
        } else {
            // Jika tidak semua outlet dipilih, pilih semua outlet
            setSelectedOutlets(DataOutlet);
        }
    };

    const handleRemoveOutlet = (id) => {
        setSelectedOutlets((prevSelected) => prevSelected.filter((outlet) => outlet.id !== id));
    };



    // upload image
    const [images, setImages] = useState([]);

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleUploadClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            const newImages = files.map((file) => URL.createObjectURL(file));
            setImages((prevImages) => [...prevImages, ...newImages]);
        };
        input.click();
    };

    const handleDelete = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleEdit = (index) => {
        // Logika untuk mengedit gambar
        // Misalnya: memunculkan dialog untuk mengganti gambar
        console.log(`Edit image at index ${index}`);
    };


    // kategori
    const [DataKategori, setDataKategori] = useState([
        // { id: "m5gr84i9", name: 'Makanan Ringan' },
        // { id: "m5gr84i7", name: 'Populer' },
        // { id: "m5gr84i8", name: 'sayur-sayuran' }
    ])

    const formatkategoriData = (apiData) => {
        return {
            id: apiData.id_kategori.toString(),
            name: apiData.nama_kategori
        };
    };

    const fetchDataKategori = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/categories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
           // Log untuk memastikan data yang diterima
    
            // Pastikan response.data adalah array
            if (Array.isArray(response.data.data)) {
                const formattedData = response.data.data.map(formatkategoriData);
               
                setDataKategori(formattedData);
                // console.log(formattedData)
                // setOriginalData(formattedData); // Set originalData di sini
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };


    useEffect(() => {
        fetchDataKategori();
    }, []);

    const [selectedKategori, setSelectedKategori] = useState([]);

    const handleSelectkategori = (kategori) => {
        setSelectedKategori((prevSelected) => {
            if (prevSelected.some((o) => o.id === kategori.id)) {
                return prevSelected.filter((o) => o.id !== kategori.id);
            } else {
                return [...prevSelected, kategori];
            }
        });
    };

    const handleSelectAllkategori = () => {
        if (selectedKategori.length === DataKategori.length) {
            setSelectedKategori([]); // Unselect all if all are selected
        } else {
            setSelectedKategori(DataKategori); // Select all outlets
        }
    };

    const handleRemoveKategori = (id) => {
        setSelectedKategori((prevSelected) => prevSelected.filter((kategori) => kategori.id !== id));
    };



    // untuk input uang
    const [uang, setUang] = useState('');

    // Fungsi untuk memformat angka menjadi format ribuan
    const formatNumber = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Fungsi untuk menangani perubahan input dan membatasi hanya angka
    const handleInputChangeuang = (e) => {
        const value = e.target.value;

        // Hanya mengizinkan angka
        const numberValue = value.replace(/\D/g, '');
        setUang(numberValue);
    };





    const handleEditClick = (id) => {
        const selectedData = data.find(item => item.id === id);
        if (selectedData) {
            const outlets = selectedData.outlet.split(", ").map((name, index) => ({ id: `outlet-${index}`, name }));
            setSelectedOutlets(outlets);
            const kategori = selectedData.kategori.split(", ").map((name, index) => ({ id: `kategori-${index}`, name }));
            setSelectedKategori(kategori);
            setSelectedId(id);
            setIsDialogOpen(true);
        }
    };

    const handleviewClick = (id) => {
        setSelectedId(id);
        setIsDialogOpenview(true);
    };


    useEffect(() => {
        const selectedData = data.find(item => item.id === selectedId);
        if (selectedData) {
            setFormData({
                nama: selectedData.name,
                uang: selectedData.harga,
                deskripsi: selectedData.deskripsi,
                kategori: selectedData.kategori,
                harga: selectedData.harga,
                outlet: selectedData.outlet,
                date: selectedData.date,
                foto: selectedData.foto
            });

            // Format dan set nilai uang ke dalam input
            const formattedUang = formatNumber(selectedData.harga.toString());
            setUang(formattedUang);
            setdeskripsi(selectedData.deskripsi);
            const splittedFotos = selectedData.foto.split(', ');
            setImages(splittedFotos);
        }
    }, [selectedId]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const { nama } = formData;

        if (selectedOutlets.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus memilih setidaknya satu outlet.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!nama) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Nama kategori harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (!deskripsi) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "deskripsi harus diisi.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }

        if (images.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus mengungah foto setidaknya satu.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (selectedKategori.length === 0) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Anda harus memilih setidaknya satu kategori.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }
        if (!uang) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Harga harus diisi dengan angka valid dan lebih dari 0.",
                action: <ToastAction altText="Try again">Cancel</ToastAction>,
            });
            return;
        }



        toast({
            title: "Sukses!",
            description: "Produk berhasil diperbarui.",
            action: <ToastAction altText="Try again">Cancel</ToastAction>,
        });

        setIsDialogOpen(false);
    };

    useEffect(() => {
        setColumnVisibility((prev) => ({ ...prev, id: false }));
    }, []);

    const [checkedOutlets, setCheckedOutlets] = useState([]);

const handleCheckboxChange = (outletName, isChecked) => {
  const updatedCheckedOutlets = isChecked
    ? [...checkedOutlets, outletName] // Tambah outlet yang dicentang
    : checkedOutlets.filter((name) => name !== outletName); // Hapus outlet yang tidak dicentang

  setCheckedOutlets(updatedCheckedOutlets);

  // Munculkan alert berisi outlet yang sudah dicentang
  alert(`Outlet yang dicentang: ${updatedCheckedOutlets.join(", ")}`);
};

    return (
        <div className="w-full grid gap-[16px] mt-[24px]">
            <div className="flex items-center  justify-between">
                <div className="flex gap-[12px]">
                    <Input
                        placeholder="Cari"
                        value={(table.getColumn("name")?.getFilterValue() || "")}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="w-[266px] h-[36px]"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-[36px] text-[14px] border-slate-300">
                                <ChevronDown size={16} className="mr-2" /> Kategori
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[184px]">
                            {DataKategori.map((kategori) => (
                                <DropdownMenuItem key={kategori.id} className="h-[36px] p-[12px]">
                                    <Checkbox 
                                    
                                    className="capitalize" 
                                    />
                                    <span className="ml-[8px] text-[14px]">{kategori.name}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-[36px] text-[14px] border-slate-300">
                                <ChevronDown size={16} className="mr-2" /> Outlet
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[184px]">
                            {DataOutlet.map((outlet) => (
                                <DropdownMenuItem key={outlet.id} className="h-[36px] p-[12px]">
                                    <Checkbox 
                                    
                                    className="capitalize" 
                                    />
                                    <span className="ml-[8px] text-[14px]">{outlet.name}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto h-[32px] text-[14px] border-slate-300">
                            <ChevronDown size={16} className="mr-2" /> View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[184px]">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide() && column.id !== 'id')
                            .map((column) => (
                                <DropdownMenuItem key={column.id} className="h-[36px] p-[12px]">
                                    <Checkbox
                                        
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    />
                                    <span className="ml-[8px] text-[14px]">{column.id}</span>
                                </DropdownMenuItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {pageData.length === 0 ? (
                <NoData />
            ) : (
                <div className="">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        <NoData/>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Bagian Pagination hanya ditampilkan jika ada data */}
                    {table.getRowModel().rows.length > 0 && (
                        <div className="flex items-center justify-end space-x-2 ">
                            <div className="flex-1 text-[14px] text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                {table.getFilteredRowModel().rows.length} row(s) selected.
                            </div>
                            <div className="space-x-2">
                                <Pagination>
                                    <PaginationContent>
                                        {/* Tombol Previous */}
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                onClick={() => table.previousPage()}
                                                disabled={pagination.pageIndex === 0}
                                                className="text-[14px]"
                                            >
                                                Previous
                                            </Button>
                                        </PaginationItem>

                                        {/* Loop untuk menampilkan nomor halaman */}
                                        {[...Array(totalPages).keys()].map((pageIndex) => (
                                            <PaginationItem key={pageIndex}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={() => setPagination({ ...pagination, pageIndex })} // Ubah halaman
                                                    isActive={pagination.pageIndex === pageIndex} // Tandai halaman aktif
                                                    className={`border-0 font-medium text-[14px] ${pagination.pageIndex === pageIndex ? 'text-black' : 'text-slate-400'}`}
                                                >
                                                    {pageIndex + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        {/* Ellipsis untuk banyak halaman */}
                                        {totalPages > 5 && <PaginationEllipsis />}

                                        {/* Tombol Next */}
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                onClick={() => table.nextPage()}
                                                disabled={pagination.pageIndex >= totalPages - 1}
                                                className="text-[14px]"
                                            >
                                                Next
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    )}
                </div>
            )}



            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[820px] my-[20px] p-[24px]">
                    <div className='flex justify-between'>
                        <DialogHeader>
                            <DialogTitle className='text-[18px] py-[16px]'>Edit produk</DialogTitle>
                        </DialogHeader>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                <X className='h-[16px] w-[16px]' />
                            </Button>
                        </DialogClose>

                    </div>
                    <div className="grid gap-[16px] py-[32px]">
                        <h3 className='text-[16px] font-semibold'>Detail produk</h3>
                        <div className="flex gap-1">
                            <Label htmlFor="role" className="text-[14px] w-[240px] py-[8px]">Daftar Outlet<span className='text-rose-500'>*</span></Label>
                            <div className='w-full grid gap-4'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="mr-auto w-full h-[36px] text-[14px] text-left border-slate-300 justify-between text-slate-500">
                                            Pilih outlet <ChevronDown size={16} className="mr-2" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className='w-[239px]'>
                                        <DropdownMenuItem className="capitalize p-[12px]" onClick={() => handleSelectAll()}>
                                            <Checkbox
                                                checked={selectedOutlets.length === DataOutlet.length}
                                                onCheckedChange={handleSelectAll}
                                                className='w-[16px] h-[16px]'
                                            />
                                            <span className="ml-[12px] text-[14px]">Pilih Semua</span>
                                        </DropdownMenuItem>
                                        {DataOutlet.map((outlet) => (
                                            <DropdownMenuItem key={outlet.id} className="capitalize p-[12px]" onClick={() => handleSelectOutlet(outlet)}>
                                                <Checkbox
                                                    checked={selectedOutlets.some((o) => o.id === outlet.id)}
                                                    onChange={() => handleSelectOutlet(outlet)}
                                                    className='w-[16px] h-[16px]'
                                                />
                                                <span className="ml-[12px] text-[14px]">{outlet.name}</span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className='flex flex-wrap gap-[12px]'>
                                    {selectedOutlets.map((outlet) => (
                                        <Badge key={outlet.id} variant="secondary" className="h-[36px] px-[12px] text-[14px] gap-[8px]">
                                            {outlet.name}
                                            <CloseCircle
                                                size={16}
                                                variant="Bold"
                                                className='cursor-pointer'
                                                onClick={() => handleRemoveOutlet(outlet.id)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Label htmlFor="nama" className="text-[14px] w-[240px] py-[8px]">Nama Produk<span className='text-rose-500'>*</span></Label>
                            <Input
                                id="nama"
                                placeholder="Masukkan Nama produk"
                                required
                                className="h-[36px] text-[14px] rounded-lg border-slate-300"
                                value={formData.nama}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex gap-1">
                            <Label htmlFor="deskripsi" className="text-[14px] w-[240px] py-[8px]">Deskripsi produk<span className='text-rose-500'>*</span></Label>
                            <div className='w-full grid gap-[10px]'>
                                <Textarea id="message-2" className='border-slate-300 text-[14px]'
                                    value={deskripsi}
                                    onChange={handleInputChangedeskripsi}
                                    maxLength={200}
                                />
                                <p className="text-[14px] text-muted-foreground flex justify-end">
                                    {deskripsi.length}/200 char
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <div className='w-[240px] h-auto'>
                                <p className="text-[14px] h-[40px] py-[13px]">Foto<span className='text-rose-500'>*</span></p>
                                <p className='w-[176px] text-[12px] font-normal text-slate-500 '>Gunakan foto dengan rasio 1:1,
                                    Upload dalam format .jpg/.png
                                    ukuran maksimal 5 mb</p>
                            </div>
                            <div className='w-full flex flex-wrap gap-[12px]' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                                {images.map((image, index) => (
                                    <div key={index} className="relative w-[120px] h-[120px] group">
                                        <img
                                            src={image}
                                            alt={`Pilih gambar ${index + 1}`}
                                            className="w-full h-full border object-cover rounded-[8px]"
                                        />
                                        <button  onClick={() => handleEdit(index)}  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <div className='bg-white text-[12px] px-[8px] rounded-full'>Ubah</div>
                                        </button>
                                        <button onClick={() => handleDelete(index)} className="absolute top-2 right-2 bg-white text-red-500 text-xs p-[4px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Trash size="12" />
                                        </button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    className='w-[120px] h-[120px] rounded-[8px] flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-300'
                                    onClick={handleUploadClick}
                                >
                                    <GalleryAdd size="24" color='#717179' variant="Bulk" />
                                    <p className="whitespace-normal text-slate-500">Pilih atau letakkan gambar disini</p>
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Label htmlFor="role" className="text-[14px] w-[240px] py-[8px]">Kategori<span className='text-rose-500'>*</span></Label>
                            <div className='w-full grid gap-4'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="mr-auto w-full h-[36px] text-[14px] text-left border-slate-300 justify-between text-slate-500">
                                            Pilih kategori <ChevronDown size={16} className="mr-2" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className='w-[239px]'>
                                        <DropdownMenuItem className="capitalize p-[12px]" onClick={() => handleSelectAllkategori()}>
                                            <Checkbox
                                                checked={selectedKategori.length === DataKategori.length}
                                                onCheckedChange={handleSelectAllkategori}
                                                className='w-[16px] h-[16px]'
                                            />
                                            <span className="ml-[12px] text-[14px]">Pilih Semua</span>
                                        </DropdownMenuItem>
                                        {DataKategori.map((kategori) => (
                                            <DropdownMenuItem key={kategori.id} className="capitalize p-[12px]" onClick={() => handleSelectkategori(kategori)}>
                                                <Checkbox
                                                    checked={selectedKategori.some((o) => o.id === kategori.id)}
                                                    onChange={() => handleSelectkategori(kategori)}
                                                    className='w-[16px] h-[16px]'
                                                />
                                                <span className="ml-[12px] text-[14px]">{kategori.name}</span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className='flex flex-wrap gap-[12px]'>
                                    {selectedKategori.map((kategori) => (
                                        <Badge key={kategori.id} variant="secondary" className="h-[36px] px-[12px] text-[14px] gap-[8px]">
                                            {kategori.name}
                                            <CloseCircle
                                                size={16}
                                                variant="Bold"
                                                className='cursor-pointer'
                                                onClick={() => handleRemoveKategori(kategori.id)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Label htmlFor="Kategori" className="text-[14px] w-[240px] py-[8px]">Harga Produk<span className='text-rose-500'>*</span></Label>
                            <div className="relative w-full">
                                <Input
                                    type="text"
                                    placeholder=""
                                    required
                                    className="h-[36px] text-[14px] border-slate-300 pr-[12px] pl-[40px] "
                                    value={formatNumber(uang)}
                                    onChange={handleInputChangeuang}
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[14px] ">
                                    RP
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className='text-[14px] font-normal text-slate-500'>* Untuk mengelola <span className="text-black">Stok Produk</span> silahkan buka pada menu <span className="text-black">Kelola Stok</span></p>

                    <DialogFooter className="gap-[12px]">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className='text-[14px] h-[36px]'>
                                Batal
                            </Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleSubmit} className='text-[14px] h-[36px]'>Simpan Perubahan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>



            {/* detail produk */}
            <Dialog open={isDialogOpenview} onOpenChange={setIsDialogOpenview}>
                <DialogContent className="sm:max-w-[505px] my-[20px] p-[25px]">
                    <div className='flex justify-between'>
                        <DialogHeader>
                            <DialogTitle className='text-[18px] py-[16px]'>Detail Produk</DialogTitle>
                        </DialogHeader>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                <X className='h-[16px] w-[16px]' />
                            </Button>
                        </DialogClose>

                    </div>
                    <div className="grid gap-[16px] py-[16px] text-[14px]">
                        <div className='w-full flex flex-wrap gap-[12px]'>
                            {images.map((image, index) => (
                                <div key={index} className="relative w-[120px] h-[120px]">
                                    <img
                                        src={image}
                                        alt={`Pilih gambar ${index + 1}`}
                                        className="w-full h-full border object-cover rounded-[8px]"
                                    />

                                </div>
                            ))}
                        </div>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">Nama Produk</p>
                            <p>{formData.nama}</p>
                        </div>
                        <div className="flex align-middle h-auto">
                            <p className="w-[150px] text-slate-500">Deskripsi</p>
                            <p className="h-auto w-[305px]">{formData.deskripsi}</p>
                        </div>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">Kategori</p>
                            <p>{formData.kategori}</p>
                        </div>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">Harga</p>
                            <p>Rp {uang}</p>
                        </div>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">Daftar Outlet</p>
                            <p>{formData.outlet}</p>
                        </div>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">Tanggal Dibuat</p>
                            <p>{formData.date}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DataTableDemo
