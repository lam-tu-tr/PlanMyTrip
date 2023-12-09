export default async function getCoord(location: string, bbox: string) {
  const destRes = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=${bbox}&limit=2&access_token=${process.env.MAPBOX_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!destRes.ok) {
    throw new Error(`Failed to fetch ${location} coordinate`);
  }
  const destCoord = await destRes.json();
  const x = destCoord.features[0].center[0];
  const y = destCoord.features[0].center[1];
  return { x, y };
}
