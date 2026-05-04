"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useSession } from "next-auth/react"; // تأكد من مسار الاستيراد حسب إعداداتك

type MedicalHistory = {
    _id: string;
    doctor: {
        displayName: string;
        specialty?: string;
    };
    appointment?: {
        _id: string;
        startTime: string;
    };
    diagnosis: string;
    notes: string;
    medications?: Array<any>;
    status?: string;
    createdAt: string;
    updatedAt?: string;
};

interface RecentHistoryProps {
    patientId: string;
    limit?: number;
}

export default function RecentHistory({ patientId }: RecentHistoryProps) {
    const { data: session } = useSession();
    const [history, setHistory] = useState<MedicalHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getHistory() {
            const userToken = session?.token;
            if (!userToken || !patientId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/patients/${patientId}/medical-history`,
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
                    // فرز حسب التاريخ (الأحدث أولاً)
                    const sortedData = (result.data || []).sort((a: MedicalHistory, b: MedicalHistory) => {
                        const dateA = new Date(a.appointment?.startTime || a.createdAt);
                        const dateB = new Date(b.appointment?.startTime || b.createdAt);
                        return dateB.getTime() - dateA.getTime();
                    });
                    setHistory(sortedData.slice(0,));
                } else {
                    setHistory([]);
                }
            } catch (err) {
                console.error("ERROR:", err);
                setError("Unable to load medical history");
                setHistory([]);
            } finally {
                setLoading(false);
            }
        }

        getHistory();
    }, [patientId, session,]);

    if (loading) {
        return (
            <Card className="w-full max-w-89.25 min-h-56 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden mt-6">
                <CardHeader className="border-b border-[#E7EBF3] p-5">
                    <h3 className="text-lg font-bold text-[#0D121B]">Recent History</h3>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-pulse text-gray-400">Loading history...</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full max-w-89.25 min-h-56 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden mt-6">
                <CardHeader className="border-b border-[#E7EBF3] p-5">
                    <h3 className="text-lg font-bold text-[#0D121B]">Recent History</h3>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="text-red-500 text-sm text-center">{error}</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-89.25 min-h-56 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden mt-6">
            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3] h-17.25">
                <h3 className="text-lg font-bold text-[#0D121B] leading-7">
                    Recent History
                </h3>
            </CardHeader>

            <CardContent className="relative p-6 pt-4 h-68.5 flex flex-col isolate">
                {/* الخط العمودي الزمني */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#E2E8F0] z-0" />

                <div className="flex flex-col gap-6 relative z-10">
                    {history.length > 0 ? (
                        history.map((item, index) => {
                            const date = new Date(
                                item.appointment?.startTime || item.createdAt
                            ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            });

                            return (
                                <div
                                    key={item._id}
                                    className="relative pl-6 h-13.5 flex flex-col justify-between"
                                >
                                    {/* النقطة الزمنية */}
                                    <div
                                        className={`absolute -left-1.25 top-1.5 w-2.5 h-2.5 border-2 border-white rounded-full ${index === 0
                                                ? "bg-[#2B6CEE]"
                                                : "bg-[#CBD5E1]"
                                            }`}
                                    />
                                    <span className="text-[#64748B] text-[12px]">
                                        {date}
                                    </span>

                                    <h4 className="text-[#1E293B] font-bold text-[14px]">
                                        {item.diagnosis}
                                    </h4>

                                    <p className="text-[#64748B] text-[12px]">
                                        {item.doctor?.displayName} •{" "}
                                        {item.notes}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-sm text-gray-400">
                            No medical history available
                        </p>
                    )}
                </div>

                <div className="pl-6 mt-auto">
                    <button className="text-[#2B6CEE] text-[12px] hover:underline">
                        View Full History
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}