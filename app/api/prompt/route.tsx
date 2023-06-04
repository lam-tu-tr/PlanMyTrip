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

export async function POST(req: NextRequest): Promise<NextResponse> {
  const prompt: promptType = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "invalid message", status: 400 });
  }

  console.log("POST Initial User Prompt: " + prompt.messages[1].content);

  const payload: AiStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: prompt.messages,
    temperature: 0.1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await AiStream(payload);

  return new NextResponse(stream);
}

//return a stream after fetching chat end point
// sends a POST request to the OpenAI API with
// the payload and listens for a server-sent event (SSE) stream response.
// It then parses the stream response into individual events, filters out the "DONE" event, and encodes the text content of each event as a Uint8Array. Finally, the function returns a ReadableStream object that can be consumed by the caller.
async function AiStream(payload: AiStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let counter = 0;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
// const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },

//     body: JSON.stringify(payload),
//   });
// {
//   model: "gpt-3.5-turbo",
//   messages: prompt.messages,
//   // prompt: prompt.messages[0].content,
//   max_tokens: 400,
//   temperature: 0.3,
//   frequency_penalty: 0.5,
//   presence_penalty: 0,
// }
// const aiResult = await response.json();
