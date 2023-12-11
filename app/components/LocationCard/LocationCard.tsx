import React from "react";
import styles from "./LocationCard.module.scss";
import { CardTripInfoType } from "@/helpers/types";
import Link from "next/link";

type AccountCardProps = {
  cardItem: CardTripInfoType;
};

export function LocationCard({ cardItem }: AccountCardProps) {
  return (
    <li className={`${styles.card}`}>
      <Link
        href={`/routes/trip?id=${cardItem.id}`}
        className={styles.card_link}
      >
        <p>
          <span>{cardItem.destination_name}</span>
          <span></span>
        </p>
        <p>
          From: <br />
          {cardItem.start_date}
          <br />
          To: <br />
          {cardItem.end_date}
        </p>
      </Link>
    </li>
  );
}
