import { Message, DestinationType } from "@/helpers/types";

export function handleConversation(
  ai_message: string,
  userMessage: string,
  setUserMessage: React.Dispatch<React.SetStateAction<string>>,
  setAiComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setDest: React.Dispatch<React.SetStateAction<DestinationType>>,
  setMessagePayload: React.Dispatch<React.SetStateAction<Message[]>>
) {
  setUserMessage("");
  setAiComplete(false);
  setDest((prev) => ({
    ...prev,
    destList: {},
    aiMessage: "",
  }));

  setMessagePayload((prevMessage) => [
    ...prevMessage,
    { role: "assistant", content: ai_message },
    { role: "user", content: userMessage },
  ]);
}
