import "./globals.scss";
import { Ubuntu } from "next/font/google";

import Navbar from "@/components/Navbar/Navbar";

import { GlobalContextProvider } from "./Context";
import "@fontsource/roboto/400.css";
const ubuntu = Ubuntu({ weight: "500", preload: false });
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Topography from "./components/Topography/Topography";
import SessionProvider from "./components/Signin/SessionProvider";
import { getServerSession } from "next-auth/next";
export const metadata: Metadata = {
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

  authors: [
    { name: "Lam Tran", url: "https://www.linkedin.com/in/lam-t-tran/" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <SessionProvider session={session}>
          <Topography />
          <Navbar />
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
