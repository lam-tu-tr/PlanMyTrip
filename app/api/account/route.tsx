//*
//*Handle account data CRUD to PlanetScale using Prisma
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("Inside Account Post Req");

  console.log("current list " + req.body);
  const funcInput = await req.json();
  console.log(funcInput);
  // const user = await prisma.user.create({
  //   data: {
  //     username:
  //   }
  // })
  // try {
  // let returnedItem: any;
  // if (req.body.form.task) {
  //   console.log("form task" + req.body.form.task);
  //   returnedItem = await prisma.list.create({
  //     data: {
  //       task: req.body.form.task,
  //       user: {
  //         connect: { id: req.body.currentList },
  //       },
  //     },
  //   });
  // } else if (req.body.form.listName) {
  //   console.log("form firstname: " + req.body.form.listName);
  //   returnedItem = await prisma.user.create({
  //     data: {
  //       firstName: req.body.form.listName,
  //     },
  //   });
  // }

  return NextResponse.json({ status: 200 });
}
