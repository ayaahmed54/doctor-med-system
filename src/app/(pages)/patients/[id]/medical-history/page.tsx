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
import ScansPreview from '@/components/ScansPreview/ScansPreview'
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
interface RecentHistoryProps {
    patientId: string;
    limit?: number;
}
export default function page() {


    const params = useParams();
    const id = params?.id as string;
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const patientId = params?.id as string;
    const [history, setHistory] = useState<MedicalHistory[]>([]);
    useEffect(() => {
        if (!session || !id) return;

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

                if (!response.ok) {
                    throw new Error("Failed to fetch history");
                }

                const result = await response.json();


                if (result?.status === "success") {
                    setHistory(result.data || []);
                }

            } catch (err) {
                console.error("ERROR:", err);
            } finally {
                setLoading(false);
            }
        }

        getHistory();
    }, [id, session]);

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

                    <RecentHistory patientId={id} limit={3} />


                </div>

                {/* ================== CARD 3 ================== */}
                <div className="flex flex-col gap-6">
                    {patientId && (
                        <ScansPreview patientId={patientId} />
                    )}
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
