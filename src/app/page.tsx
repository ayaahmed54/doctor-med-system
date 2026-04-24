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

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex items-center justify-center px-6 py-2 bg-[#2B6CEE] hover:bg-[#2B6CEE]/90 rounded-2xl shadow-[0_1px_2px_rgba(43,108,238,0.3)] border-none h-10 min-w-fit"
              >
                <Plus className="w-5 h-5 text-white mr-2" />
                <span className="text-[14px] font-medium text-white whitespace-nowrap">
                  Create Appointment
                </span>
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90%] sm:max-w-125 bg-white rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
              <DialogHeader className="p-6 pb-2 bg-[#F8F9FC]">
                <DialogTitle className="text-xl md:text-2xl font-bold text-[#0D121B] tracking-tight">
                  Book Appointment
                </DialogTitle>
                <p className="text-[#64748B] text-sm">Fill in the patient visit details</p>
              </DialogHeader>

              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                    <User size={14} className="text-[#2B6CEE]" /> Patient Name
                  </label>
                  <input
                    className="w-full h-11 border border-[#E7EBF3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2B6CEE] transition-all bg-gray-50/30"
                    placeholder="e.g. Aya Ahmed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                      <Calendar size={14} className="text-[#2B6CEE]" /> Date
                    </label>
                    <input
                      type="date"
                      className="w-full h-11 border border-[#E7EBF3] rounded-xl p-3 text-sm focus:outline-none focus:border-[#2B6CEE] bg-gray-50/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                      <Clock size={14} className="text-[#2B6CEE]" /> Time Slot
                    </label>
                    <select className="w-full h-11 border border-[#E7EBF3] rounded-xl px-3 text-sm focus:outline-none focus:border-[#2B6CEE] bg-white cursor-pointer">
                      <option>09:00 AM</option>
                      <option>10:30 AM</option>
                      <option>01:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-bold text-[#334155] flex items-center gap-2">
                    <Activity size={14} className="text-[#2B6CEE]" /> Appointment Type
                  </label>
                  <select className="w-full h-11 border border-[#E7EBF3] rounded-xl px-3 text-sm focus:outline-none focus:border-[#2B6CEE] bg-white cursor-pointer">
                    <option>Routine Checkup</option>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                  </select>
                </div>
                <div className="pt-2 flex flex-col md:flex-row gap-3">
                  <DialogTrigger asChild>
                    <button className="flex-1 h-11 rounded-xl border border-[#E7EBF3] text-[#64748B] font-bold text-sm hover:bg-gray-50 transition-all">
                      Cancel
                    </button>
                  </DialogTrigger>
                  <button className="flex-2 h-11 bg-[#2B6CEE] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#1e56cc] transition-all">
                    Confirm Booking
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <AppointmentsTable />
      </main>
    </div>
  );
}






