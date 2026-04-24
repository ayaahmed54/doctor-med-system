import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
interface MedicalHistory {
    _id: string;
    doctor: {
        _id: string;
        displayName: string;
        specialty: string;
    };
    patient: {
        _id: string;
        displayName: string;
    };
    appointment: {
        _id: string;
        startTime: string;
    };
    diagnosis: string;
    medications: {
        name: string;
        strength: string;
        dosage: string;
        frequency: string;
        duration: string;
        status: string;
        _id: string;
    }[];
    status: string;
    notes: string;
    createdAt: string;
}
export default function Notes() {


    const params = useParams();
    const id = params?.id as string;
    const { data: session } = useSession();
    const [history, setHistory] = useState<MedicalHistory[]>([]);
    useEffect(() => {
        if (!session) return;

        async function getHistory() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/patients/${id}/medical-history`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );


                const result = await response.json();

                console.log("HISTORY:", result);
                console.log("NOTES:", history);
                setHistory(result.data);
            } catch (err) {
                console.error(err);
            }
        }

        if (id) getHistory();
    }, [id]);
    return <>
        <Card className="w-full max-w-163 mt-6  bg-white border-[#E7EBF3] shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-5 border-b border-[#E7EBF3]">
                <h3 className="text-lg font-bold text-[#0D121B] leading-7">
                    Clinical Notes
                </h3>
                <Button
                    variant="outline"
                    className="flex items-center gap-1 h-8 px-3 border-none text-[#2B6CEE] hover:bg-blue-50"
                >
                    <Plus size={18} className="text-[#2B6CEE]" />
                    <span className="text-sm font-medium">Add Note</span>
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col p-5 gap-4">



                {/* notes */}
                {history.map((item) => (
                    <div
                        key={item._id}
                        className="flex flex-col gap-1 p-3 bg-white border border-[#E7EBF3] rounded-lg"
                    >
                        <div className="flex flex-row justify-between items-center w-full">

                            {/* ✅ اسم الدكتور */}
                            <span className="text-xs font-bold text-[#0D121B]">
                                {item.doctor.displayName}
                            </span>

                            {/* ✅ التاريخ */}
                            <span className="text-xs text-[#4C669A]">
                                {new Date(item.createdAt).toLocaleString()}
                            </span>
                        </div>

                        {/* ✅ note */}
                        <p className="text-sm text-[#4C669A] leading-5">
                            {item.notes}
                        </p>
                    </div>
                ))}

            </CardContent>
        </Card>

    </>
}
