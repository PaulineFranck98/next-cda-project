import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
	try {
		const prices = await db.location.aggregate({
			_min: { minPrice: true },
			_max: { maxPrice: true },
		});

		const minPrice = prices._min?.minPrice ?? 0;
		const maxPrice = prices._max?.maxPrice ?? 0;

		return NextResponse.json({ minPrice, maxPrice });
	} catch (error) {
		console.error("[PRICE_RANGE]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}