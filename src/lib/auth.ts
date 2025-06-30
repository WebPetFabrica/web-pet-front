import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { $fetch } from "./fetch";

interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  name: string;
  email: string;
  token: string;
  userType: "Administrador" | "Usuário Fisico" | "Usuário Juridico";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "E-mail",
        },
        password: {
          type: "password",
          label: "Senha",
        },
      },
      authorize: async (credentials) => {
        const response = await $fetch<Response<User>>("/auth/login", {
          body: credentials,
        });

        const user = response.data;

        // VALIDAR ERRROS
        if (!user) {
          throw new Error("Erro no login");
        }

        return user;
      },
    }),
  ],
});
