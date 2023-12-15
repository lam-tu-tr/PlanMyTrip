"use client";
import React from "react";
import { handleDeleteDestination } from "./handleDeleteDestination/handleDeleteDestination";
import { TiDelete } from "react-icons/ti";

type TripDeleteButtonProp = {
  trip_id: string;
};

export function TripDeleteButton({ trip_id }: TripDeleteButtonProp) {
  return (
    <button
      onClick={() => {
        handleDeleteDestination(trip_id);
      }}
    >
      <TiDelete className="w-8 h-8" />
    </button>
  );
}
