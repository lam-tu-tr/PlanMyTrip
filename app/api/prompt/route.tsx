import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { prompt } = await req.json();

    //fetch openai end point to create prompt Completion
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },

      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      }),
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const aiResult = await response.json();

    //match 'index location description'
    const regex = /(\d+)\. ([^:]+): ([^\n]+) /g;
    const tripLocation = [];
    const tripList = [];
    let match;

    //match regex to extract location and desc to store in object array
    while ((match = regex.exec(aiResult.choices[0].text)) !== null) {
      const [, index, location, description] = match;
      tripLocation.push(location);
      tripList.push({ [location]: description });
    }

    console.log("triplocation: " + tripLocation);
    return NextResponse.json({
      aiResultText: aiResult.choices[0].text,
      tripLocation: tripLocation,
      tripList: tripList,
      model: aiResult.model,
      status: 200,
    });
  } catch (err) {
    NextResponse.json({ err, success: false, message: "post failed" });
  }
}
