//* -----------
"use client";

import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextProps {
  currUsername: string;
  setCurrUsername: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  currUsername: "",
  setCurrUsername: (): string => "",
});

export const GlobalContextProvider = ({ children }: any) => {
  //*global variables for every page
  const [currUsername, setCurrUsername] = useState("");

  return (
    <GlobalContext.Provider value={{ currUsername, setCurrUsername }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
