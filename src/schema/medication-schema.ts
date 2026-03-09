import * as z from "zod";

export const medicationSchema = z.object({
    drugName: z.string().min(2, "Drug name is required (at least 2 characters)"),
    dosage: z.string().min(1, "Dosage is required (e.g. 500mg)"),
    duration: z.string().min(1, "Duration is required"),
    durationUnit: z.string().default("Days"),
    frequency: z.string().min(1, "Please select frequency"),
    route: z.string().min(1, "Please select route"),
    instructionNote: z.string().optional(),
});

export type MedicationFormValues = z.infer<typeof medicationSchema>;

