import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card';
import { Cake, IdCard, LoaderCircleIcon, Mars } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';


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

export default function Aboutpatients() {
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
        console.log(process.env.NEXT_PUBLIC_URL_API);
        console.log(`${process.env.NEXT_PUBLIC_URL_API}/patients/${id}`);

        getPatient();
    }, [session, id]);
    if (loading) {
        return <div className=" flex  text-center items-center justify-center text-blue-600 "><LoaderCircleIcon className="w-10 h-10 animate-spin" /></div>;
    }

    if (!patient) {
        return <div className="p-10 text-center text-red-500">Patient not found</div>;
    }

    return <>
        <Card className="w-full min-h-40 bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl p-4 md:p-6 flex flex-col justify-center overflow-hidden">
            <CardContent className="p-0 flex flex-col md:flex-row justify-between items-center md:items-start lg:items-center w-full gap-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-5 text-center md:text-left w-full">

                    <div className="flex flex-col gap-1 w-full items-center md:items-start">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <h1 className="font-['Inter'] font-bold text-[20px] md:text-[24px] text-[#0D121B] tracking-[-0.6px]">
                                {patient?.displayName || "Loading..."}
                            </h1>
                            <span className="bg-[#DBEAFE] text-[#2B6CEE] text-[10px] md:text-[12px] font-bold px-2 py-0.5 rounded-full tracking-[0.6px] uppercase">
                                Active
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-[#4C669A] text-[13px] md:text-[14px]">
                            <span className="flex items-center gap-1.5">
                                <span className="font-medium text-[12px]">ID:</span>
                                <IdCard className="w-4 h-4" />
                                #PAT-{patient?._id?.slice(-4)}
                            </span>
                            <div className="hidden sm:block w-1 h-1 bg-[#D1D5DB] rounded-full" />
                            <span className="flex items-center gap-1.5">
                                <Cake className="w-4 h-4" />
                                {patient?.age} Yrs
                            </span>
                            <div className="hidden sm:block w-1 h-1 bg-[#D1D5DB] rounded-full" />
                            <span className="flex items-center gap-1.5 uppercase">
                                <Mars className="w-4 h-4" />
                                {patient?.gender}
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 w-full">
                            <div className="flex items-center px-3 py-1.5 bg-[#F9FAFB] border border-[#F3F4F6] rounded-[6px] gap-2">
                                <span className="text-[10px] md:text-[12px] font-bold text-[#4C669A] uppercase tracking-[0.6px]">Blood Type</span>
                                <span className="text-[13px] md:text-[14px] font-semibold text-[#0D121B]">{patient?.bloodType}</span>
                            </div>
                            <div className="flex items-center px-3 py-1.5 bg-[#FEF2F2] border border-[#FEE2E2] rounded-[6px]">
                                <span className="text-[13px] md:text-[14px] font-semibold text-[#991B1B]">Allergies: Penicillin</span>
                            </div>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>

    </>
}
