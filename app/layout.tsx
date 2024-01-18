import "./globals.css";
import { Ubuntu } from "next/font/google";

import Navbar from "@/components/Navbar/Navbar";

import { GlobalContextProvider } from "./Context";
import "@fontsource/roboto/400.css";
const ubuntu = Ubuntu({ weight: "500", preload: false });
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Topography } from "./components/Topography/Topography";
import { getServerSession } from "next-auth/next";

import { ShadcnThemeProvider } from "./components/ShadcnThemeProvider/ShacnThemeProvider";

export const metadata: Metadata = {
  generator: "Next.js",
  title: "Itinerary Genie",

  description: "Generate trip itinerary using AI",
  authors: [
    { name: "Lam Tran", url: "https://www.linkedin.com/in/lam-t-tran/" },
  ],
  creator: "Lam Tran",

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

  icons: {
    icon: "./assets/itinerarygenie_favicon.png",
  },
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
        <GlobalContextProvider>
          <Topography />
          <Navbar />
          <ShadcnThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ShadcnThemeProvider>
        </GlobalContextProvider>

        <Analytics />
      </body>
    </html>
  );
}
