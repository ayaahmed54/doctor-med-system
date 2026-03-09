import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
    User,
    Lock,
    Bell,
    Globe,
    Camera,
    Save,
    ShieldCheck,
    Mail,
    LogOut
} from "lucide-react";

export default function setting() {
    return <>
        <div className="min-h-screen bg-[#F6F6F8] p-8  ">
            <div className="mb-8 flex justify-between items-end">
                <div className="ml-2">
                    <h1 className="text-[30px] font-bold text-[#0D121B] tracking-tight">Settings</h1>
                    <p className="text-[14px] text-[#4C669A] mt-1">Manage your account and customize your medical system preferences</p>
                </div>
                <Button variant="ghost" className="text-[#EF4444] hover:bg-red-50 hover:text-[#DC2626] rounded-xl px-6 gap-2 font-bold transition-all">
                    <LogOut className="w-5 h-5" /> Logout
                </Button>
            </div>

            <Tabs defaultValue="profile" className="w-full max-w-5xl">
                <TabsList className="bg-white border border-[#E7EBF3] p-1 h-auto mb-8 rounded-2xl shadow-sm">
                    <TabsTrigger value="profile" className="flex gap-2 px-6 py-2.5 rounded-xl data-[state=active]:bg-[#135BEC] data-[state=active]:text-white">
                        <User className="w-4 h-4" /> Profile
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex gap-2 px-6 py-2.5 rounded-xl data-[state=active]:bg-[#135BEC] data-[state=active]:text-white">
                        <Bell className="w-4 h-4" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex gap-2 px-6 py-2.5 rounded-xl data-[state=active]:bg-[#135BEC] data-[state=active]:text-white">
                        <Lock className="w-4 h-4" /> Security
                    </TabsTrigger>

                </TabsList>
                <TabsContent value="profile">
                    <Card className="border-[#E7EBF3] shadow-sm rounded-[24px] overflow-hidden">
                        <CardHeader className="border-b border-[#F8F9FC] p-8">
                            <CardTitle className="text-xl font-bold text-[#0D121B]">Account Information</CardTitle>
                            <CardDescription>Update your personal information and profile picture</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row gap-12">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full bg-[#EFF6FF] border-2 border-dashed border-[#DBEAFE] flex items-center justify-center overflow-hidden">
                                            <span className="text-3xl font-bold text-[#135BEC]">DR</span>
                                        </div>
                                        <Button size="icon" className="absolute bottom-0 right-0 rounded-full w-10 h-10 bg-[#135BEC] hover:bg-[#0e48bd] border-4 border-white">
                                            <Camera className="w-4 h-4 text-white" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-[#4C669A] text-center font-medium leading-relaxed">
                                        JPG or PNG<br />Max 5MB
                                    </p>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[#0D121B] font-bold">Full Name</Label>
                                        <Input className="rounded-xl border-[#E7EBF3] focus:ring-[#135BEC]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[#0D121B] font-bold">Email Address</Label>
                                        <Input className="rounded-xl border-[#E7EBF3]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[#0D121B] font-bold">Phone Number</Label>
                                        <Input className="rounded-xl border-[#E7EBF3]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[#0D121B] font-bold">Medical Specialty</Label>
                                        <Input className="rounded-xl border-[#E7EBF3]" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-[#F8F9FC]">
                                <Button variant="outline" className="rounded-xl px-8 h-12">Cancel</Button>
                                <Button className="bg-[#135BEC] hover:bg-[#0e48bd] rounded-xl px-8 h-12 gap-2">
                                    <Save className="w-4 h-4" /> Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card className="border-[#E7EBF3] shadow-sm rounded-[24px]">
                        <CardHeader className="p-8 border-b">
                            <CardTitle className="text-xl font-bold text-[#0D121B]">Notification Preferences</CardTitle>
                            <CardDescription>Choose how you want to receive medical updates and reports</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-2xl">
                                <div>
                                    <h4 className="font-bold text-[#0D121B]">AI Analysis Reports</h4>
                                    <p className="text-sm text-[#4C669A]">Notify me immediately when scan analysis is complete</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-[#135BEC]" />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-2xl">
                                <div>
                                    <h4 className="font-bold text-[#0D121B]">New Appointments</h4>
                                    <p className="text-sm text-[#4C669A]">Alert me when a patient schedules a new appointment</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-[#135BEC]" />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-2xl">
                                <div>
                                    <h4 className="font-bold text-[#0D121B]">Email Digests</h4>
                                    <p className="text-sm text-[#4C669A]">Send a daily summary of all medical operations</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-[#135BEC]" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="border-[#E7EBF3] shadow-sm rounded-[24px]">
                        <CardHeader className="p-8 border-b">
                            <CardTitle className="text-xl font-bold text-[#0D121B]">Password & Security</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[#0D121B] font-bold">Current Password</Label>
                                    <Input type="password" placeholder="••••••••" className="rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[#0D121B] font-bold">New Password</Label>
                                    <Input type="password" placeholder="••••••••" className="rounded-xl" />
                                </div>
                            </div>

                            <div className="bg-[#EFF6FF] border border-[#DBEAFE] p-4 rounded-2xl flex items-center gap-4">
                                <ShieldCheck className="w-6 h-6 text-[#135BEC]" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-[#135BEC] text-sm">Two-Factor Authentication (2FA)</h4>
                                    <p className="text-[12px] text-[#4C669A]">Increase account security by adding an extra verification step via mobile</p>
                                </div>
                                <Button variant="link" className="text-[#135BEC] font-bold">Enable Now</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    </>
}



