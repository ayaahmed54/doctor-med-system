
import { AlertTriangle, ArrowDownLeft, ArrowDownRight, ArrowUpRight, Bookmark, BriefcaseMedicalIcon, CalendarArrowDownIcon, CalendarArrowUp, CalendarClock, CalendarDaysIcon, CalendarHeart, CalendarRange, CheckCircle2, CircleX, Download, Droplets, Hourglass, LucideCalendarSync, LucideUserRoundMinus, Phone, Plus, PlusSquareIcon, ShieldAlert, TrendingUp, User, UserMinus, UserPlus, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import TablePatients from "./_Component/tablePatients/page"

export default function patients() {
    return <>
        <div className=' min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <header className="w-full border-b border-slate-200 py-6 md:py-8">
                    <div className="max-w-280  mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-4 gap-6">
                        <div className="flex flex-col gap-1 md:gap-2">
                            <h1 className="text-slate-900 font-bold text-2xl md:text-4xl leading-tight tracking-tight">
                                Assigned Patients
                            </h1>
                            <p className="text-slate-500 font-normal text-sm md:text-base leading-6">
                                Manage your patient list, appointments, and medical records.
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center px-4 md:px-5 h-10 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50 transition-all gap-2">
                                <Download size={18} className="text-slate-900" />
                                <span className="text-slate-900 font-bold text-sm whitespace-nowrap">
                                    Export
                                </span>
                            </button>

                        </div>
                    </div>
                </header>



                <TablePatients />



            </div>
        </div>
    </>
}
