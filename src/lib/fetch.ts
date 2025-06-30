import { User } from "@/lib/auth";
import { createFetch } from "@better-fetch/fetch";
import { getSession } from "next-auth/react";
import { apiSchema } from "./api.schema";

export const $fetch = createFetch({
  baseURL: process.env.API_URL,
  throw: true,
  schema: apiSchema,
  auth: {
    type: "Bearer",
    token: async () => {
      const session = await getSession();

      const user = session?.user as User | undefined;

      return user?.token;
    },
  },
});
