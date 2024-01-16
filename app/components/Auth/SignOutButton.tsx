"use client";

import { IoMdLogOut } from "react-icons/io";

export function SignOutButton() {
  return (
    <form action="/api/auth/signOut" method="post">
      <button
        type="submit"
        onClick={handleSignOut}
        className="z-20 flex justify-center items-center gap-2 bg-orange-400 rounded-full py-1 px-2"
      >
        <IoMdLogOut className="h-6 w-6" />
        Sign Out
      </button>
    </form>
  );
}

async function handleSignOut() {
  try {
    const res = await fetch(`/api/auth/signOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return;
  } catch (err) {
    console.log(err);
  }
}
