import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { db } from "@/lib/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { publicId } = body;

    if (!publicId) {
      return new NextResponse("Missing publicId", { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {

         await db.image.deleteMany({
            where: {
                imageName: {
                contains: publicId, 
                },
            },
        });
      return NextResponse.json({ success: true });
    } else {
      return new NextResponse("Failed to delete", { status: 500 });
    }
  } catch (error) {
    console.error("[DELETE_IMAGE_ERROR]", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
