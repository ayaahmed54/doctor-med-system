"use client"
import CardPatient from '@/components/card-patient/card-patient'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { ActivityIcon, Bandage, BandageIcon, BriefcaseMedical, ClipboardEditIcon, ClipboardPlusIcon, Droplets, Files, FileText, IdCard, ImageIcon, ListFilterIcon, LucideBriefcaseMedical, Maximize2, MessageSquare, MoreHorizontal, MoreVertical, NotepadText, Pill, Play, Plus, User, Venus, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from "next/navigation";
import MRiKnee from "../../../../../assets/images/MRiKnee.jpg"
import React, { Activity, useEffect, useState } from 'react'
import ActivePrescriptions from '@/components/ActivePrescriptions/ActivePrescriptions'
import RecentHistory from '@/components/RecentHistory/RecentHistory'
import { useSession } from 'next-auth/react'
import Aboutpatients from '@/components/Aboutpatients/Aboutpatients'
interface MedicalHistory {
    _id: string;
    doctor: {
        _id: string;
        displayName: string;
        specialty: string;
    };
    patient: {
        _id: string;
        displayName: string;
    };
    appointment: {
        _id: string;
        startTime: string;
    };
    diagnosis: string;
    medications: {
        name: string;
        strength: string;
        dosage: string;
        frequency: string;
        duration: string;
        status: string;
        _id: string;
    }[];
    status: string;
    notes: string;
    createdAt: string;
}
export default function page() {


    const params = useParams();
    const id = params?.id as string;
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<MedicalHistory[]>([]);
    useEffect(() => {
        if (!session) return;

        async function getHistory() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
                setLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/patients/${id}/medical-history`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );


                const result = await response.json();

                console.log("HISTORY:", result);

                setHistory(result.data);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }

        }

        if (id) getHistory();
    }, [id]);

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
        <div className="min-h-screen w-full bg-[#F8FAFC]">
            <div className="w-full max-w-300 mx-auto p-4 md:px-6">
                <Aboutpatients />

                <CardPatient />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-300 mx-auto p-4 md:px-6">

                {/* ================== CARD 1 ================== */}

                <div className="flex flex-col gap-6">


                    <Card className="w-full bg-white border border-[#E2E8F0] shadow rounded-xl overflow-hidden p-0">

                        <div className="flex justify-between items-center px-5 py-4 bg-[#F8FAFC]/50 border-b border-[#F1F5F9]">
                            <h3 className="font-bold text-[16px] text-[#0F172A]">
                                Past Diagnoses
                            </h3>
                        </div>

                        {/* content */}
                        <div className="p-0">
                            {history.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-start gap-3 p-4 border-t border-[#F1F5F9]"
                                >
                                    <div className="mt-1 shrink-0">
                                        <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                                            <BriefcaseMedical className="w-5 h-6 text-[#2563EB]" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-semibold text-[14px] text-[#0F172A]">
                                            {item.diagnosis}
                                        </span>

                                        <span className="text-[12px] text-[#64748B]">
                                            Diagnosed: {new Date(item.createdAt).toLocaleDateString()}
                                        </span>

                                        <div className="bg-[#FFFBEB] px-2 py-0.5 rounded-full w-fit mt-0.5">
                                            <span className="text-[10px] font-bold text-[#D97706] uppercase">
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </Card>

                    <ActivePrescriptions />

                </div>

                {/* ================== CARD 2 ================== */}
                <div className="flex flex-col gap-6">
                    <Card className="w-full bg-white border border-[#E2E8F0] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden p-0">
                        <div className="flex justify-between items-center px-5 py-3.5 bg-[#F8FAFC]/50 border-b border-[#F1F5F9]">
                            <h3 className="font-bold text-[16px] leading-6 text-[#0F172A]">
                                Recent Lab Results
                            </h3>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-[#94A3B8]">
                                <ListFilterIcon className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="p-0">
                            <div className="flex bg-[#F8FAFC]">
                                <div className="flex-1 px-5 py-3 text-[12px] font-medium text-[#64748B] uppercase">Test Name</div>
                                <div className="w-26.25 px-5 py-3 text-[12px] font-medium text-[#64748B] uppercase">Result</div>
                                <div className="w-20.25
                                 px-5 py-3 text-[12px] font-medium text-[#64748B] uppercase text-right">Date</div>
                            </div>
                            <div className="flex border-t border-[#F1F5F9]">
                                <div className="flex-1 px-5 py-3 text-[14px] font-medium text-[#0F172A] flex items-center">
                                    Complete Blood Count
                                </div>
                                <div className="w-26.25 px-5 py-3 flex items-center">
                                    <span className="text-[12px] font-medium px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534]">
                                        Normal
                                    </span>
                                </div>
                                <div className="w-20.25 px-5 py-3 text-[14px] text-[#64748B] flex items-center justify-end">
                                    Oct 12
                                </div>
                            </div>
                            <div className="flex border-t border-[#F1F5F9]">
                                <div className="flex-1 px-5 py-3 text-[14px] font-medium text-[#0F172A] flex items-center">
                                    Lipid Panel
                                </div>
                                <div className="w-26.25 px-5 py-3 flex items-center">
                                    <span className="text-[12px] font-medium px-2 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B]">
                                        High
                                    </span>
                                </div>
                                <div className="w-20.25 px-5 py-3 text-[14px] text-[#64748B] flex items-center justify-end">
                                    Oct 12
                                </div>
                            </div>
                            <div className="flex border-t border-[#F1F5F9]">
                                <div className="flex-1 px-5 py-3 text-[14px] font-medium text-[#0F172A] flex items-center">
                                    HbA1c
                                </div>
                                <div className="w-26.25 px-5 py-3 flex items-center">
                                    <span className="text-[12px] font-medium px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E]">
                                        Elevated
                                    </span>
                                </div>
                                <div className="w-20.25 px-5 py-3 text-[14px] text-[#64748B] flex items-center justify-end">
                                    Sep 01
                                </div>
                            </div>
                            <div className="flex border-t border-[#F1F5F9]">
                                <div className="flex-1 px-5 py-3 text-[14px] font-medium text-[#0F172A] flex items-center">
                                    Liver Function
                                </div>
                                <div className="w-26.25 px-5 py-3 flex items-center">
                                    <span className="text-[12px] font-medium px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534]">
                                        Normal
                                    </span>
                                </div>
                                <div className="w-20.25 px-5 py-3 text-[14px] text-[#64748B] flex items-center justify-end">
                                    Aug 15
                                </div>
                            </div>
                        </div>
                    </Card>
                    <RecentHistory />

                </div>

                {/* ================== CARD 3 ================== */}
                <div className="flex flex-col gap-6">
                    <Card className="w-full bg-white border border-[#E2E8F0] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden p-0">
                        <div className="flex justify-between items-center px-5 py-4 bg-[#F8FAFC]/50 border-b border-[#F1F5F9]">
                            <h3 className="font-bold text-[16px] leading-6 text-[#0F172A]">
                                Scan Analysis
                            </h3>
                            <button className="text-[#2B6CEE] font-medium text-[14px] leading-5 hover:underline">
                                Upload
                            </button>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <div className="flex flex-col items-center pb-3 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg group relative overflow-hidden">

                                <div className="relative w-full h-[180.75px] bg-[#E2E8F0] overflow-hidden rounded-t-[7px]">
                                    <Image
                                        src={MRiKnee}
                                        alt="Chest X-Ray"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/90 shadow-sm rounded-full flex items-center justify-center cursor-pointer">
                                            <Maximize2 className="h-5 w-5 text-[#0F172A]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-3 flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-semibold leading-5 text-[#0F172A]">
                                            Chest X-Ray
                                        </span>
                                        <span className="text-[12px] leading-4 text-[#64748B]">
                                            Oct 12, 2023
                                        </span>
                                    </div>
                                    <MoreVertical className="h-5 w-4 text-[#94A3B8] cursor-pointer mt-0.5" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center pb-3 gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg group relative overflow-hidden">

                                <div className="relative w-full h-[180.75px] bg-[#E2E8F0] overflow-hidden rounded-t-[7px]">
                                    <Image
                                        src={MRiKnee}
                                        alt="MRI Knee"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/90 shadow-sm rounded-full flex items-center justify-center cursor-pointer">
                                            <Maximize2 className="h-5 w-5 text-[#0F172A]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-3 flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-semibold leading-5 text-[#0F172A]">
                                            MRI Knee (Left)
                                        </span>
                                        <span className="text-[12px] leading-4 text-[#64748B]">
                                            Jan 22, 2022
                                        </span>
                                    </div>
                                    <MoreVertical className="h-5 w-4 text-[#94A3B8] cursor-pointer mt-0.5" />
                                </div>
                            </div>

                        </div>
                    </Card>
                    <Card className="relative w-full bg-[#2B6CEE] border-none shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden p-5 flex flex-col gap-1 isolation-isolate">

                        <div className="absolute -right-6 -bottom-9 opacity-20 z-0 pointer-events-none">
                            <Files size={120} className="text-white transform -scale-y-100" />
                        </div>
                        <div className="z-10">
                            <h3 className="text-[18px] font-bold leading-7 text-white">
                                Patient Files
                            </h3>
                        </div>
                        <div className="z-10">
                            <p className="text-[14px] leading-5 text-[#DBEAFE]">
                                4 Documents available
                            </p>
                        </div>
                        <div className="z-10 flex flex-col gap-2 pt-3">
                            <div className="flex items-center gap-3 px-2 py-1.5 bg-white/10 rounded cursor-pointer hover:bg-white/20 transition-colors">
                                <FileText className="w-5 h-5 text-white shrink-0" />
                                <span className="text-[14px] leading-5 text-white truncate">
                                    Insurance_Policy_2023.pdf
                                </span>
                            </div>
                            <div className="flex items-center gap-3 px-2 py-1.5 bg-white/10 rounded cursor-pointer hover:bg-white/20 transition-colors">
                                <FileText className="w-5 h-5 text-white shrink-0" />
                                <span className="text-[14px] leading-5 text-white truncate">
                                    Consent_Form_Signed.pdf
                                </span>
                            </div>
                        </div>
                    </Card>

                </div>

            </div>
        </div>




    </>
}
