import { toastError } from "@/helpers/toast";
import { destType } from "@/helpers/types";
import React, { SetStateAction, useEffect } from "react";

interface UseGetLocationListProps {
  setDestItems: React.Dispatch<React.SetStateAction<destType[]>>;
}

export default function useGetLocationList({
  setDestItems,
}: UseGetLocationListProps) {
  useEffect(() => {
    async function initVars() {
      setDestItems([]);

      try {
        // const userFromStorage =
        //   isWindow && window.sessionStorage.getItem("currentUser");
        const res = await fetch("../../api/trip", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // dbPayload: userFromStorage,
            type: "getAllList",
          }),
        });

        if (!res.ok) throw new Error("Failed to Init Variables");

        const { tripInfo } = await res.json();
        setDestItems(tripInfo);

        console.log("finished data transfer");
      } catch (err) {
        toastError("Couldnt transfer data to server");
      }
    }

    initVars();
  }, [setDestItems]);
  return <></>;
}
