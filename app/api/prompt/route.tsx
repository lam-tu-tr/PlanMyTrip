import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/helpers/types";
import OpenAI from "openai";

const openai = new OpenAI();

// import {
//   createParser,
//   ParsedEvent,
//   ReconnectInterval,
// } from "eventsource-parser";

export const runtime = "edge";

//* POST a chat request to openAI chatcompletion endpoint
//* reuseable for additional request for chat conversation
//* the req.prompt ill get more complex as more {role:string,content:string} object
//*    gets added to prompt by user and system

type promptType = {
  messages: Message[];
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const prompt: promptType = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "invalid message", status: 400 });
  }

  // const payload: AiStreamPayload = {
  //   model: "gpt-3.5-turbo",
  //   messages: prompt.messages,
  //   temperature: 0.1,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   max_tokens: 1500,
  //   stream: true,
  //   n: 1,
  // };

  // const stream = await AiStream(payload);
  const ai_res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: prompt.messages,
    response_format: { type: "json_object" },
  });

  const ai_message = ai_res.choices[0].message.content;

  return NextResponse.json({ status: 200, ai_message: ai_message });
}
// async function AiStream(payload: AiStreamPayload) {
//   const stream = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "user", content: "Say this is a test" }],
//   });

//   return stream;
// }

//!old streaming code. Now openai uses an npm openai to stream but can't get it to work.
//* return a stream after fetching chat end point
//* sends a POST request to the OpenAI API with
//* the payload and listens for a server-sent event (SSE) stream response.
//* It then parses the stream response into individual events, filters out the "DONE" event, and encodes the
//* text content of each event as a Uint8Array. The function returns a ReadableStream object that
//* can be consumed by the caller.

// async function AiStream(payload: AiStreamPayload) {
//   const encoder = new TextEncoder();
//   const decoder = new TextDecoder();
//   let counter = 0;

//   const res = await fetch("https://api.openai.com/v1/chat/completions", {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
//     },
//     method: "POST",
//     body: JSON.stringify(payload),
//   });

//   const stream = new ReadableStream({
//     async start(controller) {
//       // callback
//       function onParse(event: ParsedEvent | ReconnectInterval) {
//         if (event.type === "event") {
//           const data = event.data;
//           //? https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
//           if (data === "[DONE]") {
//             controller.close();
//             return;
//           }
//           try {
//             const json = JSON.parse(data);
//             const text = json.choices[0].delta?.content || "";
//             if (counter < 2 && (text.match(/\n/) || []).length) {
//               // this is a prefix character (i.e., "\n\n"), do nothing
//               return;
//             }
//             const queue = encoder.encode(text);
//             controller.enqueue(queue);
//             counter++;
//           } catch (e) {
//             // maybe parse error
//             controller.error(e);
//           }
//         }
//       }

//       //* stream response (SSE) from OpenAI may be fragmented into multiple chunks
//       //* this ensures we properly read chunks and invoke an event for each SSE event stream
//       const parser = createParser(onParse);
//       //? https://web.dev/streams/#asynchronous-iteration
//       for await (const chunk of res.body as any) {
//         parser.feed(decoder.decode(chunk));
//       }
//     },
//   });

//   return stream;
// }
