import React from "react";
import styles from "./LocationCard.module.scss";
import { CardProps } from "@/helpers/types";
import { redirect } from "next/navigation";
import Link from "next/link";

type AccountCardProps = {
  cardItem: CardProps;
};

export default function LocationCard({ cardItem }: AccountCardProps) {
  return (
    <li className={`${styles.card}`}>
      <Link
        href={`/routes/trip?id=${cardItem.id}`}
        className={styles.card_link}
      >
        {/* <input type="hidden" required name="tripId" value={cardItem.id} /> */}
        <p>{cardItem.destination_name}</p>
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
