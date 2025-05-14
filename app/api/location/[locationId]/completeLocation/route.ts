import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"


export async function PUT(req: NextRequest, { params }: { params: { locationId: string } })
{
    try{
        const { locationId } = params
        const body = await req.json();
        const { typeId, durationId, priceId, confortId, intensityId } = body;

        const updatedLocation = await db.location.update({
            where: { id: locationId },
            data: {
                typeId, 
                durationId, 
                priceId, 
                confortId,
                intensityId
            },
        });

        return NextResponse.json(updatedLocation, { status: 200 })
    } catch(error) {
        console.log("[PUT_LOCATION]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}