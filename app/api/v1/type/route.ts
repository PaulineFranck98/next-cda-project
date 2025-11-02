import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const types = await db.type.findMany({
            orderBy: {
                typeName: 'asc',
            },
        })

        return NextResponse.json(types)
    } catch(error) {
        console.log("[TYPES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}