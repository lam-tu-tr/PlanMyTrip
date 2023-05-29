import { Message } from "./types";
import { NextRequest, NextResponse } from "next/server";
export async function handleSubmitPrompt(
  messages: Message[]
  // setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) {
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

    // if (!res.ok) {
    //   throw new Error("Failed to fetch API");
    // }
    const data = await res.json();
    console.log("status of handleSubmitPrompt: " + data.aiResultText);
    // console.log("data: " + data.aiResultText);
    // console.log("tripOptions: \n" + JSON.stringify(data.tripOptions));
    return NextResponse.json({ data: data, status: 200, statement: "good" });
  } catch (err) {
    return NextResponse.json({
      error: err,
      status: 500,
      statement: "not good",
    });
  }
}
