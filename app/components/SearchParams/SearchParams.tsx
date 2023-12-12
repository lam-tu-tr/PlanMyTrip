import React from "react";

type Params = {
  params: {
    destination_name: string;
    start_date: string;
    end_date: string;
    bbox: string;
  };
};

//hidden input to set date querystring upon submission
export function SearchParams({ params }: Params) {
  return (
    <>
      {Object.entries(params).map(([key, value], index) => (
        <input type="hidden" required name={key} value={value} key={index} />
      ))}
    </>
  );
}
