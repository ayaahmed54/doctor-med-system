import React from 'react'
import { ArrowUp, ArrowUpRight, Calendar, CalendarArrowDownIcon, CalendarArrowUp, CalendarClock, CalendarDays, CalendarDaysIcon, CalendarHeart, CalendarRange, CalendarRangeIcon, CheckCircle2, CircleX, Hourglass, HourglassIcon, LucideCalendarSync, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import MedicalAppointmentsTable from './_Component/AppointmentForm/page'


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
                            <CalendarDaysIcon className="w-5 h-5 text-[#64748B]" strokeWidth={1.5} />
                            <span className="text-[14px] font-medium leading-5 text-[#64748B] whitespace-nowrap">
                                {new Date().toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </span>
                        </Button>
                    </div>
                </header>
                <MedicalAppointmentsTable />

            </div>
        </div>

    )
}






