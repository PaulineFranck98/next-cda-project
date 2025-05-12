import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET (
    req: NextRequest,
    { params }: { params: Promise<{ itineraryId: string }>}
) {
    try {
       const { itineraryId } = await params

       const itinerary = await db.itinerary.findUnique({
        where : {
            id: itineraryId
        },
        include: {
            locations: {
                orderBy: { order: 'asc' },
                include: { location: true }
            }
          }
       })

       return NextResponse.json(itinerary)
    } catch(error) {
        console.log("[ITINERARY]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PUT (req: NextRequest, context: { params: {  itineraryId: string }})
{
    try {
        const { title, description, locations } = await req.json();
        const itineraryId = context.params.itineraryId;
         
        //suppression des anciennes liaisons
        await db.itineraryLocation.deleteMany({
            where: { itineraryId }
        });

        const updatedItinerary = await db.itinerary.update({
            where: { id: itineraryId },
            data: {
                title,
                description,
                locations: {
                    create: locations.map((loc: { id: string; order: number}) => ({
                        location: { connect: { id: locations.id }},
                        order: locations.order
                    }))
                } 
            },
            include: {
                locations: { include: { location: true }}
            }
        });

        return NextResponse.json(updatedItinerary, { status: 200});
    } catch(error) {
        console.error("[PUT_ITINERARY", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}