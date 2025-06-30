import QueryProvider from "@/providers/query-provider";
import NextAuthSessionProvider from "@/providers/session-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <>
      <NuqsAdapter>
        <QueryProvider>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </QueryProvider>
      </NuqsAdapter>
    </>
  );
}
