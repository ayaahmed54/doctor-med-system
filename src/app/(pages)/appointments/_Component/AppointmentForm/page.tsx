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

            {/* Stats Cards */}
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

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full md:w-auto h-9 bg-[#2B6CEE] hover:bg-[#1e56cc] text-white font-bold text-[14px] rounded-xl shadow-lg shadow-blue-500/10 gap-2 px-6">
                                <Plus size={18} />
                                <span className="whitespace-nowrap">New Appointment</span>
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-[90%] sm:max-w-125 bg-white rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                            <DialogHeader className="p-6 pb-2 bg-[#F8F9FC]">
                                <DialogTitle className="text-xl md:text-2xl font-bold text-[#0D121B] tracking-tight">
                                    Book Appointment
                                </DialogTitle>
                                <p className="text-[#64748B] text-sm">Fill in the patient visit details</p>
                            </DialogHeader>

                            <div className="p-6 space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                                        <User size={14} className="text-[#2B6CEE]" /> Patient Name
                                    </label>
                                    <input
                                        className="w-full h-11 border border-[#E7EBF3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2B6CEE] transition-all bg-gray-50/30"
                                        placeholder="e.g. Sarah Ali"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                                            <Clock size={14} className="text-[#2B6CEE]" /> Time Slot
                                        </label>
                                        <select className="w-full h-11 border border-[#E7EBF3] rounded-xl px-3 text-sm focus:outline-none focus:border-[#2B6CEE] bg-white cursor-pointer">
                                            <option>09:00 AM</option>
                                            <option>10:30 AM</option>
                                            <option>01:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                                        <Activity size={14} className="text-[#2B6CEE]" /> Appointment Type
                                    </label>
                                    <select className="w-full h-11 border border-[#E7EBF3] rounded-xl px-3 text-sm focus:outline-none focus:border-[#2B6CEE] bg-white cursor-pointer">
                                        <option>Routine Checkup</option>
                                        <option>Consultation</option>
                                        <option>Follow-up</option>
                                    </select>
                                </div>

                                <div className="pt-2 flex flex-col md:flex-row gap-3">
                                    <DialogTrigger asChild>
                                        <button className="flex-1 h-11 rounded-xl border border-[#E7EBF3] text-[#64748B] font-bold text-sm hover:bg-gray-50 transition-all">
                                            Cancel
                                        </button>
                                    </DialogTrigger>
                                    <button className="flex-2 h-11 bg-[#2B6CEE] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#1e56cc] transition-all">
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="overflow-x-auto scrollbar-hide">
                    {appointments.length === 0 ? (
                        <div className="flex justify-center items-center py-20">
                            <span className="text-[#94A3B8] text-sm">No appointments found</span>
                        </div>
                    ) : (
                        <Table className="w-full min-w-255">
                            <TableHeader className="bg-[#F8F9FC]">
                                <TableRow className="border-b-[#E7EBF3] hover:bg-transparent">
                                    <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Time</TableHead>
                                    <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Patient</TableHead>
                                    <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Specialty</TableHead>
                                    <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Doctor</TableHead>
                                    <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Status</TableHead>
                                    <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {appointments.map((apt) => (
                                    <TableRow key={apt.id} className="border-b-[#E7EBF3] last:border-none hover:bg-slate-50/50">

                                        {/* Time */}
                                        <TableCell className="px-6 py-4">
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
                                        <TableCell className="px-6">
                                            <div className="flex items-center gap-3 whitespace-nowrap">
                                                <Avatar className="h-10 w-10 shrink-0">
                                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-[13px] font-bold">
                                                        {apt.patient?.name?.substring(0, 2).toUpperCase() ?? "??"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-[14px] font-medium text-[#0F172A]">
                                                    {apt.patient?.name}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Specialty */}
                                        <TableCell className="px-6">
                                            <span className="text-[14px] font-normal text-[#475569] whitespace-nowrap">
                                                {apt.doctor?.specialty}
                                            </span>
                                        </TableCell>

                                        {/* Doctor */}
                                        <TableCell className="px-6">
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <Avatar className="h-7 w-7">
                                                    <AvatarFallback className="bg-green-100 text-green-600 text-[10px] font-bold">
                                                        {apt.doctor?.name?.substring(0, 2).toUpperCase() ?? "Dr"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-[14px] font-medium text-[#0F172A]">
                                                    {apt.doctor?.name}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell className="px-6">
                                            <span className={`px-3 py-1 rounded-xl text-[12px] font-bold border whitespace-nowrap ${statusStyles[apt.status] ?? "bg-slate-100 text-slate-500 border-slate-200"}`}>
                                                {apt.status.replace("_", " ")}
                                            </span>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="px-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="text-[#64748B] hover:text-[#0F172A] p-2 rounded-full hover:bg-slate-100 outline-none">
                                                        <MoreVertical size={20} />
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