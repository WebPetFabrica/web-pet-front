"use client";

import { OngType } from "@/lib/api.schema";
import { useOngsQuery } from "@/queries/ong.query";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { OngCard } from "@/components/ong-card";

export default function OngsPage() {
  const { data: ongs, isLoading, isError } = useOngsQuery();

  return (
    <div className="bg-background text-foreground">
      {/* Banner */}
      <section className="dark:bg-foreground/5 relative overflow-hidden bg-[#FFF8F2] px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row">
          <div className="z-10">
            <h1 className="text-4xl font-bold text-[#FA893E]">Web Pets</h1>
            <h2 className="text-2xl font-semibold">
              Conheça nossos <br /> apoiadores
            </h2>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        {isLoading && <div>Carregando...</div>}
        {isError && <div>Erro ao carregar ONGs.</div>}
        {ongs &&
          ongs.length > 0 &&
          ongs.map((ong, idx) => (
            <OngCard key={idx} ong={ong} even={idx % 2 === 0} />
          ))}
      </section>

      <footer className="bg-foreground/5 border-foreground/10 relative mt-10 overflow-hidden border-t px-6 pt-14 pb-10">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <h4 className="text-lg font-bold">🐾 Web Pets</h4>
            <p className="mt-2 max-w-sm text-sm">
              Web Pets foi criado para estreitar laços entre pessoas que têm o
              sonho de adotar um pet e nossas ONGs e protetores parceiros.
            </p>
            <div className="text-foreground/70 mt-4 flex gap-4">
              <Facebook size={18} />
              <Instagram size={18} />
              <Mail size={18} />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <h5 className="font-semibold">Institucional</h5>
            <p>Sobre Nós</p>
            <p>Histórias de Adotantes</p>
            <p>Doar</p>
          </div>
        </div>
        <p className="text-foreground/50 relative z-10 mt-8 text-center text-xs">
          © Copyright Web Pets 2025. Design by Webpets.
        </p>
        <img
          src="/ongs/patas-bg-footer.png"
          alt="Pegadas"
          className="absolute bottom-0 left-0 z-0 w-full object-cover opacity-10"
        />
      </footer>
    </div>
  );
}
