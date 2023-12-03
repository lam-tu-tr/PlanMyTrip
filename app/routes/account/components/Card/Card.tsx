import React from "react";
import styles from "./Card.module.scss";
import { CardProps } from "@/helpers/types";

type AccountCardProps = {
  destItems: CardProps[];
};

export default function Card({ destItems }: AccountCardProps) {
  //fetch trip list from server
  return (
    <>
      {destItems.map((card, index) => {
        return (
          <div key={index} className={`${styles.card}`}>
            <p>
              #05 <br />
              {card.destination_name}
              <br />
              34.05° N <br />
              118.24° W
            </p>
            <p>
              From: <br />
              {card.start_date}
              <br />
              To: <br />
              {card.end_date}
            </p>
          </div>
        );
      })}
    </>
  );
}
