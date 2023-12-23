"use client";

import { signOut } from "next-auth/react";

import { IoMdLogOut } from "react-icons/io";

export function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="bg-orange-500 h-full aspect-square rounded-full z-20 flex justify-center items-center"
    >
      <IoMdLogOut />
    </button>
  );
}
