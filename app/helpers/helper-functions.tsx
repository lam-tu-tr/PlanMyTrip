export function capitalizeWords(text: string) {
  const textResult = text
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return textResult;
}
export function handleLocHover(event: any) {
  // setCurrLoc(event.target.innerText);
  console.log("location: " + event.target.innerText);
}
