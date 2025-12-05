import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ confortId: string }> }) {
    try {

        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { confortId } = await params;
        const { confortLevel } = await req.json();

        const updated = await db.confort.update({
            where: { id: confortId },
            data: { confortLevel },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[CONFORT_PUT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ confortId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { confortId } = await params;

        await db.confort.delete({
            where: { id: confortId },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[CONFORT_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
