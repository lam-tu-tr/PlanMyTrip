"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <a
        href="/routes/account"
        className="flex flex-row justify-center items-center py-2 z-20"
      >
        <div className=" relative h-full aspect-square flex justify-center items-center">
          {session.user.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              alt="User Profile Pic"
              className="rounded-3xl "
            />
          )}
        </div>
        {/* <p className="bg-orange-400 text-white rounded-xl px-4 ml-4 z-20">
          Trip List
        </p> */}
      </a>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="bg-blue-400 rounded-xl px-4 ml-4 z-20"
    >
      Sign in
    </button>
  );
}
