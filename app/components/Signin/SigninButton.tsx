//* Signin using next-auth
"use client";
import { RootState } from "@/context/store";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";

export default function SigninButton() {
  const session = useSelector((state: RootState) => state.session);
  const user = session.user_metadata;

  if (session && user) {
    const user_avatar = user.picture;

    return (
      <a href="/routes/account" className="flex flex-row py-2">
        <div className=" relative h-full aspect-square">
          <Image
            src={user_avatar}
            fill={true}
            alt="User Profile Pic"
            className="rounded-3xl"
          />
        </div>
        <p className="bg-orange-400 text-white rounded-xl px-4 ml-4">
          Trip List
        </p>
      </a>
    );
  }

  return (
    <a href="/routes/SignIn" className="bg-blue-400 rounded-xl px-4 ml-4">
      Sign In
    </a>
  );
}
