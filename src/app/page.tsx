import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="flex h-150 w-full items-center shadow-md">
        <div className="space-y-2 px-32">
          <h1 className="text-4xl font-semibold tracking-tight">WebPet</h1>
          <span className="text-primary text-xl font-semibold">
            Quem somos nós?
          </span>

          <p className="mt-2 w-1/3">
            Conectamos adotantes a ONGs e protetres em espaços estratégicos de
            adoção. Juntos, promovemos lares cheios de amor e cuidado para os
            pets.
          </p>

          <Button size="lg" className="text-md mt-2">
            Adotar
          </Button>
        </div>
      </div>

      <div className="p-10">
        <div className="flex justify-between">
          <h2 className="mb-10 text-3xl font-semibold tracking-wide">
            Conheça alguns amiguinhos
          </h2>
          {/* <div className="flex gap-2 *:rounded-full">
            <Button variant="secondary" size="icon">
              <ChevronLeft />
            </Button>
            <Button variant="secondary" size="icon">
              <ChevronRight />
            </Button>
          </div> */}
        </div>

        <div className="flex gap-4">
          {/* Card dos animais */}
          <div className="bg-card text-card-foreground border-border flex h-fit w-60 flex-col overflow-hidden rounded-lg border">
            <div className="border-border size-32 w-60 bg-amber-200">
              Imagem aqui
            </div>
            <div className="flex flex-col px-3 py-4">
              <div className="flex items-center justify-between">
                <span>Elizabeth</span>
                <Button variant="ghost">
                  <MoveRight className="text-primary" />
                </Button>
              </div>
              <span className="text-muted-foreground">1 ano</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
