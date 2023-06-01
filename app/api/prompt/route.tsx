import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

//------------------------------------------------------------------------------
//POST a chat request to  openAI chatcompletion endpoint
//reuseable for additional request for conversation
//the req.prompt ill get more complex as more {content} object
//    gets added to prompt by user and system
//-----------------------------------------------------------------------------

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const prompt = await req.json();

    console.log("POST Initial User Prompt: " + prompt.messages[1].content);

    //fetch openai end point to create prompt Completion
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
        max_tokens: 300,
        temperature: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      }),
    });
    // if (!response.ok) {
    //   throw new Error(`API request failed with status ${response.status}`);
    // }
    const aiResult = await response.json();

    return NextResponse.json({
      aiResultText: aiResult.choices[0].message.content,
      status: 200,
    });
  } catch (err) {
    console.log("error here", err);
    NextResponse.json({
      err: err,
      success: false,
      message: "post failed",
      status: 500,
    });
  }
}

//Create a function that pushes newly returned system response
//as an object to the messagePayload
