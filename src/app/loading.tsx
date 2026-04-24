// app/appointments/loading.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function SkeletonCard() {
    return (
        <div className="bg-white border border-[#E7EBF3] rounded-2xl p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-4">
                <div className="h-3.5 w-36 bg-gray-200 rounded animate-pulse" />
                <div className="h-9 w-9 bg-gray-200 rounded-xl animate-pulse" />
            </div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
    );
}

function SkeletonRow() {
    return (
        <TableRow className="border-b-[#E7EBF3]">
            <TableCell className="px-6 py-4">
                <div className="h-3.5 w-16 bg-gray-200 rounded animate-pulse mb-1.5" />
                <div className="h-3 w-11 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell className="px-6">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse shrink-0" />
                    <div className="h-3.5 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
            </TableCell>
            <TableCell className="px-6">
                <div className="h-3.5 w-20 bg-gray-200 rounded animate-pulse" />
            </TableCell>
            <TableCell className="px-6">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-3.5 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
            </TableCell>
            <TableCell className="px-6">
                <div className="h-6 w-20 bg-gray-200 rounded-xl animate-pulse" />
            </TableCell>
            <TableCell className="px-6 text-right">
                <div className="h-7 w-7 rounded-full bg-gray-200 animate-pulse ml-auto" />
            </TableCell>
        </TableRow>
    );
}

export default function AppointmentsLoading() {
    return (
        <div className="w-full max-w-280 mx-auto mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

            <div className="bg-white border border-[#E7EBF3] rounded-2xl overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center px-4 py-4 border-b border-[#E7EBF3]">
                    <div className="flex gap-2">
                        <div className="h-9 w-28 bg-gray-200 rounded-xl animate-pulse" />
                        <div className="h-9 w-20 bg-gray-200 rounded-xl animate-pulse" />
                    </div>
                    <div className="h-9 w-36 bg-gray-200 rounded-xl animate-pulse" />
                </div>

                <Table className="w-full min-w-255">
                    <TableHeader className="bg-[#F8F9FC]">
                        <TableRow className="border-b-[#E7EBF3] hover:bg-transparent">
                            <TableHead className="px-6 py-4"><div className="h-3.5 w-10 bg-gray-200 rounded animate-pulse" /></TableHead>
                            <TableHead className="px-6 py-4"><div className="h-3.5 w-14 bg-gray-200 rounded animate-pulse" /></TableHead>
                            <TableHead className="px-6 py-4"><div className="h-3.5 w-16 bg-gray-200 rounded animate-pulse" /></TableHead>
                            <TableHead className="px-6 py-4"><div className="h-3.5 w-12 bg-gray-200 rounded animate-pulse" /></TableHead>
                            <TableHead className="px-6 py-4"><div className="h-3.5 w-12 bg-gray-200 rounded animate-pulse" /></TableHead>
                            <TableHead className="px-6 py-4"><div className="h-3.5 w-14 bg-gray-200 rounded animate-pulse ml-auto" /></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SkeletonRow key={i} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}