"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Activity,
    CalendarCheck,
    LayoutDashboard,
    MessageSquare,
    PlusSquare,
    Settings,
    UserIcon,
    Users,
    ClipboardListIcon
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

const items = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Appointments", url: "/appointments", icon: CalendarCheck },
    { title: "Patients", url: "/patients", icon: Users },
    { title: "Scan Analysis", url: "/scan-analysis", icon: Activity },
    { title: "Prescriptions", url: "/prescriptions", icon: ClipboardListIcon },
    { title: "Profile", url: "/profile", icon: UserIcon },
    { title: "Settings", url: "/Settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { data: session, status } = useSession()

    if (status === "loading" || status === "unauthenticated") {
        return null
    }

    const user = session?.user

    return (
        <Sidebar className="border-r border-[#E7EBF3] bg-white w-[256px]">

            <SidebarHeader className="p-0 bg-white">
                <div className="flex flex-row items-center p-6 gap-3 w-full h-23">
                    <div className="flex justify-center items-center w-[44px] h-[44px] bg-[#F0F4FF] rounded-[12px] flex-none">
                        <PlusSquare className="w-[24px] h-[24px] text-[#2B6CEE]" />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="font-bold text-[16px] leading-[20px] text-[#0D121B]">
                            Medical Plus
                        </h1>
                        <p className="font-medium text-[12px] leading-[16px] text-[#4C669A]">
                            Management System
                        </p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-4 py-2 bg-white">
                <SidebarGroup className="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {items.map((item) => {
                                const isActive = pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`
                                                flex flex-row items-center px-3 py-2 gap-3 w-full h-12 rounded-2xl transition-all duration-200 group
                                                ${isActive
                                                    ? "bg-[#F0F4FF] text-[#2B6CEE]"
                                                    : "bg-transparent text-[#4C669A] hover:bg-[#F8F9FC] hover:text-[#0D121B]"}
                                            `}
                                        >
                                            <Link href={item.url} className="flex items-center w-full">

                                                <div className="w-6 flex items-center justify-center">
                                                    <item.icon
                                                        className={`w-5 h-5 transition-colors ${isActive ? "text-[#2B6CEE]" : "text-[#4C669A] group-hover:text-[#2B6CEE]"
                                                            }`}
                                                    />
                                                </div>
                                                <span className={`
                                                    font-medium text-[14px] transition-colors
                                                    ${isActive ? "text-[#2B6CEE] font-bold" : "text-[#4C669A] group-hover:text-[#0D121B]"}
                                                `}>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}


