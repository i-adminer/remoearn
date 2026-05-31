import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(_request: Request) {
  const body = await _request.json().catch(() => ({}));
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!apiKey || !apiSecret || !cloudName) {
    return NextResponse.json({ error: "Cloudinary env vars are missing" }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = body?.folder ?? "remoearn";
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, apiSecret);

  return NextResponse.json({
    timestamp,
    signature,
    apiKey,
    cloudName,
    folder,
  });
}
