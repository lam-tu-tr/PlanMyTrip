import { toastError } from "@/helpers/toast";
import { CardProps, destType } from "@/helpers/types";
import React, { SetStateAction, useEffect } from "react";

interface UseFetchLocationListProps {
  setDestItems: React.Dispatch<React.SetStateAction<CardProps[]>>;
}

export default function useGetLocationList({
  setDestItems,
}: UseFetchLocationListProps) {
  useEffect(() => {
    async function initVars() {
      setDestItems([]);

      try {
        const res = await fetch("../../api/trip/getUserTrips", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to Init Variables");

        const { tripInfo } = await res.json();
        setDestItems(tripInfo);
      } catch (err) {
        toastError("Couldnt get itineraries from server");
      }
    }

    initVars();
  }, [setDestItems]);
}
