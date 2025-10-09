
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { Ratelimit } from "@unkey/ratelimit";
import * as z from "zod";

const searchSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(200).default(10),
    priceMin: z.coerce.number().optional(),
    priceMax: z.coerce.number().optional(),
    city: z.coerce.string().max(50).optional(),
    locationName: z.coerce.string().max(50).optional(),
});

// laisse passer la requête si Unkey est indisponible
const fallback = () => ({ success: true, limit: 0, reset: 0, remaining: 0});

const rateLimiter = new Ratelimit({
    rootKey: process.env.UNKEY_ROOT_KEY!,
    namespace: "location_search",
    limit: 20, // 20 requêtes max
    duration:"1m", // sur 1 min
    timeout: {
        ms: 3000, // 3s max avant fallback
        fallback
    },
    onError: (error, identifier) => {
        console.error(`RateLimit Error [${identifier}]: ${error.message}`);
        return fallback();
    },
});

function parseArrayParam(param: string | null | undefined): string[] {
    if (!param) return [];
    return param.split(",").map(value => value.trim()).filter(Boolean);
}

export async function GET(req: NextRequest) {
    try {
        const identifier = req.headers.get("x-forwarded-for")?.split(",")[0] || "Unknown";
        
        if(identifier) {
            // Vérifie le quota
            const success = await rateLimiter.limit(identifier);
            if(!success){
                return NextResponse.json (
                    { error: "Trop de requêtes. Réessayez dans quelques secondes." }, 
                    { status: 429 }  // 429 = too many request
                );
            }
        }

        const { searchParams } = new URL(req.url);

        // validation zod
        const parsedData = searchSchema.safeParse({
            page: searchParams.get("page") ?? undefined,
            limit: searchParams.get("limit") ?? undefined,
            priceMin: searchParams.get("priceMin") ?? undefined,
            priceMax: searchParams.get("priceMax") ?? undefined,
            city: searchParams.get("city") ?? undefined,
            locationName: searchParams.get("locationName") ?? undefined,
        });

        if(!parsedData.success) {
            return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
        }

        // récupération des valeurs validées
        const { page, limit, priceMin, priceMax, city, locationName } = parsedData.data;

        const typeIds = parseArrayParam(searchParams.get("typeIds"));
        const durationIds = parseArrayParam(searchParams.get("durationIds"));
        const confortIds = parseArrayParam(searchParams.get("confortIds"));
        const intensityIds = parseArrayParam(searchParams.get("intensityIds"));
        const themeIds = parseArrayParam(searchParams.get("themeIds"));
        const companionIds = parseArrayParam(searchParams.get("companionIds"));

        // Pagination 
        const skip = (page - 1) * limit;

        const where: Record<string, unknown> = {};
        if (locationName) where.locationName = { contains: locationName, mode: "insensitive" };
        if (typeIds.length > 0) where.typeId = { in: typeIds };
        if (durationIds.length > 0) where.durationId = { in: durationIds };
        if (confortIds.length > 0) where.confortId = { in: confortIds };
        if (intensityIds.length > 0) where.intensityId = { in: intensityIds };
        if (city) where.city = { contains: city, mode: "insensitive" };

        if (themeIds.length > 0)  where.themes = { some: { themeId: { in: themeIds } } };
        if (companionIds.length > 0) where.companions = { some: { companionId: { in: companionIds } } };
        if (priceMin || priceMax) {
            where.AND = [
                priceMin ? { maxPrice: { gte: priceMin } } : {},
                priceMax ? { minPrice: { lte: priceMax } } : {},
            ].filter(obj => Object.keys(obj).length > 0);
        }

        // compte total pour la pagination
        const total = await db.location.count({ where });

        const locations = await db.location.findMany({
            where,
            orderBy: { city: "asc" },
            select: {
                id: true,
                locationName: true, 
                city: true,
                latitude: true,
                longitude: true,
                geo: true,
                duration: {
                    select: { onSiteTime: true },
                },
                images: {
                    take: 1,
                    select: { imageName: true },
                },
                minPrice: true,
                maxPrice: true,
            },
            skip,
            take: limit,
        });

        return NextResponse.json({ data: locations, page, limit, total, totalPages: Math.ceil(total / limit) });
    } catch (error) {
        console.log("[LOCATIONS_PUBLIC]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}