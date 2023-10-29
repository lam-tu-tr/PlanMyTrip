//*
//*--------------------------/tripDetails?destination=___ & date=______etc------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { capitalizeWords } from "../../helpers/helper-functions";
import { Message, destType } from "../../helpers/types";
import Map from "@/components/Map/Map";

import setInitialPrompt from "./hooks/setInitialPrompt";

// import { useGlobalContext } from "@/Context";
import { FiArrowUpCircle, FiSave, FiCopy } from "react-icons/fi";

//*Toastitfy
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DOMPurify from "isomorphic-dompurify";
import { toastError, toastSuccess } from "@/helpers/toast";
import useFetchLocation from "./hooks/useFetchLocations";

const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

//DO NOT make a page function an async function
export default function Trip() {
  //*================================================================================
  //*States declarations */

  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUser(window.sessionStorage.getItem("currentUser") || null);
  }, []);

  //*obtain data from querystring of previously submitted form
  const [dest, setDest] = useState<destType>({
    destName: useSearchParams().get("destName")!,
    bbox: useSearchParams().get("bbox")!,
    startDate: useSearchParams().get("startDate")!,
    endDate: useSearchParams().get("endDate")!,
    duration: useSearchParams().get("duration") || "",
    aiMessage: "",
    destList: {},
    tripId: "",
  });

  //hold user input
  //which will be assigned to messagepayload during submit event
  const [userMessage, setUserMessage] = useState<string>("");
  //aiComplete=true when openai stream for response is complete
  const [aiComplete, setAiComplete] = useState<boolean>(false);
  //message payload will have user and aimessage objects added to it
  const [messagePayload, setMessagePayload] = useState<Message[]>(
    setInitialPrompt(dest)
  );

  const [currDest, setCurrDest] = useState<[number, number]>();

  const router = useRouter();

  //*handle submit, assign messages to payload
  function handleConvo(e: any) {
    //!reset these variables for each time user submits adjustments
    e.preventDefault();
    setUserMessage("");
    setAiComplete(false);
    setDest((prev) => ({
      ...prev,
      destList: {},
      aiMessage: "",
    }));

    setMessagePayload((prevMessage) => [
      ...prevMessage,
      { role: "assistant", content: dest.aiMessage },
      { role: "user", content: userMessage },
    ]);
  }

  //*Handle Save to db
  async function handleSaveToDB(type: string) {
    if (currentUser == null) {
      toastError("Please log in to enable trip saving and sharing");
      return;
    }

    try {
      const res = await fetch("../../api/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dbPayload: {
            username: currentUser,
            destName: dest.destName,
            aiMessage: dest.aiMessage,
            destList: dest.destList,
            bbox: dest.bbox,
            startDate: dest.startDate,
            endDate: dest.endDate,
          },
          type: "create",
        }),
      });

      if (!res.ok) throw new Error("Failed to save to account");

      const { tripId } = await res.json();

      copyToClipboard(tripId);
      if (type == "save") {
        toastSuccess("Trip saved to account and clipboard");
        router.push(`/routes/tripId?tripId=${tripId}`);
      } else {
        toastSuccess("Copied to clipboard");
      }
    } catch (err) {
      toastError("Couldnt copy to clipboard");
    }
  }

  async function copyToClipboard(tripId: string) {
    try {
      await navigator.clipboard.writeText(
        `${window.location.href}/routes/tripId?tripId=${tripId}`
      );
    } catch (err) {
      toastError("Failed to copy to clipboard");
      console.log("Clipboard save error", err);
    }
  }

  useFetchLocation(aiComplete, setDest, dest.bbox);

  //*------------
  //** add event delegation, ai-location class mouseover bubbles up to chat class     */
  useEffect(() => {
    function handleLocHover(event: any) {
      setCurrDest(dest.destList[event.target.innerText]);
    }
    const chatSection = document.querySelector(".chat");

    const handleHoverEvent = (event: any) => {
      if (event.target.classList.contains("ai-location")) {
        handleLocHover(event);
      }
    };
    chatSection!.addEventListener("mouseover", handleHoverEvent);

    return () => {
      chatSection!.removeEventListener("mouseover", handleHoverEvent);
    };
  }, [dest.destList]);
  //*------------
  //*Stream openai response data to aiMessage, auto fetch when payload is has new message added
  useEffect(() => {
    async function handleChatRequest() {
      try {
        const res = await fetch("/api/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: messagePayload,
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch API");

        if (!res.body) return;

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;

          if (doneReading) setAiComplete(true);

          const chunkValue = decoder.decode(value);
          setDest((prevDest) => ({
            ...prevDest,
            aiMessage: prevDest.aiMessage + chunkValue,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    }

    handleChatRequest();
  }, [messagePayload]);

  return (
    <div id="TripDetails">
      <Map currDest={currDest} dest={dest} setDest={setDest} />

      <form id="trip_form" onSubmit={handleConvo}>
        <div id="h1_wrapper">
          <button
            title="Copy Trip Link"
            onClick={() => handleSaveToDB("")}
            type="button"
          >
            <FiCopy className="w-6 h-6 m-4" />
          </button>
          <h1>Trip to {capitalizeWords(dest.destName!)}</h1>

          <button
            title="Save to Account"
            onClick={() => handleSaveToDB("save")}
            type="button"
          >
            <FiSave className="w-6 h-6 m-4" />
          </button>
        </div>
        <section
          id="chat"
          className="chat"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(dest.aiMessage, DOMPurifyConfig),
          }}
        ></section>

        <aside id="adjustment">
          <textarea
            id="textArea"
            name="userMessage"
            placeholder="Replace museum with..."
            value={userMessage}
            disabled={!aiComplete}
            onChange={({ target }) => setUserMessage(target.value)}
          />
          {aiComplete ? (
            <button title="Submit adjustments" type="submit">
              <FiArrowUpCircle className="w-8 h-8" />
            </button>
          ) : (
            <div className="spinner"></div>
          )}
        </aside>
      </form>
    </div>
  );
}
