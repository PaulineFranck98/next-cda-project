import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const themes = await db.theme.findMany({
            orderBy: {
                themeName: 'asc',
            },
        })

        // retourne une réponse au format JSON
        return NextResponse.json(themes)
    } catch(error) {
        console.log("[THEMES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}