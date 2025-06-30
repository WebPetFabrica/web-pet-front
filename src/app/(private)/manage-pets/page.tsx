"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAnimalsQuery } from "@/queries/animal.query";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { DeleteButton } from "./_components/delete-button";
import {
  categoryTranslations,
  statusTranslations,
} from "@/components/animal-form";

export default function ManagePetsPage() {
  const [_pageParam, setPageParam] = useQueryState("page", {
    history: "replace",
    parse: Number,
    serialize: String,
  });
  const pageParam = _pageParam ?? 1;
  const page = pageParam - 1;
  const itensPerPage = 10;

  function setPage(newPage: number) {
    setPageParam(newPage + 1);
  }

  const filters = {
    page,
    size: itensPerPage,
  };

  const { data, isLoading, isError } = useAnimalsQuery(filters);
  const pets = data?.animals ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pets</h2>
        <p className="text-muted-foreground">
          Organize os pets disponíveis para adoção
        </p>
      </div>

      <div className="flex items-baseline justify-between">
        <div></div>
        <div>
          <Button asChild>
            <Link href={"/manage-pets/create"}>
              <Plus /> Adicionar
            </Link>
          </Button>
        </div>
      </div>

      <div className="border-border w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Carregando pets...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className="text-destructive text-center">
                  Erro ao carregar pets.
                </TableCell>
              </TableRow>
            ) : pets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Nenhum pet encontrado.
                </TableCell>
              </TableRow>
            ) : (
              pets.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell>{pet.name}</TableCell>
                  <TableCell>{pet.description}</TableCell>
                  <TableCell>
                    {categoryTranslations[pet.category] || pet.category}
                  </TableCell>
                  <TableCell>
                    {statusTranslations[pet.status] || pet.status}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" asChild>
                      <Link href={`/manage-pets/edit/${pet.id}`}>
                        <Pencil />
                      </Link>
                    </Button>
                    <DeleteButton />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        <Button
          variant="secondary"
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
        >
          {"<"}
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
          onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
          disabled={page === totalPages - 1 || totalPages === 0}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}
