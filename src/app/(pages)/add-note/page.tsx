import ActivePrescriptions from '@/components/ActivePrescriptions/ActivePrescriptions'
import RecentHistory from '@/components/RecentHistory/RecentHistory'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AlignCenter, AlignLeft, AlignRight, Bold, BrainCog, Check, CheckCircle2, ChevronDown, ChevronRight, Clock, FileSpreadsheetIcon, Flag, Italic, List, ListOrdered, MoreVertical, Pill, Sparkles, User, X } from 'lucide-react'
import React from 'react'

export default function Add_note() {
    return <>
        <div className=' min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-350 mx-auto p-4 md:px-6 grow">
                <header className="w-full border-b border-slate-200 py-6 md:py-8 ">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 gap-6">

                        <div className="flex flex-col gap-1 md:gap-2">
                            <h1 className="text-slate-900 font-bold text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
                                Consultation Note
                            </h1>
                            <p className="text-slate-500 font-normal flex items-center text-xs md:text-sm lg:text-base leading-6">
                                <Clock className='pr-2' />
                                Oct 24, 2023 • 10:30 AM

                            </p>
                        </div>

                        <div className="flex flex-row items-center gap-3 w-full md:w-auto">
                            <Button className="flex-1 md:flex-none flex items-center justify-center px-4 md:px-5 h-10 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50 transition-all gap-2">
                                <span className="text-slate-900 font-medium text-xs md:text-sm whitespace-nowrap">
                                    Save Draft
                                </span>
                            </Button>

                            <Button className="flex-1 md:flex-none flex items-center justify-center px-4 md:px-5 h-10 bg-blue-600 shadow-lg shadow-blue-500/20 rounded-lg hover:bg-blue-700 transition-all gap-2">
                                <CheckCircle2 size={16} className="text-white md:w-5" />
                                <span className="text-white font-medium text-xs md:text-sm whitespace-nowrap">
                                    Finalize & Sign
                                </span>
                            </Button>
                        </div>

                    </div>
                </header>
                <div className="grid grid-cols-3 gap-6 mt-6 items-start">
                    <div className="col-span-2 bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden">
                        <div className="flex items-center h-15.25 px-4 py-3 bg-[#F9FAFB] border-b border-[#E2E8F0] gap-2">
                            <div className="flex items-center pr-2 border-r border-[#E2E8F0] gap-1">
                                <button className="w-8 h-8 rounded-md text-[#64748B] hover:bg-white hover:shadow-sm transition-all"><Bold size={18} /></button>
                                <button className="w-8 h-8 rounded-md text-[#64748B] hover:bg-white hover:shadow-sm transition-all"><Italic size={18} /></button>
                                <button className="w-8 h-8 rounded-md text-[#64748B] hover:bg-white hover:shadow-sm transition-all"><List size={18} /></button>
                            </div>
                            <div className="flex items-center px-2 border-r border-[#E2E8F0] gap-1">
                                <button className="w-8 h-8 rounded-md text-[#64748B] hover:bg-white hover:shadow-sm transition-all"><ListOrdered size={18} /></button>
                                <button className="w-8 h-8 rounded-md text-[#64748B] hover:bg-white hover:shadow-sm transition-all"><AlignLeft size={18} /></button>
                            </div>
                            <div className="flex items-center pl-2 gap-2">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[#64748B] hover:text-[#0F172A] transition-colors">
                                    <span className="text-[12px] font-medium uppercase tracking-wider">Templates</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-semibold text-[#0F172A]">
                                    Subjective (Chief Complaint)
                                </label>
                                <Textarea
                                    placeholder="e.g., Patient reports persistent cough for 3 days..."
                                    className="w-full h-30 p-4 bg-[#F6F6F8] border border-[#E2E8F0] rounded-lg text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                                />
                            </div>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-semibold text-[#0F172A]">
                                    Objective (Observations)
                                </label>
                                <Textarea
                                    placeholder="e.g., Blood pressure 120/80, Temperature 98.6F..."
                                    className="w-full h-30 p-4 bg-[#F6F6F8] border border-[#E2E8F0] rounded-lg text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                                />
                            </div>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            <div className="flex flex-col items-start p-0 gap-2 w-full  h-18.5 self-stretch flex-none order-2 grow-0 mt-4">
                                <label className="flex items-center w-full h-5  font-semibold text-[14px] leading-5 text-[#0F172A] self-stretch flex-none order-0 grow-0">
                                    Assessment (Diagnosis)
                                </label>
                                <div className="relative flex flex-col items-start p-0 w-full h-11.5 isolate self-stretch flex-none order-1 grow-0">

                                    <div className="absolute left-3 top-2.75 w-5 h-6 z-10 flex items-center justify-center text-[#2B6CEE]">
                                        <Sparkles size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        defaultValue="Acute Bronchitis (Suggested by AI)"
                                        className="box-border flex flex-row justify-center items-start p-[12px_12px_12px_40px] w-full h-11.5 bg-[#F6F6F8] border border-[#E2E8F0] rounded-xl  font-normal text-[14px] leading-5 text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#2B6CEE] focus:bg-white transition-all z-0"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-semibold text-[#0F172A]">
                                    Plan (Treatment)
                                </label>
                                <Textarea
                                    placeholder="e.g., Prescribed Amoxicillin 500mg, rest, fluids..."
                                    className="w-full h-30 p-4 bg-[#F6F6F8] border border-[#E2E8F0] rounded-lg text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-4">
                        <div className="w-full bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden">
                            <div className="flex flex-row justify-between items-center p-[14px_16px] w-full h-14.5 from-[#EFF6FF] to-[#FFFFFF] border-b border-[#E2E8F0]">
                                <div className="flex flex-row items-center gap-2">
                                    <BrainCog size={20} className="text-[#2B6CEE]" />
                                    <h3 className="font-bold text-[16px] text-[#0F172A]">AI Analysis</h3>
                                </div>
                                <div className="px-2 py-1 bg-[#FEF9C3] rounded-full flex items-center">
                                    <span className="text-[12px] font-medium text-[#854D0E]">Pending Review</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                <p className="text-[14px] leading-5.75 text-[#64748B]">
                                    Based on the symptoms and vitals, there is a
                                    <span className='font-bold text-[#0F172A]'> 92% probability</span> of Acute Bronchitis.
                                    The AI recommends checking for respiratory infections.
                                </p>

                                <div className="flex flex-col items-start p-3 gap-2 bg-[#F6F6F8] border border-[#E2E8F0] rounded-lg">
                                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#64748B]">
                                        Primary Suggestion
                                    </span>
                                    <span className="text-[14px] font-medium text-[#0F172A]">
                                        ICD-10: J20.9 (Acute Bronchitis)
                                    </span>
                                </div>

                                <div className="flex flex-row gap-2 pt-2">
                                    <button className="flex-1 flex justify-center items-center py-2 px-3 gap-2 bg-[#F0FDF4] rounded-lg text-[#15803D] hover:bg-[#DCFCE7] transition-colors">
                                        <Check size={18} />
                                        <span className="text-sm font-medium">Approve</span>
                                    </button>
                                    <button className="flex-1 flex justify-center items-center py-2 px-3 gap-2 bg-[#FEF2F2] rounded-lg text-[#B91C1C] hover:bg-[#FEE2E2] transition-colors">
                                        <X size={18} />
                                        <span className="text-sm font-medium">Reject</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <RecentHistory />
                        <ActivePrescriptions />
                    </div>





                </div>

            </div>
        </div>


    </>
}
