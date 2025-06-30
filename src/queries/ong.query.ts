import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/lib/fetch";

export const ongKeys = {
  all: ["ongs"] as const,
  lists: () => [...ongKeys.all, "list"] as const,
  list: () => [...ongKeys.lists()] as const,
  details: () => [...ongKeys.all, "detail"] as const,
  detail: (id: string) => [...ongKeys.details(), id] as const,
};

export function useOngsQuery() {
  return useQuery({
    queryKey: ongKeys.list(),
    queryFn: async () => {
      const response = await $fetch("/user/ongs");
      return response.data?.ongs || [];
    },
  });
}
