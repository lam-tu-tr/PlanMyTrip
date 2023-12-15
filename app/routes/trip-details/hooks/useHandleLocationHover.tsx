import { useEffect } from "react";

//** add event delegation, ai-location class mouseover bubbles up to chat class*/
export function useHandleLocationHover(
  locations: any,
  setCurrDest: React.Dispatch<
    React.SetStateAction<[number, number] | undefined>
  >
) {
  useEffect(() => {
    function handleLocHover(event: any) {
      setCurrDest(locations[event.target.innerText]);
    }
    const chatSection = document.querySelector(".itinerary");

    const handleHoverEvent = (event: any) => {
      if (event.target.classList.contains("ai-location")) {
        handleLocHover(event);
      }
    };
    chatSection!.addEventListener("mouseover", handleHoverEvent);

    return () => {
      chatSection!.removeEventListener("mouseover", handleHoverEvent);
    };
  }, [locations, setCurrDest]);
}
