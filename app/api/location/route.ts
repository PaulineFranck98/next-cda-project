import { db } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"

export async function GET () {
    try {
        const locations = await db.location.findMany({
            orderBy: {
               locationName: "asc"
            }
        })

        return NextResponse.json(locations)
    } catch(error)
    {
        console.log("[LOCATIONS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}