//* Context Practice
"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ContextProps {
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  isMobile: false,
  setIsMobile: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  //*global variables for every page
  const [isMobile, setIsMobile] = useState(false);

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
    <GlobalContext.Provider value={{ isMobile, setIsMobile }}>
      <ToastContainer />
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
