import React from "react";
import Link from "next/link";

import { CardTripInfoType } from "@/helpers/types";
import { TiDelete } from "react-icons/ti";

import { handleDeleteDestination } from "./handleDeleteDestination/handleDeleteDestination";

import styles from "./LocationCard.module.scss";
import { TripDeleteButton } from "../TripDeleteButton/TripDeleteButton";
type AccountCardProps = {
  cardItem: CardTripInfoType;
};

export function LocationCard({ cardItem }: AccountCardProps) {
  return (
    <li className={styles.card}>
      <Link
        href={`/routes/trip?id=${cardItem.id}`}
        className={styles.card_link}
      >
        <div className={styles.destination}>
          <p>{cardItem.destination_name}</p>
        </div>
        <div className={styles.dates}>
          <p>
            From: <br />
            {cardItem.start_date}
          </p>
          <p>
            To: <br />
            {cardItem.end_date}
          </p>
        </div>
      </Link>
      <TripDeleteButton trip_id={cardItem.id} />
    </li>
  );
}
