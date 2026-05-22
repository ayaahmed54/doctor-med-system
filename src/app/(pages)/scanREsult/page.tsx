"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
    ArrowLeft,
    Check,
    CheckCircle2,
    Eye,
    EyeOff,
} from "lucide-react";

// ================= TYPES =================

interface Segmentation {
    mask_mean_activation?: number;
    lesion_coverage_percent?: number;

    mask_image_base64: string;
    overlay_image_base64: string;
}

interface MaskStats {
    mean_activation?: number;
    max_activation?: number;
    detected_pixels?: number;
}

interface DiseaseInfo {
    disease_name: string;
    description: string;
    recommendations: string[];
}

interface AiResult {
    model: string;

    predicted_class?: string;
    confidence?: number;

    all_probabilities?: Record<string, number>;

    segmentation?: Segmentation;

    // heart model
    heart_area_ratio_percent?: number;
    assessment?: string;
    mask_stats?: MaskStats;

    disease_info: DiseaseInfo;
}

interface Scan {
    imageUrl: string;
    scanType: string;
    status: string;
    createdAt: string;
    aiResult: AiResult;
}

interface ScanData {
    status: string;
    message?: string;
    data?: {
        scan: Scan;
    };
}

type ViewMode = "original" | "overlay" | "mask";

export default function ScanResult() {
    const [scanData, setScanData] = useState<ScanData | null>(null);

    const [formattedDate, setFormattedDate] = useState("");
    const [viewMode, setViewMode] = useState<ViewMode>("overlay");


    useEffect(() => {
        const stored = localStorage.getItem("scanResult");

        if (!stored) return;

        try {
            const parsed = JSON.parse(stored);
            setScanData(parsed);
        } catch (error) {
            console.error(error);
        }
    }, []);


    const scan = scanData?.data?.scan;
    const aiResult = scan?.aiResult;

    const segmentation = aiResult?.segmentation;

    const hasSegmentation =
        segmentation?.overlay_image_base64 &&
        segmentation?.mask_image_base64;

    const confidence = Number(aiResult?.confidence || 0);


    useEffect(() => {
        if (!scan?.createdAt) return;

        const date = new Date(scan.createdAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        setFormattedDate(date);
    }, [scan?.createdAt]);


    const getDisplaySrc = () => {
        if (!hasSegmentation) return scan?.imageUrl || "";

        if (viewMode === "overlay") {
            return `data:image/png;base64,${segmentation?.overlay_image_base64}`;
        }

        if (viewMode === "mask") {
            return `data:image/png;base64,${segmentation?.mask_image_base64}`;
        }

        return scan?.imageUrl || "";
    };


    const confidenceStyles =
        confidence >= 85
            ? {
                text: "text-emerald-600",
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                progress: "#10B981",
            }
            : confidence >= 60
                ? {
                    text: "text-amber-500",
                    bg: "bg-amber-50",
                    border: "border-amber-200",
                    progress: "#F59E0B",
                }
                : {
                    text: "text-red-500",
                    bg: "bg-red-50",
                    border: "border-red-200",
                    progress: "#EF4444",
                };


    if (!scanData) {
        return (
            <div className="min-h-screen bg-[#F6F6F8] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#135BEC] border-t-transparent rounded-full animate-spin" />

                    <p className="text-sm text-[#4C669A]">
                        Loading analysis results...
                    </p>
                </div>
            </div>
        );
    }


    if (scanData.status === "error") {
        return (
            <div className="min-h-screen bg-[#F6F6F8] flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl p-10 shadow-sm text-center max-w-md w-full">
                    <div className="text-red-500 text-lg font-bold mb-2">
                        Analysis Failed
                    </div>

                    <p className="text-sm text-gray-600">
                        {scanData.message || "Something went wrong"}
                    </p>
                </div>
            </div>
        );
    }


    if (!scan || !aiResult) {
        return (
            <div className="min-h-screen bg-[#F6F6F8] flex items-center justify-center">
                <p className="text-gray-500">No result found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F6F8] p-6">


            <div className="relative flex justify-between max-w-5xl mx-auto mb-16 px-4">

                <div className="absolute top-4 left-0 w-full h-[2px] bg-[#E5E7EB]" />

                {[
                    { label: "Upload Scan", done: true },
                    { label: "AI Processing", done: true },
                    { label: "View Results", done: false },
                ].map((step, i) => (
                    <div
                        key={i}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white
              ${step.done ? "bg-[#22C55E]" : "bg-[#135BEC]"}`}
                        >
                            {step.done ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <span className="text-xs font-bold">3</span>
                            )}
                        </div>

                        <span
                            className={`text-[12px] mt-2 font-semibold
              ${step.done ? "text-[#16A34A]" : "text-[#135BEC]"}`}
                        >
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>


            <div className="max-w-6xl mx-auto flex justify-between items-start mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-[#0D121B]">
                        Scan Analysis Result
                    </h1>

                    <p className="text-sm text-[#4C669A] mt-1">
                        AI generated diagnostic report
                    </p>
                </div>

                <Button variant="outline" asChild>
                    <Link href="/uploadscan">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Link>
                </Button>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">


                <div className="w-full">

                    {hasSegmentation ? (


                        <div className="bg-white rounded-3xl p-4 shadow-sm flex flex-col gap-4">

                            {/* TABS */}

                            <div className="flex bg-[#F8F9FC] rounded-2xl p-1 gap-1">

                                {(["overlay", "mask", "original"] as ViewMode[]).map(
                                    (mode) => {

                                        const labels: Record<ViewMode, string> = {
                                            overlay: "Overlay",
                                            mask: "Mask",
                                            original: "Original",
                                        };

                                        return (
                                            <button
                                                key={mode}
                                                onClick={() => setViewMode(mode)}
                                                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all
                        ${viewMode === mode
                                                        ? "bg-white text-[#135BEC] shadow-sm"
                                                        : "text-[#4C669A]"
                                                    }`}
                                            >
                                                {labels[mode]}
                                            </button>
                                        );
                                    }
                                )}
                            </div>


                            <div className="relative bg-[#F8F9FC] rounded-3xl overflow-hidden min-h-[320px] flex items-center justify-center">

                                <img
                                    src={getDisplaySrc()}
                                    alt="Scan"
                                    className="max-h-[420px] object-contain"
                                />

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                    {viewMode === "overlay"
                                        ? "AI Overlay"
                                        : viewMode === "mask"
                                            ? "Segmentation Mask"
                                            : "Original Scan"}
                                </div>
                            </div>


                            <div className="grid grid-cols-3 gap-3">


                                <button
                                    onClick={() => setViewMode("original")}
                                    className={`relative rounded-2xl overflow-hidden border-2 transition-all
                  ${viewMode === "original"
                                            ? "border-[#135BEC]"
                                            : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={scan.imageUrl}
                                        alt=""
                                        className="w-full h-[100px] object-cover"
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[11px] py-1">
                                        Original
                                    </div>
                                </button>


                                <button
                                    onClick={() => setViewMode("overlay")}
                                    className={`relative rounded-2xl overflow-hidden border-2 transition-all
                  ${viewMode === "overlay"
                                            ? "border-[#135BEC]"
                                            : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={`data:image/png;base64,${segmentation?.overlay_image_base64}`}
                                        alt=""
                                        className="w-full h-[100px] object-cover"
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[11px] py-1 flex items-center justify-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        Overlay
                                    </div>
                                </button>


                                <button
                                    onClick={() => setViewMode("mask")}
                                    className={`relative rounded-2xl overflow-hidden border-2 transition-all
                  ${viewMode === "mask"
                                            ? "border-[#135BEC]"
                                            : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={`data:image/png;base64,${segmentation?.mask_image_base64}`}
                                        alt=""
                                        className="w-full h-[100px] object-cover"
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[11px] py-1 flex items-center justify-center gap-1">
                                        <EyeOff className="w-3 h-3" />
                                        Mask
                                    </div>
                                </button>
                            </div>


                            {(segmentation?.lesion_coverage_percent ||
                                segmentation?.mask_mean_activation) && (

                                    <div className="grid grid-cols-2 gap-3 pt-2">

                                        {segmentation?.mask_mean_activation && (
                                            <div className="bg-[#F8F9FC] rounded-2xl p-4">
                                                <div className="text-2xl font-bold text-[#0D121B]">
                                                    {(
                                                        segmentation.mask_mean_activation * 100
                                                    ).toFixed(1)}
                                                    %
                                                </div>

                                                <div className="text-xs text-[#4C669A] mt-1">
                                                    Mask activation
                                                </div>
                                            </div>
                                        )}

                                        {segmentation?.lesion_coverage_percent && (
                                            <div className="bg-[#F8F9FC] rounded-2xl p-4">
                                                <div className="text-2xl font-bold text-[#135BEC]">
                                                    {segmentation.lesion_coverage_percent.toFixed(1)}%
                                                </div>

                                                <div className="text-xs text-[#4C669A] mt-1">
                                                    Lesion coverage
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>

                    ) : (


                        <div className="bg-white rounded-3xl p-5 shadow-sm">

                            <div className="relative overflow-hidden rounded-3xl bg-[#F8F9FC]">

                                <NextImage
                                    src={scan.imageUrl}
                                    alt="Scan"
                                    width={700}
                                    height={700}
                                    priority
                                    className="w-full h-[450px] object-contain"
                                />

                                {/* CONFIDENCE */}

                                <div
                                    className={`absolute top-4 right-4 px-4 py-2 rounded-2xl border backdrop-blur-sm
                  ${confidenceStyles.bg}
                  ${confidenceStyles.border}`}
                                >
                                    <div
                                        className={`text-xl font-bold ${confidenceStyles.text}`}
                                    >
                                        {confidence.toFixed(1)}%
                                    </div>

                                    <div className="text-[10px] uppercase tracking-wider text-gray-500">
                                        Confidence
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM */}

                            <div className="mt-5 flex items-center justify-between">

                                <div>
                                    <h2 className="text-2xl font-bold text-[#0D121B] capitalize">
                                        {aiResult.predicted_class || "Unknown"}
                                    </h2>

                                    <p className="text-sm text-[#4C669A] capitalize mt-1">
                                        {aiResult.model} scan analysis
                                    </p>
                                </div>

                                <div
                                    className={`px-4 py-2 rounded-2xl text-sm font-semibold
                  ${confidenceStyles.bg}
                  ${confidenceStyles.text}`}
                                >
                                    AI Detected
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                <div className="flex flex-col gap-6">


                    <Card className="rounded-3xl border-none shadow-sm p-6">

                        <div className="flex justify-between items-start gap-4 mb-5">

                            <div>
                                <h2 className="text-2xl font-bold text-[#0D121B]">
                                    {aiResult.disease_info?.disease_name}
                                </h2>

                                <p className="text-sm text-[#4C669A] capitalize mt-1">
                                    {aiResult.model} model
                                </p>
                            </div>

                            {aiResult.confidence && (
                                <div
                                    className={`px-4 py-3 rounded-2xl border text-center min-w-[100px]
                  ${confidenceStyles.bg}
                  ${confidenceStyles.border}`}
                                >
                                    <div
                                        className={`text-2xl font-bold ${confidenceStyles.text}`}
                                    >
                                        {confidence.toFixed(1)}%
                                    </div>

                                    <div className="text-[10px] uppercase tracking-wide text-gray-500">
                                        Confidence
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            {aiResult.disease_info?.description}
                        </p>


                        <div>
                            <h3 className="font-bold text-[#0D121B] mb-4">
                                Recommendations
                            </h3>

                            <ul className="space-y-3">

                                {aiResult.disease_info?.recommendations?.map((rec, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-sm text-gray-700"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />

                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>


                    {aiResult.all_probabilities && (

                        <Card className="rounded-3xl border-none shadow-sm p-6">

                            <h3 className="font-bold text-[#0D121B] mb-5">
                                Classification Probabilities
                            </h3>

                            <div className="space-y-4">

                                {Object.entries(aiResult.all_probabilities)
                                    .sort(([, a], [, b]) => b - a)
                                    .map(([label, value]) => {

                                        const isTop =
                                            label.toLowerCase() ===
                                            aiResult.predicted_class?.toLowerCase();

                                        return (
                                            <div key={label}>

                                                <div className="flex justify-between text-sm mb-2">

                                                    <span
                                                        className={`capitalize font-medium
                            ${isTop
                                                                ? confidenceStyles.text
                                                                : "text-[#4C669A]"
                                                            }`}
                                                    >
                                                        {label}
                                                    </span>

                                                    <span
                                                        className={`font-bold
                            ${isTop
                                                                ? confidenceStyles.text
                                                                : "text-[#0D121B]"
                                                            }`}
                                                    >
                                                        {value.toFixed(1)}%
                                                    </span>
                                                </div>

                                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">

                                                    <div
                                                        className="h-full rounded-full transition-all duration-700"
                                                        style={{
                                                            width: `${value}%`,
                                                            background: isTop
                                                                ? confidenceStyles.progress
                                                                : "#D1D5DB",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </Card>
                    )}


                    {aiResult.model === "heart" && (

                        <Card className="rounded-3xl border-none shadow-sm p-6">

                            <h3 className="font-bold text-[#0D121B] mb-5">
                                Heart Analysis
                            </h3>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="bg-[#F8F9FC] rounded-2xl p-4">

                                    <div className="text-2xl font-bold text-[#135BEC]">
                                        {aiResult.heart_area_ratio_percent}%
                                    </div>

                                    <div className="text-xs text-[#4C669A] mt-1">
                                        Heart ratio
                                    </div>
                                </div>

                                <div className="bg-[#F8F9FC] rounded-2xl p-4">

                                    <div className="text-lg font-bold text-[#0D121B] capitalize">
                                        {aiResult.assessment?.replace("_", " ")}
                                    </div>

                                    <div className="text-xs text-[#4C669A] mt-1">
                                        Assessment
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}


                    <Card className="rounded-3xl border-none shadow-sm p-6 space-y-4">

                        <div className="flex justify-between text-sm">

                            <span className="text-gray-500">Scan type</span>

                            <span className="font-semibold capitalize">
                                {scan.scanType}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">

                            <span className="text-gray-500">Status</span>

                            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
                                {scan.status}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">

                            <span className="text-gray-500">Analysis date</span>

                            <span className="font-semibold">
                                {formattedDate || "—"}
                            </span>
                        </div>

                        {aiResult.predicted_class && (

                            <div className="flex justify-between text-sm">

                                <span className="text-gray-500">
                                    Predicted class
                                </span>

                                <span className="font-semibold capitalize text-[#135BEC]">
                                    {aiResult.predicted_class}
                                </span>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}