//*
//*Handle account data CRUD to PlanetScale using Prisma
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
  const {
    username,
    messagePayload,
    aiMessage,
    destList,
    bbox,
    startDate,
    endDate,
  } = await req.json();
  // console.log("dbPayload" + JSON.stringify(dbPayload, null, 2));

  // const res = await prisma.user.create({

  // });

  // console.log("user: " + JSON.stringify(user, null, 2));

  return NextResponse.json({ status: 200 });
}
