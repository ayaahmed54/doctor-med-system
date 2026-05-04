
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, CreditCardIcon, } from 'lucide-react'

import Upscan from './_Components/Upscan/Upscan';

export default function uploadscan() {

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
            < Upscan />

        </div>

    </>
}