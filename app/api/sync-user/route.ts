import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { addDays } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = body.type;
    const userId = body.data?.id;

    if (!userId || !eventType) {
      return NextResponse.json({ error: "Missing user id or event type" }, { status: 400 });
    }

    switch (eventType) {
      case "user.created": {
        const existingUser = await db.user.findUnique({ where: { id: userId } });

        if (!existingUser) {
          await db.user.create({
            data: {
              id: userId,
              isSubscribed: true,
              createdAt: new Date(),
              endTrialDate: addDays(new Date(), 30),
            },
          });
          console.log("Utilisateur créé en base :", userId);
        } else {
          console.log("Utilisateur déjà présent en base :", userId);
        }

        break;
      }

      case "user.updated": {
        const updatedUser = await db.user.findUnique({ where: { id: userId } });
        if (!updatedUser) {
          await db.user.create({
            data: {
              id: userId,
              isSubscribed: false,
              createdAt: new Date(),
              endTrialDate: addDays(new Date(), 30),
            },
          });
        } else {
          console.log("Pas de mise à jour prévue pour l’instant.");
        }

        break;
      }

      case "user.deleted": {
        await db.user.delete({ where: { id: userId } });
        break;
      }

      default: {
        console.warn("Événement non géré :", eventType);
        return NextResponse.json({ error: "Unhandled event type" }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur dans le webhook sync-user :", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
