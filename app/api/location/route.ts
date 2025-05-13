import { db } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"

export async function GET ()
{
    try {
        const locations = await db.location.findMany({
            orderBy: {
               locationName: "asc"
            }
        })

        return NextResponse.json(locations)
    } catch(error)
    {
        console.log("[LOCATIONS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: NextRequest)
{
    try {
        const { locationName, description, address, latitude, longitude, city, zipcode, phoneNumber, website, type, duration, price, confort, intensity} = await req.json();

        const location = await db.location.create({
            data: {
                locationName,
                description,
                address,
                latitude:  parseFloat(latitude),
                longitude:  parseFloat(longitude),
                city,
                zipcode,
                phoneNumber,
                website,
                type, 
                duration, 
                price, 
                confort,
                intensity
            },
        })

        return NextResponse.json(location, { status: 201 })
    } catch(error) {
        console.error("[POST_LOCATION]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}