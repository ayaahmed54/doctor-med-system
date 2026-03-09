import React from "react";
import { Plus, List, LayoutGrid, Filter, MoreHorizontal, Search, Printer, Download, FilterIcon, ListFilterIcon, Grid3x2Icon, Grid3X3Icon, Calendar, MoreVertical } from "lucide-react";
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
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";

const patients = [
    {
        name: "Sarah ALi",
        lastVisit: "2 days ago",
        id: "#PAT-8832",
        age: "34 yrs",
        gender: "Female",
        diagnosis: "Hypertension",
        nextVisitDate: "Oct 24, 2023",
        nextVisitTime: "10:00 AM",
        status: "Active",
        avatar: "/avatars/sarah.png"
    },
    {
        name: "Sarah ALi",
        lastVisit: "2 days ago",
        id: "#PAT-8862",
        age: "34 yrs",
        gender: "Female",
        diagnosis: "Hypertension",
        nextVisitDate: "Oct 24, 2023",
        nextVisitTime: "10:00 AM",
        status: "Discharged",
        avatar: "/avatars/sarah.png"
    },
    {
        name: "Sarah ALi",
        lastVisit: "2 days ago",
        id: "#PAT-4832",
        age: "34 yrs",
        gender: "Female",
        diagnosis: "Hypertension",
        nextVisitDate: "Oct 24, 2023",
        nextVisitTime: "10:00 AM",
        status: "Critical",
        avatar: "/avatars/sarah.png"
    },

];

const statusStyles: Record<string, string> = {
    "Active": "bg-[#E6F9F0] text-[#00C853] border-transparent",
    "Pending": "bg-[#EFF4FF] text-[#2B6CEE] border-transparent",
    "Critical": "bg-[#FFF0F0] text-[#FF5252] border-transparent",
    "Discharged": "bg-[#F8F9FC] text-[#6B7280] border-transparent",
};

export default function TablePatients() {
    return (
        <div className="w-full max-w-280 mx-auto bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden mt-6">

            <div className="flex h-18.5 w-full max-w-280 items-center justify-between gap-4 rounded-xl border border-[#E7EBF3] bg-white p-4 shadow-sm">

                <div className="flex flex-1 items-center gap-4 max-w-231.25">

                    <div className="relative w-full max-w-[384px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4C669A]" />
                        <Input
                            placeholder="Search by name, ID, or condition"
                            className="h-10 border-[#E7EBF3] bg-[#F8F9FC] pl-10 text-sm text-[#4C669A] placeholder:text-[#4C669A] focus-visible:ring-1 focus-visible:ring-[#2B6CEE]"
                        />
                    </div>

                    <Select>
                        <SelectTrigger className="h-10 w-35 border-[#E7EBF3] bg-[#F8F9FC] text-sm font-normal text-[#0D121B]">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-[#4C669A]">
                        <ListFilterIcon className="h-5 w-5" />
                    </Button>


                    <Button variant="secondary" size="icon" className="h-10 w-10 bg-[#2B6CEE1A] text-[#2B6CEE] hover:bg-[#2B6CEE2A]">
                        <Grid3X3Icon className="h-5 w-5" />
                    </Button>

                    <Button variant="ghost" size="icon" className="h-10 w-10 text-[#4C669A]">
                        <LayoutGrid className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <div className="w-full max-w-280 rounded-xl border border-[#E7EBF3] bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-[#F8F9FC]">
                        <TableRow className="hover:bg-transparent border-b-[#E7EBF3]">
                            <TableHead className="w-61.25 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Patient Name</TableHead>
                            <TableHead className="w-32.5] px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">ID</TableHead>
                            <TableHead className="w-36.5 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Age / Gender</TableHead>
                            <TableHead className="w-40.75 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Diagnosis</TableHead>
                            <TableHead className="w-42.5 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Next Visit</TableHead>
                            <TableHead className="w-38 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Status</TableHead>
                            <TableHead className="text-right px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id} className="h-18.25 border-b-[#E7EBF3] hover:bg-gray-50/50">
                                <TableCell className="px-6 py-0">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-gray-100">
                                            <AvatarImage src={patient.avatar} />
                                            <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-semibold text-[#0D121B]">{patient.name}</span>
                                            <span className="text-[12px] text-[#4C669A]">Last visit: {patient.lastVisit}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-0 text-[14px] text-[#4C669A]">{patient.id}</TableCell>
                                <TableCell className="px-6 py-0">
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-[#0D121B]">{patient.age}</span>
                                        <span className="text-[12px] text-[#4C669A]">{patient.gender}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-0 text-[14px] text-[#0D121B]">{patient.diagnosis}</TableCell>
                                <TableCell className="px-6 py-0">
                                    <div className="flex items-start gap-2">
                                        <Calendar className="h-4 w-4 mt-0.5 text-[#4C669A]" />
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-medium text-[#0D121B]">{patient.nextVisitDate}</span>
                                            <span className="text-[12px] text-[#4C669A]">{patient.nextVisitTime}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-0">
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${statusStyles[patient.status] || "bg-gray-100 text-gray-600"}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full bg-current`} />
                                        {patient.status}
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-0 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4C669A]">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuContent align="end" className="z-50">
                                                <DropdownMenuItem>
                                                    <Link href="/patient-profile" className="w-full">
                                                        Patient Profile Page
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
