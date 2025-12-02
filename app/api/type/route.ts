import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function GET() {
    try {
        const types = await db.type.findMany({
            orderBy: {
                typeName: 'asc',
            },
        })

        return NextResponse.json(types)
    } catch (error) {
        console.log("[TYPES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { typeName } = await req.json();

        const newType = await db.type.create({
            data: { typeName },
        });

        return NextResponse.json(newType, { status: 201 });
    } catch (error) {
        console.error("[TYPES_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
