import React from "react";
import {
    Calendar,
    ChevronRight,
    Brain,
    Activity,
    LucideIcon,
    CalendarDaysIcon
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
interface Appointment {
    time: string;
    patient: string;
    type: string;
    status: "Confirmed" | "Checked In" | "Waiting" | "Pending";
}

interface ScanItem {
    title: string;
    patient: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

const appointments: Appointment[] = [
    { time: "09:00 AM", patient: "Rana Ahmed", type: "General Check-up", status: "Confirmed" },
    { time: "10:00 AM", patient: "Mohmed yasser", type: "Follow-up", status: "Checked In" },
    { time: "11:30 AM", patient: "ALi Refaat", type: "Consultation", status: "Waiting" },
    { time: "01:00 PM", patient: "Alaa Mohamed", status: "Confirmed", type: "Scan Review" },
    { time: "02:30 PM", patient: "Amr El-Qadi", type: "Emergency", status: "Pending" },
];

const pendingScans: ScanItem[] = [
    { title: "MRI - Brain", patient: "Rana Ahmed", icon: Brain, color: "text-[#2563EB]", bg: "bg-[#DBEAFE]" },
    { title: "X-Ray - Chest", patient: "Mohmed yasser", icon: Activity, color: "text-[#4F46E5]", bg: "bg-[#E0E7FF]" },


];

const statusStyles = {
    "Confirmed": "bg-[#DCFCE7] text-[#15803D]",
    "Checked In": "bg-[#E0F2FE] text-[#0369A1]",
    "Waiting": "bg-[#FEF9C3] text-[#854D0E]",
    "Pending": "bg-[#FEE2E2] text-[#B91C1C]",
};

const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
};

export default function MedicalDashboard() {
    return (
        <div className="flex flex-col lg:flex-row gap-8 p-8 bg-[#F8F9FC] min-h-screen">

            <div className="flex-1 flex flex-col gap-6">
                <div className="flex justify-between items-center w-full">
                    <h3 className="text-xl font-bold text-[#0D121B]">Today's Appointments</h3>
                    <Link href="/appointments" className="text-sm font-semibold text-[#2B6CEE]">
                        <button className="text-sm font-semibold text-[#2B6CEE] hover:underline">View All</button>
                    </Link>
                </div>

                <div className="bg-white border border-[#E7EBF3] shadow-sm rounded-2xl overflow-hidden">
                    <Table>
                        <TableHeader className="bg-[#F8F9FC]">
                            <TableRow>
                                <TableHead className="px-6 py-4 text-[12px] uppercase text-[#4C669A]">Time</TableHead>
                                <TableHead className="px-6 py-4 text-[12px] uppercase text-[#4C669A]">Patient</TableHead>
                                <TableHead className="px-6 py-4 text-[12px] uppercase text-[#4C669A]">Type</TableHead>
                                <TableHead className="px-6 py-4 text-[12px] uppercase text-[#4C669A]">Status</TableHead>
                                <TableHead className="px-6 py-4 text-right text-[12px] uppercase text-[#4C669A]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((apt, i) => (
                                <TableRow key={i} className="hover:bg-gray-50/50 border-b-[#E7EBF3] last:border-none h-16">
                                    <TableCell className="px-6 font-medium text-[#0D121B]">{apt.time}</TableCell>
                                    <TableCell className="px-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border">
                                                <AvatarFallback className="bg-[#F0F4FF] text-[#2B6CEE] text-xs font-bold">
                                                    {getInitials(apt.patient)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-semibold text-[#0D121B]">{apt.patient}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 text-[#4C669A]">{apt.type}</TableCell>
                                    <TableCell className="px-6">
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${statusStyles[apt.status]}`}>
                                            {apt.status}
                                        </span>
                                    </TableCell>

                                    <TableCell className="px-6 text-right text-[#2B6CEE] font-bold cursor-pointer">
                                        <Link href="/appointments-details" className="text-sm font-semibold text-[#2B6CEE] hover:underline">View</Link>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="w-full lg:w-100 flex flex-col gap-6">

                {/* Upcoming */}
                <div className="bg-white border border-[#E7EBF3] rounded-[24px] p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-[#0D121B]">Upcoming</h3>
                        <Link href={'/appointments'}><CalendarDaysIcon className="text-[#4C669A] w-5 h-5 cursor-pointer" /></Link>
                    </div>
                    <div className="space-y-4">
                        {[
                            { day: "WED", date: "25", title: "Hospital Staff Meeting", time: "09:00 - 10:30", color: "border-blue-500" },
                            { day: "WED", date: "25", title: "Surgery: Williams", time: "11:00 - 02:00", color: "border-purple-500" },
                            { day: "WED", date: "25", title: "Online Consultation", time: "10:00 - 12:00", color: "border-yellow-500" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="text-center min-w-8">
                                    <p className="text-[10px] font-bold text-[#4C669A]">{item.day}</p>
                                    <p className="text-lg font-bold text-[#0D121B]">{item.date}</p>
                                </div>
                                <div className={`flex-1 bg-[#F8F9FC] p-3 rounded-xl border-l-4 ${item.color}`}>
                                    <h4 className="text-sm font-bold text-[#0D121B]">{item.title}</h4>
                                    <p className="text-xs text-[#4C669A]">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-[#E7EBF3] rounded-[24px] p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-[#0D121B]">Pending Scans</h3>
                        <Link href={'/patient-documents'}>
                            <button className="text-sm font-semibold text-[#2B6CEE]">View all</button>
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {pendingScans.map((scan, idx) => {
                            const Icon = scan.icon;
                            return (
                                <div key={idx} className="flex items-center justify-between p-4 border border-[#F1F3F9] rounded-2xl hover:bg-gray-50 cursor-pointer transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl ${scan.bg} ${scan.color}`}>
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-[14px] font-bold text-[#0D121B]">{scan.title}</h4>
                                            <p className="text-[12px] text-[#4C669A]">Patient: {scan.patient}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-[#4C669A]" />
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}




