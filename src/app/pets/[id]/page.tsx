"use client";

import { Button } from "@/components/ui/button";
import { useAnimalQuery } from "@/queries/animal.query";
import { House, Syringe } from "lucide-react";
import { useParams } from "next/navigation";

export default function PetPage() {
  const params = useParams() as { id: string };
  const id = params.id;
  const { data: pet, isLoading, isError } = useAnimalQuery(id);

  if (isLoading) return <div className="p-8">Carregando...</div>;
  if (isError || !pet) return <div className="p-8">Pet não encontrado.</div>;

  return (
    <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
      <div className="flex size-fit justify-self-center">
        {/* <Image
          width={500}
          height={500}
          alt={pet.name}
          src={pet.imageUrl || "https://i1.wp.com/petsbagunceiros.com/wp-content/uploads/2020/03/cachorro-racao.png"}
        /> */}
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">{pet.name}</h1>
        </div>

        <div>
          <p className="line-clamp-6 leading-7">{pet.description}</p>
        </div>
        <div className="flex w-full flex-col items-start gap-4 **:data-[slot=button]:w-fit">
          <div className="flex flex-col gap-4 md:flex-row">
            <Button variant="secondary">
              <Syringe /> Baixar dados médicos
            </Button>
            <Button variant="secondary">
              <House /> Baixar histórico de lar
            </Button>
          </div>
          <Button size="lg">Adotar</Button>
        </div>
      </div>
    </div>
  );
}
