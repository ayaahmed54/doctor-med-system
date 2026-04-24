"use client"
import { MoreVertical, Pill } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
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
export default function ActivePrescriptions() {


    const params = useParams();
    const id = params?.id as string;
    const { data: session } = useSession();
    const [history, setHistory] = useState<MedicalHistory[]>([]);
    useEffect(() => {
        if (!session) return;

        async function getHistory() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
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
            } catch (err) {
                console.error(err);
            }
        }

        if (id) getHistory();
    }, [id]);

    return <>
        <div className="w-full bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <h3 className="font-bold text-[16px] text-[#0F172A]">
                    Active Prescriptions
                </h3>
                <button className="text-[#2B6CEE] font-medium text-[14px] hover:underline">
                    Add New
                </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
                <div className="p-4 flex flex-col gap-3">
                    {history.map((item) =>
                        item.medications.map((med) => (
                            <div
                                key={med._id}
                                className="flex items-center justify-between p-3 border border-[#F1F5F9] rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                                        <Pill className="text-[#4F46E5]" size={20} />
                                    </div>

                                    <div className="flex flex-col text-start">
                                        {/* ✅ اسم الدوا */}
                                        <span className="font-semibold text-[14px] text-[#0D121B]">
                                            {med.name}
                                        </span>

                                        {/* ✅ التفاصيل */}
                                        <span className="text-[12px] text-[#64748B]">
                                            {med.strength} • {med.frequency}
                                        </span>
                                    </div>
                                </div>

                                <MoreVertical className="text-[#94A3B8] cursor-pointer" size={18} />
                            </div>
                        ))
                    )}
                </div>
            </div>  </div>
    </>
}
