import React from "react";
import Link from "next/link";

import { LocationInfoType } from "@/helpers/types";

import styles from "./LocationCard.module.scss";

type TripCardProps = {
  name: string;
  info: LocationInfoType;
};

export function LocationCard({ name, info }: TripCardProps) {
  return (
    <li className={`${styles.card} location-card`}>
      <Link href={`location`} className={styles.card__link}>
        <div className={styles.link__info}>
          <div>{info.emoji}</div>
          <span>
            <h3>{name}</h3>
            <p>{info.description}</p>
          </span>
        </div>
      </Link>
    </li>
  );
}
