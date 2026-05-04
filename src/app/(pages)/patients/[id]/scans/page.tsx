"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Activity, CheckCircle2, Calendar, Loader } from "lucide-react";

// Types
interface DiseaseInfo {
    disease_name: string;
    description: string;
    recommendations: string[];
}

interface ScanData {
    _id: string;
    imageUrl: string;
    scanType: string;
    status: string;
    aiResult: {
        predicted_class: string;
        confidence: number;
        disease_info: DiseaseInfo;
    };
    createdAt: string;
}

export default function PatientScansPage() {
    const { id } = useParams();
    const { data: session } = useSession();

    const [scans, setScans] = useState<ScanData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getScans() {
            const token = session?.token;
            if (!token || !id) return;

            try {
                setLoading(true);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/patients/${id}/scans`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await res.json();

                if (result.status === "success") {
                    setScans(result.data.scans || []);
                }
            } catch (err) {
                console.error("Error fetching scans:", err);
            } finally {
                setLoading(false);
            }
        }

        getScans();
    }, [session, id]);

    if (loading) {
        return <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-row gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
        </div>;
    }

    if (scans.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen p-20 text-gray-400 font-bold text-center">
                No scans available currently.
            </div>

        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8" dir="ltr">
            {scans.map((scan) => (
                <div className="max-w-6xl mx-auto">

                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-[#0D121B]">Smart Scan Report</h1>
                            <p className="text-[#4C669A] text-sm flex items-center gap-2 mt-1">
                                <Calendar className="w-4 h-4" />
                                Scan Date: {new Date(scan.createdAt).toLocaleDateString('en-US')}
                            </p>
                        </div>
                        <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100 shadow-sm">
                            {scan.scanType}
                        </span>
                    </div>

                    <div className="max-w-[1600px] mx-auto p-6 bg-[#F8F9FC] min-h-screen font-sans">

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                            <div className="lg:col-span-8 flex flex-col gap-4">
                                <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">

                                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent z-10">
                                        <div className="flex gap-4 text-white/80 text-xs">
                                            <span>Slice: 14/32</span>
                                            <span>Thickness: 2.0mm</span>
                                        </div>

                                    </div>

                                    <img
                                        src={scan.imageUrl}
                                        alt="Medical Scan"
                                        className="w-full aspect-[4/3] object-contain"
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                                        <p className="text-white/60 text-[10px] text-right">Zoom: 1.2x • R: 128 G: 128 B: 128</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`w-20 h-20 rounded-lg border-2 shrink-0 overflow-hidden ${i === 1 ? 'border-blue-500' : 'border-transparent opacity-50'}`}>
                                            <img src={scan.imageUrl} className="w-full h-full object-cover bg-black" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-4 flex flex-col gap-6">
                                <div className="bg-white rounded-xl border border-[#E7EBF3] shadow-sm overflow-hidden">
                                    <div className="p-4 bg-gray-50 border-b border-[#E7EBF3] flex justify-between items-center">
                                        <div className="flex items-center gap-2 font-bold text-gray-700 text-sm">
                                            <Activity className="w-4 h-4 text-blue-500" />
                                            AI Analysis
                                        </div>
                                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">Complete</span>
                                    </div>

                                    <div className="p-5">
                                        <div className="mb-6">
                                            <div className="flex justify-between items-end mb-1">
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Predicted Diagnosis</p>
                                                <span className="text-blue-600 font-black text-xl">{scan.aiResult.confidence}%</span>
                                            </div>
                                            <h2 className="text-xl font-black text-[#0D121B] leading-tight mb-2">
                                                {scan.aiResult.disease_info.disease_name}
                                            </h2>
                                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${scan.aiResult.confidence}%` }}></div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">Condition Description</p>
                                                <p className="text-sm text-gray-600 leading-relaxed italic">
                                                    "{scan.aiResult.disease_info.description}"
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">Recommendations</p>
                                                <ul className="space-y-2">
                                                    {scan.aiResult.disease_info.recommendations.map((rec, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                                                            {rec}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>

                </div>))}
        </div>
    );
}