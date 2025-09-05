
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

function parseArrayParam(param: string | string[] | undefined): string[] {
    if (!param) return [];
    if (Array.isArray(param)) return param;
    return param.split(",").map((value) => value.trim()).filter(Boolean);
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const locationName = searchParams.get("locationName") ?? undefined;
        const typeId = searchParams.get("typeId") ?? undefined;
        const durationId = searchParams.get("durationId") ?? undefined;
        const priceId = searchParams.get("priceId") ?? undefined;
        const confortId = searchParams.get("confortId") ?? undefined;
        const intensityId = searchParams.get("intensityId") ?? undefined;
        const city = searchParams.get("city") ?? undefined;

        const themeIds = parseArrayParam(searchParams.get("themeIds") ?? undefined);
        const companionIds = parseArrayParam(searchParams.get("companionIds") ?? undefined);

        const where: Record<string, unknown> = {};
        if (locationName) {
            where.locationName = { contains: locationName, mode: "insensitive" };
        }
        if (typeId) {
            where.typeId = typeId;
        }
        if (durationId) {
            where.durationId = durationId;
        }
        if (priceId) {
            where.priceId = priceId;
        }
        if (confortId) {
            where.confortId = confortId;
        }
        if (intensityId) {
            where.intensityId = intensityId;
        }
        if (city) {
            where.city = { contains: city, mode: "insensitive" };
        }
        if (themeIds.length > 0) {
            where.themeIds = { hasSome: themeIds };
        }
        if (companionIds.length > 0) {
            where.companionIds = { hasSome: companionIds };
        }

        const locations = await db.location.findMany({
            where,
            orderBy: { locationName: "asc" },
            include: {
                type: true,
                duration: true,
                price: true,
                confort: true,
                intensity: true,
                images: true,
                themes: { include: { theme: true } },
                companions: { include: { companion: true } },
                discounts: true,
            },
        });

        return NextResponse.json(locations);
    } catch (error) {
        console.log("[LOCATIONS_PUBLIC]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}