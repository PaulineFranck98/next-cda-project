import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const discounts = await db.discount.findMany({
            orderBy: {
                endDate: 'asc',
            },
        })

        return NextResponse.json(discounts)
    } catch(error) {
        console.log("[DISCOUNTS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}