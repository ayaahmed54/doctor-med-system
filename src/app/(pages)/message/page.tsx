"use client"

import {
    Search, Plus, Phone, Video, MoreVertical,
    FileIcon, Paperclip, Send, Smile, CheckCheck,
    SendHorizontal,
    SquarePen,
    ChevronLeft
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function Chat() {
    const chats = [
        { id: 1, name: "Sarah Connor", message: "Are the side effects normal...", time: "Now", status: "online", unread: 0, active: true },
        { id: 2, name: "John Doe", message: "Thanks for the update, Doctor.", time: "2h ago", status: "offline", unread: 2, active: false },
        { id: 3, name: "Emily Blunt", message: "I have attached the lab results.", time: "Yesterday", status: "none", unread: 0, active: false },
    ];
    const [showChat, setShowChat] = useState(false);

    return <>
        <div className="flex h-screen w-full bg-white overflow-hidden relative">
            <div className={`
                ${showChat ? 'hidden' : 'flex'} 
                md:flex w-full md:w-87.5 lg:w-[384px] flex-col border-r border-[#E7EBF3] shrink-0
            `}>
                <div className="p-4 md:p-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#0D121B]">Messages</h2>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                        <SquarePen className="w-5 h-5 text-[#2B6CEE]" />
                    </Button>
                </div>

                <div className="px-4 md:px-6 mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4C669A] w-4 h-4" />
                        <Input
                            placeholder="Search chats..."
                            className="bg-white border-[#E7EBF3] pl-10 focus-visible:ring-0 focus-visible:border-[#2B6CEE]"
                        />
                    </div>
                </div>

                <Tabs defaultValue="all" className="px-4 md:px-6 mb-2">
                    <TabsList className="bg-transparent border-b border-[#F8F9FC] rounded-none w-full justify-start h-auto p-0 gap-4 md:gap-8 overflow-x-auto">
                        <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent bg-transparent p-0 pb-3 data-[state=active]:border-[#2B6CEE] data-[state=active]:text-[#2B6CEE] text-[#4C669A] font-medium transition-all shadow-none">
                            All
                        </TabsTrigger>
                        <TabsTrigger value="unread" className="rounded-none border-b-2 border-transparent bg-transparent p-0 pb-3 data-[state=active]:border-[#2B6CEE] data-[state=active]:text-[#2B6CEE] text-[#4C669A] font-medium transition-all shadow-none">
                            Unread
                        </TabsTrigger>
                        <TabsTrigger value="Archived" className="rounded-none border-b-2 border-transparent bg-transparent p-0 pb-3 data-[state=active]:text-[#2B6CEE] text-[#4C669A] font-medium transition-all shadow-none">
                            Archived
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <ScrollArea className="flex-1 px-2">
                    <div className="space-y-1 mt-2">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setShowChat(true)}
                                className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${chat.active ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                            >
                                <div className="relative shrink-0">
                                    <Avatar className="w-12 h-12 border border-gray-100">
                                        <AvatarFallback className="bg-gray-100 text-gray-400">{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    {chat.status === 'online' && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500" />}
                                </div>
                                <div className="ml-3 flex-1 overflow-hidden">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <span className="text-sm font-semibold text-[#0D121B]">{chat.name}</span>
                                        <span className={`text-[12px] ${chat.active ? 'text-[#2B6CEE]' : 'text-[#4C669A]'}`}>{chat.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[12px] text-[#4C669A] truncate pr-2">{chat.message}</p>
                                        {chat.unread > 0 && <Badge className="bg-[#2B6CEE] text-white text-[10px] min-w-4.5 h-4.5 p-0 flex items-center justify-center rounded-full border-none">{chat.unread}</Badge>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            <div className={`
                ${showChat ? 'flex' : 'hidden'} 
                md:flex flex-1 flex-col bg-[#F8F9FC] relative h-full
            `}>
                <header className="h-16 md:h-19 bg-white border-b border-[#E7EBF3] flex items-center justify-between px-4 md:px-8 shrink-0">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost" size="icon"
                            className="md:hidden -ml-2"
                            onClick={() => setShowChat(false)}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>

                        <Avatar className="w-8 h-8 md:w-10 md:h-10 border border-gray-100">
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                            <h3 className="text-[14px] md:text-[15px] font-bold text-[#0D121B] truncate">Sarah Connor</h3>
                            <p className="text-[10px] md:text-[12px] font-medium text-[#2B6CEE] truncate">Online | ID: #88392</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-0 md:gap-1">
                        <Button variant="ghost" size="icon" className="text-[#4C669A] w-9 h-9"><Phone size={18} /></Button>
                        <Button variant="ghost" size="icon" className="text-[#4C669A] w-9 h-9"><Video size={18} /></Button>
                        <div className="hidden sm:block w-px h-6 bg-[#E7EBF3] mx-2" />
                        <Button variant="ghost" size="icon" className="text-[#4C669A] w-9 h-9"><MoreVertical size={18} /></Button>
                    </div>
                </header>

                <ScrollArea className="flex-1 p-4 md:p-8 pb-24 md:pb-28">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="flex justify-center text-[12px] text-[#4C669A] font-medium">Today, March 24</div>
                    </div>
                </ScrollArea>

                <footer className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E7EBF3] p-3 md:p-4 shrink-0">
                    <div className="flex items-center w-full gap-2 md:gap-3 max-w-5xl mx-auto">
                        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full text-[#4C669A] shrink-0 hover:bg-[#F6F6F8]">
                            <Plus className="w-5 h-5 md:w-6 md:h-6" />
                        </Button>
                        <div className="flex-1 flex items-center min-h-11 bg-[#F6F6F8] rounded-2xl md:rounded-3xl px-2 py-1 gap-1">
                            <Button variant="ghost" size="icon" className="hidden xs:flex w-8 h-8 rounded-full text-[#4C669A] shrink-0">
                                <Smile className="w-5 h-5" />
                            </Button>

                            <Textarea
                                placeholder="Message..."
                                className="min-h-9 h-9 bg-transparent border-none focus-visible:ring-0 resize-none py-2 px-2 text-[14px] shadow-none"
                            />

                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full text-[#4C669A] shrink-0">
                                <Paperclip className="w-5 h-5" />
                            </Button>
                        </div>
                        <Button
                            size="icon"
                            className="w-10 h-10 bg-[#2B6CEE] hover:bg-[#2B6CEE]/90 rounded-full shadow-lg shrink-0"
                        >
                            <SendHorizontal className="w-5 h-5 text-white" />
                        </Button>
                    </div>
                </footer>
            </div>
        </div>



    </>;
};






