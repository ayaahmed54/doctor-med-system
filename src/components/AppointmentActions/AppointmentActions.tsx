"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
    ClipboardEditIcon,
    XCircleIcon,
    CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";
import { useSession } from "next-auth/react";

type AppointmentActionsProps = {
    appointmentId: string;
};

export default function AppointmentActions({
    appointmentId,
}: AppointmentActionsProps) {

    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handleAppointmentStatus = async (
        status: "confirmed" | "cancelled" | "pending"
    ) => {
        const userToken = session?.token;
        if (!userToken) return;
        try {
            setLoading(true);


            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/appointments/${appointmentId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify({
                        status,
                        role: "Doctor",
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data?.message || "Something went wrong"
                );
            }

            toast.success(
                status === "confirmed"
                    ? "Appointment confirmed successfully"
                    : status === "cancelled"
                        ? "Appointment cancelled successfully"
                        : "Appointment moved to pending"
            );

            router.refresh();

        } catch (error: any) {
            console.log(error);

            toast.error(
                error?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-row items-center gap-3 w-full md:w-auto">


            <Button
                variant="outline"
                disabled={loading}
                className="flex-1 md:flex-none gap-2"
                onClick={() => handleAppointmentStatus("confirmed")}
            >
                <ClipboardEditIcon size={18} />
                Reschedule
            </Button>

            <Button
                variant="destructive"
                disabled={loading}
                className="flex-1 md:flex-none gap-2 bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2] hover:bg-[#FEE2E2]"
                onClick={() => handleAppointmentStatus("cancelled")}
            >
                <XCircleIcon size={18} />
                Cancel
            </Button>

        </div>
    );
}