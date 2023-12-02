//*
//*Handle account data CRUD to PlanetScale using Prisma
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import supabase from "@/supabase/supabaseClient";

import { getServerSession } from "next-auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { dbPayload, type } = await req.json();
  const session = await getServerSession();
  const user = session?.user;

  console.log("session", session);
  let res = "";
  let tripInfo;

  if (!user) {
    console.error("Not logged in");
    return NextResponse.json({ status: 400 });
  }
  switch (type) {
    case "create":
      const { error } = await supabase.from("trip").insert({
        users_email: user.email,
        destination_name: dbPayload.destName,
        ai_response: dbPayload.aiMessage,
        location_list: dbPayload.destList,
        bbox: dbPayload.bbox,
        start_date: dbPayload.startDate,
        end_date: dbPayload.endDate,
        created_date: new Date(),
      });
      if (error) throw error;
      // const createRes = await prisma.tripList.create({
      //   data: {
      //     user: {
      //       connect: {
      //         username: dbPayload.username,
      //       },
      //     },
      //     destName: dbPayload.destName,
      //     aiMessage: dbPayload.aiMessage,
      //     destList: dbPayload.destList,
      //     bbox: dbPayload.bbox,
      //     startDate: dbPayload.startDate,
      //     endDate: dbPayload.endDate,
      //   },
      // });
      // res = createRes.tripId;
      break;
    case "getTrip":
      console.log("in getTrip");
      const getTripRes = await prisma.tripList.findUnique({
        where: {
          tripId: dbPayload,
        },
      });
      tripInfo = getTripRes;

      break;
    case "getAllList":
      //*returns array of trips
      const getAllTripRes = await prisma.tripList.findMany({
        where: {
          userTrip: dbPayload,
        },
        orderBy: {
          dateCreated: "desc",
        },
      });
      tripInfo = getAllTripRes;
      break;
  }

  return NextResponse.json({ status: 200, tripId: res, tripInfo: tripInfo });
}
