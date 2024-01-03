import React from "react";
import "./GenerateButton.scss";
interface ButtonProps {
  endDate: string; // Specify the type of the endDate prop
}

export function GenerateButton({ endDate }: ButtonProps) {
  console.log(endDate);
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
