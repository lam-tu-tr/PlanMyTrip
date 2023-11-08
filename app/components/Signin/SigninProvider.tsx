"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

type SigninProviderProps = {
  children: ReactNode;
};

export default function SigninProvider(props: SigninProviderProps) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
