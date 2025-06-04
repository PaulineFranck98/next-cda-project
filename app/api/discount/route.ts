import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server";


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

export async function POST(req: NextRequest)
{
    try {
        const { userId } = await auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { startDate, endDate, percentage, code, isActive } = await req.json();

        const discount = await db.discount.create({
            where: { id: locationId}
            data: {
                startDate,
                endDate,
                percentage,
                code,
                isActive,
            },
        })

        return NextResponse.json(discount, { status: 201 })
    } catch(error) {
        console.error("[POST_DISCOUNT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}