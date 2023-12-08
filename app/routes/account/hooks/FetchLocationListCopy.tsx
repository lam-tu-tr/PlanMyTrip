import { toastError } from "@/helpers/toast";
import { CardProps, destType } from "@/helpers/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import React, { SetStateAction, useEffect } from "react";

export default async function GetLocationListCopy() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ status: 400, error: "Not Logged In" });
  }
  try {
    // const res = await fetch("../../../api/trip/getUserTrips", {
    const res = await fetch("http://localhost:3000/api/trip/getUserTrips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: user.email,
      }),
    });

    if (!res.ok) throw new Error("Failed to Init Variables");

    const { tripInfo } = await res.json();
    console.log("tripInfo", tripInfo);
    return tripInfo;
    // setDestItems(tripInfo);
  } catch (err) {
    // toastError("Couldnt get itineraries from server");
    console.log(err);
  }
}
