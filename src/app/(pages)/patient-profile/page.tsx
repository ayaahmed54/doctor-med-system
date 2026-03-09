import { MoreVertical, User, Droplets, IdCard, CakeIcon, Mars, Cake, Download, Plus, MessageSquare, Pen, MessageSquareTextIcon, CircleX, CheckCircle2, Hourglass, TrendingUp, CalendarRange, ActivitySquareIcon, ArrowRight, DotSquareIcon, DotSquare, ClockFadingIcon, ArrowUpDown, Pill, FileText, ImageIcon, Calendar } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import CardPatient from "@/components/card-patient/card-patient";
import ActivePrescriptions from "@/components/ActivePrescriptions/ActivePrescriptions";

export default function PatientCard() {
    return <>
        <div className='min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <Card className="w-full min-h-40 bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl p-4 md:p-6 flex flex-col justify-center overflow-hidden">
                    <CardContent className="p-0 flex flex-col md:flex-row justify-between items-center md:items-start lg:items-center w-full gap-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-5 text-center md:text-left w-full">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-4 ring-[#F9FAFB] bg-slate-200 overflow-hidden shrink-0">
                                <img src=".." alt="Sarah Ali" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-1 w-full items-center md:items-start">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    <h1 className="font-['Inter'] font-bold text-[20px] md:text-[24px] text-[#0D121B] tracking-[-0.6px]">
                                        Sarah Ali
                                    </h1>
                                    <span className="bg-[#DBEAFE] text-[#2B6CEE] text-[10px] md:text-[12px] font-bold px-2 py-0.5 rounded-full tracking-[0.6px] uppercase">
                                        Active
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-[#4C669A] text-[13px] md:text-[14px]">
                                    <span className="flex items-center gap-1.5">
                                        <span className="font-medium text-[12px]">ID:</span>
                                        <IdCard className="w-4 h-4" />
                                        #PAT-8832
                                    </span>
                                    <div className="hidden sm:block w-1 h-1 bg-[#D1D5DB] rounded-full" />
                                    <span className="flex items-center gap-1.5">
                                        <Cake className="w-4 h-4" />
                                        34 Yrs
                                    </span>
                                    <div className="hidden sm:block w-1 h-1 bg-[#D1D5DB] rounded-full" />
                                    <span className="flex items-center gap-1.5 uppercase">
                                        <Mars className="w-4 h-4" />
                                        Male
                                    </span>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 w-full">
                                    <div className="flex items-center px-3 py-1.5 bg-[#F9FAFB] border border-[#F3F4F6] rounded-[6px] gap-2">
                                        <span className="text-[10px] md:text-[12px] font-bold text-[#4C669A] uppercase tracking-[0.6px]">Blood Type</span>
                                        <span className="text-[13px] md:text-[14px] font-semibold text-[#0D121B]">O+</span>
                                    </div>
                                    <div className="flex items-center px-3 py-1.5 bg-[#FEF2F2] border border-[#FEE2E2] rounded-[6px]">
                                        <span className="text-[13px] md:text-[14px] font-semibold text-[#991B1B]">Allergies: Penicillin</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-3 shrink-0 w-full md:w-auto justify-center md:justify-end">
                            <button className="flex-1 md:flex-none flex items-center justify-center px-4 md:px-5 h-10 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50 transition-all gap-2">
                                <MessageSquareTextIcon size={18} className="text-slate-900" />
                                <span className="text-slate-900 text-sm font-medium">Message</span>
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center px-4 md:px-5 h-10 bg-blue-600 shadow-lg shadow-blue-500/20 rounded-lg hover:bg-blue-700 transition-all gap-2">
                                <Pen size={18} className="text-white" />
                                <span className="text-white text-sm font-medium">Edit Profile</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>


                <CardPatient />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <Card className="w-full max-w-163 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3]">
                                <h3 className="text-lg font-bold text-[#0D121B] tracking-tight">
                                    Medical History
                                </h3>
                                <Link href="/patient-medical-history">
                                    <Button variant="link" className="text-sm font-medium text-[#2B6CEE] p-0 h-auto">
                                        View All
                                    </Button></Link>
                            </CardHeader>
                            <section className="relative p-0 pt-4 pb-6 pl-8 pr-4">
                                <div className="absolute left-4.75 top-6 bottom-6 w-0.5 bg-[#F3F4F6]" />
                                <div className="flex flex-col gap-8">
                                    <div className="relative flex flex-col gap-1">
                                        <div className="absolute -left-5.25 top-1.5 w-3 h-3 bg-[#2B6CEE] rounded-full ring-4 ring-white z-10" />

                                        <div className="flex items-start justify-between w-full">
                                            <h4 className="text-base font-semibold text-[#0D121B]">General Checkup</h4>
                                            <span className="px-2 py-1 bg-[#F9FAFB] rounded text-xs text-[#4C669A]">
                                                Oct 12, 2023
                                            </span>
                                        </div>

                                        <p className="text-sm text-[#4C669A] leading-5">
                                            Routine examination. Patient reported mild fatigue. Vitals normal.
                                        </p>

                                        <div className="flex gap-2 mt-1">
                                            <span className="px-2 py-0.5 border border-[#E7EBF3] rounded text-xs text-[#4C669A]">
                                                Dr. Smith
                                            </span>
                                            <span className="px-2 py-0.5 border border-[#E7EBF3] rounded text-xs text-[#4C669A]">
                                                Clinic A
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col gap-1">
                                        <div className="absolute -left-5.25 top-1.5 w-3 h-3 bg-[#D1D5DB] rounded-full ring-4 ring-white z-10" />
                                        <div className="flex items-start justify-between w-full">
                                            <h4 className="text-base font-semibold text-[#0D121B]">Lab Results - Blood Work</h4>
                                            <span className="px-2 py-1 bg-[#F9FAFB] rounded text-xs text-[#4C669A]">
                                                Sep 28, 2023
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#4C669A] leading-5">
                                            Complete Blood Count (CBC) and Lipid Profile. Cholesterol slightly elevated.
                                        </p>
                                    </div>
                                    <div className="relative flex flex-col gap-1">
                                        <div className="absolute -left-5.25 top-1.5 w-3 h-3 bg-[#D1D5DB] rounded-full ring-4 ring-white z-10" />
                                        <div className="flex items-start justify-between w-full">
                                            <h4 className="text-base font-semibold text-[#0D121B]">Lab Results - Blood Work</h4>
                                            <span className="px-2 py-1 bg-[#F9FAFB] rounded text-xs text-[#4C669A]">
                                                Sep 28, 2023
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#4C669A] leading-5">
                                            Complete Blood Count (CBC) and Lipid Profile. Cholesterol slightly elevated.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </Card>
                        <Card className="w-full max-w-163 mt-6  bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3]">
                                <h3 className="text-lg font-bold text-[#0D121B] leading-7">
                                    Clinical Notes
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
                                        placeholder="Type new clinical notes here..."
                                        className="min-h-[128px] bg-[#F8F9FC] border-none placeholder:text-[#4C669A] text-sm resize-none focus-visible:ring-1 focus-visible:ring-[#2B6CEE]"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 p-3 bg-white border border-[#E7EBF3] rounded-lg">
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <span className="text-xs font-bold text-[#0D121B]">
                                            Dr. Sarah Smith
                                        </span>
                                        <span className="text-xs text-[#4C669A]">
                                            Oct 12, 10:30 AM
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#4C669A] leading-5">
                                        Patient advised to reduce sodium intake and maintain regular exercise routine.
                                        Scheduled follow-up in 30 days to monitor blood pressure changes.
                                    </p>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <ActivePrescriptions />
                        <Card className="w-full max-w-89.25 min-h-56 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden mt-6">
                            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3] h-17.25">
                                <h3 className="text-lg font-bold text-[#0D121B] leading-7">
                                    Documents & Scans
                                </h3>
                                <Link href="/patient-documents" className="text-sm font-medium text-[#2B6CEE] hover:underline">
                                    View All
                                </Link>
                            </CardHeader>
                            <CardContent className="flex flex-row justify-center items-start p-5 gap-3 h-38.25">
                                <div className="relative flex-1 h-28.25 bg-[#F3F4F6] border border-[#E7EBF3] rounded-lg overflow-hidden group cursor-pointer">

                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-200 opacity-80">
                                        <ImageIcon className="text-slate-400" size={32} />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2">
                                        <span className="text-[12px] font-medium text-white leading-4">Chest X-Ray</span>
                                        <span className="text-[10px] text-[#D1D5DB] leading-3">Oct 10</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center flex-1 h-28.25 bg-[#F3F4F6] border border-[#E7EBF3] rounded-lg p-2 group cursor-pointer hover:bg-[#EBEDF0] transition-colors">
                                    <div className="w-7.5 h-9 flex items-center justify-center mb-1">
                                        <FileText className="text-[#EF4444]" size={30} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[12px] font-medium text-[#0D121B] text-center leading-4">
                                        Blood Report Oct 2023
                                    </span>
                                </div>

                            </CardContent>
                        </Card>
                        <Card className="relative w-full max-w-89.25 h-40 bg-linear-to-br from-[#2B6CEE] to-[#2563EB] shadow-blue-500/30 shadow-lg border-none rounded-xl overflow-hidden flex flex-col p-4">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 blur-2xl rounded-full pointer-events-none" />
                            <div className="relative z-10 flex flex-col gap-0.5 pt-0">
                                <span className="text-[10px] font-bold text-blue-100 tracking-widest uppercase opacity-90">
                                    Next Appointment
                                </span>
                                <h3 className="text-[19px] font-bold text-white leading-tight">
                                    Follow-up Checkup
                                </h3>
                                <p className="text-[13px] font-medium text-blue-100/80">
                                    With Dr. Smith
                                </p>
                            </div>
                            <div className="relative z-20 flex flex-row items-center gap-3 mt-auto mb-1">
                                <div className="flex items-center justify-center w-9 h-9 bg-white/20 backdrop-blur-md rounded-lg border border-white/10">
                                    <Calendar className="text-white" size={18} />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <span className="text-[14px] font-bold text-white leading-none mb-1">
                                        Nov 15, 2023
                                    </span>
                                    <span className="text-[11px] font-medium text-blue-100">
                                        10:00 AM - 10:30 AM
                                    </span>
                                </div>
                            </div>
                        </Card>

                    </div>
                </div>
            </div>

        </div>



    </>;
}

