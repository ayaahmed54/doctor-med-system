"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"

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

import { Lock, ShieldCheck, Loader2, KeyRound, Eye, EyeOff } from "lucide-react"

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[0-9]/, "Must include number"),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
})

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState("")

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  })

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (!token) {
      setServerError("Invalid or missing reset token.")
      return
    }

    setIsLoading(true)
    setServerError("")

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/users/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: values.password }),
          signal: controller.signal,
        }
      )

      clearTimeout(timeout)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      alert("Password updated successfully!")

      router.push("/login")
    } catch (error: any) {
      if (error.name === "AbortError") {
        setServerError("Request timeout. Try again.")
      } else {
        setServerError(error.message || "Connection error")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-[#101622] flex items-center justify-center p-4">

      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />

      <header className="absolute w-full h-16 top-0 left-0 bg-[#111722] flex items-center px-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2B6CEE] rounded flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">MediManage</span>
        </div>
      </header>

      <div className="w-full max-w-md mt-12">
        <div className="bg-[#192233] border border-[#232F48] rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="p-8 md:p-10">

            <div className="mx-auto w-14 h-14 bg-[#2B6CEE]/10 rounded-full flex items-center justify-center mb-6">
              <KeyRound className="text-[#2B6CEE] w-7 h-7" />
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-3">
              Set New Password
            </h1>

            <p className="text-sm leading-relaxed text-[#94A3B8] text-center mb-8 px-2">
              Your identity has been verified. Please choose a strong new password for your account.
            </p>
            \
            {serverError && (
              <p className="text-red-400 text-sm text-center mb-4">
                {serverError}
              </p>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        New Password
                      </FormLabel>

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-5 h-5" />

                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            disabled={isLoading}
                            placeholder="••••••••"
                            className="h-12 pl-11 pr-10 bg-[#111722] border-[#324467] rounded-lg text-white placeholder:text-[#64748B] focus:border-[#2B6CEE] ring-0"
                            {...field}
                          />
                        </FormControl>

                        <button
                          type="button"
                          aria-label="Toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        Confirm Password
                      </FormLabel>

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-5 h-5" />

                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            disabled={isLoading}
                            placeholder="••••••••"
                            className="h-12 pl-11 bg-[#111722] border-[#324467] rounded-lg text-white placeholder:text-[#64748B] focus:border-[#2B6CEE] ring-0"
                            {...field}
                          />
                        </FormControl>
                      </div>

                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#2B6CEE] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 mt-2"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isLoading ? "Updating..." : "Reset Password"}
                </Button>

              </form>
            </Form>
          </div>

          <div className="mt-auto h-12 bg-[#111722]/50 border-t border-[#232F48] flex items-center justify-center gap-2 text-[10px] text-[#475569] font-medium uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            Encrypted Security
          </div>
        </div>
      </div>
    </div>
  )
}



