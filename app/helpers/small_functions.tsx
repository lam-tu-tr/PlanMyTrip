export function CapitalizeWords(text: string) {
  const textResult = text
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return textResult;
}
