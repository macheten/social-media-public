import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

interface SessionUser {
  email: string;
  name: string;
  role: UserRole
  id: string;
}

declare module "next-auth" {
  interface Session {
    user: SessionUser
  }
}
