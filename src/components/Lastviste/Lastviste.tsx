"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card'; // افترض وجود مكون Card جاهز
import { Calendar, Loader2, Users } from 'lucide-react';

// 1. تعريف واجهة البيانات بناءً على الريفرنس (TypeScript Interface)
interface PatientAddress {
    street: string;
    city: string;
    country: string;
}

interface Patient {
    _id: string;
    user: string;
    displayName: string;
    phone: string;
    dateOfBirth: string;
    address: PatientAddress;
    gender: string;
    bloodType: string;
    medicalHistory: string;
    createdAt: string; // سنستخدم هذا الحقل كـ Last Visit
    updatedAt: string;
    __v: number;
}

interface ApiResponse {
    status: string;
    results: number;
    data: Patient[];
}

export default function MyPatientsPage() {
    // 2. اللوجك: إدارة الحالة (State Management)
    const { data: session, status } = useSession();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 3. اللوجك: جلب البيانات من الـ API (Data Fetching)
    useEffect(() => {
        // لا تفعل شيء إذا لم تكتمل عملية تسجيل الدخول
        if (status !== "authenticated" || !session?.token) return;

        async function fetchPatients() {
            try {
                setLoading(true);
                setError(null);
                // استخدام المتغير البيئي لرابط الـ API
                const apiUrl = process.env.NEXT_PUBLIC_URL_API || 'http://localhost:3000/api/v1';

                const response = await fetch(`${apiUrl}/patients/my-patients`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${session?.token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - Failed to fetch patients`);
                }

                const result: ApiResponse = await response.json();

                if (result.status === "success") {
                    setPatients(result.data);
                } else {
                    throw new Error("API returned success status but no data.");
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        }

        fetchPatients();
    }, [session, status]);

    // 4. عرض حالة التحميل (Loading State)
    if (status === "loading" || loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-blue-600 bg-[#F8F9FC]">
                <Loader2 className="w-10 h-10 animate-spin" />
                <p className="text-sm font-medium">Loading patients data...</p>
            </div>
        );
    }

    // 5. عرض حالة الخطأ (Error State)
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-red-600 bg-[#F8F9FC] p-4">
                <p className="text-lg font-bold">Oops! Something went wrong.</p>
                <p className="text-sm text-gray-600 bg-white p-4 rounded-lg border border-red-100 shadow-sm">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // 6. عرض التصميم الأساسي (Main UI Rendering)
    return (
        <div className="min-h-screen bg-[#F8F9FC] p-6 md:p-10 font-sans" dir="ltr">

            {/* Page Header */}
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-blue-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#0D121B]">My Patients</h1>
                        <p className="text-gray-500 mt-1">Viewing all patients assigned to you ({patients.length})</p>
                    </div>
                </div>
            </div>

            {/* Patients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {patients.length > 0 ? (
                    patients.map((patient) => (

                        /* -- بداية الكارد المعدل -- */
                        <Card
                            key={patient._id}
                            className="relative w-full max-w-sm h-44 bg-linear-to-br from-[#2B6CEE] to-[#2563EB] shadow-blue-500/20 shadow-xl border-none rounded-2xl overflow-hidden flex flex-col p-5 hover:scale-[1.02] transition-transform duration-300"
                        >
                            {/* تأثير الخلفية الجمالي */}
                            <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/5 blur-3xl rounded-full pointer-events-none" />

                            {/* الجزء العلوي: اسم المريض وعنوان الكارد */}
                            <div className="relative z-10 flex flex-col gap-1 pt-0">
                                <span className="text-[11px] font-bold text-blue-100 tracking-widest uppercase opacity-90">
                                    Last Interaction
                                </span>
                                <h3 className="text-[20px] font-extrabold text-white leading-tight break-words">
                                    {patient.displayName}
                                </h3>
                                <p className="text-[13px] font-medium text-blue-100/90 flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-green-300"></span>
                                    Record Active
                                </p>
                            </div>

                            {/* الجزء السفلي: تاريخ إنشاء السجل (يعبر عن آخر تفاعل مبدئي) */}
                            <div className="relative z-20 flex flex-row items-center gap-3.5 mt-auto mb-1 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                                <div className="flex items-center justify-center w-10 h-10 bg-white/15 rounded-lg border border-white/10 shrink-0">
                                    <Calendar className="text-white" size={20} />
                                </div>

                                <div className="flex flex-col justify-center flex-grow">
                                    <span className="text-[11px] font-medium text-blue-100 uppercase tracking-wider">
                                        Registration Date
                                    </span>
                                    <span className="text-[15px] font-bold text-white leading-none mt-1">
                                        {/* تنسيق التاريخ ديناميكياً من createdAt */}
                                        {new Date(patient.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>

                                {/* زر اختياري لعرض التفاصيل */}
                                <button className="text-white/70 hover:text-white transition-colors text-xs font-bold self-end">View</button>
                            </div>
                        </Card>
                        /* -- نهاية الكارد المعدل -- */

                    ))
                ) : (
                    // حالة عدم وجود مرضى
                    <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border-2 border-dashed border-gray-100 shadow-sm text-center">
                        <Users className="w-16 h-16 text-gray-300 mb-6" />
                        <p className="text-xl font-bold text-[#0D121B]">No Patients Yet</p>
                        <p className="text-gray-500 mt-2 max-w-sm">You haven't been assigned any patients, or no patient records match your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}