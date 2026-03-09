import React from 'react'
import { Card, CardContent } from '../ui/card'
import { ActivitySquareIcon, ArrowRight, ArrowUpDown, ClockFadingIcon, DotSquare, MoveVerticalIcon, TrendingUp } from 'lucide-react'

export default function CardPatient() {
    return <>
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 w-full max-w-280 mx-auto px-4 md:px-0">

            <Card className="w-full h-fit p-5 flex flex-col gap-2 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                <div className="flex flex-row justify-start gap-1 items-start w-full">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#FEF2F2] rounded-lg">
                        <ActivitySquareIcon className="text-[#EF4444]" />
                    </div>
                    <span className="text-sm font-medium text-[#64748B]">Blood Pressure</span>

                </div>
                <CardContent className="p-0 flex flex-col">
                    <div className="flex items-center gap-1">
                        <ArrowRight size={14} className="text-[#16A34A]" />
                        <span className="text-xs font-medium text-[#16A34A]">Normal</span>
                    </div>
                    <p className="text-2xl font-bold leading-8 text-[#0F172A]">
                        120/80 <span className="text-xs font-medium text-[#94A3B8]">mmHg</span>
                    </p>

                </CardContent>
            </Card>

            <Card className="w-full h-fit p-5 flex flex-col gap-2 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                <div className="flex flex-row justify-start gap-1 items-start w-full">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#EFF6FF] rounded-lg">
                        <ActivitySquareIcon className="text-[#3B82F6]" />
                    </div>
                    <span className="text-sm font-medium text-[#64748B]">Heart Rate</span>

                </div>
                <CardContent className="p-0 flex flex-col">
                    <p className="text-2xl font-bold leading-8 text-[#0F172A]">
                        71<span className="text-xs font-medium text-[#94A3B8]">  bpm</span>
                    </p>
                    <div className="flex items-center gap-1">
                        <TrendingUp size={14} className="text-[#16A34A]" />
                        <span className="text-xs font-medium text-[#16A34A]">-2% from last visit</span>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full h-fit p-5 flex flex-col gap-2 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                <div className="flex flex-row justify-start gap-1 items-start w-full">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#FFF7ED] rounded-lg">
                        <DotSquare className="text-[#F97316]" />
                    </div>
                    <span className="text-sm font-medium text-[#64748B]">Weight</span>

                </div>
                <CardContent className="p-0 flex flex-col">
                    <p className="text-2xl font-bold leading-8 text-[#0F172A]">
                        75 <span className="text-xs font-medium text-[#94A3B8]">Kg</span>
                    </p>
                    <div className="flex items-center gap-1">
                        <ClockFadingIcon size={14} className="text-[#94A3B8]" />
                        <span className="text-xs font-medium text-[#94A3B8]">Measured 2 days ago</span>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full h-fit p-5 flex flex-col gap-2 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                <div className="flex flex-row justify-start gap-1 items-start w-full">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#FAF5FF] rounded-lg">
                        <MoveVerticalIcon className="text-[#A855F7]" />
                    </div>
                    <span className="text-sm font-medium text-[#64748B]">Height</span>

                </div>
                <CardContent className="p-0 flex flex-col">
                    <p className="text-2xl font-bold leading-8 text-[#0F172A]">
                        180 <span className="text-xs font-medium text-[#94A3B8]">cm</span>
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-[#94A3B8]">BMI: 23.1 (Normal)</span>
                    </div>
                </CardContent>

            </Card>
        </main>
    </>
}
