export interface Message {
  role: "user" | "system" | "assistant";
  content: string;
}
export type AntProps = {
  dest: destType;
  setDest: React.Dispatch<React.SetStateAction<destType>>;
};
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

export type destType = {
  tripId: string;
  destName: string;
  bbox: string;
  startDate: string;
  endDate: string;
  aiMessage: string;
  duration: string;
  destList: DestCoordType;
};
