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
  // console.log("messagePayload: " + typeof messagePayload);
  // console.log("aiMessage: " + typeof aiMessage);
  // console.log("destList: " + typeof destList);
  // console.log("bbox: " + typeof bbox);

  console.log("Post trip to db");
  const res = await prisma.tripList.create({
    data: {
      user: {
        connect: {
          username: username,
        },
      },
      aiMessage: aiMessage,
      destList: destList,
      bbox: bbox,
      startDate: startDate,
      endDate: endDate,
    },
  });
  // console.log("res: " + JSON.stringify(res, null, 2));
  // console.log("user: " + JSON.stringify(user, null, 2));

  return NextResponse.json({ status: 200, tripId: res.tripId });
}
