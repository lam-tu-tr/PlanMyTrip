import "./globals.scss";
import { Ubuntu } from "next/font/google";

import Navbar from "@/components/Navbar/Navbar";

import { GlobalContextProvider } from "./Context";
import "@fontsource/roboto/400.css";
const ubuntu = Ubuntu({ weight: "500", preload: false });

import { Analytics } from "@vercel/analytics/react";
import Topography from "./components/Topography/Topography";
import SigninProvider from "./components/Signin/SigninProvider";

export const metadata = {
  title: "Itinerary Genie",

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
    "Typescript",
    "Itinerary",
    "trip",
    "planner",
  ],

  author: [
    { name: "Lam Tran", url: "https://www.linkedin.com/in/lam-t-tran/" },
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
        <SigninProvider>
          <Topography />
          <Navbar />
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </SigninProvider>
        <Analytics />
      </body>
    </html>
  );
}
