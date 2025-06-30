import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { AuthReturnType } from "@/lib/api.schema";

declare module "next-auth" {
  interface Session {
    user: AuthReturnType;
  }
  interface User extends AuthReturnType {}
}

declare module "next-auth/jwt" {
  interface JWT extends AuthReturnType {}
}
