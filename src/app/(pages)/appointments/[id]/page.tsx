"use client"
import { MoreVertical, User, Droplets, IdCard, CakeIcon, Mars, Cake, Download, Plus, MessageSquare, Pen, MessageSquareTextIcon, CircleX, CheckCircle2, Hourglass, TrendingUp, CalendarRange, ActivitySquareIcon, ArrowRight, DotSquareIcon, DotSquare, ClockFadingIcon, ArrowUpDown, Pill, FileText, ImageIcon, Calendar, CalendarDaysIcon, LucideClipboardEdit, ClipboardEditIcon, X, XCircleIcon, Venus, Info, History, MapPin, Clock, Stethoscope, Clock1, AlarmClock, NotebookPen, NotepadTextIcon, NotepadText, FileImage, Trash2, Pencil, ChevronDown, LoaderCircleIcon } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import RecentHistory from "@/components/RecentHistory/RecentHistory";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Aboutpatients from "@/components/Aboutpatients/Aboutpatients";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PrescriptionManager from "./prescription/page";
interface AppointmentData {
    _id: string;
    doctor: string;
    patient: {
        _id: string;
        age: number | null;
        id: string;
    };
    location: {
        clinicName: string;
    };
    startTime: string;
    endTime: string;
    status: string;
    prescriptionCreated: boolean;
    price: number;
}

export default function AppointmentDetails() {
    const params = useParams();
    const id = params?.id as string;
    const { data: session } = useSession();
    const [appointment, setAppointment] = useState<AppointmentData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;

        async function getAppointment() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/appointments/${id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const result = await response.json();
                setAppointment(result.data.appointment);

            } catch (error) {
                console.error("Failed to fetch appointment:", error);
            } finally {
                setLoading(false);
            }
        }
        console.log(process.env.NEXT_PUBLIC_URL_API);
        console.log(`${process.env.NEXT_PUBLIC_URL_API}/appointments/${id}`);

        getAppointment();
    }, [session, id]);
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

    if (!appointment) {
        return <div className="p-10 text-center text-red-500">Appointment not found</div>;
    }
    const duration =
        (new Date(appointment.endTime).getTime() -
            new Date(appointment.startTime).getTime()) /
        60000;

    return <>
        <div className='min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <header className="w-full pb-4 px-4 md:pl-8 pt-6 md:pt-10 border-b border-[#E7E8EB]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-7xl gap-6 mx-auto">
                    <div className="flex flex-col items-start gap-1 w-full md:w-auto">
                        <div className="flex flex-wrap items-center gap-3 w-full">
                            <h1 className="font-bold text-[24px] md:text-[30px] text-[#0F172A]">
                                Appointment #{appointment._id.slice(-5).toUpperCase()}
                            </h1>
                            <div className={`flex items-center px-2.5 py-0.5 rounded-full border ${appointment.status === 'confirmed' ? 'bg-[#DCFCE7] border-[#BBF7D0]' : 'bg-blue-50 border-blue-200'}`}>
                                <span className={`font-bold text-[10px] md:text-[12px] uppercase ${appointment.status === 'confirmed' ? 'text-[#15803D]' : 'text-blue-700'}`}>
                                    {appointment.status}
                                </span>
                            </div>
                        </div>
                        <p className="text-[14px] md:text-[16px] text-[#64748B]">
                            {new Date(appointment.startTime).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="flex flex-row items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none gap-2">
                            <ClipboardEditIcon size={18} /> Reschedule
                        </Button>
                        <Button variant="destructive" className="flex-1 md:flex-none gap-2 bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2] hover:bg-[#FEE2E2]">
                            <XCircleIcon size={18} /> Cancel
                        </Button>
                    </div>
                </div>
            </header>

            <div className="w-full max-w-7xl mx-auto p-4 md:px-6 grow">


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <Card className="bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3]">
                                <h3 className="text-lg flex items-center gap-2 font-bold text-[#0D121B]">
                                    <Info className="text-[#2B6CEE]" size={18} />
                                    Visit Details
                                </h3>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[#94A3B8] font-semibold text-[12px] uppercase">Date & Time</span>
                                        <div className="flex items-center gap-2">
                                            <Clock1 size={18} className="text-[#94A3B8]" />
                                            <span className="text-[#0F172A] font-medium">
                                                {new Date(appointment.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[#94A3B8] font-semibold text-[12px] uppercase">Duration</span>
                                        <div className="flex items-center gap-2">
                                            <Hourglass size={18} className="text-[#94A3B8]" />
                                            <span className="text-[#0F172A] font-medium">{duration} Minutes</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[#94A3B8] font-semibold text-[12px] uppercase">Location</span>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-[#94A3B8]" />
                                            <span className="text-[#0F172A] font-medium">{appointment.location.clinicName}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[#94A3B8] font-semibold text-[12px] uppercase">Price</span>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={18} className="text-[#94A3B8]" />
                                            <span className="text-[#0F172A] font-medium">${appointment.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Prescription Section */}

                        <PrescriptionManager />
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