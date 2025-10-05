
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
        const durationIds = parseArrayParam(searchParams.getAll("durationId[]"));
        const priceMin = searchParams.get("priceMin") ?? undefined;
        const priceMax = searchParams.get("priceMax") ?? undefined;
        const confortIds = parseArrayParam(searchParams.getAll("confortId[]"));
        const intensityId = searchParams.get("intensityId") ?? undefined;
        const city = searchParams.get("city") ?? undefined;

        const themeIds = parseArrayParam(searchParams.getAll("themeIds[]"));
        const companionIds = parseArrayParam(searchParams.getAll("companionIds[]"));

        const where: Record<string, unknown> = {};
        if (locationName) where.locationName = { contains: locationName, mode: "insensitive" };
        if (typeId) where.typeId = typeId;
        if (durationIds.length > 0) where.durationId = { in: durationIds };
        if (confortIds.length > 0) where.confortId = { in: confortIds };
        if (intensityId) where.intensityId = intensityId;
        if (city) where.city = { contains: city, mode: "insensitive" };
        if (themeIds.length > 0)  where.themes = { some: { themeId: { in: themeIds } } };
        if (companionIds.length > 0) where.companions = { some: { companionId: { in: companionIds } } };
        if (priceMin || priceMax) {
            where.AND = [
                priceMin ? { maxPrice: { gte: Number(priceMin) } } : {},
                priceMax ? { minPrice: { lte: Number(priceMax) } } : {},
            ].filter(obj => Object.keys(obj).length > 0);
        }

        const locations = await db.location.findMany({
            where,
            orderBy: { locationName: "asc" },
            include: {
                type: true,
                duration: true,
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