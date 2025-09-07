import { getUploadAuthParams } from "@imagekit/next/server";
import Imagekit from "imagekit";
import {  NextResponse } from "next/server";

const imagekit = new Imagekit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Never expose this on client side
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function GET() {
  try {
    // const authenticationParameters = getUploadAuthParams({
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Never expose this on client side
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });

    return Response.json({
      token,
      expire,
      signature,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    return Response.json(
      { error: "Authentication for Imagekit Failed" },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { fileId } = await req.json();
    const response = await new Promise((resolve, reject) => {
      imagekit.deleteFile(fileId, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    console.log(response);
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error(error);
  }
}
