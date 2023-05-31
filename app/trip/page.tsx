//--------------------------/trip?destination=___ & date=______------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { handleSubmitPrompt } from "../helpers/handleSubmitPrompt";

import { CapitalizeWords } from "../helpers/small_functions";

//DO NOT make a page function an async function
export default function Trip() {
  const destination = useSearchParams().get("destination");
  const startDate = useSearchParams().get("startDate");
  const endDate = useSearchParams().get("endDate");
  const [userMessage, setUserMessage] = useState("");
  const [AiMessage, setAiMessage] = useState(
    "Sure, here's your itinerary for your trip to Los Angeles from Jun 12, 2023 to Jun 16, 2023: 1. Jun 12, 2023 - Hollywood - Visit the Hollywood Walk of Fame and see the stars of famous celebrities - Take a tour of the TCL Chinese Theatre and see the handprints and footprints of famous actors - Hike up to the Hollywood Sign for a great view of the city 2. Jun 13, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi est modi architecto repudiandae distinctio soluta sed ipsam suscipit? Cumque nam nobis voluptate totam, cupiditate ratione accusamus officia ab qui. Quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo at aperiam rerum quod. Porro eligendi perferendis quam necessitatibus, consequuntur aliquam corrupti nihil? Consectetur facere vero beatae sequi dolor. Maxime, ut Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere inventore sit, corporis, nulla autem facilis sapiente tempore enim, fugit consectetur voluptates aliquam vel perferendis! Perspiciatis voluptatum quibusdam dolores odit! Numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, voluptate. Eum quaerat nostrum iste iusto, repellat similique quod fugiat dolores necessitatibus praesentium repellendus repudiandae, eos itaque possimus labore dolor. Maiores? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum maiores dolore officia eos dolores consectetur, deleniti at! Illo, corporis unde nesciunt tempore ducimus, molestiae, accusamus cumque beatae fugit facilis ea! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus asperiores quia facilis fuga at totam repellat adipisci? Quam tempora optio eos aspernatur voluptates ea perferendis non, tenetur ipsam. Architecto, sequi? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere assumenda eum ea consequatur exercitationem sapiente quod magnam ipsam pariatur perferendis culpa porro temporibus excepturi, accusantium officiis perspiciatis laboriosam numquam alias. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum necessitatibus explicabo odio laborum quos molestias nulla quidem minima qui! Possimus architecto repellendus dolorem ullam, explicabo dignissimos. Similique ex corrupti tenetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, molestias nihil sed qui laborum illum iste eligendi rem. Dolor soluta blanditiis eos id beatae nulla atque et odio molestias nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ducimus cumque quo modi voluptatum odit aliquid tempore. Quia repellendus illum recusandae praesentium iure. Veniam ut qui quisquam, impedit ad quam? "
  );
  const [messagePayload, setMessagePayload] = useState([
    {
      role: "system",
      content:
        "You are TripGPT, you create itineraries for the user based on chosen destination and date range. You will give me the itinerary in an ordered list in this order: date>location> 3 things to do. The format for the answer is Date - Location and bullet list of things to do",
    },
    {
      role: "user",
      content: `Create an itinerary for my trip to ${CapitalizeWords(
        destination!
      )} from ${startDate} to ${endDate}`,
    },
  ]);

  function handleConvo(event: any) {
    event.preventDefault();

    setMessagePayload((prevMessage) => [
      ...prevMessage,
      { role: "assistant", content: AiMessage },
      { role: "user", content: userMessage },
    ]);
    setUserMessage("");
  }
  // console.log("destination" + destination);
  //infinite loop here, messagepayload changes in handleSubmitPrompt
  // useEffect(() => {
  //   console.log("inside useffect");
  //   async function handleChatRequest() {
  //     const res = await handleSubmitPrompt(messagePayload, setMessagePayload);
  //     const data = await res.json();
  //     setAiMessage(data.data.aiResultText);
  //     // console.log("generatedText: " + data?.data.aiResultText);
  //     // Do something with the generated text
  //   }

  //   handleChatRequest();
  // }, []);
  console.log("messagePayload: " + JSON.stringify(messagePayload, null, 2));
  // console.log("payload: " + messagePayload[1].content);

  return (
    <div className="TripDetails">
      <form className=" bg-red-700" onSubmit={handleConvo}>
        <div>
          <h1 className="text-2xl">Trip to {CapitalizeWords(destination!)}</h1>
        </div>
        <section className="chat">{AiMessage}</section>

        <aside className=" bg-orange-300">
          <textarea
            className="bg-slate-500 p-2 py-1 h-18 rounded-lg border border-white text-white"
            name="userMessage"
            placeholder="Make adjustments"
            value={userMessage}
            onChange={({ target }) => setUserMessage(target.value)}
          />
          <button className="bg-green-300 rounded-md ml-4" type="submit">
            Send Message
          </button>
        </aside>
      </form>
      <figure className=" bg-blue-400"></figure>
    </div>
  );
}
//Create a function that pushes newly entered user inputs
//as an object to the messagePayload
