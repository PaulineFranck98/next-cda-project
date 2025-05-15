import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const locationId = formData.get("locationId") as string;
    const images = formData.getAll("images") as File[];

    if (!locationId || images.length === 0) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const uploadResults: string[] = [];

    for (const file of images) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
          if (error || !result) return reject(error);
          resolve({ secure_url: result.secure_url, public_id: result.public_id });
        });
        stream.end(buffer);
      });

      await db.image.create({
        data: {
          imageName: result.secure_url,
          locationId,
        },
      });

      uploadResults.push(result.secure_url);
    }

    return NextResponse.json({ uploaded: uploadResults }, { status: 201 });
  } catch (error) {
    console.error("[UPLOAD_IMAGE_ERROR]", error);
    return new NextResponse("Erreur lors de l'upload", { status: 500 });
  }
}
