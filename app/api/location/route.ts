import { db } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server";

export async function GET ()
{
    try {

        const { userId } = await auth();

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const locations = await db.location.findMany({
            where: { userId },
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

export async function POST(req: NextRequest) {
  try {
    // détecte si on est en mode Cypress
    const isCypressTesting = process.env.CYPRESS_TESTING === 'true';

    let userId;

    if (isCypressTesting) {
      userId = "cypress-test-user"; // faux userId pour le test Cypress
    } else {
      const authResult = await auth();
      userId = authResult.userId;
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { locationName, description, address, latitude, longitude, city, zipcode, phoneNumber, website } = await req.json();

    const location = await db.location.create({
      data: {
        locationName,
        description,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        city,
        zipcode,
        phoneNumber,
        website,
        userId,
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    console.error("[POST_LOCATION]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
