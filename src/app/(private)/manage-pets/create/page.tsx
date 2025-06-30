"use client";

import { AnimalForm, AnimalFormType } from "@/components/animal-form";
import { useCreateAnimalMutation } from "@/queries/animal.query";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const createMutation = useCreateAnimalMutation();

  function onSubmit(values: AnimalFormType) {
    createMutation.mutate(values, {
      onSuccess: () => {
        router.push("/manage-pets");
      },
    });
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Adicionar Pet</h2>
      </div>
      <AnimalForm onSubmit={onSubmit} />
    </div>
  );
}
