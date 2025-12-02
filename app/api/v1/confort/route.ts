import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const conforts = await db.confort.findMany({
            orderBy: {
                confortLevel: 'asc',
            },
        })

        return NextResponse.json(conforts)
    } catch (error) {
        console.log("[CONFORTS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}