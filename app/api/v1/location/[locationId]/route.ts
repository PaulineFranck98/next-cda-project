import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ locationId: string }> }) {
    try {
        const { locationId } = await params

        const location = await db.location.findUnique({
            where: {
                id: locationId
            },
            include: {
                type: true,
                duration: true,
                confort: true,
                intensity: true,
                themes: {
                    include: {
                        theme: true,
                    },
                },
                companions: {
                    include: {
                        companion: true,
                    },
                },
                images: true,
                discounts: true,
            }
        })
        return NextResponse.json(location)
    } catch (error) {
        console.error("[LOCATION]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ locationId: string }> }) {
    try {
        const { locationId } = await params
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const body = await req.json();
        const { locationName, description, address, latitude, longitude, city, zipcode, phoneNumber, website } = body;

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        const updatedLocation = await db.location.update({
            where: { id: locationId },
            data: {
                locationName,
                description,
                address,
                latitude: lat,
                longitude: lon,
                geo: {
                    type: "Point",
                    coordinates: [lon, lat],
                },
                city,
                zipcode,
                phoneNumber,
                website,
            },
        })

        return NextResponse.json(updatedLocation, { status: 200 })
    } catch (error) {

        console.log("[PUT_LOCATION]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ locationId: string }> }) {
    try {
        const { locationId } = await params;
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        await db.location.delete({
            where: { id: locationId }
        })

        return new NextResponse("Location deleted", { status: 204 })
    } catch (error) {
        console.log("[DELETE_LOCATION]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}