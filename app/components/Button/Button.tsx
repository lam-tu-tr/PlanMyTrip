import React from "react";
import "./Button.scss";
interface ButtonProps {
  endDate: string; // Specify the type of the endDate prop
}

export default function Button({ endDate }: ButtonProps) {
  return (
    <button

      className={`home-button submit-button  ${
        endDate.length !== 0 ? "submit-highlight " : ""
      }`}
      title="Generate Itinerary"
      type="submit"
    >
      <div className="glow-on-hover">Generate Itinerary</div>

    </button>
  );
}