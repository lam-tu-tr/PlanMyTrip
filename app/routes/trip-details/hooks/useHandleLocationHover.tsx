import { useEffect } from "react";

//** add event delegation, ai-location class mouseover bubbles up to chat class*/
export function useHandleLocationHover(
  location_list: any,
  setCurrDest: React.Dispatch<
    React.SetStateAction<[number, number] | undefined>
  >
) {
  useEffect(() => {
    function handleLocHover(event: any) {
      setCurrDest(location_list[event.target.innerText]);
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
  }, [location_list, setCurrDest]);
}
