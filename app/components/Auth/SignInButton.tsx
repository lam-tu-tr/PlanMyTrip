"use client";

import Image from "next/image";
import { IoMdLogIn } from "react-icons/io";
import { User } from "@supabase/supabase-js";

import { useEffect, useState } from "react";

import Link from "next/link";

import { createSupabaseFrontendClient } from "@/supabase/createSupabaseFrontendClient";

export default function SignInButton() {
  const supabase = createSupabaseFrontendClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }

    fetchUser();
  }, [supabase.auth]);

  if (user) {
    return (
      <a
        href="/routes/account"
        className="flex flex-row justify-center items-center py-2 z-20 gap-4"
      >
        <div className="relative h-full aspect-square">
          <Image
            src={user.user_metadata.avatar_url}
            width={40}
            height={40}
            alt="Profile Picture"
            className="rounded-3xl "
          />
        </div>
      </a>
    );
  }

  return (
    <Link
      href="/routes/signin"
      className="bg-blue-400 text-white rounded-xl px-2 z-20 gap-2"
    >
      <IoMdLogIn /> Sign in
    </Link>
  );
}
