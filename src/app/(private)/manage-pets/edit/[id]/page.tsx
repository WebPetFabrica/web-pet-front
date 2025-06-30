"use client";

import { AnimalForm, AnimalFormType } from "@/components/animal-form";
import {
  useUpdateAnimalMutation,
  useAnimalQuery,
} from "@/queries/animal.query";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id") ?? "";

  const { data: animal, isLoading } = useAnimalQuery(id);
  const updateMutation = useUpdateAnimalMutation();

  function onSubmit(values: AnimalFormType) {
    if (!id) return;
    updateMutation.mutate(
      { id, animal: { ...values, id } },
      {
        onSuccess: () => {
          router.push("/manage-pets");
        },
      },
    );
  }

  if (isLoading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Editar Pet</h2>
      </div>
      <AnimalForm onSubmit={onSubmit} defaultValues={animal} />
    </div>
  );
}
