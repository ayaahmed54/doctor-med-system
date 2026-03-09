import { MoreVertical, Pill } from 'lucide-react'
import React from 'react'

export default function ActivePrescriptions() {
    return <>
        <div className="w-full bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <h3 className="font-bold text-[16px] text-[#0F172A]">
                    Active Prescriptions
                </h3>
                <button className="text-[#2B6CEE] font-medium text-[14px] hover:underline">
                    Add New
                </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 border border-[#F1F5F9] rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                            <Pill className="text-[#4F46E5]" size={20} />
                        </div>
                        <div className="flex flex-col text-start">
                            <span className="font-semibold text-[14px] text-[#0D121B]">Metformin</span>
                            <span className="text-[12px] text-[#64748B]">500mg • 2x Daily</span>
                        </div>
                    </div>
                    <MoreVertical className="text-[#94A3B8] cursor-pointer" size={18} />
                </div>
                <div className="flex items-center justify-between p-3 border border-[#F1F5F9] rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                            <Pill className="text-[#4F46E5]" size={20} />
                        </div>
                        <div className="flex flex-col text-start">
                            <span className="font-semibold text-[14px] text-[#0D121B]">Lisinopril</span>
                            <span className="text-[12px] text-[#64748B]">10mg • 1x Daily</span>
                        </div>
                    </div>
                    <MoreVertical className="text-[#94A3B8] cursor-pointer" size={18} />
                </div>
            </div>
        </div>
    </>
}
