"use client";
import { getProviders, signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import supabase from "@/supabase/supabaseClient";
import { Provider } from "@supabase/supabase-js";
type providerType = {
  name: Provider;
  icon: React.ReactNode;
};
const providerList: providerType[] = [
  {
    name: "google",
    icon: <FcGoogle className="icon" />,
  },
  {
    name: "github",
    icon: <BsGithub className="icon" />,
  },
];

export default function ExtProviderButton() {
  async function handleProviderSignin(providerName: Provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: providerName,
      options: {
        redirectTo: "http://localhost:3000/routes/account",
      },
    });
  }
  // async function handleProviderSignin(providerName: string) {
  //   signIn(providerName, {
  //     callbackUrl: "http://localhost:3000/routes/account",
  //   });
  // }
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
