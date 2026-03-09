
import { AlertTriangle, ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowUp, ArrowUpRight, Bookmark, BriefcaseMedicalIcon, CalendarArrowDownIcon, CalendarArrowUp, CalendarClock, CalendarDaysIcon, CalendarHeart, CalendarRange, CheckCircle2, CircleX, ClipboardPlusIcon, Download, History, Hourglass, LucideCalendarSync, LucideUserRoundMinus, Pill, Plus, PlusSquareIcon, TrendingUp, UserMinus, UserPlus, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import TablePatients from '@/components/tablePatients/tablePatients'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import TablePrescriptions from "@/components/TablePrescriptions/tablePrescriptions"

export default function prescriptions() {
    return <>
        <div className=' min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">
                <header className="w-full border-b border-slate-200 py-6 md:py-8">
                    <div className="max-w-280 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-4 gap-6">
                        <div className="flex flex-col gap-1 md:gap-2">
                            <h1 className="text-slate-900 font-bold text-2xl md:text-4xl leading-tight tracking-tight">
                                Prescriptions
                            </h1>
                            <p className="text-slate-500 font-normal text-sm md:text-base leading-6">
                                Manage patient medication records and renewal requests
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-3 w-full md:w-auto">
                            <Link href="/create-prescription" className="w-full md:w-auto">
                                <Button className="w-full md:w-auto flex items-center justify-center px-5 h-10 bg-[#2B6CEE] shadow-lg shadow-blue-500/20 rounded-lg hover:bg-blue-700 transition-all gap-2 border-none">
                                    <Plus size={18} className="text-white" />
                                    <span className="text-white font-bold text-sm whitespace-nowrap">
                                        New Prescription
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>


                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-full max-w-300 mx-auto px-4">

                    <Card className="w-full h-29.5 bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl] flex flex-col items-start p-[22px_24px_24px] gap-0.5 box-border overflow-hidden">
                        <div className="flex flex-row justify-between items-center w-full h-7 shrink-0">
                            <span className="font-medium text-[14px] leading-5 text-[#4C669A] flex items-center shrink-0">
                                Total Prescriptions
                            </span>
                            <div className="flex items-center justify-center w-6 h-7 text-[#4C669A] shrink-0">
                                <ClipboardPlusIcon size={20} />
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-2 mt-2 h-8 w-full shrink-0">
                            <span className="font-bold text-[24px] leading-8 text-[#0D121B] flex items-center">
                                1,248
                            </span>
                            <div className="flex flex-row items-center px-1.5 py-0.5 bg-[#F0FDF4] rounded-lg h-5 shrink-0">
                                <ArrowUp size={14} className="text-[#16A34A] mr-0.5" />
                                <span className="font-bold text-[12px] leading-4 text-[#16A34A] flex items-center">
                                    12%
                                </span>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full h-29.5 bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl] flex flex-col items-start p-[22px_24px_24px] gap-0.5 box-border overflow-hidden">
                        <div className="flex flex-row justify-between items-center w-full h-7 shrink-0">
                            <span className="font-medium text-[14px] leading-5 text-[#4C669A] flex items-center shrink-0">
                                Active Scripts
                            </span>
                            <div className="flex items-center justify-center w-6 h-7 text-[#4C669A] shrink-0">
                                <Pill size={20} />
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-2 mt-2 h-8 w-full shrink-0">
                            <span className="font-bold text-[24px] leading-8 text-[#0D121B] flex items-center">
                                856
                            </span>
                            <div className="flex flex-row items-center px-1.5 py-0.5 bg-[#F0FDF4] rounded-lg h-5 shrink-0">
                                <ArrowUp size={14} className="text-[#16A34A] mr-0.5" />
                                <span className="font-bold text-[12px] leading-4 text-[#16A34A] flex items-center">
                                    5%
                                </span>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full h-29.5 bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl] flex flex-col items-start p-[22px_24px_24px] gap-0.5 box-border overflow-hidden">
                        <div className="flex flex-row justify-between items-center w-full h-7 shrink-0">
                            <span className="font-medium text-[14px] leading-5 text-[#4C669A] flex items-center shrink-0">
                                Pending Renewals
                            </span>
                            <div className="flex items-center justify-center w-6 h-7 text-[#4C669A] shrink-0">
                                <History size={20} />
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-2 mt-2 h-8 w-full shrink-0">
                            <span className="font-bold text-[24px] leading-8 text-[#0D121B] flex items-center">
                                42
                            </span>
                            <div className="flex flex-row items-center px-1.5 py-0.5 bg-[#FEF2F2] rounded-lg h-5 shrink-0">
                                <ArrowDown size={14} className="text-[#EF4444] mr-0.5" />
                                <span className="font-bold text-[12px] leading-4 text-[#EF4444] flex items-center">
                                    12%
                                </span>
                            </div>
                        </div>
                    </Card>
                </main>




                <TablePrescriptions />
            </div>
        </div>
    </>
}
