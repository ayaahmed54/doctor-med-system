"use client"
import { MoreVertical, User, Droplets, IdCard, CakeIcon, Mars, Cake, Download, Plus, MessageSquare, Pen, MessageSquareTextIcon, CircleX, CheckCircle2, Hourglass, TrendingUp, CalendarRange, ActivitySquareIcon, ArrowRight, DotSquareIcon, DotSquare, ClockFadingIcon, ArrowUpDown, Pill, FileText, ImageIcon, Calendar, LoaderCircleIcon } from "lucide-react";

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
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Aboutpatients from "@/components/Aboutpatients/Aboutpatients";
import Notes from "@/components/Notes/Notes";
interface PatientData {
    _id: string;
    displayName: string;
    phone: string;
    gender: string;
    bloodType: string;
    age: number;
    createdAt: number;
    medicalHistory: string;
    address: {
        street: string;
        city: string;
    };
}

export default function PatientCard() {
    const params = useParams();
    const id = params?.id as string;
    const { data: session } = useSession();
    const [patient, setPatient] = useState<PatientData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;

        async function getPatient() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/patients/${id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const result = await response.json();
                setPatient(result.data.data);
                console.log("PATIENT:", result.data.data);
            } catch (error) {
                console.error("Failed to fetch patient:", error);
            } finally {
                setLoading(false);
            }
        }

        getPatient();
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

    if (!patient) {
        return <div className="p-10 text-center text-red-500">Patient not found</div>;
    }

    return <>
        <div className='min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <Aboutpatients />


                <CardPatient />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <Card className="w-full max-w-163 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3]">
                                <h3 className="text-lg font-bold text-[#0D121B] tracking-tight">
                                    Medical History
                                </h3>
                                <Link href={`/patients/${id}/medical-history`}>
                                    <Button variant="link" className="text-sm font-medium text-[#2B6CEE] p-0 h-auto">
                                        View All
                                    </Button>
                                </Link>
                            </CardHeader>
                            <section className="relative p-0 pt-4 pb-6 pl-8 pr-4">
                                <div className="absolute left-4.75 top-6 bottom-6 w-0.5 bg-[#F3F4F6]" />
                                <div className="flex flex-col gap-8">
                                    <div className="relative flex flex-col gap-1">
                                        <div className="absolute -left-5.25 top-1.5 w-3 h-3 bg-[#2B6CEE] rounded-full ring-4 ring-white z-10" />

                                        <div className="flex items-start justify-between w-full">
                                            <h4 className="text-base font-semibold text-[#0D121B]">General Checkup</h4>
                                            <span className="px-2 py-1 bg-[#F9FAFB] rounded text-xs text-[#4C669A]">
                                                {patient?.createdAt
                                                    ? new Date(patient.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })
                                                    : "No date"}
                                            </span>

                                        </div>

                                        <p className="text-sm text-[#4C669A] leading-5">
                                            {patient.medicalHistory}
                                        </p>

                                        <div className="flex gap-2 mt-1">

                                            <span className="px-2 py-0.5 border border-[#E7EBF3] rounded text-xs text-[#4C669A]">
                                                Clinic A
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </Card>
                        <Notes />
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