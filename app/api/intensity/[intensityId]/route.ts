import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ intensityId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { intensityId } = await params;
        const { intensityLevel } = await req.json();

        const updated = await db.intensity.update({
            where: { id: intensityId },
            data: { intensityLevel },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[INTENSITY_PUT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ intensityId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { intensityId } = await params;

        await db.intensity.delete({
            where: { id: intensityId },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[INTENSITY_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
