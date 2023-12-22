"use client";
import React from "react";
import { handleDeleteDestination } from "./handleDeleteDestination/handleDeleteDestination";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { toastSuccess } from "@/helpers/toast";

type TripDeleteButtonProp = {
  trip_id: string;
};

export function TripDeleteButton({ trip_id }: TripDeleteButtonProp) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        let deleted = await handleDeleteDestination(trip_id);
        if (deleted) {
          toastSuccess("Trip Deleted Successfully");
          router.refresh();
        }
      }}
    >
      <TiDelete className="w-8 h-8" />
    </button>
  );
}
