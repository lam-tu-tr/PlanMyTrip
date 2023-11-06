"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SigninButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}
