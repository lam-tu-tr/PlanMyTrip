//catch all for auth

// import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
import authOptions from "./auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
