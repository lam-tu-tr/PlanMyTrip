"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { SignOutButton } from "./SignOutButton";

import { IoMdLogIn } from "react-icons/io";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <a
        href="/routes/account"
        className="flex flex-row justify-center items-center py-2 z-20 gap-4"
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
        <SignOutButton />
      </a>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="bg-blue-400 rounded-xl ml-4 z-20 flex gap-2 items-center"
    >
      <IoMdLogIn /> Sign in
    </button>
  );
}
