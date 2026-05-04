"use client"
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Plus, List, LayoutGrid, Filter, MoreVertical, Activity, Clock, User, CheckCircle, XCircle, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
interface Doctor {
    id: string;
    name: string;
    specialty: string;
    price: number;
}

interface Patient {
    id: string;
    name: string;
}

interface Appointment {
    id: string;
    startTime: string;
    endTime: string;
    status: "pending" | "confirmed" | "checked_in" | "completed" | "cancelled";
    doctor: Doctor;
    patient: Patient;
}

function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

function getDuration(start: string, end: string) {
    const diff = (new Date(end).getTime() - new Date(start).getTime()) / 60000;
    return `${diff} min`;
}


const statusStyles: Record<Appointment["status"], string> = {
    "pending": "bg-[#DBEAFE] text-[#3B82F6] border-[#EFF6FF]",
    "confirmed": "bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]",
    "checked_in": "bg-[#FFEDD5] text-[#F97316] border-[#FFF7ED]",
    "completed": "bg-[#E2E8F0] text-[#94A3B8] border-[#F1F5F9]",
    "cancelled": "bg-[#FFF1F2] text-[#E11D48] border-[#FFE4E6]",
};

export default function MedicalAppointmentsTable() {
    const { data: session } = useSession();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        async function getAppointments() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/appointments/my-appointments`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const result = await response.json();
                setAppointments(result.data.appointments);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            }
            finally {

                setLoading(false);
            }
        }

        getAppointments();
    }, [session]);


    const stats = {
        total: appointments.length,
        completed: appointments.filter((a) => a.status === "completed").length,
        cancelled: appointments.filter((a) => a.status === "cancelled").length,
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
    return (
        <div className="w-full max-w-280 mx-auto mt-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-[#E7EBF3] rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[14px] font-medium text-[#64748B]">Total Appointments</span>
                        <div className="p-2 bg-[#EFF6FF] rounded-xl">
                            <Calendar size={18} className="text-[#2B6CEE]" />
                        </div>
                    </div>
                    <p className="text-[28px] font-bold text-[#0F172A]">{stats.total}</p>
                    <p className="text-[13px] text-[#16A34A] mt-1">  {stats.total > 0
                        ? `${Math.round((stats.completed / stats.total) * 100)}% of daily goal`
                        : "No appointments yet"}</p>
                </div>

                <div className="bg-white border border-[#E7EBF3] rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[14px] font-medium text-[#64748B]">Completed</span>
                        <div className="p-2 bg-[#F0FDF4] rounded-xl">
                            <CheckCircle size={18} className="text-[#16A34A]" />
                        </div>
                    </div>
                    <p className="text-[28px] font-bold text-[#0F172A]">{stats.completed}</p>
                    <p className="text-[13px] text-[#64748B] mt-1">
                        {stats.total > 0
                            ? `${Math.round((stats.completed / stats.total) * 100)}% of daily goal`
                            : "No appointments yet"}
                    </p>
                </div>

                <div className="bg-white border border-[#E7EBF3] rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[14px] font-medium text-[#64748B]">Cancelled</span>
                        <div className="p-2 bg-[#FFF1F2] rounded-xl">
                            <XCircle size={18} className="text-[#E11D48]" />
                        </div>
                    </div>
                    <p className="text-[28px] font-bold text-[#0F172A]">{stats.cancelled}</p>
                    <p className="text-[13px] text-[#64748B] mt-1">
                        {stats.cancelled === 0 ? "No cancellations yet" : `${stats.cancelled} cancelled today`}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center px-4 py-4 gap-4 border-b border-[#E7EBF3]">
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                        <div className="flex items-center px-3 gap-2 h-9 bg-[#F8F9FC] rounded-xl cursor-pointer shrink-0">
                            <Filter size={16} className="text-[#94A3B8]" />
                            <span className="text-[14px] font-medium text-[#334155] whitespace-nowrap">All Status</span>
                        </div>
                        <div className="hidden md:block w-px h-6 bg-[#E7EBF3] mx-1" />
                        <div className="flex items-center p-1 bg-[#F8F9FC] rounded-xl gap-1 shrink-0">
                            <Button size="icon" variant="ghost" className="w-8 h-8 bg-white shadow-sm rounded-lg">
                                <List size={18} className="text-[#2B6CEE]" />
                            </Button>
                            <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg">
                                <LayoutGrid size={18} className="text-[#94A3B8]" />
                            </Button>
                        </div>
                    </div>


                </div>

                <div className="overflow-x-auto scrollbar-hide">
                    {appointments.length === 0 ? (
                        <div className="flex justify-center items-center py-20">
                            <span className="text-[#94A3B8] text-sm">No appointments found</span>
                        </div>
                    ) : (
                        <Table className="w-full min-w-[700px]">
                            <TableHeader className="bg-[#F8F9FC]">
                                <TableRow className="border-b-[#E7EBF3] hover:bg-transparent">
                                    {/* تقليل px-6 إلى px-4 */}
                                    <TableHead className="px-4 py-4 text-[14px] font-semibold text-[#64748B]">Time</TableHead>
                                    <TableHead className="px-4 py-4 text-[14px] font-semibold text-[#64748B]">Patient</TableHead>
                                    <TableHead className="px-4 py-4 text-[14px] font-semibold text-[#64748B]">Specialty</TableHead>
                                    <TableHead className="px-4 py-4 text-[14px] font-semibold text-[#64748B]">Status</TableHead>

                                    <TableHead className="px-4 py-4 text-[14px] font-semibold text-[#64748B] text-right w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {appointments.map((apt) => (
                                    <TableRow key={apt.id} className="border-b-[#E7EBF3] last:border-none hover:bg-slate-50/50">
                                        {/* Time */}
                                        <TableCell className="px-4 py-4">
                                            <div className="flex flex-col whitespace-nowrap">
                                                <span className="text-[14px] font-medium text-[#0F172A]">
                                                    {formatTime(apt.startTime)}
                                                </span>
                                                <span className="text-[12px] font-normal text-[#94A3B8]">
                                                    {getDuration(apt.startTime, apt.endTime)}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Patient */}
                                        <TableCell className="px-4 py-4">
                                            <div className="flex items-center gap-3 whitespace-nowrap">
                                                <Avatar className="h-9 w-9 shrink-0"> {/* تصغير الأفتار قليلاً */}
                                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-[12px] font-bold">
                                                        {apt.patient?.name?.substring(0, 2).toUpperCase() ?? "??"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-[14px] font-medium text-[#0F172A]">
                                                    {apt.patient?.name}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Specialty */}
                                        <TableCell className="px-4 py-4">
                                            <span className="text-[14px] font-normal text-[#475569] whitespace-nowrap">
                                                {apt.doctor?.specialty}
                                            </span>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell className="px-4 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-medium border whitespace-nowrap ${statusStyles[apt.status] ?? "bg-slate-100 text-slate-500 border-slate-200"}`}>
                                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-current mr-1.5 mb-0.5" />
                                                {apt.status.replace("_", " ")}
                                            </span>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="px-4 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-full hover:bg-slate-100 outline-none transition-colors">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/appointments/${apt.id}`} className="cursor-pointer">
                                                            Appointment Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
}