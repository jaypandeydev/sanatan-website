import { NextResponse } from "next/server";

export const GET = async () => {
  const imageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new%20logo-22Z6C8rDLhWgn5zxYjZhcrU29cavNW.png";

  const response = await fetch(imageUrl);
  const imageBuffer = await response.arrayBuffer();

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable", // Optional: Cache control
    },
  });
};
