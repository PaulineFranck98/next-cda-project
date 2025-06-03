import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest, { params }: { params: Promise<{ discountId: string}>}) {
    try {

        const { discountId } = await params;

        const discount = await db.discount.findUnique({
            where : {
                id: discountId,
            },
        })

        return NextResponse.json(discount)
    } catch(error) {
        console.log("[DISCOUNT]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}