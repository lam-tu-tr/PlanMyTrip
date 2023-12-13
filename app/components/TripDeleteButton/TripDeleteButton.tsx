"use client";
import React from "react";
import { handleDeleteDestination } from "../LocationCard/handleDeleteDestination/handleDeleteDestination";
import { TiDelete } from "react-icons/ti";

type TripDeleteButtonProp = {
  trip_id: string;
};

export function TripDeleteButton({ trip_id }: TripDeleteButtonProp) {
  return (
    <button
      onClick={(e) => {
        handleDeleteDestination(trip_id);
      }}
    >
      <TiDelete className="w-6 h-6" />
    </button>
  );
}
