import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function GET () {
    try {
        const conforts = await db.confort.findMany({
            orderBy: {
                confortLevel: 'asc',
            },
        })

        return NextResponse.json(conforts)
    } catch(error) {
        console.log("[CONFORTS]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { confortLevel } = await req.json();

        const confort = await db.confort.create({
            data: { confortLevel },
        });

        return NextResponse.json(confort, { status: 201 });
    } catch (error) {
        console.error("[CONFORTS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}