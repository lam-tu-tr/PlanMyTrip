import { Message, DestinationType } from "@/helpers/types";
import { useEffect, useRef } from "react";

export function useAiFetch(
  messagePayload: Message[],

  setAiComplete: React.Dispatch<React.SetStateAction<boolean>>,

  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>
) {
  console.log("using aifetch");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log("begin ai fetch");
    async function handleAiStream() {
      try {
        const res = await fetch("/api/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: messagePayload,
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch API");

        if (!res.body) return;

        const data = await res.json();
        console.log("data in aifetch", data);
        const ai_message = JSON.parse(data.ai_message);

        setDestination((prevDest) => ({
          ...prevDest,
          description: ai_message.description,
          duration: ai_message.duration,
          locations: ai_message.locations,
        }));

        setAiComplete(true);
      } catch (error) {
        console.error(error);
      }
    }

    handleAiStream();
  }, [messagePayload, setAiComplete, setDestination]);
}

//old Ai stream code
// const reader = res.body.getReader();
// const decoder = new TextDecoder();
// let done = false;

// while (!done) {
//   const { value, done: doneReading } = await reader.read();
//   done = doneReading;

//   if (doneReading) setAiComplete(true);

//   const chunkValue = decoder.decode(value);
//   setDestination((prevDest) => ({
//     ...prevDest,
//     aiMessage: prevDest.aiMessage + chunkValue,
//   }));
// }
