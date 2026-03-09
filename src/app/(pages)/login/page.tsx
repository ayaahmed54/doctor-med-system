"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/schema/login.schema"
import { ShieldCheck, Lock, Mail, Eye, HelpCircle, PlusSquare } from "lucide-react"

export default function Login() {
    const router = useRouter()
    const form = useForm({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(loginSchema),
    });

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
        router.push("/")
    }

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
                <div className="w-full max-w-100 mx-auto lg:mx-0">
                    <h2 className="text-[30px] font-bold tracking-tight text-white mb-2">
                        Welcome back, Doctor
                    </h2>
                    <p className="text-[16px] text-[#94A3B8] mb-10">
                        Please enter your credentials to access the dashboard.
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-[14px] font-medium text-[#E2E8F0]">Email or Medical ID</FormLabel>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B]" />
                                            <FormControl>
                                                <Input
                                                    placeholder="dr.name@hospital.com"
                                                    className="h-12 bg-[#192233] border-[#324467] rounded-lg pl-11 text-white placeholder:text-[#64748B] focus-visible:ring-1 focus-visible:ring-[#2B6CEE] transition-all"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-[12px] text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <FormLabel className="text-[14px] font-medium text-[#E2E8F0]">Password</FormLabel>
                                            <button
                                                type="button"
                                                className="text-[14px] font-semibold text-[#2B6CEE] hover:text-[#2B6CEE]/80 transition-colors"
                                                onClick={() => router.push("/forgot-password")}
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B]" />
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="h-12 bg-[#192233] border-[#324467] rounded-lg pl-11 pr-11 text-white placeholder:text-[#64748B] focus-visible:ring-1 focus-visible:ring-[#2B6CEE] transition-all"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B] cursor-pointer hover:text-white transition-colors" />
                                        </div>
                                        <FormMessage className="text-[12px] text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 rounded border-[#324467] bg-[#192233] text-[#2B6CEE] focus:ring-offset-0 focus:ring-[#2B6CEE] checked:bg-[#2B6CEE]"
                                />
                                <label htmlFor="remember" className="text-[14px] text-[#94A3B8] font-medium cursor-pointer select-none">
                                    Remember me on this device
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-[#2B6CEE] hover:bg-[#2B6CEE]/90 text-white font-bold text-[16px] rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
                            >
                                Login
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    </>
}






