"use client";

import { Provider } from "react-redux";
import { store } from "@/context/store";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
