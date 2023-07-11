//*
//*--------------------------/trip?destination=___ & date=______------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { destType } from "../../helpers/types";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "@/app/Context";
import { useRouter } from "next/navigation";

//DO NOT make a page function an async function
export default function Trip() {
  //*================================================================================
  //*States declarations */
  const { isWindow, setIsWindow } = useGlobalContext();
  const [destItems, setDestItems] = useState<destType[]>([]);

  console.log(JSON.stringify(destItems, null, 2));
  const router = useRouter();

  function handleGoToTrip() {
    useRouter;
  }

  //*................................USE EFFECTS..................................... */

  useEffect(() => {
    async function initVars() {
      setDestItems([]);
      try {
        const userFromStorage =
          isWindow && window.sessionStorage.getItem("currentUser");
        if (userFromStorage) {
          const res = await fetch("../../api/trip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dbPayload: userFromStorage,
              type: "getAllList",
            }),
          });

          if (!res.ok) throw new Error("Failed to Init Variables");

          const { tripInfo } = await res.json();
          // console.log("tripInfo: " + JSON.stringify(tripInfo, null, 2));
          setDestItems(tripInfo);
          // tripInfo.map((trip: any) => {
          //   return setDestItems((prev) => [...prev, trip]);
          // });

          console.log("finished data transfer");
        }
      } catch (err) {
        alert(err);
      }
    }

    initVars();
  }, [isWindow]);

  return (
    <div
      id="account"
      className=" flex flex-col justify-center items-center p-12 bg-gradient-to-r from-fuchsia-500 to-cyan-500"
    >
      <section className="flex flex-col justify-start items-center overflow-y-auto h-5/6 w-5/6 p-5">
        {destItems.map((trip) => (
          <aside
            key={uuidv4()}
            className="flex flex-row justify-between border-2 rounded-md p-5 m-3 text-xl w-5/6 cursor-pointer "
            onClick={() => {
              router.push(`/r/tripId?tripId=${trip.tripId}`);
            }}
          >
            <span>{trip.destName.split(",")[0].trim()}</span>
            <span>
              {trip.startDate} - {trip.endDate}
            </span>
          </aside>
        ))}
      </section>
    </div>
  );
}
