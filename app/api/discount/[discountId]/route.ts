import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ discountId: string }> }) {
    try {

        const { discountId } = await params;

        const discount = await db.discount.findUnique({
            where: {
                id: discountId,
            },
        })

        return NextResponse.json(discount)
    } catch (error) {
        console.log("[DISCOUNT]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ discountId: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { discountId } = await params;
        const { startDate, endDate, percentage, code, isActive } = await req.json();

        const updated = await db.discount.update({
            where: { id: discountId },
            data: {
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                percentage,
                code,
                isActive,
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[DISCOUNT_PUT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ discountId: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { discountId } = await params;

        await db.discount.delete({
            where: { id: discountId },
        });

        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        console.error("[DISCOUNT_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
