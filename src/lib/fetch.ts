import { User } from "@/lib/auth";
import { createFetch } from "@better-fetch/fetch";
import { getSession } from "next-auth/react";
import { apiSchema } from "./api.schema";

console.log("foda", process.env.NEXT_PUBLIC_API_URL);

export const $fetch = createFetch({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  throw: true,
  schema: apiSchema,
  auth: {
    type: "Bearer",
    token: async () => {
      const session = await getSession();

      console.log(session);

      const user = session?.user as User | undefined;

      return user?.token;
    },
  },
});
