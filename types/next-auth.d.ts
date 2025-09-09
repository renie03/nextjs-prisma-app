declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    image?: string | null;
    username?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      image?: string | null;
      username?: string | null;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    image?: string | null;
    username?: string | null;
  }
}
