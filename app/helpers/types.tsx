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
  setDest: React.Dispatch<React.SetStateAction<DestinationType>>;
};

export type Coordinate = [longitude: number, latitude: number];

export type DestCoordinateType = {
  [key: string]: Coordinate;
};

export type DestinationType = {
  trip_id: string;
  name: string;
  bbox: string;
  start_date: string;
  end_date: string;
  aiMessage: string;
  duration: string;
  created_date: string;
  location_list: DestCoordinateType;
};

export type CardTripInfoType = {
  id: string;
  destination_name: string;
  bbox: string;
  start_date: string;
  end_date: string;
  created_date: string;
};
