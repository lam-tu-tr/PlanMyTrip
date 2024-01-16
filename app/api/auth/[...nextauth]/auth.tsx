import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { createSupabaseFrontendClient } from "@/supabase/createSupabaseFrontendClient";

const supabase = createSupabaseFrontendClient();
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/routes/signin",
  },
  callbacks: {
    async signIn({ profile }) {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("email")
          .eq("email", profile?.email);

        if (error) {
          console.error("Error verifying account in db", error);
          return false;
        }

        if (data && data.length == 0) {
          await supabase
            .from("users")
            .upsert({ name: profile?.name, email: profile?.email })
            .select();
        }

        return true;
      } catch (error) {
        console.error("Error adding account to db", error);
        return false;
      }
    },
  },
};

export default authOptions;
