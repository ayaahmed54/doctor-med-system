"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import {
    User, Lock, Bell, Camera, Save, LogOut, Loader2

} from "lucide-react";
import Setting from "./_Components/settting/setting";

export default function SettingsPage() {

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans">
            <div className="max-w-5xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#0D121B] tracking-tight">Settings</h1>
                        <p className="text-[#64748B] text-sm mt-1">Manage your account preferences and security settings.</p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => signOut()}
                        className="text-[#EF4444] hover:bg-red-50 rounded-2xl px-6 font-semibold transition-all border border-transparent hover:border-red-100"
                    >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
                <Setting />

            </div>
        </div>
    );
}



