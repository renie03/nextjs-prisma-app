import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    username?: string | null;
    isAdmin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    image?: string | null;
    username?: string | null;
    isAdmin?: boolean;
  }
}
