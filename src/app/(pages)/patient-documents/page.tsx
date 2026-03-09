import { Card, CardHeader } from '@/components/ui/card'
import { BotIcon, CheckCircle2, Download, Flag, MoveVerticalIcon, Plus, Share2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Scan from '../../../assets/images/Scan.jpg'
import { Button } from '@/components/ui/button'
export default function patientDocuments() {

    return <>
        <div className=' min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-350 mx-auto p-4 md:px-6 grow">
                <header className="w-full border-b border-slate-200 py-6 md:py-8 ">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 gap-6">

                        <div className="flex flex-col gap-1 md:gap-2">
                            <h1 className="text-slate-900 font-bold text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
                                MRI - Brain Scan Analysis
                            </h1>
                            <p className="text-slate-500 font-normal text-xs md:text-sm lg:text-base leading-6">
                                ID: 9822 • Oct 14, 2023 <span className="hidden sm:inline">• MRI (T2-Weighted)</span>
                            </p>
                        </div>

                        <div className="flex flex-row items-center gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center px-4 md:px-5 h-10 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50 transition-all gap-2">
                                <Flag size={16} className="text-slate-900 md:w-5" />
                                <span className="text-slate-900 font-bold text-xs md:text-sm whitespace-nowrap">
                                    Flag <span className="hidden lg:inline">for Review</span>
                                </span>
                            </button>

                            <button className="flex-1 md:flex-none flex items-center justify-center px-4 md:px-5 h-10 bg-blue-600 shadow-lg shadow-blue-500/20 rounded-lg hover:bg-blue-700 transition-all gap-2">
                                <CheckCircle2 size={16} className="text-white md:w-5" />
                                <span className="text-white font-bold text-xs md:text-sm whitespace-nowrap">
                                    Verify <span className="hidden lg:inline">Diagnosis</span>
                                </span>
                            </button>
                        </div>

                    </div>
                </header>

                <div className="w-full flex h-auto mx-auto">
                    <Card className="w-full mt-6 bg-[#F8FAFC] rounded-lg overflow-hidden border-none shadow-none">

                        <div className="grid grid-cols-12 w-full items-start p-4 sm:p-6 gap-6">
                            <div className="col-span-12 lg:col-span-7 flex justify-center">
                                <Image
                                    src={Scan}
                                    alt="MRI Scan"
                                    className="w-full h-auto rounded-lg object-cover shadow-sm"
                                />
                            </div>
                            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                                <div className="w-full bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl p-5 flex flex-col gap-4">

                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex items-center gap-3">
                                            <div className="min-w-12 h-12 bg-[#F8F9FC] border border-[#E7EBF3] rounded-full flex justify-center items-center">
                                                <span className="text-[#2B6CEE] font-bold text-[18px]">SJ</span>
                                            </div>

                                            <div>
                                                <h3 className="text-[#0D121B] font-bold text-[17px] xl:text-[18px] leading-tight">
                                                    Sarah Jenkins
                                                </h3>
                                                <p className="text-[#4C669A] text-[13px] xl:text-[14px]">
                                                    34 yrs • Female • PT-4921
                                                </p>
                                            </div>
                                        </div>

                                        <button className="text-[#2B6CEE] font-medium text-[13px] hover:underline whitespace-nowrap">
                                            View File
                                        </button>
                                    </div>

                                    <div className="border-t border-[#E7EBF3] pt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-[#4C669A] text-[11px] uppercase tracking-wider">
                                                DOB
                                            </span>
                                            <p className="text-[#0D121B] text-[15px] xl:text-[16px] font-medium">
                                                Jan 12, 1989
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[#4C669A] text-[11px] uppercase tracking-wider">
                                                Blood Type
                                            </span>
                                            <p className="text-[#0D121B] text-[15px] xl:text-[16px] font-medium">
                                                O+
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-[#4C669A] text-[11px] uppercase tracking-wider">
                                                Last Visit
                                            </span>
                                            <p className="text-[#0D121B] text-[15px] xl:text-[16px] font-medium">
                                                Oct 12, 2023
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[#4C669A] text-[11px] uppercase tracking-wider">
                                                Ref. Dr
                                            </span>
                                            <p className="text-[#0D121B] text-[15px] xl:text-[16px] font-medium">
                                                Dr. John Doe
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl p-5 flex flex-col gap-5">

                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex items-center gap-2">
                                            <BotIcon className="text-[#2B6CEE] w-6 h-6" />
                                            <h3 className="text-[#0D121B] font-bold text-[17px] xl:text-[18px]">
                                                AI Analysis
                                            </h3>
                                        </div>

                                        <div className="bg-[#DCFCE7] px-2 py-1 rounded-lg">
                                            <span className="text-[#15803D] font-bold text-[10px] xl:text-[12px] uppercase">
                                                Complete
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <span className="text-[#0D121B] text-[14px] font-medium">
                                                Mass Anomaly (Frontal Lobe)
                                            </span>
                                            <span className="text-[#2B6CEE] font-bold text-[14px]">
                                                92%
                                            </span>
                                        </div>

                                        <div className="w-full h-2 bg-[#F1F3F9] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#2B6CEE] rounded-full" style={{ width: "92%" }} />
                                        </div>

                                        <p className="text-[#4C669A] text-[12px]">
                                            Suggestive of benign meningioma. Requires correlation.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <span className="text-[#0D121B] text-[14px] font-medium">
                                                Ventricle Asymmetry
                                            </span>
                                            <span className="text-[#4C669A] font-bold text-[14px]">
                                                45%
                                            </span>
                                        </div>

                                        <div className="w-full h-2 bg-[#F1F3F9] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#4C669A] opacity-50 rounded-full"
                                                style={{ width: "45%" }}
                                            />
                                        </div>

                                        <p className="text-[#4C669A] text-[12px]">
                                            Mild asymmetry noted. Likely within normal variance.
                                        </p>
                                    </div>
                                    <div className="border-t border-[#E7EBF3] pt-5">
                                        <h3 className="text-[#0D121B] font-bold text-[17px] xl:text-[18px] mb-3">
                                            Doctor's Interpretation
                                        </h3>

                                        <textarea
                                            className="w-full h-24 bg-[#F8F9FC] border border-[#E7EBF3] rounded-lg p-3 text-sm text-[#0D121B] focus:outline-none focus:ring-1 focus:ring-[#2B6CEE]"
                                            placeholder="Add your clinical notes here..."
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            variant="outline"
                                            className="w-full sm:w-38.5 h-10 rounded-lg border-[#E7EBF3] text-[#0D121B] font-bold text-sm flex justify-center items-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Report
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="w-full sm:w-38.5 h-10 rounded-lg border-[#E7EBF3] text-[#0D121B] font-bold text-sm flex justify-center items-center gap-2"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </Button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Card>
                </div>




            </div>
        </div>
    </>
}
