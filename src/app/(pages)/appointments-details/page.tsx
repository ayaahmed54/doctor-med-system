import { MoreVertical, User, Droplets, IdCard, CakeIcon, Mars, Cake, Download, Plus, MessageSquare, Pen, MessageSquareTextIcon, CircleX, CheckCircle2, Hourglass, TrendingUp, CalendarRange, ActivitySquareIcon, ArrowRight, DotSquareIcon, DotSquare, ClockFadingIcon, ArrowUpDown, Pill, FileText, ImageIcon, Calendar, CalendarDaysIcon, LucideClipboardEdit, ClipboardEditIcon, X, XCircleIcon, Venus, Info, History, MapPin, Clock, Stethoscope, Clock1, AlarmClock, NotebookPen, NotepadTextIcon, NotepadText, FileImage } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import RecentHistory from "@/components/RecentHistory/RecentHistory";


export default function AppointmentDetails() {
    return <>
        <div className='min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <header className="w-full pb-4 px-4 md:pl-8 pt-6 md:pt-10 border-b border-[#E7E8EB]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-280 gap-6 mx-auto">
                    <div className="flex flex-col items-start gap-1 w-full md:w-auto">
                        <div className="flex flex-wrap items-center gap-3 w-full">
                            <h1 className="font-['Spline_Sans'] font-bold text-[24px] md:text-[30px] leading-tight md:leading-9 tracking-[-0.75px] text-[#0F172A]">
                                Appointment #40291
                            </h1>
                            <div className="flex items-center px-2.5 py-0.5 bg-[#DCFCE7] border border-[#BBF7D0] rounded-full">
                                <span className="font-bold text-[10px] md:text-[12px] leading-4 tracking-[0.3px] uppercase text-[#15803D]">
                                    Confirmed
                                </span>
                            </div>
                        </div>
                        <p className="text-[14px] md:text-[16px] font-normal leading-6 text-[#64748B]">
                            Scheduled for today, Oct 24, 2023
                        </p>
                    </div>

                    <div className="flex flex-row items-center gap-3 w-full md:w-auto md:pr-12">
                        <Button className="flex-1 md:flex-none flex items-center justify-center px-5 h-10 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50 transition-all gap-2">
                            <ClipboardEditIcon size={18} className="text-[#334155]" />
                            <span className="text-[#334155] text-sm font-medium">
                                Reschedule
                            </span>
                        </Button>
                        <Button className="flex-1 md:flex-none flex items-center justify-center px-5 h-10 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg hover:bg-[#FEE2E2] transition-all gap-2">
                            <XCircleIcon size={18} className="text-[#DC2626]" />
                            <span className="text-[#DC2626] text-sm font-medium">
                                Cancel
                            </span>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <Card className="w-full min-h-40 bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl p-4 md:p-6 flex flex-col justify-center overflow-hidden">
                    <CardContent className="p-0 flex flex-col lg:flex-row justify-between items-center lg:items-start w-full gap-6">

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-5 w-full">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-4 ring-[#F9FAFB] bg-slate-200 overflow-hidden shrink-0">
                                <img src=".." alt="Sarah Ali" className="w-full h-full object-cover" />
                            </div>

                            <div className="flex flex-col gap-1 items-center md:items-start w-full">
                                <div className="flex items-center gap-3">
                                    <h1 className="font-['Inter'] font-bold text-[20px] md:text-[24px] text-[#0D121B] tracking-[-0.6px]">
                                        Sarah Ali
                                    </h1>
                                    <span className="bg-[#DBEAFE] text-[#2B6CEE] text-[10px] md:text-[12px] font-bold px-2 py-0.5 rounded-full tracking-[0.6px] uppercase">
                                        Active
                                    </span>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-4 text-[#4C669A] text-[13px] md:text-[14px]">
                                    <span className="flex items-center gap-1.5">
                                        <Venus className="w-4 h-4" />
                                        34 Yrs
                                    </span>
                                    <div className="w-1 h-1 bg-[#D1D5DB] rounded-full" />
                                    <span className="flex items-center gap-1.5">
                                        <span className="font-medium text-[12px]">ID:</span>
                                        <IdCard className="w-4 h-4" />
                                        #PAT-8832
                                    </span>
                                    <div className="hidden xs:block w-1 h-1 bg-[#D1D5DB] rounded-full" />
                                    <span className="flex items-center gap-1.5 uppercase">
                                        <span className="font-medium text-[12px]">Blood:</span>
                                        <Droplets className="w-4 h-4" />
                                        O+
                                    </span>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                                    <div className="flex items-center px-3 py-1.5 bg-[#F1F5F9] border border-[#F3F4F6] rounded-xl gap-2">
                                        <span className="text-[11px] md:text-[12px] font-bold text-[#475569] uppercase tracking-[0.6px]">Asthma</span>
                                    </div>
                                    <div className="flex items-center px-3 py-1.5 bg-[#F1F5F9] border border-[#F3F4F6] rounded-xl">
                                        <span className="text-[12px] md:text-[14px] font-semibold text-[#475569]">Penicillin Allergy</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-3 w-full lg:w-auto shrink-0 md:justify-center lg:justify-end">
                            <Button className="flex-1 lg:flex-none flex items-center justify-center px-5 h-10 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50 transition-all gap-2">
                                <Link href="/patient-profile" className="flex items-center gap-2">
                                    <User size={18} className="text-slate-900" />
                                    <span className="text-slate-900 text-sm whitespace-nowrap">View Profile</span>
                                </Link>
                            </Button>
                            <Button className="flex-1 lg:flex-none flex items-center justify-center px-5 h-10 bg-blue-600 shadow-lg shadow-blue-500/20 rounded-lg hover:bg-blue-700 transition-all gap-2">
                                <MessageSquare size={18} className="text-white" />
                                <span className="text-white text-sm whitespace-nowrap">Start Chat</span>
                            </Button>
                        </div>

                    </CardContent>
                </Card>


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <Card className="w-full max-w-163 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3]">
                                <h3 className="text-lg flex items-center gap-2 font-bold text-[#0D121B] tracking-tight">
                                    <Info className="text-[#2B6CEE]" size={18} />
                                    Visit Details
                                </h3>

                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="w-full max-w-[736.66px] p-6 bg-white flex flex-col gap-6">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[#94A3B8] font-semibold text-[12px] uppercase leading-4 whitespace-nowrap">
                                                Date & Time
                                            </span>
                                            <div className="flex items-center gap-2 h-7">
                                                <Clock1 size={18} className="text-[#94A3B8] shrink-0" />
                                                <span className="text-[#0F172A] font-medium text-[16px] truncate">Oct 24, 2023 at 10:00 AM</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[#94A3B8] font-semibold text-[12px] uppercase leading-4 whitespace-nowrap">
                                                Visit Type
                                            </span>
                                            <div className="flex items-center gap-2 h-7">
                                                <Stethoscope size={18} className="text-[#94A3B8] shrink-0" />
                                                <span className="text-[#0F172A] font-medium text-[16px] truncate">General Checkup</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[#94A3B8] font-semibold text-[12px] uppercase leading-4 whitespace-nowrap">
                                                Duration
                                            </span>
                                            <div className="flex items-center gap-2 h-7">
                                                <AlarmClock size={18} className="text-[#94A3B8] shrink-0" />
                                                <span className="text-[#0F172A] font-medium text-[16px]">30 Minutes</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[#94A3B8] font-semibold text-[12px] uppercase leading-4 whitespace-nowrap">
                                                Location
                                            </span>
                                            <div className="flex items-center gap-2 h-7">
                                                <MapPin size={18} className="text-[#94A3B8] shrink-0" />
                                                <span className="text-[#0F172A] font-medium text-[16px] truncate">Room 304, West Wing</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[#94A3B8] font-semibold text-[12px] uppercase leading-4">
                                            Reason for Visit
                                        </span>
                                        <div className="flex items-start gap-2 pt-1">

                                            <p className="text-[#334155] font-regular text-[14px] leading-relaxed">
                                                Patient reports persistent migraine headaches accompanied by light sensitivity and nausea. Symptoms
                                                started approximately 3 days ago. No relief from over-the-counter painkillers.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>

                        </Card>
                        <Card className="w-full max-w-163 mt-6  bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3]">
                                <h3 className="text-lg font-bold flex  items-center gap-2 text-[#0D121B] leading-7">
                                    <NotepadText className="text-[#2B6CEE] gap-1.5" size={18} />
                                    Internal Notes
                                </h3>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-1 h-8 px-3 border-none text-[#2B6CEE] hover:bg-blue-50"
                                >
                                    <Plus size={18} className="text-[#2B6CEE]" />
                                    <span className="text-sm font-medium">Add Note</span>
                                </Button>
                            </CardHeader>
                            <CardContent className="flex flex-col p-5 gap-4">
                                <div className="w-full">
                                    <Textarea
                                        placeholder="Add private notes about this appointment here..."
                                        className="min-h-32 bg-[#F8F9FC] border-none placeholder:text-[#4C669A] text-sm resize-none focus-visible:ring-1 focus-visible:ring-[#2B6CEE]"
                                    />
                                </div>

                            </CardContent>
                            <Button className="self-end px-6 mr-5 h-10 bg-[#2B6CEE] shadow-lg shadow-blue-500/20 rounded-lg hover:bg-blue-700 transition-all gap-4">
                                Save Notes
                            </Button>
                        </Card>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Card className="w-full bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3] h-17.25">
                                <h3 className="text-lg font-bold text-[#0D121B]">Attachments (2)</h3>
                                <Button variant="ghost" size="icon" className="w-7 h-7"><Plus className="text-[#2B6CEE]" size={20} /></Button>
                            </CardHeader>
                            <CardContent className="p-2 flex flex-col">

                                <div className="flex flex-row items-center p-3 h-16 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="pr-3">
                                        <div className="w-10 h-10 bg-[#FEF2F2] rounded-sm flex items-center justify-center">
                                            <FileText className="text-[#EF4444]" size={20} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-[#0D121B]">Blood_Test_Results.pdf</h4>
                                        <p className="text-xs text-[#4C669A]">2.4 MB • Oct 22</p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center p-3 h-16 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="pr-3">
                                        <div className="w-10 h-10 bg-[#EFF6FF] rounded-sm flex items-center justify-center">
                                            <FileImage className="text-[#3B82F6]" size={20} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-[#0D121B]">MRI_Scan_v2.jpg</h4>
                                        <p className="text-xs text-[#4C669A]">4.1 MB • Oct 20</p>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                        <RecentHistory />


                    </div>
                </div>
            </div>

        </div>



    </>;
}
