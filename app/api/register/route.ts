import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    email,
    name,
    password
  } = body;

  if(name.toLowerCase().includes('admin') || email.toLowerCase().includes('admin')){
    return new NextResponse('Name or Email do not contain admin', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  });

  return NextResponse.json(user);
}
