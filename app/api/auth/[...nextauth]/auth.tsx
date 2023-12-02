import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import supabase from "@/supabase/supabaseClient";
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
    signIn: "/routes/SignIn",
  },
  callbacks: {
    async signIn({ profile }) {
      console.log("adding user to db");
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

//profile object
// {
//   iss: 'https://accounts.google.com',
//   azp: '979043192014-l7ctgpdmmmt1aj9q8285hu603q59ior4.apps.googleusercontent.com',
//   aud: '979043192014-l7ctgpdmmmt1aj9q8285hu603q59ior4.apps.googleusercontent.com',
//   sub: '101848548609272717307',
//   email: 'lam.tu.tran2073@gmail.com',
//   email_verified: true,
//   at_hash: 'rGEL4_p2zrJzZb7lh4YNww',
//   name: 'Lam Bam',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLHSZ9Q0JipchMgfW0ZKjd3haTjxsf4lx59HvNouH_0mw=s96-c',
//   given_name: 'Lam',
//   family_name: 'Bam',
//   locale: 'en',
//   iat: 1701301145,
//   exp: 1701304745
// }
export default authOptions;
