"use client"

import React from "react"
import Image from "next/image"
import {
  ShieldAlert, RefreshCw, FileText, MapPin,
  Stethoscope, Calendar, Check, Clock, Info,
  LockKeyhole
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DoctorAcountStatus from "../../../assets/images/DoctorAcountStatus.jpg"
import NavDoctor from "@/components/nav_doctor/nav_doctor"

export default function AccountStatusPage() {
  return (
    <>
      <NavDoctor />
      <div className="min-h-screen bg-[#101622] text-white p-6 lg:p-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-8 space-y-12">
            <header className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Account Status</h1>
              <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
                Track the verification status of your medical credentials and manage your professional profile information.
              </p>
            </header>
            <section className="relative bg-[#192233] border border-[#232F48] rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row min-h-64">
              <div className="p-8 flex-1 z-20 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-900/30 rounded-full border border-amber-500/20">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">Pending Review</span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Verification In Progress</h2>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    Your medical license (MD-482910) is currently under review by our compliance team.
                    This process typically takes 24-48 hours.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-xl transition-all">
                    <RefreshCw className="mr-2 h-4 w-4" /> Refresh Status
                  </Button>
                  <Button variant="secondary" className="bg-slate-800 border-none hover:bg-slate-700 text-white h-11 px-6 rounded-xl">
                    Contact Support
                  </Button>
                </div>
              </div>
              <div className="relative w-full md:w-2/5 min-h-40 md:min-h-full">
                <Image src={DoctorAcountStatus} alt="Medical Background" fill className="object-cover opacity-50" />
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-lg font-bold">Submitted Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="relative bg-[#192233] border border-[#232F48] p-6 rounded-xl group hover:border-blue-500/50 transition-all">
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase block mb-2">License Number</span>
                  <span className="text-lg font-medium text-white">MD-482910</span>
                  <FileText className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 group-hover:text-blue-500" />
                </div>
                <div className="relative bg-[#192233] border border-[#232F48] p-6 rounded-xl group hover:border-blue-500/50 transition-all">
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase block mb-2">State of Issue</span>
                  <span className="text-lg font-medium text-white">California (CA)</span>
                  <MapPin className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 group-hover:text-blue-500" />
                </div>
                <div className="relative bg-[#192233] border border-[#232F48] p-6 rounded-xl group hover:border-blue-500/50 transition-all">
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase block mb-2">Specialty</span>
                  <span className="text-lg font-medium text-white">Cardiology</span>
                  <Stethoscope className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 group-hover:text-blue-500" />
                </div>
                <div className="relative bg-[#192233] border border-[#232F48] p-6 rounded-xl group hover:border-blue-500/50 transition-all">
                  <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase block mb-2">Years of Experience</span>
                  <span className="text-lg font-medium text-white">12+ Years</span>
                  <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5 group-hover:text-blue-500" />
                </div>
              </div>
            </section>
          </div>

          {/* */}
          <div className="lg:col-span-4 sticky top-12">
            <Card className="bg-[#192233] border-[#232F48] shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-lg font-bold text-white">Application Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-0 relative">
                  <div className="relative flex gap-4 pb-10">
                    <div className="absolute left-4 top-8 w-0.5 h-full bg-green-500/30" />
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-green-500/20">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-sm font-bold text-white">Registration Completed</h4>
                      <p className="text-xs mt-1 text-slate-400">Account created on Oct 24, 2023</p>
                    </div>
                  </div>
                  <div className="relative flex gap-4 pb-10">
                    <div className="absolute left-4 top-8 w-0.5 h-full bg-green-500/30" />
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-green-500/20">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-sm font-bold text-white">Documents Uploaded</h4>
                      <p className="text-xs mt-1 text-slate-400">Medical license & ID submitted</p>
                    </div>
                  </div>
                  <div className="relative flex gap-4 pb-10">
                    <div className="absolute left-4 top-8 w-0.5 h-full bg-slate-700" />
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-blue-600 shadow-lg shadow-blue-500/20">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-sm font-bold text-blue-500">Verification in Progress</h4>
                      <p className="text-xs mt-1 text-slate-400">Compliance team reviewing documents</p>
                    </div>
                  </div>
                  <div className="relative flex gap-4 pb-0">
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-slate-800 border-2 border-slate-700">
                      <LockKeyhole className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-sm font-bold text-slate-400">Account Activation</h4>
                      <p className="text-xs mt-1 text-slate-500">Final approval & access grant</p>
                    </div>
                  </div>

                </div>
                <div className="bg-blue-900/10 rounded-lg p-4 flex items-start gap-3 border border-blue-500/10">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Need to update your documents? You can re-upload them in the{' '}
                    <button className="text-blue-500 font-medium hover:underline">Settings</button>{' '}
                    page before the review is completed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}


