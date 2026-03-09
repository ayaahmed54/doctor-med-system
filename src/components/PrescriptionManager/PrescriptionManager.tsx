"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { Plus, Pill, ClipboardPlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

export default function AddMedicationCard() {
    const form = useForm({
        defaultValues: {
            drugName: "",
            dosage: "",
            duration: "7",
            durationUnit: "Days",
            frequency: "once-a-day",
            route: "oral",
            instructionNote: "",
        },
    })

    return (
        <div className="w-full max-w-200 mt-6  p-6 bg-white border border-[#E7EBF3] rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <div className=" p-1.5 rounded-md">
                    <ClipboardPlusIcon className="w-5 h-5 text-[#2B6CEE]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0D121B]">Add Medication</h3>
            </div>

            <Form {...form}>
                <form className="space-y-5">
                    <FormField
                        control={form.control}
                        name="drugName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#4C669A] font-medium text-sm">Drug Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Amoxicillin"
                                        className="h-12 bg-[#F8F9FC] border-[#E7EBF3] focus-visible:ring-1 focus-visible:ring-[#2B6CEE]"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="dosage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#4C669A] font-medium text-sm">Dosage</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. 500mg"
                                            className="h-12 bg-[#F8F9FC] border-[#E7EBF3]"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <FormLabel className="text-[#4C669A] font-medium text-sm">Duration</FormLabel>
                            <div className="flex bg-[#F8F9FC] border border-[#E7EBF3] rounded-md h-12 overflow-hidden">
                                <Input
                                    className="border-none bg-transparent h-full shadow-none focus-visible:ring-0 flex-1"
                                    {...form.register("duration")}
                                />
                                <div className="w-px h-6 bg-[#E7EBF3] self-center" />
                                <Select defaultValue="Days">
                                    <SelectTrigger className="w-25 border-none bg-transparent h-full shadow-none focus:ring-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Days">Days</SelectItem>
                                        <SelectItem value="Weeks">Weeks</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#4C669A] font-medium text-sm">Frequency</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 bg-[#F8F9FC] border-[#E7EBF3] text-[#0D121B]">
                                                <SelectValue placeholder="Once a day" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="once-a-day">Once a day</SelectItem>
                                            <SelectItem value="twice-a-day">Twice a day</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="route"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#4C669A] font-medium text-sm">Route</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 bg-[#F8F9FC] border-[#E7EBF3] text-[#0D121B]">
                                                <SelectValue placeholder="Oral (PO)" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="oral">Oral (PO)</SelectItem>
                                            <SelectItem value="iv">Intravenous (IV)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="instructionNote"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#4C669A] font-medium text-sm">Instruction Note</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="e.g. Take with food, may cause drowsiness"
                                        className="bg-[#F8F9FC] border-[#E7EBF3] min-h-25 resize-none focus-visible:ring-[#2B6CEE]"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end pt-4">
                        <Button
                            type="button"
                            className="bg-white border border-[#E7EBF3] text-[#2B6CEE] hover:bg-[#F8F9FC] h-12 px-6 shadow-sm rounded-lg flex items-center gap-2 font-bold"
                        >
                            <Plus className="w-5 h-5" />
                            Add to List
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}


