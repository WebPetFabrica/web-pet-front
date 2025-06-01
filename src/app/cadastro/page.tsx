"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function Cadastro() {
  const [perfil, setPerfil] = useState<"adotante" | "protetor">("adotante");

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-muted flex w-[700px] flex-col items-center justify-center rounded-xl px-20 py-10">
        <p className="mb-4 text-6xl font-semibold tracking-tight uppercase">
          Cadastre-se
        </p>

        {/* Alternância de perfil */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Escolha o tipo de perfil:</span>
          <div className="flex gap-4">
            <Button
              variant={perfil === "adotante" ? "default" : "outline"}
              onClick={() => setPerfil("adotante")}
            >
              Adotante
            </Button>
            <Button
              variant={perfil === "protetor" ? "default" : "outline"}
              onClick={() => setPerfil("protetor")}
            >
              ONG / Protetor
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            Perfil selecionado: <strong>{perfil}</strong>
          </p>
        </div>

        {/* Formulário */}
        <div className="flex w-full flex-1 flex-col gap-6">
          <Input placeholder="Nome Completo:" />
          <Input placeholder="Email:" />
          <Input placeholder="Celular:" />
          <Input placeholder="CPF:" />

          <p className="mt-6 text-2xl font-semibold tracking-tight uppercase">
            Aceite
          </p>
          <div className="flex items-start gap-2">
            <Checkbox id="connected" />
            <label
              htmlFor="connected"
              className="text-sm leading-snug font-medium"
            >
              Ao preencher o formulário, você confirma ser maior de 18 anos e
              aceita nossos termos de uso e política de privacidade. Suas
              informações permanecerão confidenciais e poderão ser usadas para
              mantê-lo informado sobre nosso trabalho. Nosso contato poderá ser
              feito, inclusive, por meio de notificações e e-mail.
            </label>
          </div>

          <Button className="mt-4 text-lg">Enviar</Button>
        </div>
      </div>
    </div>
  );
}
