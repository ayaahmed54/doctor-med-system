"use client";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, CreditCardIcon, FileText, Image, Loader, RefreshCw, Trash2, UploadCloud } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import React, { useState } from 'react'

export default function uploadscan() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    const scanType = searchParams.get("type");

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        console.log("CLICKED");

        if (!file) {
            alert("Upload file first");
            return;
        }

        if (!session?.token) {
            alert("Login first");
            return;
        }

        const formData = new FormData();
        formData.append("medicalScan", file);
        formData.append("scanType", scanType || "kidney" || "skin" || "breast" || " eye" || "brain" || "heart" || "lung");

        try {
            setLoading(true);

            const res = await fetch("https://alivio2.vercel.app/api/v1/scans", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
                body: formData,
            });

            const data = await res.json();

            console.log("API:", data);

            router.push(`/scanREsult?data=${encodeURIComponent(JSON.stringify(data))}`);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return <>
        <div className="min-h-screen bg-[#F6F6F8] p-8 ">

            <h1 className="text-[30px] font-bold text-[#0D121B] mb-12 ml-4 tracking-tight">
                Upload Scan
            </h1>
            <div className="relative flex justify-between max-w-4xl mb-12 px-4">
                <div className="absolute top-4 left-0 w-full h-1 bg-[#E5E7EB] z-0 rounded-full" />
                <div className="absolute top-4 left-0 w-1/2 h-1 bg-[#135BEC] z-0 rounded-full" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#135BEC] text-white flex items-center justify-center ring-4 ring-[#F6F6F8]">
                        <ChevronRight className="w-4 h-4" />
                    </div>
                    <span className="text-[12px] font-semibold text-[#135BEC] mt-2">Select Type</span>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#135BEC] text-white flex items-center justify-center ring-4 ring-[rgba(19,91,236,0.2)] -mt-1">
                        <span className="text-lg font-bold">2</span>
                    </div>
                    <span className="text-[14px] font-bold text-[#0D121B] mt-2">Upload Scan</span>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E5E7EB] text-[#9CA3AF] flex items-center justify-center ring-4 ring-[#F6F6F8]">
                        <span className="text-sm font-bold">3</span>
                    </div>
                    <span className="text-[12px] font-medium text-[#9CA3AF] mt-2">Review</span>
                </div>
            </div>
            <Card className="max-w-5xl border-[#E7EBF3] shadow-[0px_2px_15px_rgba(0,0,0,0.05)] rounded-3xl">
                <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-[20px] font-bold text-[#0D121B]">Upload MRI Scan</h2>
                            <p className="text-[14px] text-[#4C669A] mt-1">
                                Upload files for patient <span className="font-medium">John Doe</span>
                            </p>
                        </div>
                        <Badge variant="secondary" className="bg-[#EFF6FF] text-[#135BEC] hover:bg-[#EFF6FF] px-3 py-1 rounded-full text-[12px] font-bold tracking-widest">
                            STEP 2 OF 3
                        </Badge>
                    </div>
                    <div className="group relative border-2 border-dashed border-[#D1D5DB] rounded-[24px] bg-[#F8F9FC] py-16 flex flex-col items-center justify-center transition-all hover:border-[#135BEC] cursor-pointer">
                        <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mb-6">
                            <UploadCloud className="w-8 h-8 text-[#135BEC]" />
                        </div>

                        <h3 className="text-[18px] font-semibold text-[#0D121B]">
                            Drag & drop your scan here
                        </h3>
                        <p className="text-[14px] text-[#4C669A] mt-2">
                            or click to browse your files
                        </p>
                        <div className="flex items-center gap-4 text-[14px] text-[#4C669A] mt-2">
                            <div className="flex items-center gap-0.5">
                                <Image className="w-4 h-5" />
                                <span>JPG, PNG</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <FileText className="w-4 h-5" />
                                <span>DICOM</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <CreditCardIcon className="w-4 h-5" />
                                <span>Max 50 MB</span>
                            </div>
                        </div>


                        <input
                            type="file"
                            className="absolute inset-0 opacity-0"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />

                    </div>

                    {file && (
                        <div className="flex flex-col justify-center">
                            <h4 className="text-[14px] font-bold text-[#0D121B] leading-5">{file.name}</h4>
                        </div>
                    )}


                    <div className="w-full h-24.75 mt-8 bg-[#F8F9FC] border-t border-[#E7EBF3] flex items-center justify-between px-6  rounded-b-3xl">

                        <Button
                            variant="outline"
                            className="h-12.5 p-0 border-[#E7EBF3] rounded-[24px] overflow-hidden bg-white hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Link
                                href={'./scan-analysis'}
                                className="w-full h-full px-8 flex items-center justify-center text-[16px] font-medium text-[#0D121B]"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Back to Selection
                            </Link>
                        </Button>
                        <Button
                            className="h-12 px-10 bg-[#135BEC] hover:bg-[#0e48bd] text-white rounded-[24px] text-[16px] font-bold transition-all group"
                            onClick={handleAnalyze}
                            disabled={loading}
                        >
                            <div className="flex items-center justify-center gap-2">

                                {loading && <Loader className="w-5 h-5 animate-spin" />}

                                <span>Analyze Scan</span>

                                <ArrowRight className="w-5 h-6 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Button>




                    </div>
                </CardContent>

            </Card>

        </div>

    </>
}