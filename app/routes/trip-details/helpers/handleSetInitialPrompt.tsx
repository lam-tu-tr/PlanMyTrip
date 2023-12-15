import { capitalizeWords } from "@/helpers/helper-functions";
import { Message, DestinationType } from "@/helpers/types";

export function handleSetInitialPrompt(
  destination: DestinationType
): Message[] {
  return [
    {
      role: "system",
      content:
        "You are TripGPT, you create itineraries for the user based on chosen destination and date range. You will give me a JSON itinerary that has a list of fun attractions and food locations. Make sure that the locations are within 5 miles of each other so that the user won't have to drive long distances between locations",
    },
    {
      role: "user",
      content: `Create a detailed itinerary for my trip to ${capitalizeWords(
        destination.name
      )} from ${destination.start_date} to ${
        destination.end_date
      }.  Give a number of options that users can choose. The number of locations should be equal to ((duration + 1) * 3 + 5 ).

      
      Give the itinerary in this JSON format.
      {
        description: short paragraph describing destination
        duration: duration + 1 , 
        locations: {
            (location-name):{ 
            description: brief sentence that describe the location,
            emoji: give 1 emoji that best describe the location,
            coordinate: [longitude, latitude]
          }
        }
      }`,
    },
  ];
}

// export function handleSetInitialPrompt(
//   destination: DestinationType
// ): Message[] {
//   return [
//     {
//       role: "system",
//       content:
//         "You are TripGPT, you create itineraries for the user based on chosen destination and date range. You will give me the itinerary in an ordered list that has fun attractions and food locations for morning, midday and evening. The format for the ordered list answer is: Date, location and time of day in one new line, things to do as bullet list. Make sure that the locations on the same day are within 5 miles of each other so that the user won't have to drive long distances each day.",
//     },
//     {
//       role: "user",
//       content: `Create a detailed itinerary for my trip to ${capitalizeWords(
//         destination.name
//       )} from ${destination.start_date} to ${
//         destination.end_date
//       }. Structure the itinerary for each day: Start with "Day X - [Date]" and divide it into different time slots (e.g., Morning, Midday, Evening). Each location should have an emoji associated with it that best describes the location. Give the result in an indented list style using HTML elements <div class="ai-day">
//         <h2 class="ai-date" >Day X - [Date] </h2>
//         <aside>
//           <h2 class="timeofday">Morning</h2> \- <a  class="ai-location" rel="noopener noreferrer" target="_blank" href="https://google.com/search?q={location}"> location </a>
//           <span class="emoji">emoji</span>
//         </aside>
//         <ul class="ai-list">
//           <li>description</li>
//         </ul>
//         <aside>
//           <h2 class="timeofday">Midday</h2> \- <a  class="ai-location" rel="noopener noreferrer" target="_blank" href="https://google.com/search?q={location}"> location</a>
//           <span class="emoji">emoji</span>
//         </aside>
//         <ul class="ai-list">
//           <li>description</li>
//         </ul>
//         <aside>
//           <h2 class="timeofday">Evening</h2> \- <a  class="ai-location" rel="noopener noreferrer" target="_blank" href="https://google.com/search?q={location}"> location</a>
//           <span class="emoji">emoji</span>
//         </aside>
//         <ul class="ai-list">
//           <li>description</li>
//         </ul>
//       </div>. Wrap the whole ai response inside a <div class="ai-text"></div>.
//       Note that each ai-day contains Morning-Midday-Evening timeofday`,
//     },
//   ];
// }
