import QueryProvider from "@/providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <>
      <NuqsAdapter>
        <QueryProvider>{children}</QueryProvider>
      </NuqsAdapter>
    </>
  );
}
