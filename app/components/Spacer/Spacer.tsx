import React from "react";
import "./Spacer.scss";

type CardSpacerType = {
  type: string;
};

export function Spacer({ type }: CardSpacerType) {
  return <div className="separator">{type == "dashed" && <span></span>}</div>;
}
