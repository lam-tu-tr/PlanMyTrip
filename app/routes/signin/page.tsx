"use client";

import "./signin.scss";
import { createSupabaseFrontendClient } from "@/supabase/createSupabaseFrontendClient";
import { Auth } from "@supabase/auth-ui-react";

export default function SignIn() {
  const supabase = createSupabaseFrontendClient();
  return (
    <div className="page-container">
      <section className="signin-container">
        <Auth
          supabaseClient={supabase}
          view="sign_in"
          appearance={{
            extend: false,
            //needed instead of theme because auth ui broken on ssr
            className: {
              button:
                "flex flex-row justify-center items-center gap-4 text-larger bg-[hsl(218,14%,11%)] text-[white] mt-8 mb-4 px-2 py-3 rounded-[2rem] border border-primary hover:bg-stone-800",
              container: "flex flex-col",
              divider: "border border-white mt-4",
              input:
                "flex h-9 w-full rounded-md border border-primary transition-all bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-[solid] border-[14%,30%)_1px] text-white",
              label: " mt-6 mb-2 flex flex-col text-sm text-white",
              message: "text-red-500 text-center block mt-3",
              anchor: "my-2 text-white",
            },
          }}
          // theme="dark"
          showLinks={true}
          providers={["google"]}
        />
      </section>
    </div>
  );
}
