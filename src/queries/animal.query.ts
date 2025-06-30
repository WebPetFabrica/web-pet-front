import {
  AnimalType,
  AnimalsQueryType,
  CreateUpdateAnimalType,
} from "@/lib/api.schema";
import { $fetch } from "@/lib/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const animalKeys = {
  all: ["animals"] as const,
  lists: () => [...animalKeys.all, "list"] as const,
  list: (filters: Partial<AnimalsQueryType>) =>
    [...animalKeys.lists(), { filters }] as const,
  details: () => [...animalKeys.all, "detail"] as const,
  detail: (id: string) => [...animalKeys.details(), id] as const,
};

export function useAnimalsQuery(filters?: Partial<AnimalsQueryType>) {
  return useQuery({
    queryKey: animalKeys.list(filters ?? {}),
    queryFn: async () => {
      if (!filters?.category) delete filters?.category;
      if (!filters?.status) delete filters?.status;

      const response = await $fetch("/animal/animals", {
        query: filters ?? {},
      });
      return response.data;
    },
  });
}

export function useAnimalQuery(id: string) {
  return useQuery({
    queryKey: animalKeys.detail(id),
    queryFn: () => $fetch("/animal/:id", { params: { id } }),
    enabled: !!id,
  });
}

export function useCreateAnimalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (animal: CreateUpdateAnimalType) =>
      $fetch("@post/animal/createAnimal", {
        body: animal,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: animalKeys.lists() });
    },
  });
}

export function useUpdateAnimalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      animal,
    }: {
      id: string;
      animal: CreateUpdateAnimalType;
    }) =>
      $fetch(`@put/animal/updateAnimal/:id`, {
        params: { id },
        body: animal,
      }) as Promise<AnimalType>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: animalKeys.lists() });
    },
  });
}

// Delete animal
export function useDeleteAnimalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      $fetch(`@delete/animal/deleteAnimal/:id`, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: animalKeys.lists() });
    },
  });
}
