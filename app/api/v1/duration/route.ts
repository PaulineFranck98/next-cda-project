import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const durations = await db.duration.findMany({
            orderBy: {
                onSiteTime: 'asc',
            },
        })

        return NextResponse.json(durations)
    } catch (error) {
        console.log("[DURATIONS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}