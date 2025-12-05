import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"


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

        if (!location) {
            return NextResponse.json(
                { error: "Location not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(location)

    } catch (error) {
        console.error("[LOCATION]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}