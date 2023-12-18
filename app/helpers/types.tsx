import { LngLatLike } from "mapbox-gl";

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

export type LocationInfoType = {
  description: string;
  emoji: string;
  coordinate: LngLatLike;
};
export type LocationType = {
  [location: string]: LocationInfoType;
};
export type LocationDateType = {
  [date: string]: LocationType;
};
export type DestinationType = {
  name: string;
  description: string;
  trip_id: string;
  bbox: string;
  start_date: string;
  end_date: string;
  duration: number;
  created_date: string;
  locations: LocationDateType;
};

export type TripCardType = {
  id: string;
  destination: string;
  bbox: string;
  start_date: string;
  end_date: string;
  created_date: string;
};
