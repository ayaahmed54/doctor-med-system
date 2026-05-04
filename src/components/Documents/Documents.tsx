"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { MoreVertical, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Scan = {
    _id: string;
    imageUrl: string;
    scanType: string;
    createdAt: string;
};

export default function Documents() {
    const { data: session } = useSession();
    const [scan, setScan] = useState<Scan | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getScan() {
            const userToken = session?.token;
            if (!userToken) return;

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/scans/doctor/${session?.user?.id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const result = await response.json();
                setScan(result.data.scan);
            } catch (error) {
                console.error("Failed to fetch scan:", error);
            } finally {
                setLoading(false);
            }
        }

        getScan();
    }, [session]);

    if (loading) return <p>Loading...</p>;
    if (!scan) return <p>No scans found</p>;

    return (
        <Card className="w-full bg-white border rounded-xl overflow-hidden p-0">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b">
                <h3 className="font-bold text-[16px]">Scan Analysis</h3>
            </div>

            <div className="p-4">
                {/* Card Item */}
                <div className="flex flex-col gap-2 bg-[#F8FAFC] border rounded-lg overflow-hidden">

                    {/* Image */}
                    <div className="relative w-full h-[200px]">
                        <Image
                            src={scan.imageUrl}
                            alt="scan"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* ID OUTSIDE IMAGE + CLICKABLE */}
                    <Link
                        href={`/scans/${scan._id}`}
                        className="px-3 py-2 flex justify-between items-center hover:bg-gray-100 transition"
                    >
                        <span className="text-sm font-semibold text-blue-600">
                            ID: {scan._id}
                        </span>

                        <MoreVertical className="h-5 w-5 text-gray-500" />
                    </Link>

                    {/* Type */}
                    <div className="px-3 pb-3 text-sm text-gray-600">
                        Type: {scan.scanType}
                    </div>
                </div>
            </div>
        </Card>
    );
}
