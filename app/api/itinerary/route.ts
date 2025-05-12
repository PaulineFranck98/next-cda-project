import { db } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"

export async function GET () {
    try {
        const itineraries = await db.itinerary.findMany({
            orderBy: { title: "asc" }
        })

        return NextResponse.json(itineraries)
    } catch(error)
    {
        console.log("[ITINERARIES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}   

export async function POST(req: NextRequest)
{
    try {
        const { title, description, locations } = await req.json();

        const itinerary = await db.itinerary.create({
            data: {
                title,
                description,
                locations: {
                    create: locations.map((loc: { id: string, order: number}) => ({
                        location: { connect: { id: loc.id } },
                        order: loc.order
                    }))
                }
            },
            include: { locations: true }
        });

        return NextResponse.json(itinerary, { status: 201 });
    } catch(error) {
        console.error("[POST_ITINERARY]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}