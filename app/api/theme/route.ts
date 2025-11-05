import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function GET () {
    try {
        const themes = await db.theme.findMany({
            orderBy: {
                themeName: 'asc',
            },
        })

        return NextResponse.json(themes)
    } catch(error) {
        console.log("[THEMES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { themeName } = await req.json();

        const theme = await db.theme.create({
            data: { themeName },
        });

        return NextResponse.json(theme, { status: 201 });
    } catch (error) {
        console.error("[THEMES_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}