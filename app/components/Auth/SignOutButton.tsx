"use client";

import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button type="button" onClick={handleSignOut}>
      <TbLogout className="w-8 h-8" />
    </button>
  );
}
