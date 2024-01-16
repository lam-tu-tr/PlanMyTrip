import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction, useEffect } from "react";
import { createSupabaseFrontendClient } from "./createSupabaseFrontendClient";

type useGetUserProp = {
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

export function useGetUser({ setUser }: useGetUserProp) {
  const supabase = createSupabaseFrontendClient();

  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) setUser(user);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, [setUser, supabase.auth]);
}
