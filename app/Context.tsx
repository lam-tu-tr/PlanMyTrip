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

  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  isWindow: false,
  setIsWindow: () => {},

  isMobile: false,
  setIsMobile: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  //*global variables for every page
  const [isWindow, setIsWindow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => setIsWindow(true), []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    // Check if window exists (for client rendering)
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 700);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } else {
      // Set the initial value for SSR
      setIsMobile(false);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isMobile, setIsMobile, isWindow, setIsWindow }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
