import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // session: { strategy: "database" },
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("token", token);
      // console.log("user", user);
      // return token;

      // first login only
      if (user) {
        token.id = user.id;
        token.username = user.username || null;
        token.isAdmin = user.isAdmin;

        return token;
      }

      // refresh token from DB to update user
      if (token.id) {
        const existingUser = await prisma.user.findUnique({
          where: {
            id: token.id,
          },
        });

        if (existingUser) {
          token.name = existingUser.name;
          token.email = existingUser.email;
          token.image = existingUser.image || null;
          token.username = existingUser.username || null;
          token.isAdmin = existingUser.isAdmin;
        }
      }

      // console.log("token", token);
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id ?? "";
      session.user.name = token.name ?? "";
      session.user.email = token.email ?? "";
      session.user.image = token.image ?? null;
      session.user.username = token.username ?? null;
      session.user.isAdmin = token.isAdmin ?? false;

      // console.log("session", session);
      return session;
    },
  },
});
