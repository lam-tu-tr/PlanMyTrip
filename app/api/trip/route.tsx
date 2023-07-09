//*
//*Handle account data CRUD to PlanetScale using Prisma
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("inside POST");
  const { dbPayload, type } = await req.json();
  console.log("payload: " + dbPayload);
  let res = "";
  let tripInfo;

  switch (type) {
    case 'create':
    const createRes = await prisma.tripList.create({
      data: {
        user: {
          connect: {
            username: dbPayload.username,
          },
        },
        destName: dbPayload.destName,
        aiMessage: dbPayload.aiMessage,
        destList: dbPayload.destList,
        bbox: dbPayload.bbox,
        startDate: dbPayload.startDate,
        endDate: dbPayload.endDate,
      },
    });
    res = createRes.id;

    case 'getTrip':
      const getTripRes = await prisma.tripList.findUnique({
        where: {
          id: dbPayload,
        },
      });
      tripInfo = getTripRes;
    
    case 'getAllList':
      console.log('getting all list')
      //*returns array of trips
      const getAllTripRes = await prisma.tripList.findMany({
        where: {
          userTrip: dbPayload
        }
      })
      tripInfo = getAllTripRes
  } 


  return NextResponse.json({ status: 200, tripId: res, tripInfo: tripInfo });
}
