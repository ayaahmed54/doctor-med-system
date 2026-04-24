

import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Reusable shimmer skeleton block
function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded-md bg-[#E7EBF3] ${className ?? ''}`}
        />
    )
}

export default function Loading() {
    return (
        <div className='min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-[1200px] mx-auto p-4 md:px-6 grow">

                {/* ── Profile Header Card ── */}
                <Card className="w-full bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden p-6">
                    <CardContent className="p-0 flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Avatar */}
                        <Skeleton className="w-32 h-32 rounded-full shrink-0" />

                        <div className="flex-1 flex flex-col w-full items-center md:items-start gap-4">
                            {/* Name + buttons row */}
                            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 w-full">
                                <div className="space-y-2">
                                    <Skeleton className="h-7 w-48" />
                                    <Skeleton className="h-5 w-32" />
                                </div>
                                <div className="flex gap-3">
                                    <Skeleton className="h-10 w-28 rounded-xl" />
                                    <Skeleton className="h-10 w-24 rounded-xl" />
                                </div>
                            </div>
                            {/* Meta chips */}
                            <div className="flex flex-wrap gap-6">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Stats Cards ── */}
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-full">
                    {[0, 1, 2].map((i) => (
                        <Card
                            key={i}
                            className="w-full bg-white border border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col items-start p-6 gap-3"
                        >
                            <div className="flex items-center gap-3 w-full">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <Skeleton className="h-7 w-20" />
                            </div>
                            <Skeleton className="h-4 w-32 ml-15" />
                        </Card>
                    ))}
                </main>
            </div>

            {/* ── Bottom Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-4 md:p-6">

                {/* Left column */}
                <div className="flex flex-col items-center gap-6 w-full">

                    {/* Contact Information */}
                    <Card className="w-full bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl">
                        <CardHeader className="p-6 pb-2">
                            <Skeleton className="h-6 w-44" />
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-5">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3.5">
                                    <Skeleton className="w-8 h-8 rounded-[6px] shrink-0" />
                                    <div className="flex flex-col gap-1.5 flex-1">
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Specialty */}
                    <Card className="w-full bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl">
                        <CardHeader className="p-6 pb-2">
                            <Skeleton className="h-6 w-28" />
                        </CardHeader>
                        <CardContent className="p-6 pt-2">
                            <Skeleton className="h-8 w-32 rounded-full" />
                        </CardContent>
                    </Card>

                    {/* Working Schedule */}
                    <Card className="w-full bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl">
                        <CardHeader className="p-6 pb-2">
                            <Skeleton className="h-6 w-40" />
                        </CardHeader>
                        <CardContent className="p-6 pt-2">
                            <div className="flex flex-wrap gap-2">
                                {[0, 1, 2].map((i) => (
                                    <Skeleton key={i} className="h-8 w-24 rounded-full" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column — About Me */}
                <div className="col-span-1 md:col-span-2">
                    <Card className="bg-white border-[#E7EBF3] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl">
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4 w-full">
                                <Skeleton className="h-6 w-28" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}