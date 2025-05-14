import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

  
export async function PUT(req: NextRequest, { params }: { params: { locationId: string } })
{
    try{
        const { locationId } = params
        const body = await req.json();
        const { typeId, durationId, priceId, confortId, intensityId, themeIds, companionIds, deletedImageUrls } = body;

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

        await db.themeLocation.deleteMany({
            where: {locationId}
        });

        if(Array.isArray(themeIds) && themeIds.length > 0) {
            await db.themeLocation.createMany({
                data: themeIds.map((themeId: string) => ({
                    locationId,
                    themeId
                })),
            });
        }

        
        await db.companionLocation.deleteMany({
            where: {locationId}
        });

        if(Array.isArray(companionIds) && companionIds.length > 0) {
            await db.companionLocation.createMany({
                data: companionIds.map((companionId: string) => ({
                    locationId,
                    companionId
                })),
            });
        }


        return NextResponse.json(updatedLocation, { status: 200 })
    } catch(error) {
        console.log("[PUT_LOCATION]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}