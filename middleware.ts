import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isCypressTest, redirectTo } from "./lib/middleware/utils";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isCypressTest()) return NextResponse.next();

  const { userId, sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role ?? "user";

  if (isAdminRoute(request) && role !== "admin") {
    return redirectTo("/", request);
  }

  if (isDashboardRoute(request) && !userId) {
    return redirectTo("/sign-in", request);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
