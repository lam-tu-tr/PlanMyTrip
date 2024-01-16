import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function createSupabaseServerComponentClient(serverComponent = false) {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value;
      },
      set(name, value, options) {
        //next server components cannot set or delete cookies so can't call those there.
        //just to make sure, prevent user from even calling it
        if (serverComponent) return;
        cookies().set(name, value, options);
      },
      remove(name, options) {
        if (serverComponent) return;
        cookies().set(name, "", options);
      },
    },
  });
}

export function createSupabaseServerClient() {
  return createSupabaseServerComponentClient(true);
}
