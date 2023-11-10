"use client";

import { capitalFirstLetter } from "@/helpers/helper-functions";
import { signIn } from "next-auth/react";

type ExtProviderButtonProp = {
  provider: string;
};

export default function ExtProviderButton({ provider }: ExtProviderButtonProp) {
  async function handleProviderSignin() {
    signIn(provider, { callbackUrl: "http://localhost:3000" });
  }
  return (
    <button type="button" onClick={handleProviderSignin}>
      Sign in with {capitalFirstLetter(provider)}
    </button>
  );
}
