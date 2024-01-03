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
      className="z-20 flex justify-center items-center gap-2 bg-orange-400 rounded-full py-1 px-2"
    >
      <IoMdLogOut className="h-6 w-6" />
      Sign Out
    </button>
  );
}
