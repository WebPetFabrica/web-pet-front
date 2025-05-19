import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { PetSimpleCard } from "@/components/pet-simple-card";
import { Filters } from "./filters";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PetsPage() {
  const page = 1;
  const totalPages = 10;
  const total = 15;
  const itensPerPage = 10;

  const itensStart = (page - 1) * itensPerPage + 1;
  const itensEnd = itensStart + itensPerPage - 1;

  return (
    <div className="flex flex-col gap-2 p-8 md:flex-row">
      <Filters />
      <div className="flex w-full flex-col p-4">
        <div className="flex w-full justify-between">
          <p className="text-muted-foreground">
            Mostrando {itensStart}-{itensEnd} de {total} resultados
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
          {Array.from({ length: 10 }, (_, i) => (
            <PetSimpleCard key={i} name="Jujuba" age="6 meses" />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <Button variant="secondary">
            <ChevronLeft />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button variant={page === i + 1 ? "default" : "secondary"} key={i}>
              {i + 1}
            </Button>
          ))}

          <Button variant="secondary">
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
