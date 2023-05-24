import "./globals.css";
import { Inter } from "next/font/google";

import Navbar from "./components/Navbar";
import "@fontsource/roboto/400.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Plan My Trip",
  description: "Generate trip itinerary using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
