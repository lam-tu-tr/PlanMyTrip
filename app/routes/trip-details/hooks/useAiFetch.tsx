import { Message, DestinationType } from "@/helpers/types";
import { useEffect, useRef } from "react";
import { handleSetInitialPrompt } from "../helpers/handleSetInitialPrompt";

export function useAiFetch(
  destination: DestinationType,

  aiComplete: boolean,
  setAiComplete: React.Dispatch<React.SetStateAction<boolean>>,

  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>
) {
  const cnt_ai = useRef(0);

  useEffect(() => {
    async function handleAiFetch() {
      try {
        const res = await fetch("/api/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: handleSetInitialPrompt(destination),
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch API");

        if (!res.body) return;

        const data = await res.json();

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

    if (!aiComplete || !destination.name) handleAiFetch();
    console.log("cnt_ai", cnt_ai.current++);
  }, []);
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
