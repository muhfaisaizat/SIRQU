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
import { SearchNormal1, Filter, InfoCircle, Trash, ArrowDown2 } from 'iconsax-react';
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
import { Eye, EyeSlash } from 'iconsax-react';
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import NoData from "./nodata";
import { X } from "lucide-react"
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";






// Main component
const DataTableDemo = () => {

    const [data, setData] = useState([]);

    // Fungsi untuk memformat data API
    const formatUserData = (apiData) => {
        return {
            id: `${apiData.id}`,  // Menambahkan "m" pada ID
            name: apiData.name,     // Nama pengguna
            role: apiData.role,     // Peran pengguna
            status: apiData.status === "Active" ? "Aktif" : apiData.status, // Mengubah status "Active" menjadi "Aktif"
            email: apiData.email,   // Email pengguna
            date: new Date(apiData.createdAt).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }) // Format tanggal menjadi format Indonesia
        };
    };

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

           // Log untuk memastikan data yang diterima

            // Pastikan response.data adalah array
            if (Array.isArray(response.data)) {
                const formattedData = response.data.map(formatUserData);
               
                setData(formattedData);
                setOriginalData(formattedData); // Set originalData di sini
            } else {
                console.error("Data yang diterima bukan array");
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    // Ambil data dari API
    useEffect(() => {
    
        fetchData();
    }, []);
    

    const DataStatus = [
        { id: "m5gr84i9", name: 'Aktif' },
        { id: "m5gr84i7", name: 'Tidak Aktif' },
    ];
    const DataRole = [
        { id: "m5gr84i9", name: 'Admin' },
        { id: "m5gr84i7", name: 'Manager' },
        { id: "m5gr84i7", name: 'Kasir' },
    ];

    // status
    const [originalData, setOriginalData] = useState(data); // Tambahkan state untuk data asli

    const handleStatusChange = (id) => {
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, status: item.status === "Aktif" ? "Tidak Aktif" : "Aktif" } : item
            )
        );

        // Update original data as well
        setOriginalData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, status: item.status === "Aktif" ? "Tidak Aktif" : "Aktif" } : item
            )
        );
    };

   

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
            header: "Nama",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("role")}</div>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div className="lowercase font-medium">{row.getValue("email")}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const role = row.getValue("status");

                // Conditional rendering based on the role value
                let roleClass = "";
                let roleText = "";

                if (role === "Aktif") {
                    roleClass = "secondary";
                    roleText = "Aktif";
                } else if (role === "Tidak Aktif") {
                    roleClass = "destructive";
                    roleText = "Tidak Aktif";
                }

                return (
                    <div className="capitalize">
                        <Badge variant={roleClass} className="text-[12px]">{roleText}</Badge>
                    </div>
                );
            }
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
                const status = row.getValue("status")

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[164px]">
                            <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium" onClick={() => handleviewClick(id)}>View profile</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium" onClick={() => handleEditClick(id)}>Edit profile</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium" onClick={() => handleStatusChange(row.id)}> {status === "Aktif" ? "Deactivate" : "Activate"} </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium text-rose-500 focus:text-rose-500" onClick={() => handleDelete(id)}>Delete</DropdownMenuItem>
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
    const [isEditPenggunaOpen, setIsEditPenggunaOpen] = useState(false);


    const handleEditClick = (id) => {
        setSelectedId(id);
        setIsDialogOpen(true);
    };
    const handleviewClick = (id) => {
        setSelectedId(id);
        setIsDialogOpenview(true);
    };

    useEffect(() => {
        setColumnVisibility((prev) => ({ ...prev, id: false }));
    }, []);


    // edit pengguna 
    const { toast } = useToast()
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

        setIsDialogOpen(false);
    };

    // Mengisi formData berdasarkan selectedId
    useEffect(() => {
        const selectedData = data.find(item => item.id === selectedId);
        if (selectedData) {
            setFormData({
                nama: selectedData.name,
                email: selectedData.email,
                role: selectedData.role,
                status: selectedData.status,
                date: selectedData.date,
            });
        }
    }, [selectedId]);

    const handleSelectChange = (value) => {
        setFormData({ ...formData, role: value });
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
    
        try {
          // Send a DELETE request to the API endpoint
          await axios.delete(`${API_URL}/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          toast({
            title: "Sukses!",
            description: "Pengguna berhasil dihapus.",
            action: <ToastAction altText="Try again">Cancel</ToastAction>,
        });
        fetchData();
          console.log(`Data with ID ${id} deleted successfully.`);
        } catch (error) {
          console.error("Error deleting data:", error);
          const errorMessage = error.response ? error.response.data.message : "Something went wrong";
          toast({
            variant: "destructive",
            title: "Error!",
            description: errorMessage,
            action: <ToastAction altText="Try again">Cancel</ToastAction>,
        });
        }
      };

    // filter role
    const [filtersrole, setFiltersRole] = useState({
        role: [],
      });
    const handleFilterChangerole = (selectedValue) => {
        setColumnFilters([{ id: 'role', value: selectedValue }]);
        setFiltersRole({ role: [selectedValue] });
      };
      const handleClearFiltersrole = () => {
        setFiltersRole({ role: [] });  
        setColumnFilters([]);  
      };
    // filter status
    const [filtersStatus, setFiltersStatus] = useState({
        status: [],
      });
    const handleFilterChangestatus = (selectedValue) => {
        setColumnFilters([{ id: 'status', value: selectedValue }]);
        setFiltersStatus({ status: [selectedValue] });
      };
      const handleClearFiltersStatus = () => {
        setFiltersStatus({ status: [] });  
        setColumnFilters([]);  
      };

    return (
        <div className="w-full grid gap-[16px] mt-[24px]">
            <div className="flex items-center  justify-between">
                <div className="flex gap-[12px]">
                    <Input
                        placeholder="Cari"
                        value={(table.getColumn("email")?.getFilterValue() || "")}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="w-[266px] h-[32px]"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-[32px] text-[14px] border-slate-300">
                                <ChevronDown size={16} className="mr-2" />Roles
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[184px]">
                            {DataRole.map((role) => (
                                <DropdownMenuItem key={role.id} className="h-[36px] p-[12px]" onClick={() => handleFilterChangerole(role.name)}>
                                    <Checkbox
                                        className="capitalize"
                                        checked={filtersrole.role.includes(role.name)}
                                        onCheckedChange={() => handleFilterChangerole(role.name)}
                                    />
                                    <span className="ml-[8px] text-[14px]">{role.name}</span>
                                </DropdownMenuItem>
                            ))}
                             <DropdownMenuItem onClick={handleClearFiltersrole} className="h-[36px] font-medium  p-[12px] flex items-center justify-center text-[14px]">
                                Hapus Filter
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-[32px] text-[14px] border-slate-300">
                                <ChevronDown size={16} className="mr-2" /> Status
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[184px]">
                            {DataStatus.map((status) => (
                                <DropdownMenuItem key={status.id} className="h-[36px] p-[12px]" onClick={() => handleFilterChangestatus(status.name)} >
                                    <Checkbox
                                        className="capitalize"
                                        checked={filtersStatus.status.includes(status.name)}
                                        onCheckedChange={() => handleFilterChangestatus(status.name)}
                                    />
                                    <span className="ml-[8px] text-[14px]">{status.name}</span>
                                </DropdownMenuItem>
                            ))}
                             <DropdownMenuItem onClick={handleClearFiltersStatus} className="h-[36px] font-medium  p-[12px] flex items-center justify-center text-[14px]">
                                Hapus Filter
                            </DropdownMenuItem>
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
                                    <span className="ml-[12px] text-[14px]">{column.id}</span>
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
                                        No results.
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
                <DialogContent className="sm:max-w-[500px]">
                    <div className='flex justify-between'>
                        <DialogHeader>
                            <DialogTitle className='text-[18px] py-[16px]'>Edit Pengguna</DialogTitle>
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
                                    className="h-[36px] text-[14px] rounded-lg border-slate-300 pr-10"
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
                            <Select onValueChange={handleSelectChange} value={formData.role}>
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















            {/* view */}
            <Dialog open={isDialogOpenview} onOpenChange={setIsDialogOpenview}>
                <DialogContent className="sm:max-w-[425px] p-[25px]">
                    <div className='flex justify-between'>
                        <DialogHeader>
                            <DialogTitle className='text-[18px] py-[16px]'>Detail Pengguna</DialogTitle>
                        </DialogHeader>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                <X className='h-[16px] w-[16px]' />
                            </Button>
                        </DialogClose>

                    </div>
                    <div className="grid gap-4 py-[16px] text-[14px]">
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">Nama</p>
                            <p>{formData.nama}</p>
                        </div>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">Role</p>
                            <p>{formData.role}</p>
                        </div>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">Email</p>
                            <p>{formData.email}</p>
                        </div>
                        <div className="flex align-middle h-[36px]">
                            <p className="w-[150px] text-slate-500">Status</p>
                            <p>{formData.status}</p>
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
