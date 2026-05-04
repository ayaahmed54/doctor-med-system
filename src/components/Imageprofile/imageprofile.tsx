"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

export default function ImageProfile() {
    const { data: session } = useSession()

    const user = session?.user

    const image =
        user?.profilePic?.url ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`

    return (
        <Image
            src={image}
            alt={user?.name || "User"}
            fill
            className="object-cover"
        />
    )
}
