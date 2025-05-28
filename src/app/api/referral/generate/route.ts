// app/api/referral/generate/route.ts (or wherever your Next.js API route is)

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  // Query by firebase_uid
  const user = await prisma.users.findUnique({ where: { firebase_uid: userId } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  let referral_code = user.referral_code;

  if (!referral_code) {
    referral_code = `${user.username?.toLowerCase().replace(/\s+/g, "")}${Math.floor(1000 + Math.random() * 9000)}`;
    await prisma.users.update({
      where: { id: user.id },
      data: { referral_code },
    });
  }

  const referral_link = `http://localhost:3000/signup?ref=${referral_code}`;

  return NextResponse.json({ referral_code, referral_link });
}
