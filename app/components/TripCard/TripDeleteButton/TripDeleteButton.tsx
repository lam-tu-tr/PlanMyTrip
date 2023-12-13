"use client";
import React from "react";
import { handleDeleteDestination } from "./handleDeleteDestination/handleDeleteDestination";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/navigation";

type TripDeleteButtonProp = {
  trip_id: string;
};

export function TripDeleteButton({ trip_id }: TripDeleteButtonProp) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        handleDeleteDestination(trip_id);
        router.refresh();
      }}
    >
      <TiDelete className="w-8 h-8" />
    </button>
  );
}
