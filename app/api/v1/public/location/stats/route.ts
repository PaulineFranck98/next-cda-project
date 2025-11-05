import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
	try {
		const now = new Date();
		const oneWeekAgo = new Date(now);
		oneWeekAgo.setDate(now.getDate() - 7);

		const twoWeeksAgo = new Date(now);
		twoWeeksAgo.setDate(now.getDate() - 14);

		const total = await db.location.count();

		const thisWeek = await db.location.count({
			where: {
				createdAt: {
					gte: oneWeekAgo
				}
			}
		});

		const lastWeek = await db.location.count({
			where: {
				createdAt: {
					gte: twoWeeksAgo,
					lt: oneWeekAgo
				}
			}
		});

		const latest = await db.location.findMany({
			orderBy: { createdAt: "desc" },
			take: 5,
			select: {
				id: true,
				locationName: true,
				city: true,
				createdAt: true
			}
		});

		return NextResponse.json({total, thisWeek, lastWeek, latest });
	} catch (error) {
		console.error("[LOCATION_STATS_ERROR]", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération des statistiques" },
			{ status: 500 }
		);
	}
}
