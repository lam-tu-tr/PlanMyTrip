//*
//*--------------------------/trip?destination=___ & date=______------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { destType } from "../../helpers/types";
import { v4 as uuidv4 } from 'uuid';


//DO NOT make a page function an async function
export default function Trip() {
  //*================================================================================
  //*States declarations */
  
  const [destItems, setDestItems] = useState<destType[]>([]);
  console.log(destItems)
  const currentUser = sessionStorage.getItem('currentUser')
  console.log('currentUser in Triplist: ' + currentUser)
  //*................................USE EFFECTS..................................... */


  useEffect(() => {
    async function initVars() {
      setDestItems([])
      try {
        const res = await fetch("../../api/trip", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dbPayload: currentUser,
            type: "getAllList",
          }),
        });

        if (!res.ok) throw new Error("Failed to Init Variables");

        const { tripInfo } = await res.json();

        tripInfo.map((trip:any) => {
          return (
            setDestItems((prev) => ([
              ...prev,
              trip
            ]))
          )
        })

        console.log('finished data transfer')

      } catch (err) {
        alert(err);
      }
    }

    initVars();
  }, [currentUser]);

  return (
    <div
      id="account"
      className=" flex flex-col justify-center items-center p-12 bg-gradient-to-r from-fuchsia-500 to-cyan-500"
    >
      <section className="flex flex-col justify-center items-center overflow-auto h-5/6 w-5/6">
        {destItems.map((trip) => (
          <aside key={uuidv4()} className="flex flex-row justify-between border rounded-md p-5 m-3 text-xl w-5/6 ">
            <span>{trip.destName.split(',')[0].trim()}</span>
            <span>{trip.startDate} - {trip.endDate}</span>

          </aside>
        ))}
      </section>
      
    </div>
  );
}
