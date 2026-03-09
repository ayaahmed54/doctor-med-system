"use client"

import * as React from "react"
import Link from "next/link"
import { ShieldCheck, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function NavDoctor() {

    const NavItem = ({ href, label, active = false }: { href: string, label: string, active?: boolean }) => (
        <Link
            href={href}
            className={`text-sm font-medium transition-colors px-2 py-1 ${active ? 'text-white' : 'text-[#92A4C9] hover:text-white'
                }`}
        >
            {label}
        </Link>
    )

    const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
        <Link
            href={href}
            className="text-lg font-medium text-[#92A4C9] hover:text-white transition-colors"
        >
            {children}
        </Link>
    )

    return (
        <nav className="sticky top-0 z-50 w-full h-16 bg-[#192233] border-b border-[#232F48]">
            <div className="max-w-7xl mx-auto h-full px-4 md:px-28 flex items-center justify-between">

                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 bg-[#2B6CEE] rounded flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <ShieldCheck className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">
                        MedManage
                    </span>
                </div>
                <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 gap-8 lg:gap-10">
                    <NavItem href="/" label="Dashboard" active />
                    <NavItem href="/patients" label="Patients" />
                    <NavItem href="/appointments" label="Appointments" />
                    <NavItem href="/Settings" label="Settings" />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex flex-col items-end text-right">
                        <span className="text-sm font-medium text-white leading-none">
                            Dr. Sarah Chen
                        </span>
                        <span className="text-xs text-[#92A4C9] mt-1">
                            Cardiology
                        </span>
                    </div>

                    <Avatar className="h-10 w-10 border-2 border-[#232F48]">
                        <AvatarImage src="https://github.com" />
                        <AvatarFallback className="bg-[#232F48] text-white">SC</AvatarFallback>
                    </Avatar>

                    <div className="md:hidden ml-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-[#92A4C9] hover:bg-transparent">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-[#192233] border-[#232F48] text-white">
                                <div className="flex flex-col gap-6 mt-10">
                                    <MobileNavLink href="/">Dashboard</MobileNavLink>
                                    <MobileNavLink href="/patients">Patients</MobileNavLink>
                                    <MobileNavLink href="/appointments">Appointments</MobileNavLink>
                                    <MobileNavLink href="/Settings">Settings</MobileNavLink>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

            </div>
        </nav>
    )
}







