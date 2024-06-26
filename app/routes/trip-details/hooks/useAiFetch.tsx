import { DestinationType } from "@/helpers/types";
import { useEffect } from "react";
import { handleSetInitialPrompt } from "../helpers/handleSetInitialPrompt";

export function useAiFetch(
  destination: DestinationType,

  aiComplete: boolean,
  setAiComplete: React.Dispatch<React.SetStateAction<boolean>>,

  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>
) {
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
  }, [aiComplete, destination, setAiComplete, setDestination]);
}
