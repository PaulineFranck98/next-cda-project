import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const prices = await db.price.findMany({
            orderBy: {
                priceRange: 'asc',
            },
        })

        return NextResponse.json(prices)
    } catch(error) {
        console.log("[PRICES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}