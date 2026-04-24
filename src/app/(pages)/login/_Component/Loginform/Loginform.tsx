
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useParams, useRouter, useSearchParams } from "next/navigation"
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
import { ShieldCheck, Lock, Mail, Eye, HelpCircle, PlusSquare, Loader } from "lucide-react"
import { signIn } from "next-auth/react"
import { use, useState } from "react"
export default function LoginForm() {
    const [isLoading, Setisloading] = useState<boolean>(false)
    let searchParams = useSearchParams()
    const router = useRouter()
    const form = useForm({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        Setisloading(true)
        const response = await signIn(
            'credentials', {
            callbackUrl: '/',
            redirect: true,
            email: values.email,
            password: values.password
        }
        )
        Setisloading(false)
        // console.log(response)

    }
    return <>
        <div className="w-full max-w-100 mx-auto lg:mx-0">
            <h2 className="text-[30px] font-bold tracking-tight text-white mb-2">
                Welcome back, Doctor
            </h2>
            <p className="text-[16px] text-[#94A3B8] mb-10">
                Please enter your credentials to access the dashboard.
            </p>

            <Form {...form}>
                {searchParams.get('error') ?
                    <h1 className="text-destructive text-2xl text-center py-3">{searchParams.get('error')}</h1> : ''

                }
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
                        disabled={isLoading}
                        type="submit"
                        className="w-full h-12 bg-[#2B6CEE] hover:bg-[#2B6CEE]/90 text-white font-bold text-[16px] rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
                    >{isLoading && <Loader className="animate-spin" />}
                        Login
                    </Button>
                </form>
            </Form>
        </div>

    </>
}