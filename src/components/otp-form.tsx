"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ShieldCheck, HelpCircle, CheckCircle2, Lock } from "lucide-react"

export function OTPForm() {
    const router = useRouter()
    const [value, setValue] = React.useState("")
    const [timeLeft, setTimeLeft] = React.useState(30)

    React.useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault()
        if (value.length === 6) {
            router.push("/reset-password")
        }
    }

    return (
        <div className="relative w-full min-h-screen bg-[#101622] overflow-hidden flex items-center justify-center p-4">
            <div className="absolute w-1/2 h-1/2 -left-20 -top-20 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute w-1/3 h-1/3 right-20 top-40 bg-blue-400/10 blur-[80px] rounded-full pointer-events-none" />

            <header className="absolute w-full h-20 top-0 left-0 flex items-center px-12 z-20 justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2B6CEE] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <ShieldCheck className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">
                        MediCore
                    </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer transition-colors">
                    <HelpCircle size={18} />
                    <span className="text-sm font-medium">Need Help?</span>
                </div>
            </header>

            <main className="relative w-full max-w-md bg-[#1E2736] border border-slate-800 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col pt-10 pb-0 px-0">

                <div className="mx-auto w-16 h-16 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                    <Lock className="text-[#2B6CEE] w-8 h-8" />
                </div>

                <div className="text-center px-10 space-y-4 mb-8">
                    <h1 className="text-2xl font-bold text-white">
                        Verify Identity
                    </h1>
                    <p className="text-sm leading-relaxed text-slate-400">
                        For your security, we&apos;ve sent a 6-digit code to your registered email ending in <span className="text-white font-medium">...89</span>
                    </p>
                </div>
                <form onSubmit={handleVerify} className="px-10 flex flex-col mb-12">
                    <div className="flex justify-center mb-8">
                        <InputOTP
                            maxLength={6}
                            value={value}
                            onChange={(val) => setValue(val)}
                        >
                            <InputOTPGroup className="gap-3">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <InputOTPSlot
                                        key={index}
                                        index={index}
                                        className="w-12 h-14 bg-[#111722] text-white text-xl font-bold border-t border-x border-b-2 border-slate-600 rounded-md focus:border-[#2B6CEE] focus:ring-0 transition-all"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <Button
                        type="submit"
                        disabled={value.length !== 6}
                        className="w-full h-12 bg-[#2B6CEE] hover:bg-blue-600 text-white font-bold text-base rounded-lg shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
                    >
                        Confirm Identity
                    </Button>

                    <div className="mt-4 flex justify-between items-center px-1">
                        <span className="text-sm text-slate-400">Didn&apos;t receive code?</span>
                        <button
                            type="button"
                            className="text-sm font-semibold text-[#2B6CEE] hover:text-blue-400 transition-colors"
                        >
                            Resend in 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                        </button>
                    </div>
                </form>
                <div className="relative w-full h-14 bg-[#1E293B]/50 border-t border-slate-800 flex items-center justify-center gap-2 mt-auto">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#2B6CEE]" />
                    <CheckCircle2 className="text-green-500 w-4 h-4" />
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Secure 256-bit Encryption</span>
                </div>
            </main>
            <footer className="absolute bottom-6 w-full text-center text-xs text-slate-500">
                2024 MediCore Systems. All rights reserved.
            </footer>
        </div>
    )
}


