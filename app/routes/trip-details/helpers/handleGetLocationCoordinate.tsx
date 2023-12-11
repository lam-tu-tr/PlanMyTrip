import { Coordinate } from "@/helpers/types";

export async function handleGetLocationCoordinate(
  location: string,
  bbox: string
): Promise<Coordinate> {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=${bbox}&limit=2&access_token=${process.env.MAPBOX_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch ${location} coordinate`);
  }
  const coordinate_obj = await res.json();

  const location_coordinate: Coordinate = [
    coordinate_obj.features[0].center[0],
    coordinate_obj.features[0].center[1],
  ];
  console.log("getting location coordinate: ", location);
  return location_coordinate;
}
