"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Bell, ChevronDown, Settings, LogOut, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DoctorNavbar() {
    return (
        <nav className="sticky top-0 z-50 w-full h-16 bg-white border-b border-[#E7EBF3] flex items-center justify-between px-6">

            <div className="flex-1 max-w-xl relative group hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] pointer-events-none" />
                <Input
                    type="search"
                    placeholder="Search patients, appointments, etc."
                    className="w-full h-9 pl-10 bg-[#F8F9FC] border-none rounded-lg text-sm placeholder:text-[#94A3B8] focus-visible:ring-1 focus-visible:ring-blue-500/20"
                />
            </div>

            <div className="flex items-center gap-3 ml-auto">

                <div className="relative">
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg hover:bg-slate-50 transition-colors">
                        <Bell className="w-6 h-6 text-[#475569]" />
                    </Button>
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EF4444] border-2 border-white rounded-full shadow-sm" />
                </div>

                <Separator orientation="vertical" className="h-8 w-px bg-[#E7EBF3] mx-1" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 px-1 py-1 rounded-full flex items-center gap-2 hover:bg-slate-50 transition-all outline-none">
                            <Avatar className="w-8 h-8 border border-slate-100">
                                <AvatarImage src="https://github.com" alt="Doctor" />
                                <AvatarFallback className="text-[10px] bg-slate-100 text-slate-500 font-bold">DR</AvatarFallback>
                            </Avatar>
                            <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 mt-2 bg-white border-[#E7EBF3] shadow-lg rounded-xl">
                        <DropdownMenuLabel className="font-normal p-4">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-bold text-[#0A1B39]">Dr. Sarah Chen</p>
                                <p className="text-xs text-slate-500">Cardiologist</p>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="bg-[#E7EBF3]" />

                        <DropdownMenuItem asChild>
                            <Link href="/Settings" className="flex items-center w-full cursor-pointer py-2.5 px-3 hover:bg-slate-50 transition-colors">
                                <Settings className="mr-2 h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">Settings</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-[#E7EBF3]" />

                        <DropdownMenuItem asChild>
                            <Link href="/login" className="flex items-center w-full cursor-pointer py-2.5 px-3 hover:bg-red-50  transition-colors">

                                <span className="text-sm font-bold">Log In</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}



