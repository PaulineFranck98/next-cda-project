import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const prices = await db.price.findMany({
            orderBy: {
                priceRange: 'asc',
            },
        })

        // retourne une réponse au format JSON
        return NextResponse.json(prices)
    } catch(error) {
        console.log("[PRICES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}