import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import { Message, AiStreamPayload } from "../../helpers/types";
// const prisma = new PrismaClient();
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

type promptType = {
  messages: Message[];
};
//------------------------------------------------------------------------------
//POST a chat request to openAI chatcompletion endpoint
//reuseable for additional request for chat conversation
//the req.prompt ill get more complex as more {role:string,content:string} object
//    gets added to prompt by user and system
//-----------------------------------------------------------------------------

export async function POST(req: NextRequest, res: NextResponse) {
  const prompt: promptType = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "invalid message", status: 501 });
  }

  try {
    console.log("POST Initial User Prompt: " + prompt.messages[1].content);

    //fetch openai end point to create prompt Completion---------------------
    //Working so don't change------------------------------------------------
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },

      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: prompt.messages,
        // prompt: prompt.messages[0].content,
        max_tokens: 400,
        temperature: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      }),
    });
    //--------------------------------------------------------------
    // if (!response.ok) {
    //   throw new Error(`API request failed with status ${response.status}`);
    // }
    const aiResult = await response.json();

    return NextResponse.json({
      aiResultText: aiResult.choices[0].message.content,
      status: 200,
    });
  } catch (err) {
    console.log("error api route: ", err);
    NextResponse.json({
      err: err,
      success: false,
      message: "post failed",
      status: 500,
    });
  }
}

// async function AiStream(payload: AiStreamPayload) {
//   const encoder = new TextEncoder();
//   const decoder = new TextDecoder();
//   let counter = 0;
// }
