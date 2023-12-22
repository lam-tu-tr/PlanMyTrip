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
      className="bg-orange-500 rounded-full p-2 z-20 flex items-center"
    >
      <IoMdLogOut />
    </button>
  );
}
