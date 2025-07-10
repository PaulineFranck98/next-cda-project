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
    console.log("Webhook reçu");

    const headers = Object.fromEntries(req.headers.entries());
    console.log(" Headers reçus :", headers);

    const body = await req.json();
    console.log(" Corps JSON reçu :", JSON.stringify(body, null, 2));

    const id = body.data?.id;
    console.log("🆔 ID utilisateur Clerk reçu :", id);

    if (!id) {
      console.error("Aucun ID utilisateur fourni dans les données Clerk.");
      return NextResponse.json({ error: "No user id" }, { status: 400 });
    }

    let dbUser = await db.user.findUnique({ where: { id } });

    if (!dbUser) {
      console.log("👤 Utilisateur non trouvé en base. Création en cours...");
      dbUser = await db.user.create({
        data: {
          id,
          isSubscribed: false,
          createdAt: new Date(),
          endTrialDate: addDays(new Date(), 30),
        },
      });
      console.log("Utilisateur créé avec succès :", dbUser);
    } else {
      console.log("Utilisateur déjà existant :", dbUser);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(" Erreur pendant le traitement du webhook :", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}