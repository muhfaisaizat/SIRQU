import React, { useState } from "react"
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
import { SearchNormal1, Filter, InfoCircle, Trash } from 'iconsax-react';
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
                className="border-slate-400 border-2 h-[16px] w-[16px] rounded-md data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="border-slate-400 border-2 h-[16px] w-[16px] rounded-md data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Nama",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role");

            // Conditional rendering based on the role value
            let roleClass = "";
            let roleText = "";

            if (role === "Admin") {
                roleClass = "bg-emerald-50 border-2 border-emerald-500 rounded-full text-emerald-500 font-medium pt-[2px] pb-[2px] ps-2 px-2";
                roleText = "Admin";
            } else if (role === "Manager") {
                roleClass = "bg-sky-50 border-2 border-sky-500 rounded-full text-sky-500 font-medium pt-[2px] pb-[2px] ps-2 px-2";
                roleText = "Manager";
            } else if (role === "Kasir") {
                roleClass = "bg-amber-50 border-2 border-amber-500 rounded-full text-amber-500 font-medium pt-[2px] pb-[2px] ps-2 px-2";
                roleText = "Kasir";
            } else {
                // Default case if the role does not match any of the expected roles
                roleClass = "bg-gray-50 border-2 border-gray-500 rounded-full text-gray-500 font-medium pt-[2px] pb-[2px] ps-2 px-2";
                roleText = role; // Show role as-is
            }

            return (
                <div className="capitalize">
                    <span className={roleClass}>{roleText}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "date",
        header: "Tanggal dibuat",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("date")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[164px]">
                        <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium"> <User size={16} />View profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium"><FiEdit2 size={16} />Edit profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium"><InfoCircle size={16} />Deactive</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-3 gap-3 text-[14px] font-medium text-rose-500 focus:text-rose-500"><Trash size={16} />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


const data = [
    {
        id: "m5gr84i9",
        name: 'jairo vernandes',
        role: "Admin",
        status: "success",
        email: "ken99@yahoo.com",
        date: "23 Oktober 2024",
    },
    {
        id: "3u1reuv4",
        name: 'jairo vernandes',
        role: "Manager",
        status: "success",
        email: "Abe45@gmail.com",
        date: "23 Oktober 2024",
    },
    {
        id: "derv1ws0",
        name: 'jairo vernandes',
        role: "Kasir",
        status: "processing",
        email: "Monserrat44@gmail.com",
        date: "23 Oktober 2024",
    },
    {
        id: "5kma53ae",
        name: 'jairo vernandes',
        role: "Kasir",
        status: "success",
        email: "Silas22@gmail.com",
        date: "23 Oktober 2024",
    },
    {
        id: "bhqecj4p",
        name: 'jairo vernandes',
        role: "Kasir",
        status: "failed",
        email: "carmella@hotmail.com",
        date: "23 Oktober 2024",
    },
    {
        id: "bhqecj4p234",
        name: 'jairo vernandes',
        role: "Kasir",
        status: "failed",
        email: "carmella@hotmail.com",
        date: "23 Oktober 2024",
    },
    {
        id: "bhqecj4p23467",
        name: 'jairo vernandes',
        role: "Kasir",
        status: "failed",
        email: "carmella@hotmail.com",
        date: "23 Oktober 2024",
    },
    {
        id: "bhqecj4p23467g",
        name: 'jairo vernandes',
        role: "Kasir",
        status: "failed",
        email: "carmella@hotmail.com",
        date: "23 Oktober 2024",
    },
    {
        id: "bhqecj4p23467g7",
        name: 'jairo vernandes',
        role: "Kasir",
        status: "failed",
        email: "carmella@hotmail.com",
        date: "23 Oktober 2024",
    },
    {
        id: "bhqecj4p23467g76",
        name: 'jairo vernandes',
        role: "Kasir",
        status: "failed",
        email: "carmella@hotmail.com",
        date: "23 Oktober 2024",
    },
    {
        id: "bhqecj4p23467g76",
        name: 'jairo vernandes',
        role: "Kasir",
        status: "failed",
        email: "carmella@hotmail.com",
        date: "23 Oktober 2024",
    },
]


// Main component
const DataTableDemo = () => {
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
    const pageData = data.slice(startIdx, endIdx);

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

    return (
        <div className="w-full">
            <div className="flex items-center py-4 justify-between mt-8">
                <h4 className='text-[20px] font-semibold '>Pengguna <span className="text-slate-400">{data.length}</span></h4>
                <div className="flex">
                    <div className="relative  mr-[12px]">
                        <Input
                            placeholder="Search"
                            value={(table.getColumn("email")?.getFilterValue() || "")}
                            onChange={(event) =>
                                table.getColumn("email")?.setFilterValue(event.target.value)
                            }
                            className="text-[14px] rounded-lg border border-slate-300 pl-10 h-[40px] text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <div className="absolute inset-y-0 left-0 mt-[13px] items-center  pl-3 ">
                            <SearchNormal1 className="w-5 h-5 text-slate-500" />
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-[40px] text-[14px] border-slate-300">
                                <Filter size={16} className="mr-2" /> Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className='gap-2 h-[40px] ml-[12px] bg-teal-500 text-[14px] font-medium'>
                        <GoPlus size={16} />
                        Tambah pengguna
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
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
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
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
        </div>
    )
}

export default DataTableDemo
