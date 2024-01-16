"use client";

import Image from "next/image";
import { IoMdLogIn } from "react-icons/io";
import { User } from "@supabase/supabase-js";
import { createSupabaseFrontendClient } from "@/supabase/createSupabaseFrontendClient";
import { useState } from "react";
import { useGetUser } from "@/supabase/useGetUser";

export default function SignInButton() {
  const [user, setUser] = useState<User | null>();

  const supabase = createSupabaseFrontendClient();
  useGetUser({ setUser });

  if (user) {
    return (
      <a
        href="/routes/account"
        className="flex flex-row justify-center items-center py-2 z-20 gap-4"
      >
        <div className="relative h-full aspect-square">
          <Image
            src={user.user_metadata.avatar_url}
            width={50}
            height={50}
            alt="Profile Picture"
            className="rounded-3xl "
          />
        </div>
      </a>
    );
  }

  return (
    <button
      onClick={async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: "https://itinerarygenie.app/",
          },
        });
      }}
      className="bg-blue-400 rounded-xl px-2 z-20 flex gap-2 items-center"
    >
      <IoMdLogIn /> Sign in
    </button>
  );
}
