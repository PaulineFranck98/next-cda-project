import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ themeId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { themeId } = await params;
        const { themeName } = await req.json();

        const updated = await db.theme.update({
            where: { id: themeId },
            data: { themeName },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[THEME_PUT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ themeId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { themeId } = await params;

        await db.theme.delete({
            where: { id: themeId },
        });

        return new NextResponse("Theme deleted", { status: 204 });
    } catch (error) {
        console.error("[THEME_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
