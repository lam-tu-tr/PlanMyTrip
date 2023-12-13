import { toastError } from "./toast";

export function capitalizeWords(text: string) {
  if (text) {
    const textResult = text
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
    return textResult;
  }
}

export function capitalFirstLetter(text: string) {
  return text[0].toUpperCase() + text.slice(1, text.length);
}

export async function copyToClipboard(trip_id: string) {
  try {
    await navigator.clipboard.writeText(
      `${window.location.origin}/routes/trip?id=${trip_id}`
    );
  } catch (err) {
    toastError("Failed to copy to clipboard, please try again");
  }
}
