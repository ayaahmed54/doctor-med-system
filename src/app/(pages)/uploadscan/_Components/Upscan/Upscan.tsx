"use client";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, ChevronLeft, CreditCardIcon, FileText, Image, Loader, UploadCloud, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useRef } from 'react'

export default function Upscan() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    const scanType = searchParams.get("type");

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (selected: File | null) => {
        if (!selected) return;
        setFile(selected);
        const url = URL.createObjectURL(selected);
        setPreview(url);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files?.[0];
        handleFile(dropped || null);
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleAnalyze = async () => {
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
        formData.append("scanType", scanType || "kidney");

        try {
            setLoading(true);

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/scans`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
                body: formData,
            });

            const data = await res.json();
            localStorage.setItem("scanResult", JSON.stringify(data));
            router.push("/scanREsult");

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-5xl border-[#E7EBF3] shadow-[0px_2px_15px_rgba(0,0,0,0.05)] rounded-3xl">
            <CardContent className="p-8">

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-[20px] font-bold text-[#0D121B] capitalize">
                            Upload {scanType} Scan
                        </h2>
                        <p className="text-[14px] text-[#4C669A] mt-1">
                            Supported formats: JPG, PNG, DICOM — Max 50 MB
                        </p>
                    </div>
                    <Badge
                        variant="secondary"
                        className="bg-[#EFF6FF] text-[#135BEC] hover:bg-[#EFF6FF] px-3 py-1 rounded-full text-[12px] font-bold tracking-widest"
                    >
                        STEP 2 OF 3
                    </Badge>
                </div>

                {!file ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onClick={() => inputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-[24px] bg-[#F8F9FC] py-16 flex flex-col items-center justify-center transition-all cursor-pointer
                            ${dragOver ? "border-[#135BEC] bg-[#EFF6FF]" : "border-[#D1D5DB] hover:border-[#135BEC]"}`}
                    >
                        <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mb-6">
                            <UploadCloud className="w-8 h-8 text-[#135BEC]" />
                        </div>
                        <h3 className="text-[18px] font-semibold text-[#0D121B]">
                            Drag & drop your scan here
                        </h3>
                        <p className="text-[14px] text-[#4C669A] mt-2">
                            or click to browse your files
                        </p>
                        <div className="flex items-center gap-4 text-[14px] text-[#4C669A] mt-4">
                            <div className="flex items-center gap-1">
                                <Image className="w-4 h-4" />
                                <span>JPG, PNG</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                <span>DICOM</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CreditCardIcon className="w-4 h-4" />
                                <span>Max 50 MB</span>
                            </div>
                        </div>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*,.dcm"
                            className="hidden"
                            onChange={(e) => handleFile(e.target.files?.[0] || null)}
                        />
                    </div>
                ) : (

                    <div className="relative rounded-[24px] bg-[#F8F9FC] border-2 border-[#135BEC] overflow-hidden">
                        {preview && (
                            <div className="flex items-center justify-center p-6 max-h-[340px]">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-[300px] object-contain rounded-2xl"
                                />
                            </div>
                        )}
                        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E7EBF3] bg-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-[#135BEC]" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-semibold text-[#0D121B] leading-none">{file.name}</p>
                                    <p className="text-[12px] text-[#4C669A] mt-0.5">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleRemove}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-[#4C669A] hover:text-red-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-full mt-8 bg-[#F8F9FC] border-t border-[#E7EBF3] flex items-center justify-between px-6 py-5 rounded-b-3xl -mx-8 -mb-8 px-8">
                    <Button
                        variant="outline"
                        className="h-12 p-0 border-[#E7EBF3] rounded-[24px] overflow-hidden bg-white hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Link
                            href="./scan-analysis"
                            className="w-full h-full px-8 flex items-center justify-center text-[16px] font-medium text-[#0D121B]"
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            Back to Selection
                        </Link>
                    </Button>

                    <Button
                        className="h-12 px-10 bg-[#135BEC] hover:bg-[#0e48bd] text-white rounded-[24px] text-[16px] font-bold transition-all group disabled:opacity-60"
                        onClick={handleAnalyze}
                        disabled={loading || !file}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {loading && <Loader className="w-5 h-5 animate-spin" />}
                            <span>{loading ? "Analyzing..." : "Analyze Scan"}</span>
                            {!loading && (
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            )}
                        </div>
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}