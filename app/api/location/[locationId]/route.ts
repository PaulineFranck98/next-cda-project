import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ locationId: string}>}) 
{
    try {
        const { locationId } = await params

        const location = await db.location.findUnique({
            where: {
                id: locationId
            }
        })
        return NextResponse.json(location)
    } catch(error)
    {
        console.log("[LOCATION]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: { locationId: string } })
{
    try{
        const { locationId } = params
        const body = await req.json();
        const { locationName, description, address, latitude, longitude, mustSee } = body;

        const updatedLocation = await db.location.update({
            where: { id: locationId },
            data: {
                locationName,
                description,
                address,
                latitude,
                longitude, 
                mustSee
            },
        })

        return NextResponse.json(updatedLocation, { status: 200 })
    } catch(error) {
        console.log("[PUT_LOCATION]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { locationId: string } })
{
    try {
        const { locationId } = params;

        await db.location.delete({
            where: { id: locationId }
        })

        return new NextResponse("Location deleted", { status: 204 })
    } catch(error)
    {
        
    }
}