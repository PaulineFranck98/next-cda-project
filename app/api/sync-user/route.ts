import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { addDays } from "date-fns";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = body.data?.id; // Clerk user ID from webhook payload

  if (!id) return NextResponse.json({ error: "No user id" }, { status: 400 });

  let dbUser = await db.user.findUnique({ where: { id } });

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        id,
        isSubscribed: false,
        createdAt: new Date(),
        endTrialDate: addDays(new Date(), 30),
      },
    });
  }

  return NextResponse.json({ success: true });
}