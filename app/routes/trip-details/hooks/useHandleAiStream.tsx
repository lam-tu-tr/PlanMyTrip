import { Message, destinationType } from "@/helpers/types";
import { useEffect } from "react";

export function useHandleAiStream(
  messagePayload: Message[],
  setAiComplete: React.Dispatch<React.SetStateAction<boolean>>,

  setDestination: React.Dispatch<React.SetStateAction<destinationType>>
) {
  useEffect(() => {
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

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;

          if (doneReading) setAiComplete(true);

          const chunkValue = decoder.decode(value);
          setDestination((prevDest) => ({
            ...prevDest,
            aiMessage: prevDest.aiMessage + chunkValue,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    }

    handleAiStream();
  }, [messagePayload, setAiComplete, setDestination]);
}
