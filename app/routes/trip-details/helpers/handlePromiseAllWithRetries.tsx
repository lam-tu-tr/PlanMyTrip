import { Coordinate } from "@/helpers/types";

export function handlePromiseAllWithRetries(
  promise_arr: Promise<Coordinate>[],
  maxRetries: number = 3,
  delay: number = 1000
): Promise<Coordinate[]> {
  // return Promise.all(promise_arr);
  async function retry(): Promise<Coordinate[]> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      console.log("trying promise all ");
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
    // Added return statement for TypeScript
    throw new Error("Unreachable code");
  }

  return retry();
}
