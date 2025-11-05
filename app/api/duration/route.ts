import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function GET () {
    try {
        const durations = await db.duration.findMany({
            orderBy: {
                onSiteTime: 'asc',
            },
        })

        return NextResponse.json(durations)
    } catch(error) {
        console.log("[DURATIONS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { onSiteTime } = await req.json();

        const duration = await db.duration.create({
            data: { onSiteTime: Number(onSiteTime) },
        });

        return NextResponse.json(duration, { status: 201 });
    } catch (error) {
        console.error("[DURATIONS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}