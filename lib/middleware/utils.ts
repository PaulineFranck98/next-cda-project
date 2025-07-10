import { NextResponse } from "next/server";

export function isCypressTest(): boolean {
  return process.env.CYPRESS_TESTING === 'true';
}

 export function isNotAdmin(sessionClaims: any): boolean {
  const role = sessionClaims?.metadata?.role ?? 'user';
  return role !== 'admin';
}

export function redirectTo(path: string, req: Request): NextResponse {
  return NextResponse.redirect(new URL(path, req.url));
}