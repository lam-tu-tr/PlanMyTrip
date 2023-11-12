"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SigninButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <span className="flex flex-row">
        <p>{session.user.name}</p>
        <button
          onClick={() => signOut()}
          className="bg-orange-400 rounded-xl px-4 ml-4"
        >
          Sign Out
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="bg-blue-400 rounded-xl px-4 ml-4"
    >
      Sign in
    </button>
  );
}
