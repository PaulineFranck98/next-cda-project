import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server";


export async function GET(req: NextRequest, { params }: { params: Promise<{ locationId: string}>}) {
    try {
        const { locationId } = await params
        const discounts = await db.discount.findMany({
            where: { locationId },
            orderBy: { endDate: "asc" }
        });
        return NextResponse.json(discounts);
    } catch (error) {
        console.error("[DISCOUNTS_BY_LOCATION]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ locationId: string}>})
{
    try {
        const { userId } = await auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { locationId } = await params

        const { startDate, endDate, percentage, code, isActive } = await req.json();

        const discount = await db.discount.create({
            data: {
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                percentage,
                code,
                isActive,
                locationId
            },
        })

        return NextResponse.json(discount, { status: 201 })
    } catch(error) {
        console.error("[POST_DISCOUNT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}