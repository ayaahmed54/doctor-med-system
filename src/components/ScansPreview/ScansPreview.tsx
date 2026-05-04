import { useRouter } from "next/navigation";
import { ScanLine } from "lucide-react";

interface ScansPreviewProps {
    patientId: string;
}

export default function ScansPreview({ patientId }: ScansPreviewProps) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/patients/${patientId}/scans`)}
            className="flex items-center gap-4 p-4 bg-white border border-[#E7EBF3] rounded-xl shadow-sm cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all"
        >
            <div className="bg-blue-50 p-3 rounded-xl">
                <ScanLine className="w-6 h-6 text-blue-600" />
            </div>
            <div>
                <p className="font-semibold text-[#0D121B] text-sm">Smart Scans</p>
                <p className="text-xs text-gray-400">View  patient scans</p>
            </div>
        </div>
    );
}