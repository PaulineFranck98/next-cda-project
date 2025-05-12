import { db } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"

export async function GET () {
    try {
        const itineraries = await db.itinerary.findMany({
            orderBy: {
                title: "asc"
            }
        })

        return NextResponse.json(itineraries)
    } catch(error)
    {
        console.log("[ITINERARIES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}