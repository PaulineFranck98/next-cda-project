import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ typeId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { typeId } = await params;
        const { typeName } = await req.json();

        const updated = await db.type.update({
            where: { id: typeId },
            data: { typeName },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[TYPE_PUT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ typeId: string }> }) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        const { typeId } = await params;

        await db.type.delete({
            where: { id: typeId },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error(null, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
