//--------------------------/trip?destination=___ & date=______------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { capitalizeWords } from "../helpers/helper-functions";

import { Message } from "../helpers/types";

export async function handleSubmitPrompt(messages: Message[]) {
  try {
    const res = await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch API");
    }
    const data = await res.json();

    return NextResponse.json({ data: data, status: 200, statement: "good" });
  } catch (err) {
    return NextResponse.json({
      error: err,
      status: 500,
      statement: "not good",
    });
  }
}

//DO NOT make a page function an async function
export default function Trip() {
  const destination = useSearchParams().get("destination");
  const startDate = useSearchParams().get("startDate");
  const endDate = useSearchParams().get("endDate");
  const [userMessage, setUserMessage] = useState<string>("");
  const [AiMessage, setAiMessage] = useState<string>("");
  const [messagePayload, setMessagePayload] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are TripGPT, you create itineraries for the user based on chosen destination and date range. You will give me the itinerary in an ordered list in this order: date>location> 3 things to do. The format for the answer is Date - Location and bullet list of things to do. Wrap all locations in html <a> tag.",
    },
    {
      role: "user",
      content: `Create an itinerary for my trip to ${capitalizeWords(
        destination!
      )} from ${startDate} to ${endDate}. Wrap all the locations in an html <a target="_blank"></a> tag with an href to https://google.com/search?q={location}.`,
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
  useEffect(() => {
    console.log("inside useffect");
    async function handleChatRequest() {
      // const res = await handleSubmitPrompt(messagePayload);
      // const data = await res.json();

      try {
        const res = await fetch("/api/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messagePayload,
          }),
        });

        console.log(res);

        // if (!res.ok) {
        //   throw new Error("Failed to fetch API");
        // }
        const data = await res.json();

        setAiMessage(data.data.aiResultText);
        // return NextResponse.json({ data: data, status: 200, statement: "good" });
      } catch (err) {
        console.log(err);
        // return NextResponse.json({
        //   error: err,
        //   status: 500,
        //   statement: "not good",
        // });
      }

      // console.log("generatedText: " + data?.data.aiResultText);
      // Do something with the generated text
    }

    // handleChatRequest();
  }, [messagePayload]);
  console.log("messagePayload: " + JSON.stringify(messagePayload, null, 2));
  // console.log("payload: " + messagePayload[1].content);

  return (
    <div className="TripDetails">
      <form className=" bg-red-700" onSubmit={handleConvo}>
        <div>
          <h1 className="text-2xl">Trip to {capitalizeWords(destination!)}</h1>
        </div>
        <section
          className="chat"
          dangerouslySetInnerHTML={{ __html: AiMessage }}
        />

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
