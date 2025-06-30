import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { $fetch } from "./fetch";

export interface User {
  name: string;
  email: string;
  token: string;
  userType: "Administrador" | "Usuário Fisico" | "Usuário Juridico";
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        console.log("fdfd");

        try {
          const response = await $fetch("@post/auth/login", {
            body: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });

          const user = response.data;

          console.log(user);

          return user;
        } catch (error) {
          throw new Error(
            JSON.stringify({ message: "Serviço de autenticação está offline" }),
          );
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60, // 3 hour
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};
