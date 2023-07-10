//* -----------
"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextProps {
  isWindow: boolean;
  setIsWindow: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  isWindow: false,
  setIsWindow: (): boolean => false,
});

export const GlobalContextProvider = ({ children }: any) => {
  //*global variables for every page
  const [isWindow, setIsWindow] = useState(false);

  useEffect(() => setIsWindow(true), []);
  return (
    <GlobalContext.Provider value={{ isWindow, setIsWindow }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
