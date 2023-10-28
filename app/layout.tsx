import "./globals.scss";
import { Ubuntu } from "next/font/google";

import Navbar from "./components/Navbar";

import { GlobalContextProvider } from "./Context";
import "@fontsource/roboto/400.css";
const ubuntu = Ubuntu({ weight: "500", preload: false });

import { Analytics } from "@vercel/analytics/react";
export const metadata = {
  title: "AI Intinerary Planner",
  description: "Generate trip itinerary using AI",
  keywords: [
    "next.js",
    "React",
    "Javascript",
    "AI",
    "Artificial Intelligence",
    "chatgpt",
    "mapbox",
    "api",
  ],
  author: [
    { name: "Lam Tran", url: "https://www.linkedin.com/in/lam-tran-ucsd/" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Navbar />
        <GlobalContextProvider>{children}</GlobalContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
