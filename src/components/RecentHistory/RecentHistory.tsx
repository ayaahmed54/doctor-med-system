import { Card, CardContent, CardHeader } from "../ui/card";
export default function RecentHistory() {
    return <>
        <Card className="w-full max-w-89.25 min-h-56 bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden mt-6">
            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3] h-17.25">
                <h3 className="text-lg font-bold text-[#0D121B] leading-7">
                    Recent History
                </h3>

            </CardHeader>
            <CardContent className="relative p-6 pt-4 h-68.5 flex flex-col isolate">
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#E2E8F0] z-0" />
                <div className="flex flex-col gap-6 relative z-10">
                    <div className="relative pl-6 h-13.5 flex flex-col justify-between">
                        <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 bg-[#2B6CEE] border-2 border-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-full" />
                        <span className="text-[#64748B] font-medium text-[12px] leading-4">Sep 12, 2023</span>
                        <h4 className="text-[#1E293B] font-bold text-[14px] leading-5">Routine Checkup</h4>
                        <p className="text-[#64748B] font-normal text-[12px] leading-4">Dr. Smith • Vitals Normal</p>
                    </div>
                    <div className="relative pl-6 h-13.5 flex flex-col justify-between">
                        <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 bg-[#CBD5E1] border-2 border-white rounded-full" />
                        <span className="text-[#64748B] font-medium text-[12px] leading-4">Aug 05, 2023</span>
                        <h4 className="text-[#1E293B] font-bold text-[14px] leading-5">Lab Work Analysis</h4>
                        <p className="text-[#64748B] font-normal text-[12px] leading-4">Dr. Ray • Cholesterol check</p>
                    </div>
                    <div className="relative pl-6 h-13.5 flex flex-col justify-between">
                        <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 bg-[#CBD5E1] border-2 border-white rounded-full" />
                        <span className="text-[#64748B] font-medium text-[12px] leading-4">Jul 20, 2023</span>
                        <h4 className="text-[#1E293B] font-bold text-[14px] leading-5">New Patient Intake</h4>
                        <p className="text-[#64748B] font-normal text-[12px] leading-4">Front Desk</p>
                    </div>

                </div>
                <div className="pl-6 mt-auto">
                    <button className="text-[#2B6CEE] font-bold text-[12px] leading-4 hover:underline transition-all">
                        View Full History
                    </button>
                </div>
            </CardContent>
        </Card>
    </>
}
