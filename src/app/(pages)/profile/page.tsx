import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ActivitySquareIcon, CakeIcon, Calendar, CheckCircle2, ClipboardPlusIcon, Clock, Edit2, Edit3, FileText, GraduationCap, IdCard, LocationEditIcon, Mail, Medal, Phone, Pill, Plus, PlusSquare, Share2, Star, Trophy, Users2Icon } from 'lucide-react'
import Link from 'next/link';

const CONTACT_DATA = [
    {
        id: 1,
        icon: <Mail size={18} />,
        label: "EMAIL",
        value: "dr.bennett@medmanager.com"
    },
    {
        id: 2,
        icon: <Phone size={18} />,
        label: "PHONE",
        value: "+1 (555) 123-4567"
    },
    {
        id: 3,
        icon: <IdCard size={18} />,
        label: "LICENSE ID",
        value: "MED-NY-882190"
    },
    {
        id: 4,
        icon: <CakeIcon size={18} />,
        label: "DATE OF BIRTH",
        value: "June 14, 1982"
    },
];


export default function Profile() {
    return <>
        <div className='min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-300 mx-auto p-4 md:px-6 grow">

                <Card className="w-full bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden p-6">
                    <CardContent className="p-0 flex flex-col md:flex-row items-center md:items-start gap-6 relative">
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] overflow-hidden bg-slate-100">
                                <img
                                    src=".."
                                    alt="Dr. Sarah Bennett"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute right-2 bottom-2 w-5 h-5 bg-[#22C55E] border-4 border-white rounded-full" />
                        </div>
                        <div className="flex-1 flex flex-col w-full text-center md:text-left">
                            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 w-full">
                                <div>
                                    <h2 className="text-[24px] font-bold leading-8 text-[#0D121B]">
                                        Dr. Sarah Bennett
                                    </h2>
                                    <p className="text-[16px] font-medium leading-6 text-[#2B6CEE]">
                                        Senior Cardiologist
                                    </p>
                                </div>

                                <div className="flex flex-row gap-3">
                                    <Link href="/Settings">
                                        <button className="h-10 flex items-center px-4 border border-[#E7EBF3] rounded-xl text-[14px] font-semibold text-[#0D121B] hover:bg-gray-50 transition-colors">
                                            <Edit2 size={16} className="mr-1.5" /> Edit Profile
                                        </button>
                                    </Link>
                                    <button className="h-10 flex items-center px-4 bg-[#2B6CEE] rounded-xl text-[14px] font-semibold text-white shadow-sm hover:bg-[#1e56c9] transition-colors">
                                        <Share2 size={16} className="mr-1.5" /> Share
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap justify-center md:justify-start items-center gap-y-3 gap-x-6">
                                <div className="flex items-center text-[#4C669A] text-[14px]">
                                    <LocationEditIcon className="mr-1.5 w-4 h-4" />
                                    <span className="whitespace-nowrap">New York Medical Center</span>
                                </div>
                                <div className="flex items-center text-[#4C669A] text-[14px]">
                                    <Clock className="mr-1.5 w-4 h-4" />
                                    <span className="whitespace-nowrap">Mon - Fri, 09:00 - 17:00</span>
                                </div>
                                <div className="flex items-center text-[#16A34A] text-[14px] font-medium">
                                    <CheckCircle2 className="mr-1.5 w-4 h-4" />
                                    <span className="whitespace-nowrap">Available for Consult</span>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-full max-w-300 mx-auto px-4">

                    <Card className="w-full h-29.5 bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col items-start p-[22px_24px_24px] gap-0.5 box-border overflow-hidden">
                        <div className="flex flex-row items-center gap-3 w-full h-12 shrink-0">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6FF] shrink-0">
                                <Medal className='text-[#2B6CEE]' size={25} />
                            </div>
                            <span className="font-bold text-[24px] leading-8 text-[#0D121B] flex items-center">
                                10+
                            </span>
                        </div>

                        <div className="flex flex-row items-center w-full pl-15 shrink-0">
                            <span className="font-medium text-[14px] leading-5 text-[#4C669A] flex items-center shrink-0">
                                Years Experience
                            </span>
                        </div>
                    </Card>
                    <Card className="w-full h-29.5 bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col items-start p-[22px_24px_24px] gap-0.5 box-border overflow-hidden">
                        <div className="flex flex-row items-center gap-3 w-full h-12 shrink-0">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6FF] shrink-0">
                                <Users2Icon className='text-[#2B6CEE]' size={25} />
                            </div>
                            <span className="font-bold text-[24px] leading-8 text-[#0D121B] flex items-center">
                                5,000+
                            </span>
                        </div>

                        <div className="flex flex-row items-center w-full pl-15 shrink-0">
                            <span className="font-medium text-[14px] leading-5 text-[#4C669A] flex items-center shrink-0">
                                Patients Treated
                            </span>
                        </div>
                    </Card>
                    <Card className="w-full h-29.5 bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col items-start p-[22px_24px_24px] gap-0.5 box-border overflow-hidden">
                        <div className="flex flex-row items-center gap-3 w-full h-12 shrink-0">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6FF] shrink-0">
                                <Star className='text-[#2B6CEE]' size={25} />
                            </div>
                            <span className="font-bold text-[24px] leading-8 text-[#0D121B] flex items-center">
                                4.9
                            </span>
                        </div>

                        <div className="flex flex-row items-center w-full pl-15 shrink-0">
                            <span className="font-medium text-[14px] leading-5 text-[#4C669A] flex items-center shrink-0">
                                Average Rating
                            </span>
                        </div>
                    </Card>

                </main>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-4 md:p-6">

                <div className="flex flex-col items-center gap-6 w-full max-w-100 mx-auto">
                    <Card className="w-full min-h-44.5 bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="font-bold text-[18px] leading-7 text-[#0D121B]">
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 w-full space-y-5">
                            {CONTACT_DATA.map((item) => (
                                <div key={item.id} className="flex items-center gap-3.5">
                                    <div className="flex items-center justify-center min-w-8 h-8 bg-[#F9FAFB] rounded-[6px] text-[#4C669A]">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-[12px] leading-4 tracking-[0.3px] uppercase text-[#4C669A]">
                                            {item.label}
                                        </span>
                                        <span className="font-medium text-[14px] leading-5 text-[#0D121B]">
                                            {item.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="w-full min-h-44.5 bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col items-start justify-start">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="font-bold text-[18px] leading-7 text-[#0D121B]">
                                Specializations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-2">
                            <div className="flex flex-wrap gap-2">
                                {["Cardiology", "Heart Failure", "Angioplasty", "Hypertension", "Echocardiography"].map((spec, index) => (
                                    <div
                                        key={index}
                                        className="px-3.5 py-1.5 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full"
                                    >
                                        <span className="font-medium text-[14px] leading-5 text-[#2B6CEE]">
                                            {spec}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full min-h-[170px] bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col items-start justify-start">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="font-bold text-[18px] leading-[28px] text-[#0D121B]">
                                Languages
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-6 pt-2 w-full space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-[14px] leading-5 text-[#0D121B]">English</span>
                                    <span className="font-normal text-[14px] leading-5 text-[#4C669A]">Native</span>
                                </div>
                                <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#2B6CEE] rounded-full w-full"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-[14px] leading-5 text-[#0D121B]">Spanish</span>
                                    <span className="font-normal text-[14px] leading-5 text-[#4C669A]">Fluent</span>
                                </div>
                                <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#2B6CEE] rounded-full w-[85%]"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>


                <div className="col-span-1 md:col-span-2">
                    <Card className="  bg-white h-71.5  border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex items-center">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-start gap-4 w-full">
                                <h2 className="font-bold text-[18px] leading-7 text-[#0D121B]">About Me</h2>
                                <p className="font-medium text-[14px] leading-5 text-[#4C669A]">
                                    Dr. Sarah Bennett is a dedicated cardiologist with over a decade of experience in treating complex heart
                                    conditions. She specializes in interventional cardiology and heart failure management, bringing a
                                    compassionate and evidence-based approach to patient care.
                                </p>
                                <p className="font-medium text-[14px] leading-5 text-[#4C669A]">Prior to joining MedManager, Dr. Bennett served as a lead resident at Johns Hopkins, where she was
                                    recognized for her research in non-invasive cardiac imaging techniques. She is committed to staying at
                                    the forefront of medical technology to provide the best possible outcomes for her patients.</p>
                            </div>
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

    </>
}
