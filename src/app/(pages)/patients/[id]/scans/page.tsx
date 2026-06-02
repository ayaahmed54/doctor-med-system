"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    Activity,
    CheckCircle2,
    Calendar,
    Loader
} from "lucide-react";

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
    notes?: string;
}

export default function PatientScansPage() {
    const { id } = useParams();
    const { data: session } = useSession();

    const [scans, setScans] = useState<ScanData[]>([]);
    const [loading, setLoading] = useState(true);

    const [notes, setNotes] = useState<Record<string, string>>({});
    const [savingId, setSavingId] = useState<string | null>(null);

    useEffect(() => {
        async function getScans() {
            const userToken = session?.token;
            if (!userToken || !id) return;

            try {
                setLoading(true);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/patients/${id}/scans`,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );

                const result = await res.json();

                if (result.status === "success") {
                    const scansData = result.data.scans || [];
                    setScans(scansData);

                    const init: Record<string, string> = {};
                    scansData.forEach((s: any) => {
                        init[s._id] = s.notes || "";
                    });
                    setNotes(init);
                }
            } finally {
                setLoading(false);
            }
        }

        getScans();
    }, [session, id]);

    const saveNote = async (scanId: string) => {
        const userToken = session?.token;
        if (!userToken) return;

        try {
            setSavingId(scanId);

            await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/scans/${scanId}/notes`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify({
                        notes: notes[scanId] ?? null,
                    }),
                }
            );

        } finally {
            setSavingId(null);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="flex flex-row gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                    <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                </div>
            </div>
        );
    }

    if (!scans.length) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-400">
                No scans available
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F8FC] p-6 md:p-10">

            <div className="max-w-6xl mx-auto space-y-10">

                {scans.map((scan) => (
                    <div
                        key={scan._id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >

                        {/* HEADER */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b gap-3">

                            <div>
                                <h1 className="text-lg font-bold text-gray-900">
                                    Smart Scan Report
                                </h1>

                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(scan.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <span className="self-start md:self-auto px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-semibold">
                                {scan.scanType}
                            </span>
                        </div>

                        {/* BODY */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5">

                            {/* IMAGE */}
                            <div className="lg:col-span-7">
                                <div className="rounded-xl overflow-hidden bg-black">
                                    <img
                                        src={scan.imageUrl}
                                        className="w-full object-contain aspect-[4/3]"
                                    />
                                </div>
                                <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`w-20 h-20 rounded-lg border-2 shrink-0 overflow-hidden ${i === 1 ? 'border-blue-500' : 'border-transparent opacity-50'}`}>
                                            <img src={scan.imageUrl} className="w-full h-full object-cover bg-black" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI + NOTES */}
                            <div className="lg:col-span-5 space-y-5">

                                {/* AI CARD */}
                                <div className="bg-gray-50 rounded-xl p-4 border">

                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <Activity className="w-4 h-4 text-blue-600" />
                                        AI Analysis
                                    </div>

                                    <h2 className="text-lg font-bold text-gray-900">
                                        {scan.aiResult.disease_info.disease_name}
                                    </h2>

                                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                        {scan.aiResult.disease_info.description}
                                    </p>

                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Confidence</span>
                                            <span className="font-bold text-blue-600">
                                                {scan.aiResult.confidence}%
                                            </span>
                                        </div>

                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600"
                                                style={{ width: `${scan.aiResult.confidence}%` }}
                                            />
                                        </div>
                                    </div>

                                    <ul className="mt-4 space-y-2">
                                        {scan.aiResult.disease_info.recommendations.map((r, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-2 text-xs text-gray-700"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white border rounded-xl p-4">

                                    <p className="text-xs font-bold text-gray-500 mb-2">
                                        DOCTOR NOTES
                                    </p>

                                    <textarea
                                        className="w-full min-h-[110px] p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
                                        placeholder="Write notes..."
                                        value={notes[scan._id] || ""}
                                        onChange={(e) =>
                                            setNotes((prev) => ({
                                                ...prev,
                                                [scan._id]: e.target.value,
                                            }))
                                        }
                                    />

                                    <button
                                        onClick={() => saveNote(scan._id)}
                                        disabled={savingId === scan._id}
                                        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition disabled:opacity-50"
                                    >
                                        {savingId === scan._id ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Loader className="w-4 h-4 animate-spin" />
                                                Saving...
                                            </span>
                                        ) : (
                                            "Save Notes"
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}