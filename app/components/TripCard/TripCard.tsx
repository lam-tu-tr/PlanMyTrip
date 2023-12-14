import React from "react";
import Link from "next/link";

import { TripCardType } from "@/helpers/types";

import { TripDeleteButton } from "./TripDeleteButton/TripDeleteButton";

import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

import styles from "./TripCard.module.scss";
import dayjs from "dayjs";

type TripCardProps = {
  card: TripCardType;
};

export function TripCard({ card }: TripCardProps) {
  return (
    <li className={styles.card}>
      <Link href={`/routes/trip?id=${card.id}`} className={styles.card_link}>
        <div>
          <span>
            <FaLocationDot />
          </span>
          <p>{card.destination}</p>
        </div>
        <div>
          <span>
            <FaRegCalendarAlt />
          </span>
          <p>
            {dayjs(card.start_date).format("MMM DD, YYYY")} -{"  "}
            {dayjs(card.end_date).format("MMM DD, YYYY")}
          </p>
        </div>
      </Link>
      <TripDeleteButton trip_id={card.id} />
    </li>
  );
}
