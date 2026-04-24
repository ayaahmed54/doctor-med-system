"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Pill, Loader2, FileWarning } from "lucide-react";
import { toast } from "sonner";
import { AddPrescription, UpdatePrescription } from "@/components/Addprescription/Addprescription";

type FormValues = {
    diagnosis: string;
    notes: string;
    medications: {
        name: string;
        strength: string;
        dosage: string;
        frequency: string;
        duration: string;
    }[];
};

export default function PrescriptionForm() {
    const { id: appointmentId } = useParams();
    const { data: session } = useSession();
    const token = session?.token;
    const [prescription, setPrescription] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const { register, control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: { diagnosis: "", notes: "", medications: [] },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "medications" });

    useEffect(() => {
        if (!appointmentId || !token) return;
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/prescriptions/appointments/${appointmentId}/prescription`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await res.json();
                if (res.ok && result.status === "success" && result.data.prescription) {
                    const p = result.data.prescription;
                    setPrescription(p);
                    setValue("diagnosis", p.diagnosis || "");
                    setValue("notes", p.notes || "");
                    setValue("medications", p.medications || []);
                }
            } finally { setLoading(false); }
        };
        fetchData();
    }, [appointmentId, token, setValue]);

    const onSubmit = async (data: FormValues) => {
        if (!token) return;
        try {
            if (prescription?._id) {
                await UpdatePrescription(prescription._id, data.diagnosis, data.notes, data.medications);
                toast.success("Prescription updated successfully ");
            } else {
                await AddPrescription(appointmentId as string, data.diagnosis, data.notes, data.medications);
                toast.success("Prescription created successfully ");
            }
        } catch (err: any) { toast.error(err.message || "Operation failed"); }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-[#2B6CEE]" size={40} /></div>;

    return (
        <div className="flex justify-center p-4 md:p-8 bg-[#F8F9FA] min-h-screen">
            <Card className="w-full max-w-184.25 shadow-sm rounded-3xl border-none p-6 md:p-8 bg-white h-fit">
                {!prescription && fields.length === 0 && (
                    <div className="mb-8 p-6 flex flex-col items-center justify-center rounded-4xl bg-blue-50/50 border border-blue-100 animate-in fade-in zoom-in">
                        <FileWarning className="text-[#2B6CEE] w-10 h-10 mb-3 opacity-60" />
                        <p className="text-[#1D293D] font-bold text-sm">No current prescription for this appointment</p>
                        <p className="text-[#90A1B9] text-[12px] mt-1 italic">Click "Add Medication" to start building a new one.</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex items-center justify-between border-b pb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-[#2B6CEE]/10 text-[#2B6CEE]">
                                <Pill size={20} />
                            </div>
                            <h2 className="text-[#1D293D] font-bold text-lg tracking-tight">Prescription Manager</h2>
                        </div>
                        {!prescription && (
                            <Button
                                type="button"
                                onClick={() => append({ name: "", strength: "", dosage: "", frequency: "", duration: "" })}
                                className="bg-[#2B6CEE] hover:bg-[#1a56cc] rounded-2xl h-10 px-6 font-semibold shadow-md shadow-blue-100 transition-all"
                            >
                                <Plus size={18} className="mr-2" /> Add Medication
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[#62748E] text-[12px] font-semibold ml-1 uppercase tracking-wider">Diagnosis</Label>
                            <Input {...register("diagnosis", { required: "Required" })} className="rounded-2xl h-11 border-[#E2E8F0] focus-visible:ring-[#2B6CEE]" placeholder="Enter diagnosis..." />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[#62748E] text-[12px] font-semibold ml-1 uppercase tracking-wider">Notes</Label>
                            <Input {...register("notes")} className="rounded-2xl h-11 border-[#E2E8F0] focus-visible:ring-[#2B6CEE]" placeholder="Optional notes" />
                        </div>
                    </div>
                    <div className="space-y-8">
                        {fields.map((field, index) => (
                            <div key={field.id} className="bg-[#FAFBFD] border border-[#E2E8F0] rounded-3xl p-6 relative group transition-all hover:shadow-md">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-[#2B6CEE] rounded-full h-6 w-6 p-0 flex items-center justify-center text-[11px] font-bold">
                                            {index + 1}
                                        </Badge>
                                        <span className="text-[#2B6CEE] text-[11px] font-extrabold uppercase tracking-[1px]">Medication {index + 1}</span>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors" onClick={() => remove(index)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="text-[#62748E] text-[12px] font-medium ml-1">Drug Name</Label>
                                        <Input
                                            {...register(`medications.${index}.name` as const, { required: true })}
                                            className="rounded-2xl h-11 bg-white border-[#E2E8F0] shadow-sm"
                                            placeholder="e.g. Amoxicillin"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[#62748E] text-[12px] font-medium ml-1">Strength</Label>
                                        <div className="flex gap-2">
                                            <Input {...register(`medications.${index}.strength` as const)} className="rounded-2xl h-11 bg-white" placeholder="500mg" />

                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[#62748E] text-[12px] font-medium ml-1">Frequency</Label>
                                        <Input {...register(`medications.${index}.frequency` as const)} className="rounded-2xl h-11 bg-white" placeholder="Three times daily" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[#62748E] text-[12px] font-medium ml-1">Duration</Label>
                                        <Input {...register(`medications.${index}.duration` as const)} className="rounded-2xl h-11 bg-white" placeholder="7 days" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[#62748E] text-[12px] font-medium ml-1">Dosage </Label>
                                        <Input {...register(`medications.${index}.dosage` as const)} className="rounded-2xl h-11 bg-white" placeholder="1 cap" />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    {fields.length > 0 && (
                        <div className="pt-8 border-t flex flex-col items-center gap-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-[320px] bg-[#2B6CEE] hover:bg-[#1a56cc] rounded-[14px] h-13 font-bold text-[16px] shadow-lg shadow-blue-100 transition-all active:scale-95"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : (prescription?._id ? "Update Current Prescription" : "Confirm & Save Prescription")}
                            </Button>
                            <p className="text-[#90A1B9] text-[11px] font-medium italic">Make sure to review all medications before saving.</p>
                        </div>
                    )}
                </form>
            </Card>
        </div>
    );
}





