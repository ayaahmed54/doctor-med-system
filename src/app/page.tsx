"use client"
import { Activity, Calendar, ClipboardListIcon, Clock, LucideClipboardClock, LucideClipboardSignature, LucideUserCheck, MessageSquareDotIcon, Plus, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppointmentsTable from "@/components/AppointmentsTable/AppointmentsTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

export default function MedicalDashboard() {
  const { data: session } = useSession();

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const doctorName = session?.user?.name || "Doctor";
  return (
    <div className="min-h-screen w-full mx-auto bg-[#F8FAFC] m-0 p-0 overflow-x-hidden">

      <main className="w-full py-8 px-4 flex flex-col gap-8">

        <div className="w-full  max-w-244.5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 min-h-16]">
          <div className="flex flex-col gap-1">
            <h1 className="text-[30px] font-bold tracking-[-0.75px] text-[#0D121B] leading-tight">
              Good Morning, Dr. {doctorName}
            </h1>
            <p className="text-[16px] text-[#4C669A] leading-normal">
              Here is your daily overview for today, {today}.
            </p>
          </div>


        </div>

        <AppointmentsTable />
      </main>
    </div>
  );
}






