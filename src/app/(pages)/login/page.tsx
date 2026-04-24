
import { Button } from "@/components/ui/button"

import { ShieldCheck, Lock, Mail, Eye, HelpCircle, PlusSquare } from "lucide-react"

import Loginform from "./_Component/Loginform/Loginform"

export default function Login() {


    return <>
        <header className="sticky top-0 z-50 w-full h-18.25 bg-[#111722] border-b border-[#232F48] shadow-sm px-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center shrink-0">
                    <PlusSquare className="text-[#2B6CEE] w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight leading-8">
                    MediCare Portal
                </h2>
            </div>
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    className=" hover:bg-blue-600 text-white h-9 px-4 rounded-lg flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-500/10"
                >
                    <HelpCircle className="w-5 h-5 text-white" />
                    <span className="text-sm font-semibold tracking-wide">
                        Help Center
                    </span>
                </Button>
            </div>

        </header>

        <div className="flex min-h-screen bg-[#101622] overflow-hidden">
            <div className="relative hidden w-1/2 flex-col justify-center px-12 lg:flex border-r border-[#324467]/30">
                <div className="absolute inset-0 bg-[#111722] opacity-60 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-linear-to-t from-[#101622] to-transparent opacity-90"></div>

                <div className="relative z-10 max-w-125">
                    <div className="mb-8 flex h-16.5 w-15.5 items-center justify-center rounded-2xl border border-[#2B6CEE]/30 bg-[#2B6CEE]/20 backdrop-blur-[2px]">
                        <ShieldCheck className="h-9 w-9 text-[#2B6CEE]" />
                    </div>

                    <h1
                        style={{
                            width: '406.65px',
                            height: '153px',
                            lineHeight: '48px'
                        }}
                        className="text-[48px] font-bold text-white flex items-center mb-6"
                    >
                        Secure Access for <br /> Medical <br /> Professionals
                    </h1>
                    <p className="text-[18px] leading-[1.6] text-[#D1D5DB] mb-10">
                        Streamlined patient management, real-time analytics, and secure communication channels designed for modern healthcare teams.
                    </p>

                    <div className="flex gap-8">
                        <div className="flex items-center gap-2 text-[#9CA3AF] text-[14px] font-medium">
                            <ShieldCheck className="h-5 w-5 text-[#4ADE80]" /> HIPAA Compliant
                        </div>
                        <div className="flex items-center gap-2 text-[#9CA3AF] text-[14px] font-medium">
                            <Lock className="h-5 w-5 text-[#4ADE80]" /> 256-bit Encryption
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-30">
                <Loginform />
            </div>
        </div>
    </>
}






