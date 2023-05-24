// import { PrismaClient } from "@prisma/client";
// // const prisma = new PrismaClient();

import React from "react";
import TripForm from "./components/TripForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 h-full">
      <TripForm />
    </main>
  );
}
