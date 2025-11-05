import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";


export async function PUT(req: NextRequest, { params }: { params: Promise<{ companionId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { companionId } = await params;
        const { companionName } = await req.json();

        const updated = await db.companion.update({
            where: { id: companionId },
            data: { companionName: companionName.trim() },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[COMPANION_PUT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ companionId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { companionId } = await params;

        await db.companion.delete({
            where: { id: companionId },
        });

        return new NextResponse("Companion deleted", { status: 204 });
    } catch (error) {
        console.error("[COMPANION_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
