import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const { sessionClaims } = await auth();
        const role = sessionClaims?.metadata?.role ?? "user";

        if (role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const client = await clerkClient();

        const { data: users } = await client.users.getUserList({
            limit: 100,
            orderBy: "-created_at",
        });

        // for each user, check whether they have locations and their status
        const formattedUsers = await Promise.all(
            users.map(async (user) => {
                const locations = await db.location.findMany({
                    where: { userId: user.id },
                    select: { isActive: true },
                });

                const hasLocations = locations.length > 0;
                const isActive =
                    hasLocations && locations.every((location) => location.isActive === true);

                return {
                    id: user.id,
                    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "Anonyme",
                    email: user.emailAddresses?.[0]?.emailAddress ?? "—",
                    createdAt: user.createdAt,
                    role: user.publicMetadata?.role ?? "user",
                    isActive: hasLocations ? isActive : null, // null = no location
                };
            })
        );

        return NextResponse.json(formattedUsers);
    } catch (error) {
        console.error("[ADMIN_USERS_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { sessionClaims } = await auth();
        const role = sessionClaims?.metadata?.role ?? "user";
        if (role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { userId, activate } = await req.json();
        if (!userId) {
            return new NextResponse("Missing userId", { status: 400 });
        }

        await db.location.updateMany({
            where: { userId },
            data: { isActive: activate },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[ADMIN_USERS_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
