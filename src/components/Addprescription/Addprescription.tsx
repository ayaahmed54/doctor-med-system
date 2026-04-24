"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Medication = {
    name: string;
    strength: string;
    dosage: string;
    frequency: string;
    duration: string;
};

// 🟢 CREATE
export async function AddPrescription(
    appointmentId: string,
    diagnosis: string,
    notes: string,
    medications: Medication[]
) {
    const session = await getServerSession(authOptions);
    const token = session?.token;

    if (!token) throw new Error("Unauthorized");

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/prescriptions/${appointmentId}/prescription`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ diagnosis, notes, medications }),
        }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
}

//  UPDATE
export async function UpdatePrescription(
    id: string,
    diagnosis: string,
    notes: string,
    medications: Medication[]
) {
    const session = await getServerSession(authOptions);
    const token = session?.token;

    if (!token) throw new Error("Unauthorized");

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/prescriptions/${id}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ diagnosis, notes, medications }),
        }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
}



