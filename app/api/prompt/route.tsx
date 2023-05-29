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
    console.log("Fetching Chat Completion");
    const prompt = await req.json();

    console.log("prompt content: " + prompt.messages[0].content);

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
        max_tokens: 100,
        temperature: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      }),
    });
    // if (!response.ok) {
    //   throw new Error(`API request failed with status ${response.status}`);
    // }
    const aiResult = await response.json();

    console.log(aiResult.choices[0].message.content);
    // // //match 'index location description'
    // // const regex = /(\d+)\. ([^:]+): ([^\n]+) /g;
    // // const tripLocation = [];
    // // const tripList = [];
    // // let match;

    // // //match regex to extract location and desc to store in object array
    // // while ((match = regex.exec(aiResult.choices[0].text)) !== null) {
    // //   const [, index, location, description] = match;
    // //   tripLocation.push(location);
    // //   tripList.push({ [location]: description });
    // // }

    // // console.log("triplocation: " + tripLocation);
    return NextResponse.json({
      // aiResultText: aiResult.choices[0].text,
      // tripLocation: tripLocation,
      // tripList: tripList,
      // model: aiResult.model,
      // prompt: res.messages,
      status: 200,
    });
  } catch (err) {
    NextResponse.json({
      err: err,
      success: false,
      message: "post failed",
      status: 500,
    });
  }
}
