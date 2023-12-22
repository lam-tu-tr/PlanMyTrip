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
      className="bg-orange-400 rounded-xl px-4 z-20 flex gap-2 items-center"
    >
      Sign Out
      <IoMdLogOut />
    </button>
  );
}
