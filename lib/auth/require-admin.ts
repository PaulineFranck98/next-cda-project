import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function requireAdmin() {
    const { userId } = await auth();

    if (!userId) {
        return { authorized: false, response: new NextResponse("Unauthorized", { status: 401 }) };
    }

    try {
        const client = await clerkClient(); 
        const user = await client.users.getUser(userId);
        const role = user.publicMetadata?.role ?? "user";

        if (role !== "admin") {
            return { authorized: false, response: new NextResponse("Forbidden", { status: 403 }) };
        }

        return { authorized: true, user };
    } catch (error) {
        console.error("[REQUIRE_ADMIN]", error);
        return { authorized: false, response: new NextResponse("Internal Server Error", { status: 500 }) };
    }
}