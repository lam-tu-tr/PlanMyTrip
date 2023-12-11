import { Message, destType } from "@/helpers/types";

export function handleConversation(
  aiMessage: string,
  userMessage: string,
  setUserMessage: React.Dispatch<React.SetStateAction<string>>,
  setAiComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setDest: React.Dispatch<React.SetStateAction<destType>>,
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
    { role: "assistant", content: aiMessage },
    { role: "user", content: userMessage },
  ]);
}
