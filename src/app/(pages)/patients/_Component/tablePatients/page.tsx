"use client"
import React, { useEffect, useState } from "react";
import { Plus, List, LayoutGrid, Filter, MoreHorizontal, Search, Printer, Download, FilterIcon, ListFilterIcon, Grid3x2Icon, Grid3X3Icon, Calendar, AlertTriangle, PlusSquareIcon, CheckCircle2, Users, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";

import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface Patient {
    _id: string;
    user: string;
    displayName: string;
    phone: string;
    dateOfBirth: string;
    address: {
        street: string;
        city: string;
        country: string;
    };
    gender: string;
    bloodType: string;
    medicalHistory: string;
    createdAt: string;
    updatedAt: string;
    status: "active" | "pending" | "critical" | "discharged";
}


const statusStyles: Record<string, string> = {
    "Active": "bg-[#E6F9F0] text-[#00C853] border-transparent",
    "Pending": "bg-[#EFF4FF] text-[#2B6CEE] border-transparent",
    "Critical": "bg-[#FFF0F0] text-[#FF5252] border-transparent",
    "Discharged": "bg-[#F8F9FC] text-[#6B7280] border-transparent",
};
function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    return `${Math.floor(months / 12)} years ago`;
}

function calcAge(dateOfBirth: string): number {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

export default function TablePatients() {
    const { data: session } = useSession();
    const [patient, setPatient] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getPatient() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
                setLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/patients/my-patients`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const result = await response.json();
                console.log("API Result:", result);
                setPatient(result?.data ?? []);
            } catch (error) {
                console.error("Failed to fetch patient:", error);
            }
            finally {
                setLoading(false);
            }
        }

        getPatient();
    }, [session]);

    const stats = {
        total: patient.length,
        active: patient.filter((p) => p.status === "active").length,
        critical: patient.filter((p) => p.status === "critical").length,
        newThisMonth: patient.filter((p) => {
            const created = new Date(p.createdAt);
            const now = new Date();
            return created.getMonth() === now.getMonth() &&
                created.getFullYear() === now.getFullYear();
        }).length,
    };
    if (loading) {
        return <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-row gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
        </div>
            ;
    }

    return <>
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 w-full max-w-7xl mx-auto px-4">
            <Card className="h-21.5 border-slate-200 shadow-sm rounded-xl">
                <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full shrink-0">
                        <Users size={24} className="text-blue-600" />
                    </div>
                    <div className="flex flex-col truncate">
                        <span className="text-slate-500 font-medium text-sm">Total Patients</span>
                        <span className="text-slate-900 font-bold text-2xl">{stats.total}</span>
                    </div>
                </CardContent>
            </Card>
            <Card className="h-21.5 border-slate-200 shadow-sm rounded-xl">
                <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full shrink-0">
                        <CheckCircle2 size={24} className="text-[#16A34A]" />
                    </div>
                    <div className="flex flex-col truncate">
                        <span className="text-slate-500 font-medium text-sm">Active Status</span>
                        <span className="text-slate-900 font-bold text-2xl">{stats.active}</span>
                    </div>
                </CardContent>
            </Card>
            <Card className="h-21.5 border-slate-200 shadow-sm rounded-xl">
                <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#FFFBEB] rounded-full shrink-0">
                        <PlusSquareIcon size={24} className="text-[#D97706]" />
                    </div>
                    <div className="flex flex-col truncate">
                        <span className="text-slate-500 font-medium text-sm">New This Month</span>
                        <span className="text-slate-900 font-bold text-2xl">{stats.newThisMonth}</span>
                    </div>
                </CardContent>
            </Card>
            <Card className="h-21.5 border-slate-200 shadow-sm rounded-xl">
                <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-full shrink-0">
                        <AlertTriangle size={24} className="text-red-600" />
                    </div>
                    <div className="flex flex-col truncate">
                        <span className="text-slate-500 font-medium text-sm">Critical</span>
                        <span className="text-slate-900 font-bold text-2xl">{stats.critical}</span>
                    </div>
                </CardContent>
            </Card>
        </main>
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
                            <TableHead className="w-40.75 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">bloodType</TableHead>
                            <TableHead className="w-42.5 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Next Visit</TableHead>
                            <TableHead className="w-38 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Status</TableHead>
                            <TableHead className="text-right px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-[#4C669A]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(patient ?? []).map((patient) => (
                            <TableRow key={patient._id} className="h-18.25 border-b-[#E7EBF3] hover:bg-gray-50/50">
                                <TableCell className="px-6 py-0">
                                    <div className="flex items-center gap-3">

                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-semibold text-[#0D121B]">{patient.displayName}</span>
                                            <span className="text-[12px] text-[#4C669A]">Last visit: {timeAgo(patient.createdAt)}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-0 text-[14px] text-[#4C669A]">{patient._id}</TableCell>
                                <TableCell className="px-6 py-0">
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-[#0D121B]">{calcAge(patient.dateOfBirth)} years</span>
                                        <span className="text-[12px] text-[#4C669A]">{patient.gender}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-0 text-[14px] text-[#0D121B]">{patient.bloodType}</TableCell>
                                <TableCell className="px-6 py-0">
                                    <div className="flex items-start gap-2">
                                        <Calendar className="h-4 w-4 mt-0.5 text-[#4C669A]" />
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-medium text-[#0D121B]">{timeAgo(patient.updatedAt)}</span>

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

                                                    {patient?._id && (
                                                        <Link href={`/patients/${patient._id}`} className="w-full">
                                                            Patient Profile
                                                        </Link>
                                                    )}
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
    </>;
}