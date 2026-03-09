import { Search, User, Plus, UserRoundSearch, FileText, X, Droplets, Pill, SyringeIcon, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PrescriptionManager from "@/components/PrescriptionManager/PrescriptionManager";
export default function PatientDetailsCard() {
    return <>
        <div className="flex flex-col xl:flex-row items-start gap-6 p-4 sm:p-6 lg:p-8 bg-[#F4F7FA] min-h-screen">

            <div className="flex-1 w-full max-w-3xl">
                <div className="bg-white border border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">

                    <div className="flex items-center gap-2 p-4 sm:p-6 pb-4 border-b border-[#F8F9FC]">
                        <div className="bg-blue-50 p-1.5 rounded-lg">
                            <UserRoundSearch className="w-5 h-5 text-[#2B6CEE]" />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-[#0D121B]">
                            Patient Details
                        </h2>
                    </div>

                    <div className="p-4 sm:p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#4C669A]">
                                Select Patient
                            </label>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4C669A]" />
                                <input
                                    type="text"
                                    placeholder="Search by name, ID or phone..."
                                    className="w-full h-11 bg-[#F8F9FC] border border-[#E7EBF3] rounded-lg pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#2B6CEE]"
                                />
                            </div>
                        </div>

                        <div className="bg-[#2B6CEE]/5 border border-[#2B6CEE]/20 rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row items-start gap-4">

                                <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center shrink-0">
                                    <span className="text-gray-500 font-bold">SJ</span>
                                </div>

                                <div className="flex-1 space-y-1 w-full">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <h4 className="text-base font-bold text-[#0D121B]">
                                            Sarah Jenkins
                                        </h4>
                                        <button className="text-xs font-semibold text-[#2B6CEE] hover:underline self-start sm:self-auto">
                                            Change
                                        </button>
                                    </div>

                                    <p className="text-xs text-[#4C669A]">
                                        ID: #PT-88392 • Age: 34 • Female
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <div className="bg-red-100 px-2 py-1 rounded text-[11px] font-bold text-red-800">
                                            Allergy: Penicillin
                                        </div>
                                        <div className="bg-blue-100 px-2 py-1 rounded text-[11px] font-bold text-blue-800">
                                            Weight: 62kg
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <PrescriptionManager />
            </div>

            <div className="w-full xl:w-90 shrink-0 xl:sticky xl:top-8">
                <div className="bg-white border border-[#E7EBF3] rounded-2xl shadow-sm flex flex-col overflow-hidden">

                    <div className="p-5 bg-[#F9FAFB] border-b border-[#E7EBF3]">
                        <h3 className="text-[16px] font-bold text-[#0D121B]">
                            Current Prescription
                        </h3>
                        <p className="text-[12px] text-[#4C669A]">
                            Review items before issuing
                        </p>
                    </div>

                    <div className="p-4 space-y-3">

                        <div className="p-3 bg-[#F8F9FC] border border-[#E7EBF3] rounded-lg flex gap-3 relative">
                            <div className="w-9 h-11 shrink-0 bg-[#DBEAFE] rounded-lg flex items-center justify-center text-[#2B6CEE]">
                                <Pill size={18} />
                            </div>
                            <div>
                                <h4 className="text-[14px] font-bold text-[#0D121B]">
                                    Lisinopril
                                </h4>
                                <p className="text-[12px] font-medium text-[#4C669A]">
                                    10mg • Once Daily • 30 Days
                                </p>
                                <p className="text-[12px] italic text-[#4C669A]">
                                    Take in the morning
                                </p>
                            </div>
                            <button className="absolute top-2 right-2 text-gray-300 hover:text-red-500">
                                <X size={14} />
                            </button>
                        </div>

                        <div className="p-3 bg-[#F8F9FC] border border-[#E7EBF3] rounded-lg flex gap-3 relative">
                            <div className="w-9 h-11 shrink-0 bg-[#F3E8FF] rounded-lg flex items-center justify-center text-[#9333EA]">
                                <SyringeIcon size={18} />
                            </div>
                            <div>
                                <h4 className="text-[14px] font-bold text-[#0D121B]">
                                    Insulin Glargine
                                </h4>
                                <p className="text-[12px] font-medium text-[#4C669A]">
                                    10 Units • Once Daily • 30 Days
                                </p>
                                <p className="text-[12px] italic text-[#4C669A]">
                                    Inject at bedtime
                                </p>
                            </div>
                            <button className="absolute top-2 right-2 text-gray-300 hover:text-red-500">
                                <X size={14} />
                            </button>
                        </div>

                    </div>

                    <div className="p-5 border-t border-[#E7EBF3] space-y-4">

                        <div className="flex justify-between items-center text-[14px]">
                            <span className="text-[#4C669A]">Total Items</span>
                            <span className="font-bold text-[#0D121B]">2</span>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-[#E7EBF3] accent-[#2B6CEE]"
                            />
                            <span className="text-[12px] text-[#4C669A]">
                                Send copy to patient email
                            </span>
                        </label>

                        <button className="w-full h-12 bg-[#2B6CEE] hover:bg-[#1a56cc] text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#2B6CEE]/20 transition-all">
                            <SendHorizonal size={18} />
                            Issue Prescription
                        </button>

                        <button className="w-full text-[14px] font-medium text-[#4C669A] hover:text-[#0D121B] pt-1">
                            Cancel
                        </button>

                    </div>

                </div>
            </div>

        </div>

    </>;
}

