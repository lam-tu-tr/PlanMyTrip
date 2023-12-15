import React from "react";
import Link from "next/link";

import { TripCardType } from "@/helpers/types";

import { TripDeleteButton } from "./TripDeleteButton/TripDeleteButton";

import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

import styles from "./TripCard.module.scss";
import dayjs from "dayjs";

type TripCardProps = {
  trip: TripCardType;
};

export function TripCard({ trip }: TripCardProps) {
  return (
    <li className={styles.card}>
      <Link href={`/routes/trip?id=${trip.id}`} className={styles.card_link}>
        <div>
          <span>
            <FaLocationDot />
          </span>
          <p>{trip.destination}</p>
        </div>
        <div>
          <span>
            <FaRegCalendarAlt />
          </span>
          <p>
            {dayjs(trip.start_date).format("MMM DD, YYYY")} -{"  "}
            {dayjs(trip.end_date).format("MMM DD, YYYY")}
          </p>
        </div>
      </Link>
      <TripDeleteButton trip_id={trip.id} />
    </li>
  );
}
