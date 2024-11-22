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
    DropdownMenuContent,
    DropdownMenuItem,
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
} from "@/components/ui/pagination"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import NoData from "./NoData";
import View from "./View";
import EditBelanja from "./EditBelanja";








// Main component
const DataTableHistory = ({data, setData, columnFilters, setColumnFilters, DataBayar, handleFilterChange, handleClearFilters, filters}) => {
   

    // status
    const [originalData, setOriginalData] = useState(data); // Tambahkan state untuk data asli
    const handleDelete = (id) => {
        setData((prevData) => {
            const updatedData = prevData.filter((item) => item.id !== id);
            if (updatedData.length === 0 && pagination.pageIndex > 0) {
                // Jika data kosong dan berada di halaman selain pertama, kembali ke halaman pertama
                setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                }));
            }
            return updatedData;
        });
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
            accessorKey: "nama",
            header: "Nama Pengeluaran",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("nama")}</div>
            ),
        },
        {
            accessorKey: "kategori",
            header: "Kategori Belanja",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("kategori")}</div>
            ),
        },
        {
            accessorKey: "deskripsi",
            header: "Dekripsi",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("deskripsi").length > 24 ? `${row.getValue("deskripsi").slice(0, 24)}...` : row.getValue("deskripsi")}</div>
            ),
        },
        {
            accessorKey: "total",
            header: "Total Belanja",
            cell: ({ row }) => <div className=" font-medium">Rp {parseInt(row.getValue("total")).toLocaleString('id-ID')}</div>,
        },
        {
            accessorKey: "date",
            header: "Waktu & Tanggal",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("date").length > 18 ? `${row.getValue("date").slice(0, 18)}...` : row.getValue("date")}</div>
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
            accessorKey: "outlet",
            header: "",
            cell: ({ row }) => (
                <div className="capitalize font-medium">{row.getValue("outlet")}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const id = row.getValue("id");
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button  variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[100px]">
                            <DropdownMenuItem onClick={() => setIsOpen(true)}className="p-3 gap-3 text-[14px] font-medium ">View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsOpenEdit(true)}className="p-3 gap-3 text-[14px] font-medium ">Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(id)} className="p-3 gap-3 text-[14px] font-medium text-rose-500 focus:text-rose-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    useEffect(() => {
        setColumnVisibility((prev) => ({ ...prev, id: false }));
    }, []);



    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [sorting, setSorting] = useState([])
   
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });;


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
  

      useEffect(() => {
        setColumnVisibility((prev) => ({ ...prev, outlet: false }));
    }, []);
    
    return (
        <div className="w-full grid gap-[16px] mt-[24px]">
            <div className="flex items-center  justify-between">
                <div className="flex gap-[12px]">
                    <Input
                        placeholder="Cari"
                        value={(table.getColumn("nama")?.getFilterValue() || "")}
                        onChange={(event) =>
                            table.getColumn("nama")?.setFilterValue(event.target.value)
                        }
                        className="w-[266px] h-[36px]"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-[36px] text-[14px] border-slate-300">
                                <ChevronDown size={16} className="mr-2" /> Kategori Belanja
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[184px]">
                            {DataBayar.map((bayar) => (
                                <DropdownMenuItem key={bayar.id} className="h-[36px] p-[12px]" onClick={() => handleFilterChange(bayar.name)}>
                                    <Checkbox 
                                       checked={filters.kategori.includes(bayar.name)}
                                       onCheckedChange={() => handleFilterChange(bayar.name)}
                                       className="capitalize"
                                    />
                                    <span className="ml-[8px] text-[14px]">{bayar.name}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem onClick={handleClearFilters} className="h-[36px] font-medium  p-[12px] flex items-center justify-center text-[14px]">
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
                            .filter((column) => column.getCanHide() && column.id !== 'id' && column.id !== 'outlet')
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
            <View isOpen={isOpen} setIsOpen={setIsOpen}/> 
            <EditBelanja isOpen={isOpenEdit} setIsOpen={setIsOpenEdit}/> 
        </div>
    )
}

export default DataTableHistory