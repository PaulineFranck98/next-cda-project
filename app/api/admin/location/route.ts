import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { sessionClaims } = await auth();
        const role = sessionClaims?.metadata?.role ?? "user";

        if (role !== "admin") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const locations = await db.location.findMany({
            orderBy: { createdAt: "desc" },
        });

        // enrich with Clerk data
        const usersMap: Record<string, { name: string | null }> = {};

        // retrieve all unique user IDs
        const userIds = [...new Set(locations.map((location) => location.userId))];

        for (const id of userIds) {
            try {
                const client = await clerkClient();
                const user = await client.users.getUser(id);

                usersMap[id] = {
                    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || null,
                };
            } catch {
                // in case of a deleted user or Clerk error
                usersMap[id] = { name: null };
            }
        }

        // merge user information with each location
        const enrichedLocations = locations.map((location) => ({ ...location, owner: usersMap[location.userId] ?? { name: null } }));

        return NextResponse.json(enrichedLocations);
    } catch (error) {
        console.error("[ADMIN_LOCATIONS_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
