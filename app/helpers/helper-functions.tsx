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
