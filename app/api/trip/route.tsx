//*
//*Handle account data CRUD to PlanetScale using Prisma
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { destType, destTypeTemp } from "@/app/helpers/types";

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("inside POST");
  const { dbPayload, type } = await req.json();
  console.log("payload: " + dbPayload);
  let res = "";
  let tripInfo;

  if (type === "create") {
    console.log("Post trip to db");
    const temp = await prisma.tripList.create({
      data: {
        user: {
          connect: {
            username: dbPayload.username,
          },
        },
        aiMessage: dbPayload.aiMessage,
        destList: dbPayload.destList,
        bbox: dbPayload.bbox,
        startDate: dbPayload.startDate,
        endDate: dbPayload.endDate,
      },
    });
    res = temp.id;
  } else if (type === "getTrip") {
    console.log("get Trip");
    const temp = await prisma.tripList.findUnique({
      where: {
        id: dbPayload,
      },
    });
    tripInfo = temp;
  }

  return NextResponse.json({ status: 200, tripId: res, tripInfo: tripInfo });
}
