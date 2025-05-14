import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const companions = await db.companion.findMany({
            orderBy: {
                companionName: 'asc',
            },
        })

        // retourne une réponse au format JSON
        return NextResponse.json(companions)
    } catch(error) {
        console.log("[COMPANIONS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}