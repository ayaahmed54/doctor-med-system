import React from 'react'
import { ArrowUp, ArrowUpRight, Calendar, CalendarArrowDownIcon, CalendarArrowUp, CalendarClock, CalendarDays, CalendarDaysIcon, CalendarHeart, CalendarRange, CalendarRangeIcon, CheckCircle2, CircleX, Hourglass, HourglassIcon, LucideCalendarSync, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FormHeader from '@/components/FormHeader/FormHeader'
import { Button } from '@/components/ui/button'

export default function Appointments() {
    return (
        <div className=' min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <header className="w-full pb-4 border-b border-[#E7E8EB]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-280 px-4 md:px-0 gap-4 md:h-16 mx-auto">
                        <div className="flex flex-col items-start gap-1">
                            <h1 className="text-[24px] md:text-[30px] font-bold md:leading-9 tracking-[-0.75px] text-[#0F172A]">
                                Appointments
                            </h1>
                            <p className="text-[14px] md:text-[16px] font-normal leading-6 text-[#64748B]">
                                Manage your schedule and patient visits for today.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="flex flex-row items-center justify-center px-4 py-1.5 gap-2 w-full md:w-auto h-10 md:h-9.5 bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            <CalendarDaysIcon
                                className="w-5 h-5 text-[#64748B]"
                                strokeWidth={1.5}
                            />
                            <span className="text-[14px] font-medium leading-5 text-[#64748B] whitespace-nowrap">
                                Today, Oct 24, 2023
                            </span>
                        </Button>
                    </div>
                </header>

                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 w-full max-w-280 mx-auto px-4 md:px-0">

                    <Card className="w-full h-35 p-5 flex flex-col bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-row justify-between items-start w-full">
                            <span className="text-sm font-medium text-[#64748B]">Total Appointments</span>
                            <div className="flex items-center justify-center w-8 h-8 bg-[#EFF6FF] rounded-lg">
                                <CalendarRange size={20} className="text-[#2563EB]" />
                            </div>
                        </div>
                        <CardContent className="p-0 flex flex-col justify-center flex-1">
                            <span className="text-2xl font-bold leading-8 text-[#0F172A]">12</span>
                            <div className="flex items-center gap-1">
                                <TrendingUp size={14} className="text-[#16A34A]" />
                                <span className="text-xs font-medium text-[#16A34A]">+2 from yesterday</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-35 p-5 flex flex-col bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-row justify-between items-start w-full">
                            <span className="text-sm font-medium text-[#64748B]">Waiting Room</span>
                            <div className="flex items-center justify-center w-8 h-8 bg-[#FFF7ED] rounded-lg">
                                <Hourglass size={20} className="text-[#EA580C]" />
                            </div>
                        </div>
                        <CardContent className="p-0 flex flex-col justify-center flex-1">
                            <span className="text-2xl font-bold leading-8 text-[#0F172A]">4</span>
                            <span className="text-xs font-medium text-[#94A3B8]">Currently checked in</span>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-35 p-5 flex flex-col bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-row justify-between items-start w-full">
                            <span className="text-sm font-medium text-[#64748B]">Completed</span>
                            <div className="flex items-center justify-center w-8 h-8 bg-[#F0FDF4] rounded-lg">
                                <CheckCircle2 size={20} className="text-[#16A34A]" />
                            </div>
                        </div>
                        <CardContent className="p-0 flex flex-col justify-center flex-1">
                            <span className="text-2xl font-bold leading-8 text-[#0F172A]">8</span>
                            <span className="text-xs font-medium text-[#94A3B8]">66% of daily goal</span>
                        </CardContent>
                    </Card>
                    <Card className="w-full h-35 p-5 flex flex-col bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
                        <div className="flex flex-row justify-between items-start w-full">
                            <span className="text-sm font-medium text-[#64748B]">Cancelled</span>
                            <div className="flex items-center justify-center w-8 h-8 bg-[#FEF2F2] rounded-lg">
                                <CircleX size={20} className="text-[#DC2626]" />
                            </div>
                        </div>
                        <CardContent className="p-0 flex flex-col justify-center flex-1">
                            <span className="text-2xl font-bold leading-8 text-[#0F172A]">0</span>
                            <span className="text-xs font-medium text-[#94A3B8]">No cancellations yet</span>
                        </CardContent>
                    </Card>
                </main>





                <FormHeader />
            </div>
        </div>

    )
}






