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
import { Mail, ChevronLeft, ShieldCheck } from "lucide-react"
import { forgotPasswordSchema } from "@/schema/forgotPasswordSchema"

export default function ForgotPassword() {
    const router = useRouter()
    const form = useForm({
        defaultValues: { email: "" },
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
        console.log(values);
        router.push("/verification");
    };

    return (
        <div className="relative w-full min-h-screen bg-[#101622] flex items-center justify-center p-4">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />

            <header className="absolute w-full h-16 top-0 left-0 bg-[#111722] flex items-center px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2B6CEE] rounded flex items-center justify-center">
                        <ShieldCheck className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">MediManage</span>
                </div>

                <div className="ml-auto flex items-center gap-6">
                    <span className="hidden md:block text-sm font-medium text-[#94A3B8]">Help Center</span>
                    <div className="hidden md:block w-px h-6 bg-[#232F48]" />
                    <button onClick={() => router.push("/login")} className="text-sm font-bold text-[#2B6CEE]">
                        Sign In
                    </button>
                </div>
            </header>

            <div className="w-full max-w-md mt-12">

                <button
                    onClick={() => router.push("/login")}
                    className="flex items-center text-[#94A3B8] mb-6 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="ml-2 text-sm font-medium">Back to Sign In</span>
                </button>
                <div className="bg-[#192233] border border-[#232F48] rounded-xl shadow-2xl overflow-hidden flex flex-col min-h-137.5">
                    <div className="p-8 md:p-10 flex-1">

                        <div className="mx-auto w-14 h-14 bg-[#2B6CEE]/10 rounded-full flex items-center justify-center mb-6">
                            <Mail className="text-[#2B6CEE] w-7 h-7" />
                        </div>

                        <h1 className="text-2xl font-bold text-white text-center mb-3">Forgot Password?</h1>
                        <p className="text-sm leading-relaxed text-[#94A3B8] text-center mb-8 px-2">
                            Enter the email address associated with your doctor account and we'll send you a link to reset your password.
                        </p>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-white">Email Address</FormLabel>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-5 h-5" />
                                                <FormControl>
                                                    <Input
                                                        placeholder="doctor@clinic.com"
                                                        className="h-12 pl-11 bg-[#111722] border-[#324467] rounded-lg text-white placeholder:text-[#64748B] focus:border-[#2B6CEE] ring-0"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage className="text-red-400 text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full h-12 bg-[#2B6CEE] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-lg">
                                    Send Reset Link
                                </Button>
                            </form>
                        </Form>
                        <div className="relative flex items-center justify-center my-10">
                            <div className="w-full border-t border-[#232F48]" />
                            <span className="absolute bg-[#192233] px-3 text-[10px] font-bold text-[#64748B] tracking-widest uppercase">Or</span>
                        </div>
                        <div className="text-center">
                            <span className="text-sm text-[#94A3B8]">Don't have an account? </span>
                            <button className="text-sm font-semibold text-[#2B6CEE] ml-1 hover:underline">Contact Admin</button>
                        </div>
                    </div>
                    <div className="mt-auto h-12 bg-[#111722]/50 border-t border-[#232F48] flex items-center justify-center gap-2">
                        <ShieldCheck className="text-[#94A3B8] w-4 h-4" />
                        <span className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-wider">Secured by MediManage</span>
                    </div>
                </div>
            </div>
        </div>
    )
}





