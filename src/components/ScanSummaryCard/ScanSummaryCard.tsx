import { Activity, Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface ScanSummaryProps {
    scan: any; // يفضل استخدام الواجهة (Interface) التي عرفتها سابقاً
}

export function ScanSummaryCard({ scan }: ScanSummaryProps) {
    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow border-[#E7EBF3]">
            <div className="flex flex-col md:flex-row h-full">
                {/* الجزء الأيسر: الصورة المصغرة */}
                <div className="w-full md:w-32 h-32 bg-black shrink-0">
                    <img
                        src={scan.imageUrl}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                        alt="Scan Thumbnail"
                    />
                </div>

                {/* الجزء الأيمن: البيانات المختصرة */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                                {scan.scanType}
                            </span>
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(scan.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <h3 className="font-bold text-gray-900 mt-2 text-sm line-clamp-1">
                            {scan.aiResult.disease_info.disease_name}
                        </h3>

                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex-grow bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className="bg-blue-500 h-full"
                                    style={{ width: `${scan.aiResult.confidence}%` }}
                                />
                            </div>
                            <span className="text-[11px] font-bold text-blue-600">
                                {scan.aiResult.confidence}%
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                        <Link
                            href={`/scans/${scan._id}`}
                            className="text-[11px] font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                        >
                            View Full Report
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
}