import React from "react";
import { Plus, List, LayoutGrid, Filter, MoreHorizontal, Search, Printer, Download, FilterIcon, ListFilterIcon, Grid3x2Icon, Grid3X3Icon, Calendar, MoreVertical, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

interface Props {
    data: Prescription[];
}

const statusStyles: Record<Prescription["status"], string> = {
    active: "bg-[#E6F9F0] text-[#00C853]",
    completed: "bg-[#F8F9FC] text-[#6B7280]",
    cancelled: "bg-[#FEF3F2] text-[#B42318]",
};

export default function TablePrescriptions({ data = [] }: Props) {

    return <>
        <div className="w-full max-w-280 mx-auto bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden mt-6">

            <div className="flex w-full max-w-240 h-12 flex-row items-center p-0 gap-4">

                <div className="flex items-center flex-1 max-w-3xl relative h-12">
                    <div className="absolute left-4 z-10 flex items-center justify-center">
                        <Search className="w-5 h-5 text-[#4C669A]" />
                    </div>

                    <Input
                        placeholder="Search by Patient Name, ID or Medication..."
                        className="h-12 w-full bg-white border-[#E7EBF3] rounded-xl pl-12 pr-4 py-[14.5px] text-sm text-[#4C669A] placeholder:text-[#4C669A] focus-visible:ring-1 focus-visible:ring-[#2B6CEE]"
                    />
                </div>

                <div className="flex flex-row items-center justify-end gap-3 h-12">

                    <Select>
                        <SelectTrigger className="w-35 h-12 bg-white border-[#E7EBF3] rounded-md px-4 text-sm text-[#0D121B]">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-35 h-12 bg-white border-[#E7EBF3] rounded-md px-4 text-sm text-[#0D121B]">
                            <SelectValue placeholder="Last 30 Days" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="w-full max-w-280 rounded-xl border border-[#E7EBF3] bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-[#F8F9FC]">
                        <TableRow className="hover:bg-transparent border-b-[#E7EBF3]">
                            <TableHead className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Patient</TableHead>
                            <TableHead className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Medication</TableHead>
                            <TableHead className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Dosage</TableHead>
                            <TableHead className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Date Prescribed</TableHead>
                            <TableHead className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Status</TableHead>
                            <TableHead className="text-right px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item) => (
                            <TableRow key={item._id} className="h-20 border-b-[#E7EBF3] hover:bg-gray-50/50">
                                <TableCell className="px-6">
                                    <div className="flex items-center gap-3">

                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-bold text-[#0D121B]">
                                                {item.patient.displayName}</span>
                                            <span className="text-[12px] text-[#4C669A]">
                                                ID: #{item.patient._id.slice(-5)}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6">
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-[#0D121B]">
                                            {item.medications[0]?.name}</span>
                                        <span className="text-[12px] text-[#4C669A]">
                                            {item.medications[0]?.strength}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 text-[14px] text-[#0D121B]">
                                    {item.medications[0]?.dosage}
                                </TableCell>
                                <TableCell className="px-6 text-[14px] text-[#0D121B]">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="px-6 py-0">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${statusStyles[item.status] || "bg-gray-100 text-gray-600"
                                        }`}>
                                        {item.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4C669A]">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end" className="rounded-[12px] bg-white shadow-md border border-slate-100">
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Link
                                                    href={`/appointments/${item.appointment._id}`}
                                                    className="flex items-center w-full gap-2 px-2 py-1"
                                                >
                                                    <Eye size={14} className="text-[#2B6CEE]" />
                                                    <span className="text-sm font-medium text-[#1D293D]">View Appointment</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </div>

        </div>
    </>;
}