import { Coordinate } from "@/helpers/types";

export function handlePromiseAllWithRetries(
  promise_arr: Promise<Coordinate>[],
  maxRetries: number = 3,
  delay: number = 1000
): Promise<Coordinate[]> {
  async function retry(): Promise<Coordinate[]> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const results = await Promise.all(promise_arr);
        return results;
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        if (attempt < maxRetries - 1) {
          console.log(`Retrying after ${delay}ms...`);
          await new Promise<void>((resolve) => setTimeout(resolve, delay));
        } else {
          throw new Error(`Max retries reached`);
        }
      }
    }

    throw new Error("Unreachable code");
  }

  return retry();
}
