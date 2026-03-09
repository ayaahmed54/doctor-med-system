
import { AlertTriangle, ArrowDownLeft, ArrowDownRight, ArrowUpRight, Bookmark, BriefcaseMedicalIcon, CalendarArrowDownIcon, CalendarArrowUp, CalendarClock, CalendarDaysIcon, CalendarHeart, CalendarRange, CheckCircle2, CircleX, Download, Droplets, Hourglass, LucideCalendarSync, LucideUserRoundMinus, Phone, Plus, PlusSquareIcon, ShieldAlert, TrendingUp, User, UserMinus, UserPlus, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import TablePatients from '@/components/tablePatients/tablePatients'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="flex-2 md:flex-none flex items-center justify-center px-4 md:px-5 h-10 bg-blue-600 shadow-lg shadow-blue-500/20 rounded-lg hover:bg-blue-700 transition-all gap-2">
                                        <Plus size={18} className="text-white" />
                                        <span className="text-white font-bold text-sm whitespace-nowrap">
                                            Add New Patient
                                        </span>
                                    </Button>
                                </DialogTrigger>

                                <DialogContent className="max-w-[95%] sm:max-w-150 bg-white rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                                    <DialogHeader className="p-6 pb-2 bg-[#F8F9FC]">
                                        <DialogTitle className="text-xl md:text-2xl font-bold text-[#0D121B] flex items-center gap-2">
                                            <UserPlus className="text-[#2B6CEE]" /> Register New Patient
                                        </DialogTitle>
                                        <p className="text-[#64748B] text-sm">Create a new medical record for the patient.</p>
                                    </DialogHeader>

                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                                                    <User size={14} className="text-[#2B6CEE]" /> Full Name
                                                </label>
                                                <input className="w-full h-11 border border-[#E7EBF3] rounded-xl p-3 text-sm focus:border-[#2B6CEE] outline-none bg-gray-50/30" placeholder="e.g. Aya Ahmed" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                                                    <Phone size={14} className="text-[#2B6CEE]" /> Phone Number
                                                </label>
                                                <input className="w-full h-11 border border-[#E7EBF3] rounded-xl p-3 text-sm focus:border-[#2B6CEE] outline-none" placeholder="+20 123 456 789" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#334155]">Age</label>
                                                <input type="number" className="w-full h-11 border border-[#E7EBF3] rounded-xl p-3 text-sm focus:border-[#2B6CEE] outline-none" placeholder="34" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#334155]">Gender</label>
                                                <select className="w-full h-11 border border-[#E7EBF3] rounded-xl px-3 text-sm bg-white outline-none">
                                                    <option>Female</option>
                                                    <option>Male</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5 col-span-2 md:col-span-1">
                                                <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                                                    <Droplets size={14} className="text-red-500" /> Blood Type
                                                </label>
                                                <select className="w-full h-11 border border-[#E7EBF3] rounded-xl px-3 text-sm bg-white outline-none">
                                                    <option>O+</option>
                                                    <option>A+</option>
                                                    <option>B+</option>
                                                    <option>AB+</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                                                <ShieldAlert size={14} className="text-orange-500" /> Allergies (if any)
                                            </label>
                                            <input className="w-full h-11 border border-[#E7EBF3] rounded-xl p-3 text-sm focus:border-[#2B6CEE] outline-none bg-gray-50/30" placeholder="e.g. Penicillin, Peanuts" />
                                        </div>
                                        <div className="pt-4 flex gap-3">
                                            <DialogTrigger asChild>
                                                <button className="flex-1 h-12 rounded-xl border border-[#E7EBF3] text-[#64748B] font-bold text-sm hover:bg-gray-50 transition-all">
                                                    Cancel
                                                </button>
                                            </DialogTrigger>
                                            <button className="flex-2 h-12 bg-[#2B6CEE] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#1e56cc] transition-all">
                                                Save Patient Profile
                                            </button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </header>


                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 w-full max-w-7xl mx-auto px-4">
                    <Card className="h-21.5 border-slate-200 shadow-sm rounded-xl">
                        <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full shrink-0">
                                <Users size={24} className="text-blue-600" />
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="text-slate-500 font-medium text-sm">Total Patients</span>
                                <span className="text-slate-900 font-bold text-2xl">142</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="h-21.5 border-slate-200 shadow-sm rounded-xl">
                        <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full shrink-0">
                                <CheckCircle2 size={24} className="text-[#16A34A]" />
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="text-slate-500 font-medium text-sm">Active Status</span>
                                <span className="text-slate-900 font-bold text-2xl">118</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="h-21.5 border-slate-200 shadow-sm rounded-xl">
                        <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
                            <div className="flex items-center justify-center w-12 h-12 bg-[#FFFBEB] rounded-full shrink-0">
                                <PlusSquareIcon size={24} className="text-[#D97706]" />
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="text-slate-500 font-medium text-sm">New This Month</span>
                                <span className="text-slate-900 font-bold text-2xl">12</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="h-21.5 border-slate-200 shadow-sm rounded-xl">
                        <CardContent className="p-4 flex flex-row items-center gap-4 h-full">
                            <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-full shrink-0">
                                <AlertTriangle size={24} className="text-red-600" />
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="text-slate-500 font-medium text-sm">Critical</span>
                                <span className="text-slate-900 font-bold text-2xl">3</span>
                            </div>
                        </CardContent>
                    </Card>
                </main>



                <TablePatients />
            </div>
        </div>
    </>
}
