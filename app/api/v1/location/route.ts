import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const locations = await db.location.findMany({
            orderBy: {
                locationName: "asc"
            },
            include: {
                type: true,
                duration: true,
                confort: true,
                intensity: true,
                images: true,
                themes: { include: { theme: true } },
                companions: { include: { companion: true } },
                discounts: true,
            }
        })

        return NextResponse.json(locations)
    } catch (error) {
        console.log("[LOCATIONS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}