export type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};

export type AiStreamPayload = {
  model: string;
  messages: Message[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
};

export type AntMobileProps = {
  setDest: React.Dispatch<React.SetStateAction<destType>>;
};

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

export type CardProps = {
  id: string;
  destination_name: string;
  bbox: string;
  start_date: string;
  end_date: string;
  created_date: string;
};
