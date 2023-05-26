import { FC } from "react";
import React from "react";

import { Message } from "./types";

//this function processes directory
export async function handleSubmitPrompt(e: any) {
  // messages: object[],
  // setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  // console.log("message: " + JSON.stringify(messages, null, 2));
  e.preventDefault();
  console.log("inside handleSubmit");
  try {
    // const res = await fetch("/api/prompt", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     prompt: "Recommend 2 places to checkout on my trip to LA",
    //   }),
    // });
    // console.log("came back from prompt fetch");
    // if (!res.ok) {
    //   throw new Error("Failed to fetch API");
    // }
    // const data = await res.json();

    // console.log("data: " + data.aiResultText);
    // console.log("tripOptions: \n" + JSON.stringify(data.tripOptions));
    const res = await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Recommend 2 places to checkout on my trip to LA",
      }),
    });
    console.log("after fetch");
    // if (!res.ok) {
    //   throw new Error("Failed to fetch API");
    // }
    const data = await res.json();
    // console.log("data: " + data.aiResultText);
    // console.log("tripOptions: \n" + JSON.stringify(data.tripOptions));
  } catch (err) {
    console.log(err);
  }
}
