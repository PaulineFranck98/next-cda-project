import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const intensities = await db.intensity.findMany({
            orderBy: {
                intensityLevel: 'asc',
            },
        })

        // retourne une réponse au format JSON
        return NextResponse.json(intensities)
    } catch(error) {
        console.log("[INTENSITIES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}