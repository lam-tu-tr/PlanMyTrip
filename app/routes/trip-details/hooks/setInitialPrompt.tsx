import { capitalizeWords } from "@/helpers/helper-functions";
import { Message, destType } from "@/helpers/types";

export default function setInitialPrompt(dest: destType): Message[] {
  return [
    {
      role: "system",
      content:
        "You are TripGPT, you create itineraries for the user based on chosen destination and date range. You will give me the itinerary in an ordered list that has fun attractions and food locations for morning, midday and evening. The format for the ordered list answer is: Date, location and time of day in one new line, things to do as bullet list ",
    },
    {
      role: "user",
      content: `Create a detailed itinerary for my trip to ${capitalizeWords(
        dest.destName
      )} from ${dest.startDate} to ${
        dest.endDate
      }. Make sure that the destinations are all within a city distance and that destinations within the same day are within 10 miles of each other so that the user won't have to drive long distances each day.  Structure the itinerary for each day: Start with "Day X - [Date]" and divide it into different time slots (e.g., Morning, Midday, Evening).  Give the result in an indented list style using HTML elements <div class="ai-snap-section"><h2 class="ai-date" >date</h2> <aside> <h2 class="timeofday">time of day </h2> \- <a  class="ai-location" rel="noopener noreferrer" target="_blank" href="https://google.com/search?q={location}"> location</a></aside><ul class="ai-list"><li>description</li></ul></div>. Wrap the whole ai response inside a <div class="ai-text"></div>. `,
    },
  ];
}
