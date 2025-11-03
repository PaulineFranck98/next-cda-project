import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: Promise<{ zipcode: string}>}) {
  try {
		const { zipcode } = await params;

		if (!zipcode) {
		return NextResponse.json({ error: "Code postal requis" }, { status: 400 });
		}

		const locations = await db.location.findMany({
			where: {
			zipcode: {
				startsWith: zipcode, 
			},
			// isApproved: true,
			// isActive: true,
			},
			select: {
				id: true,
				locationName: true,
				city: true,
				zipcode: true,
				latitude: true,
				longitude: true,
				type: { 
					select: { 
						typeName: true 
					}
				},
				images: {
                    take: 1,
                    select: { imageName: true },
                },
			},
		take: 50,
		});

		return NextResponse.json({ data: locations }, { status: 200 });
	} catch (error) {
		console.error("Erreur API by-zipcode:", error);
		return new NextResponse( "Erreur serveur", { status: 500 });
    }
}
