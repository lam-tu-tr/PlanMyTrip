import "./globals.css";
import { Ubuntu } from "next/font/google";

import Navbar from "./components/Navbar";
import "@fontsource/roboto/400.css";
const ubuntu = Ubuntu({ weight: "500", preload: false });

import { Analytics } from "@vercel/analytics/react";
export const metadata = {
  title: "AI Plan My Trip",
  description: "Generate trip itinerary using AI",
};
//context and provider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>

      <body className={ubuntu.className}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
