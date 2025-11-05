import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ durationId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { durationId } = await params;
        const { onSiteTime } = await req.json();

        const updated = await db.duration.update({
            where: { id: durationId },
            data: { onSiteTime: Number(onSiteTime) },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[DURATION_PUT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ durationId: string }> }) {
    try {

        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { durationId } = await params;

        await db.duration.delete({
            where: { id: durationId },
        });

        return new NextResponse("Duration deleted", { status: 204 });
    } catch (error) {
        console.error("[DURATION_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
