import React from "react";
import { Plus, List, LayoutGrid, Filter, MoreHorizontal, MoreVertical, Eye, Activity, Clock, Calendar, User } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const appointments = [
    {
        time: "09:00 AM",
        duration: "30 min",
        patientName: "Rana Ahmed",
        patientInfo: "F, 24 yrs",
        patientImg: "/rana.png",
        doctor: "Dr. Smith",
        doctorImg: "/dr-smith.png",
        type: "General Check-up",
        status: "Confirmed"
    },
    {
        time: "10:00 AM",
        duration: "45 min",
        patientName: "Mohmed Yasser",
        patientInfo: "M, 30 yrs",
        patientImg: "/mohmed.png",
        doctor: "Dr. Smith",
        doctorImg: "/dr-smith.png",
        type: "Follow-up",
        status: "Checked In"
    },
    {
        time: "10:00 AM",
        duration: "45 min",
        patientName: "Mohmed Yasser",
        patientInfo: "M, 30 yrs",
        patientImg: "/mohmed.png",
        doctor: "Dr. Smith",
        doctorImg: "/dr-smith.png",
        type: "Follow-up",
        status: "Pending"
    },
];

const statusStyles = {
    "Confirmed": "bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]",
    "Checked In": "bg-[#FFEDD5] text-[#F97316] border-[#FFF7ED]",
    "Completed": "bg-[#E2E8F0] text-[#94A3B8] border-[#F1F5F9]",
    "Pending": "bg-[#DBEAFE] text-[#3B82F6] border-[#EFF6FF]",
};

export default function MedicalAppointmentsTable() {
    return (
        <div className="w-full max-w-280 mx-auto bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden mt-6">
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
                                        <Calendar size={14} className="text-[#2B6CEE]" /> Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full h-11 border border-[#E7EBF3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2B6CEE] bg-gray-50/30"
                                    />
                                </div>
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
                <Table className="w-full min-w-255">
                    <TableHeader className="bg-[#F8F9FC]">
                        <TableRow className="border-b-[#E7EBF3] hover:bg-transparent">
                            <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Time</TableHead>
                            <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Patient</TableHead>
                            <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Type</TableHead>
                            <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Doctor</TableHead>
                            <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B]">Status</TableHead>
                            <TableHead className="px-6 py-4 text-[14px] font-semibold text-[#64748B] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {appointments.map((apt, i) => (
                            <TableRow key={i} className="border-b-[#E7EBF3] last:border-none hover:bg-slate-50/50">
                                <TableCell className="px-6 py-4">
                                    <div className="flex flex-col whitespace-nowrap">
                                        <span className="text-[14px] font-medium text-[#0F172A]">{apt.time}</span>
                                        <span className="text-[12px] font-normal text-[#94A3B8]">{apt.duration}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6">
                                    <div className="flex items-center gap-3 whitespace-nowrap">
                                        <Avatar className="h-10 w-10 shrink-0">
                                            <AvatarImage src={apt.patientImg} />
                                            <AvatarFallback className="bg-slate-100 text-[10px]">{apt.patientName.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-medium text-[#0F172A]">{apt.patientName}</span>
                                            <span className="text-[12px] font-normal text-[#64748B]">{apt.patientInfo}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6">
                                    <span className="text-[14px] font-normal text-[#475569] whitespace-nowrap">{apt.type}</span>
                                </TableCell>
                                <TableCell className="px-6">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <div className="p-0.5 bg-blue-50 rounded-full">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={apt.doctorImg} />
                                                <AvatarFallback className="text-[8px]">Doc</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <span className="text-[14px] font-medium text-[#0F172A]">{apt.doctor}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6">
                                    <span className={`px-3 py-1 rounded-xl text-[12px] font-bold border whitespace-nowrap ${statusStyles[apt.status as keyof typeof statusStyles] || "bg-slate-100 text-slate-500 border-slate-200"
                                        }`}>
                                        {apt.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="text-[#64748B] hover:text-[#0F172A] p-2 rounded-full hover:bg-slate-100 outline-none">
                                                <MoreVertical size={20} />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem asChild>
                                                <Link href="/appointments-details" className="cursor-pointer">
                                                    <span>Appointments Details</span>
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


    );
}






