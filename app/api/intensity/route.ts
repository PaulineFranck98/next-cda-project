import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function GET() {
    try {
        const intensities = await db.intensity.findMany({
            orderBy: {
                intensityLevel: 'asc',
            },
        })

        // retourne une réponse au format JSON
        return NextResponse.json(intensities)
    } catch (error) {
        console.log("[INTENSITIES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { intensityLevel } = await req.json();
        const intensity = await db.intensity.create({
            data: { intensityLevel },
        });

        return NextResponse.json(intensity, { status: 201 });
    } catch (error) {
        console.error("[INTENSITY_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}