
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    CheckCircle2, Clock, Edit2, Mail, Phone,
    Share2, Star, MapPin, DollarSign, Calendar,
    Trophy,
    ActivitySquareIcon,
    PlusSquare,
    GraduationCap
} from 'lucide-react'
import Link from 'next/link'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

interface Doctor {
    _id: string
    displayName: string
    phone: string
    specialty: string
    yearsOfExperience: number
    price: number
    schedule: string[]
    gender: string
    description: string
    isActive: boolean
    workingHours: { start: string; end: string }
    user: { _id: string; name: string; email: string }
}


async function getDoctorData(): Promise<Doctor | null> {
    try {
        const session = await getServerSession(authOptions)

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/doctors/me`, {
            next: { revalidate: 300 },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.token}`,
            }
        })

        const data = await response.json()
        if (!response.ok) return null
        return data.data.doctor
    } catch (error) {
        console.error('Error fetching doctor data:', error)
        return null
    }
}

function formatSpecialty(specialty: string): string {
    return specialty.charAt(0).toUpperCase() + specialty.slice(1)
}

function formatSchedule(schedule: string[]): string {
    const dayMap: Record<string, string> = {
        sunday: 'Sun', monday: 'Mon', tuesday: 'Tue',
        wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat',
    }
    return schedule.map(d => dayMap[d] || d).join(', ')
}

export default async function Profile() {
    const doctor = await getDoctorData()

    if (!doctor) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
                <p className="text-[#4C669A]">Failed to load profile data</p>
            </div>
        )
    }

    const CONTACT_DATA = [
        { id: 1, icon: <Mail size={15} />, label: 'EMAIL', value: doctor.user.email },
        { id: 2, icon: <Phone size={15} />, label: 'PHONE', value: doctor.phone },
        { id: 3, icon: <DollarSign size={15} />, label: 'CONSULTATION FEE', value: `${doctor.price} EGP` },
        { id: 4, icon: <Calendar size={15} />, label: 'WORKING DAYS', value: formatSchedule(doctor.schedule) },
    ]

    const STATS = [
        {
            id: 1,
            icon: <Star size={20} className="text-[#2B6CEE]" />,
            value: `${doctor.yearsOfExperience}+`,
            label: 'Years experience',
        },
        {
            id: 2,
            icon: <DollarSign size={20} className="text-[#2B6CEE]" />,
            value: `${doctor.price} EGP`,
            label: 'Consultation fee',
        },
        {
            id: 3,
            icon: <CheckCircle2 size={20} className={doctor.isActive ? 'text-[#22C55E]' : 'text-[#94A3B8]'} />,
            value: doctor.isActive ? 'Active' : 'Inactive',
            label: 'Account status',
            valueClass: doctor.isActive ? 'text-[#16A34A]' : 'text-[#94A3B8]',
        },
    ]

    return (
        <div className="min-h-screen w-full bg-[#F8FAFC]">
            <div className="w-full max-w-[1100px] mx-auto p-4 md:p-6 flex flex-col gap-6">

                {/* ── Hero Card ── */}
                <Card className="bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl p-6">
                    <CardContent className="p-0 flex flex-wrap items-start gap-5">

                        <div className="relative shrink-0">
                            <div className="w-[88px] h-[88px] rounded-full bg-[#EFF6FF] border-[3px] border-white shadow-[0_0_0_1px_#E7EBF3] flex items-center justify-center">
                                <span className="text-[28px] font-medium text-[#2B6CEE]">
                                    {doctor.displayName.charAt(0)}
                                </span>
                            </div>
                            {doctor.isActive && (
                                <div className="absolute bottom-1 right-1 w-[14px] h-[14px] bg-[#22C55E] border-[3px] border-white rounded-full" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-[200px]">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-[20px] font-medium text-[#0D121B] leading-7">
                                        {doctor.displayName}
                                    </h2>
                                    <p className="text-[14px] text-[#2B6CEE] mt-0.5">
                                        {formatSpecialty(doctor.specialty)}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link href="/Settings">
                                        <button className="h-9 px-3.5 flex items-center gap-1.5 rounded-xl border border-[#E7EBF3] text-[13px] font-medium text-[#0D121B] hover:bg-[#F8FAFC] transition-colors">
                                            <Edit2 size={14} />
                                            Edit profile
                                        </button>
                                    </Link>
                                    <button className="h-9 px-3.5 flex items-center gap-1.5 rounded-xl bg-[#2B6CEE] text-[13px] font-medium text-white hover:bg-[#1e56c9] transition-colors">
                                        <Share2 size={14} />
                                        Share
                                    </button>
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="flex flex-wrap gap-4 mt-3">
                                <span className="flex items-center gap-1.5 text-[13px] text-[#4C669A]">
                                    <Clock size={14} />
                                    {doctor.workingHours.start} – {doctor.workingHours.end}
                                </span>
                                <span className="flex items-center gap-1.5 text-[13px] text-[#4C669A] capitalize">
                                    <MapPin size={14} />
                                    {doctor.gender}
                                </span>
                                {doctor.isActive && (
                                    <span className="flex items-center gap-1.5 text-[13px] text-[#16A34A] font-medium">
                                        <CheckCircle2 size={14} />
                                        Available for consult
                                    </span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Stats ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {STATS.map((stat) => (
                        <div
                            key={stat.id}
                            className="bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl p-5 flex items-center gap-3"
                        >
                            <div className="w-11 h-11 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                                {stat.icon}
                            </div>
                            <div>
                                <p className={`text-[20px] font-medium ${stat.valueClass ?? 'text-[#0D121B]'}`}>
                                    {stat.value}
                                </p>
                                <p className="text-[12px] text-[#4C669A] mt-0.5">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Bottom Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">

                    {/* Left column */}
                    <div className="flex flex-col gap-5">

                        {/* Contact Information */}
                        <Card className="bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl">
                            <CardHeader className="p-6 pb-3">
                                <CardTitle className="text-[15px] font-medium text-[#0D121B]">
                                    Contact information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                {CONTACT_DATA.map((item, i) => (
                                    <div key={item.id}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] flex items-center justify-center text-[#4C669A] shrink-0">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-[#4C669A] uppercase tracking-[0.4px]">
                                                    {item.label}
                                                </p>
                                                <p className="text-[13px] text-[#0D121B] mt-0.5">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                        {i < CONTACT_DATA.length - 1 && (
                                            <div className="mt-4 h-px bg-[#F1F5F9]" />
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Specialty */}
                        <Card className="bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl">
                            <CardHeader className="p-6 pb-3">
                                <CardTitle className="text-[15px] font-medium text-[#0D121B]">Specialty</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <span className="inline-flex px-3.5 py-1.5 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full text-[13px] font-medium text-[#2B6CEE]">
                                    {formatSpecialty(doctor.specialty)}
                                </span>
                            </CardContent>
                        </Card>

                        {/* Working Schedule */}
                        <Card className="bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl">
                            <CardHeader className="p-6 pb-3">
                                <CardTitle className="text-[15px] font-medium text-[#0D121B]">Working schedule</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 flex flex-wrap gap-2">
                                {doctor.schedule.map((day, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex px-3.5 py-1.5 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full text-[13px] font-medium text-[#2B6CEE] capitalize"
                                    >
                                        {day}
                                    </span>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* About Me */}
                    <div>
                        <Card className="bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl self-start">
                            <CardContent className="p-6">
                                <h3 className="text-[15px] font-medium text-[#0D121B] mb-4">About me</h3>
                                <p className="text-[14px] text-[#4C669A] leading-7">{doctor.description}</p>
                            </CardContent>

                        </Card>
                        <div className="w-full">
                            <Card className="min-h-112.5 mt-5 bg-white border-[#E7EBF3] shadow-sm rounded-2xl flex flex-col">
                                <CardHeader className="p-6 pb-2 flex flex-row items-center justify-between">
                                    <CardTitle className="font-bold text-[18px] text-[#0D121B]">
                                        Education & Experience
                                    </CardTitle>
                                    <button className="text-[#2B6CEE] text-[14px] hover:underline">
                                        Download CV
                                    </button>
                                </CardHeader>

                                <CardContent className="p-6 pt-4 relative">
                                    <div className="absolute left-10 top-10 bottom-10 w-[0.5px] bg-[#E5E7EB]" />

                                    <div className="space-y-10">
                                        <div className="relative pl-12">
                                            <div className="absolute -left-5.25 top-0 w-8 h-8 bg-white border-2 border-[#2B6CEE] rounded-full flex items-center justify-center z-10">
                                                <GraduationCap className="w-4 h-4 text-[#2B6CEE]" />

                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h4 className="font-semibold text-[16px] text-[#0D121B]">Doctor of Medicine (MD)</h4>
                                                <span className="text-[14px] text-[#2B6CEE]">Harvard Medical School</span>
                                                <span className="text-[12px] text-[#4C669A]">2008 - 2012</span>
                                                <p className="text-[12px] text-[#4C669A]">Graduated with Honors. Special focus on internal medicine and cardiology basics.</p>
                                            </div>
                                        </div>

                                        <div className="relative pl-12">
                                            <div className="absolute -left-5.25 top-0 w-8 h-8 bg-white border-2 border-[#2B6CEE] rounded-full flex items-center justify-center z-10">
                                                <PlusSquare className="w-4 h-4 text-[#2B6CEE]" />

                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h4 className="font-semibold text-[16px] text-[#0D121B]">Residency in Internal Medicine</h4>
                                                <span className="text-[14px] text-[#2B6CEE]">
                                                    Johns Hopkins Hospital</span>
                                                <span className="text-[12px] text-[#4C669A]">2012 - 2015</span>
                                                <p className="text-[12px] text-[#4C669A]">Completed intensive residency program with rotations in critical care and cardiology.</p>
                                            </div>
                                        </div>
                                        <div className="relative pl-12">
                                            <div className="absolute -left-5.25 top-0 w-8 h-8 bg-white border-2 border-[#2B6CEE] rounded-full flex items-center justify-center z-10">
                                                <ActivitySquareIcon className="w-4 h-4 text-[#2B6CEE]" />

                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h4 className="font-semibold text-[16px] text-[#0D121B]">Fellowship in Cardiology</h4>
                                                <span className="text-[14px] text-[#2B6CEE]">
                                                    Cleveland Clinic</span>
                                                <span className="text-[12px] text-[#4C669A]">2015 - 2018</span>
                                                <p className="text-[12px] text-[#4C669A]">Specialized training in interventional cardiology procedures and patient management..</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>

            </div>

            <div className="w-full h-44 mb-8 p-4">
                <Card className="w-full min-h-44  bg-[#FFFFFF] border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl relative">
                    <CardHeader className="p-0 pt-6 px-6">
                        <CardTitle className="text-[18px] font-bold text-[#0D121B] leading-7">
                            Awards & Recognition
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-4 flex flex-col md:flex-row gap-3">

                        <div className="flex-1 bg-[#F9FAFB] rounded-xl p-4 border border-transparent">
                            <div className="flex items-center gap-3">
                                <Trophy className="w-6 h-7 text-[#EAB308]" fill="currentColor" />
                                <h4 className="text-[14px] font-semibold text-[#0D121B] leading-5">
                                    Best Researcher Award
                                </h4>
                            </div>
                            <p className="text-[12px] text-[#4C669A] leading-4 mt-2 ml-9">
                                American Heart Association, 2021
                            </p>
                        </div>

                        <div className="flex-1 bg-[#F9FAFB] rounded-xl p-4 border border-transparent">
                            <div className="flex items-center gap-3">
                                <Trophy className="w-6 h-7 text-[#EAB308]" fill="currentColor" />
                                <h4 className="text-[14px] font-semibold text-[#0D121B] leading-5">
                                    Excellence in Cardiology
                                </h4>
                            </div>
                            <p className="text-[12px] text-[#4C669A] leading-4 mt-2 ml-9">
                                MedManager Annual Gala, 2023
                            </p>
                        </div>

                    </CardContent>
                </Card>
            </div>


        </div>
    )
}