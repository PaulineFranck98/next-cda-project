import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function GET () {
    try {
        const companions = await db.companion.findMany({
            orderBy: {
                companionName: 'asc',
            },
        })

        return NextResponse.json(companions)
    } catch(error) {
        console.log("[COMPANIONS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { companionName } = await req.json();

        const companion = await db.companion.create({
            data: { companionName },
        });

        return NextResponse.json(companion, { status: 201 });
    } catch (error) {
        console.error("[COMPANIONS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}