// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { addDays } from "date-fns";

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const id = body.data?.id; // Clerk user ID from webhook payload

//   if (!id) return NextResponse.json({ error: "No user id" }, { status: 400 });

//   let dbUser = await db.user.findUnique({ where: { id } });

//   if (!dbUser) {
//     dbUser = await db.user.create({
//       data: {
//         id,
//         isSubscribed: false,
//         createdAt: new Date(),
//         endTrialDate: addDays(new Date(), 30),
//       },
//     });
//   }

//   return NextResponse.json({ success: true });
// }

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { addDays } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const headers = Object.fromEntries(req.headers.entries());
    console.log(" Headers reçus :", headers);

    const body = await req.json();
    console.log("Corps JSON reçu :", JSON.stringify(body, null, 2));

    const eventType = body.type;
    const userId = body.data?.id;

    if (!userId || !eventType) {
      console.error("ID ou type d'événement manquant.");
      return NextResponse.json({ error: "Missing user id or event type" }, { status: 400 });
    }

    switch (eventType) {
      case "user.created": {
        console.log("Event : user.created");

        const existingUser = await db.user.findUnique({ where: { id: userId } });

        if (!existingUser) {
          await db.user.create({
            data: {
              id: userId,
              isSubscribed: false,
              createdAt: new Date(),
              endTrialDate: addDays(new Date(), 30),
            },
          });
          console.log(" Utilisateur créé en base :", userId);
        } else {
          console.log("ℹUtilisateur déjà présent en base :", userId);
        }

        break;
      }

      case "user.updated": {
        console.log(" Event : user.updated");

        const updatedUser = await db.user.findUnique({ where: { id: userId } });
        if (!updatedUser) {
          console.log("ℹUtilisateur mis à jour non trouvé. Création...");
          await db.user.create({
            data: {
              id: userId,
              isSubscribed: false,
              createdAt: new Date(),
              endTrialDate: addDays(new Date(), 30),
            },
          });
        } else {
          console.log("Utilisateur existe déjà. Pas de mise à jour prévue pour l’instant.");
        }

        break;
      }

      case "user.deleted": {
        console.log("Event : user.deleted");

        await db.user.delete({ where: { id: userId } });
        console.log("🗑️ Utilisateur supprimé de la base :", userId);
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
