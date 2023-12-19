import React from "react";
import Link from "next/link";

import { LocationType } from "@/helpers/types";

import styles from "./LocationCard.module.scss";
import { Spacer } from "../Spacer/Spacer";
import { Skeleton } from "../ui/skeleton";

type TripCardProps = {
  locations: LocationType | null;
};

export function LocationCard({ locations }: TripCardProps) {
  if (locations == null) return PlaceHolder;

  return (
    <ul>
      {Object.entries(locations).map(([name, info], index) => (
        <li className={`${styles.card} location-card`} key={index}>
          <Spacer type="dashed" />

          <Link href={`location`} className={styles.card__link}>
            <div className={styles.link__info}>
              <div className={styles.info__emoji}>{info.emoji}</div>
              <span className={styles.info__description}>
                <h3>{name}</h3>
                <div>{info.description}</div>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const PlaceHolder = (
  <ul>
    {Array.from({ length: 3 }, (_, index) => {
      return (
        <li className={`${styles.card} location-card`} key={index}>
          <Spacer type={"dashed"} />

          <section className={styles.card__link}>
            <div className={styles.link__info}>
              <div className={styles.info__emoji}>
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              <span className={`w-full ${styles.info__description}`}>
                <h3>
                  <Skeleton className="w-[50%] h-6" />
                </h3>
                <div className="space-y-2 mt-2">
                  <Skeleton className="w-[100%] h-4" />
                  <Skeleton className="w-[100%] h-4" />
                </div>
              </span>
            </div>
          </section>
        </li>
      );
    })}
  </ul>
);
