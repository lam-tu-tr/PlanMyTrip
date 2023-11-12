"use client";

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

type providerType = {
  name: string;
  icon: React.ReactNode;
};
const providerList: providerType[] = [
  {
    name: "Google",
    icon: <FcGoogle className="icon" />,
  },
  {
    name: "GitHub",
    icon: <BsGithub className="icon" />,
  },
];

export default function ExtProviderButton() {
  async function handleProviderSignin(providerName: string) {
    signIn(providerName, { callbackUrl: "http://localhost:3000" });
  }
  return (
    <>
      {providerList.map((provider, index) => {
        return (
          <button
            type="button"
            onClick={() => handleProviderSignin(provider.name)}
            key={index}
          >
            <span>{provider.icon}</span>Sign in with {provider.name}
          </button>
        );
      })}
    </>
  );
}
