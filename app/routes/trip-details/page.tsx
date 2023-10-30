//*
//*--------------------------/tripDetails?destination=___ & date=______etc------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import Map from "@/components/Map/Map";

import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "@/helpers/helper-functions";
import { Message, destType } from "@/helpers/types";

import setInitialPrompt from "./hooks/setInitialPrompt";
import handleSaveToDB from "./hooks/handleSaveToDB";
import handleConvo from "./hooks/handleConvo";
import useHandleLocationHover from "./hooks/useHandleLocationHover";

import { FiArrowUpCircle, FiSave, FiCopy } from "react-icons/fi";

// import "react-toastify/dist/ReactToastify.css";

import DOMPurify from "isomorphic-dompurify";
import useFetchLocation from "./hooks/useFetchLocations";
import useHandleAiStream from "./hooks/useHandleAiStream";

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

  //hold user input, which will be assigned to messagepayload during submit event
  const [userMessage, setUserMessage] = useState<string>("");
  //aiComplete=true when openai stream for response is complete
  const [aiComplete, setAiComplete] = useState<boolean>(false);
  //message payload will have user and aimessage objects added to it
  const [messagePayload, setMessagePayload] = useState<Message[]>(
    setInitialPrompt(dest)
  );

  const [currDest, setCurrDest] = useState<[number, number]>();

  useFetchLocation(aiComplete, setDest, dest.bbox);

  //*Stream openai response data to aiMessage, auto fetch when payload has new message added
  useHandleAiStream(messagePayload, setAiComplete, setDest);

  useHandleLocationHover(dest.destList, setCurrDest);

  return (
    <div id="TripDetails">
      <Map currDest={currDest} dest={dest} setDest={setDest} />

      <form
        id="trip_form"
        onSubmit={(e) => {
          e.preventDefault();
          handleConvo(
            dest.aiMessage,
            userMessage,
            setUserMessage,
            setAiComplete,
            setDest,
            setMessagePayload
          );
        }}
      >
        <div id="h1_wrapper">
          <button
            title="Copy Trip Link"
            onClick={() => handleSaveToDB("", dest, currentUser)}
            type="button"
          >
            <FiCopy className="w-6 h-6 m-4" />
          </button>
          <h1>Trip to {capitalizeWords(dest.destName!)}</h1>

          <button
            title="Save to Account"
            onClick={() => handleSaveToDB("save", dest, currentUser)}
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
