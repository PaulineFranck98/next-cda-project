import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { discountId, locationId, isActive } = await req.json();

    if (isActive) {

      await db.discount.updateMany({
        where: {
          locationId: locationId,
        },
        data: {
          isActive: false,
        },
      });
    }


    await db.discount.update({
      where: {
        id: discountId,
      },
      data: {
        isActive: isActive,
      },
    });

    return NextResponse.json({ message: "Discount updated successfully." });
  } catch (error) {
    console.log("[ACTIVATE_DISCOUNT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
