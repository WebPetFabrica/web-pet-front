"use client";

import { PetSimpleCard } from "@/components/pet-simple-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimalsQueryType, CategoryType, StatusType } from "@/lib/api.schema";
import { useAnimalsQuery } from "@/queries/animal.query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { Filters } from "./filters";

export default function PetsPage() {
  const router = useRouter();
  const [page, setPage] = useState(0); // 0-based for backend
  const itensPerPage = 10;

  // Use nuqs for single value filters
  const [category, setCategory] = useQueryState("category");
  const [status, setStatus] = useQueryState("status");

  const filters: Partial<AnimalsQueryType> = {
    page,
    size: itensPerPage,
    category: category as CategoryType | undefined,
    status: status as StatusType | undefined,
  };

  const { data, isLoading, isError } = useAnimalsQuery(filters);

  const pets = data?.animals ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.totalElements ?? 0;

  const itensStart = total === 0 ? 0 : page * itensPerPage + 1;
  const itensEnd = Math.min(itensStart + itensPerPage - 1, total);

  return (
    <div className="flex flex-col gap-2 p-8 md:flex-row">
      <Filters
        selectedCategory={category as CategoryType | null}
        setSelectedCategory={setCategory}
        selectedStatus={status as StatusType | null}
        setSelectedStatus={setStatus}
      />
      <div className="flex w-full flex-col p-4">
        <div className="flex w-full justify-between gap-2">
          <p className="text-muted-foreground">
            {isLoading
              ? "Carregando..."
              : isError
                ? "Erro ao carregar pets"
                : `Mostrando ${itensStart}-${itensEnd} de ${total} resultados`}
          </p>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nome">Nome</SelectItem>
              <SelectItem value="idade">Idade</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] justify-items-stretch gap-4 *:h-60">
          {isLoading ? (
            <div className="col-span-full text-center">Carregando pets...</div>
          ) : isError ? (
            <div className="col-span-full text-center text-red-500">
              Erro ao carregar pets.
            </div>
          ) : pets.length === 0 ? (
            <div className="col-span-full text-center">
              Nenhum pet encontrado.
            </div>
          ) : (
            pets.map((pet) => (
              <PetSimpleCard
                key={pet.id}
                name={pet.name}
                // age={"-"}
                action={() => router.push(`/pets/${pet.id}`)}
              />
            ))
          )}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            <ChevronLeft />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              variant={page === i ? "default" : "secondary"}
              key={i}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1 || totalPages === 0}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
