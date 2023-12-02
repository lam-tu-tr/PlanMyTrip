//*
//TODO Not needed anymore since supabase nextauth??
//*Handle account data CRUD to PlanetScale using Prisma
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { dbPayload, type } = await req.json();
  console.log(dbPayload);
  let user = null;
  if (type === "createAccount") {
    const newUser = await prisma.user.create({
      data: {
        username: dbPayload.username,
        password: dbPayload.password,
      },
    });
  } else if (type === "login") {
    user = await prisma.user.findUnique({
      where: {
        username_password: {
          username: dbPayload.username,
          password: dbPayload.password,
        },
      },
    });
    console.log("user: " + JSON.stringify(user, null, 2));
  }

  return NextResponse.json({ status: 200, user: user });
}
