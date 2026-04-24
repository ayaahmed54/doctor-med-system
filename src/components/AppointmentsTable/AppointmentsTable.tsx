"use client"
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Plus, List, LayoutGrid, Filter, MoreVertical, Activity, Clock, User, CheckCircle, XCircle, Calendar, ChevronRight, CalendarDaysIcon, ImageIcon, FileText } from "lucide-react";
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
const pendingScans = [
    {
        title: "Chest X-Ray",
        patient: "John Doe",
        icon: ImageIcon,
        bg: "bg-blue-50",
        color: "text-blue-600"
    },

    {
        title: "MRI Brain",
        patient: "Mike Ross",
        icon: FileText,
        bg: "bg-purple-50",
        color: "text-purple-600"
    }
];



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
        async function getAppointments() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
                setLoading(true);
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
                // الحل هنا: إيقاف اللودنج سواء نجح الطلب أو فشل
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
    if (!appointments) {
        return <div className="p-10 text-center text-red-500">appointments not found</div>;
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
            {/* Container الرئيسي للقسمين */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. قسم الجدول - يأخذ 2 من 3 من المساحة (lg:col-span-2) */}
                <div className="lg:col-span-2 bg-white border border-[#E7EBF3] shadow-sm rounded-2xl overflow-hidden flex flex-col h-fit">

                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[#E7EBF3]">
                        <h2 className="text-lg font-bold text-[#0F172A]">Appointments</h2>
                    </div>

                    {/* Table Wrapper - هنا تم منع السكرول غير المرغوب */}
                    <div className="overflow-x-auto w-full">
                        {appointments.length === 0 ? (
                            <div className="flex justify-center items-center py-20">
                                <span className="text-[#94A3B8] text-sm">No appointments found</span>
                            </div>
                        ) : (
                            <Table className="w-full min-w-[600px]"> {/* min-w تضمن أن الجدول لا ينضغط بشكل بشع */}
                                <TableHeader className="bg-[#F8F9FC]">
                                    <TableRow className="border-b-[#E7EBF3] hover:bg-transparent">
                                        <TableHead className="px-6 py-5 text-[13px] uppercase tracking-wider font-bold text-[#64748B]">Time</TableHead>
                                        <TableHead className="px-6 py-5 text-[13px] uppercase tracking-wider font-bold text-[#64748B]">Patient</TableHead>
                                        <TableHead className="px-6 py-5 text-[13px] uppercase tracking-wider font-bold text-[#64748B]">Specialty</TableHead>
                                        <TableHead className="px-6 py-5 text-[13px] uppercase tracking-wider font-bold text-[#64748B]">Status</TableHead>
                                        <TableHead className="px-6 py-5 text-[13px] uppercase tracking-wider font-bold text-[#64748B] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {appointments.map((apt) => (
                                        <TableRow key={apt.id} className="border-b-[#E7EBF3] last:border-none hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="px-6 py-3 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-[15px] font-semibold text-[#0F172A]">{formatTime(apt.startTime)}</span>
                                                    <span className="text-[12px] font-medium text-[#94A3B8] mt-0.5">{getDuration(apt.startTime, apt.endTime)}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 border border-slate-100 shrink-0">
                                                        <AvatarFallback className="bg-[#EFF6FF] text-[#2563EB] text-[12px] font-bold">
                                                            {apt.patient?.name?.substring(0, 2).toUpperCase() ?? "??"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-[14px] font-semibold text-[#334155] truncate max-w-[120px]">
                                                        {apt.patient?.name}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="px-6 py-3">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[12px] font-medium bg-slate-100 text-slate-700 whitespace-nowrap">
                                                    {apt.doctor?.specialty}
                                                </span>
                                            </TableCell>

                                            <TableCell className="px-6 py-3">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight border ${statusStyles[apt.status] ?? "bg-slate-50 text-slate-500 border-slate-200"}`}>
                                                    {apt.status.replace("_", " ")}
                                                </span>
                                            </TableCell>

                                            <TableCell className="px-6 py-3 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="inline-flex items-center justify-center w-8 h-8 text-[#64748B] hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-all">
                                                            <MoreVertical size={16} />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48 p-1 rounded-xl shadow-xl">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/appointments/${apt.id}`} className="flex items-center px-3 py-2 text-sm cursor-pointer">
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

                {/* 2. قسم Upcoming - يأخذ 1 من 3 (lg:col-span-1) */}
                <div className="lg:col-span-1 flex flex-col gap-6">

                    {/* 1. Upcoming Appointments Card */}
                    <div className="bg-white border border-[#E7EBF3] rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg text-[#0D121B]">Upcoming</h3>
                            <Link href={'/appointments'}>
                                <CalendarDaysIcon className="text-[#4C669A] w-5 h-5 hover:text-[#2B6CEE] transition-colors" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {[
                                { day: "WED", date: "25", title: "Hospital Staff Meeting", time: "09:00 - 10:30", color: "border-blue-500" },
                                { day: "WED", date: "25", title: "Surgery: Williams", time: "11:00 - 02:00", color: "border-purple-500" },
                                { day: "WED", date: "25", title: "Online Consultation", time: "10:00 - 12:00", color: "border-yellow-500" }
                            ].map((item, idx) => (
                                <div key={idx} className={`flex gap-4 p-3 border-l-4 rounded-r-xl bg-[#F8FAFC] ${item.color} hover:bg-white hover:shadow-sm transition-all border-y border-r border-y-transparent border-r-transparent hover:border-[#E7EBF3]`}>
                                    <div className="flex flex-col items-center justify-center min-w-[40px]">
                                        <span className="text-[10px] font-bold text-[#94A3B8]">{item.day}</span>
                                        <span className="text-lg font-bold text-[#0F172A]">{item.date}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-[#334155] line-clamp-1">{item.title}</span>
                                        <span className="text-[12px] text-[#64748B] font-medium">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Pending Scans Card */}
                    <div className="bg-white border border-[#E7EBF3] rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg text-[#0D121B]">Pending Scans</h3>
                            <Link href={'/patient-documents'}>
                                <button className="text-[13px] font-bold text-[#2B6CEE] hover:underline transition-all">View all</button>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {pendingScans.map((scan, idx) => {
                                const Icon = scan.icon;
                                return (
                                    <div key={idx} className="group flex items-center justify-between p-4 border border-[#F1F3F9] rounded-2xl hover:border-[#2B6CEE]/30 hover:bg-blue-50/30 cursor-pointer transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-xl shrink-0 transition-transform group-hover:scale-110 ${scan.bg} ${scan.color}`}>
                                                <Icon size={20} />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-[14px] font-bold text-[#0D121B] truncate">{scan.title}</h4>
                                                <p className="text-[12px] text-[#4C669A] font-medium truncate">Patient: {scan.patient}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#2B6CEE] group-hover:translate-x-1 transition-all" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}




