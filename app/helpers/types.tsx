export interface Message {
  role: "user" | "system" | "assistant";
  content: string;
}

export interface AiStreamPayload {
  model: string;
  messages: Message[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

export type DestCoordType = {
  [key: string]: [longitude: number, latitude: number];
};
