import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } })
{
    try {
        const { updates } =  await req.json()

        for (const { id, order } of updates) {
            await db.itineraryLocation.update({
                where: { id, itineraryId: params.id },
                data: { order }
            })
        }

        return new NextResponse("Updated", {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
                "Access-Control-Allow-Methods": "PUT, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        })
    } catch(error) {
        console.error("[REORDER]", error)
        return new NextResponse("Error", {
            status: 500,
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:8000"
            }
        })
    }
}
