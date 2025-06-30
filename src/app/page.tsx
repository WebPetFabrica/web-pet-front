"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  Handshake,
  MoveRight,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAnimalsQuery } from "@/queries/animal.query";
import { PetSimpleCard } from "@/components/pet-simple-card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const petsContainerRef = useRef<HTMLDivElement>(null);

  const { data: animals, isLoading, isError } = useAnimalsQuery({ size: 10 });

  const scrollPets = (direction: "left" | "right") => {
    const container = petsContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white text-black">
      <div className="relative flex h-[550px] w-full items-center justify-between overflow-hidden bg-[#FFF7EC] px-32 py-10 shadow-md">
        <div className="z-10 w-1/2 space-y-4">
          <div className="absolute -top-12 -left-12 -z-0 h-28 w-28 rounded-[35%] bg-[#FA893E] opacity-80"></div>

          <h1 className="text-4xl font-bold text-[#FA893E]">Web Pets</h1>
          <h2 className="text-2xl font-semibold">Quem somos nós?</h2>
          <p className="text-muted-foreground w-4/5 text-sm leading-relaxed">
            Conectamos adotantes a ONGs e protetores em espaços estratégicos de
            adoção.
            <br />
            Juntos, promovemos lares cheios de amor e cuidado para os pets.
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-gray-900">
            Adotar!
          </Button>
        </div>

        <div className="relative z-10 flex w-1/2 items-center justify-center">
          {/* <Image
            src="/images/hero-bg-shape.png"
            alt="Fundo decorativo"
            width={420}
            height={420}
            className="absolute top-0 left-1/2 z-0 -translate-x-1/2"
          />
          <Image
            src="/images/family-pets.png"
            alt="Família com pets"
            width={420}
            height={420}
            className="relative z-10"
          />
          <Image
            src="/images/bird.png"
            alt="Pássaro"
            width={100}
            height={100}
            className="absolute top-10 left-0 z-10"
          />*/}
        </div>
      </div>

      {/* Seção: Conheça alguns amiguinhos */}
      <div className="px-10 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-wide">
            Conheça alguns amiguinhos
          </h2>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={() => scrollPets("left")}
            >
              <span className="sr-only">Voltar</span>
              &#8592;
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={() => scrollPets("right")}
            >
              <span className="sr-only">Avançar</span>
              &#8594;
            </Button>
          </div>
        </div>

        <div
          ref={petsContainerRef}
          className="no-scrollbar mt-10 flex flex-nowrap gap-6 overflow-x-auto"
        >
          {isLoading && <div>Carregando...</div>}
          {isError && <div>Erro ao carregar pets.</div>}
          {animals &&
            animals.animals &&
            animals.animals.length > 0 &&
            animals.animals.map((pet, index: number) => (
              <PetSimpleCard
                className="h-80 w-60"
                key={pet.id}
                name={pet.name}
                // age={"-"}
                action={() => router.push(`/pets/${pet.id}`)}
              />
            ))}
        </div>
      </div>

      {/* Processo de adoção */}
      <div className="bg-white px-10 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold">
          Qual o Processo de adoção?
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: Search, label: "Ache seu Pet" },
            { icon: ClipboardList, label: "Formulário de Interesse" },
            { icon: Star, label: "Avaliação do Adotante" },
            { icon: Handshake, label: "Adoção Finalizada" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex h-36 flex-col items-center justify-center rounded-lg bg-[#6b5e4c] p-6 text-white shadow-md"
            >
              <Icon className="mb-3 size-6 text-orange-400" />
              <span className="text-center text-sm font-medium text-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Categorias */}
      <div className="px-10 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold">
          Seu possível amiguinho, está em alguma dessas categorias?
        </h2>
        <div className="flex justify-center gap-20">
          {[
            { label: "Gatos", category: "CAT" },
            { label: "Cachorros", category: "DOG" },
            { label: "Roedores", category: "RODENT" },
          ].map(({ label, category }) => (
            <div key={label} className="flex flex-col items-center">
              <Link href={`/pets?category=${category}`}>
                <div className="relative mb-4 flex size-28 items-center justify-center rounded-full bg-gradient-to-tl from-orange-400 to-orange-200">
                  {/* <Image
                  src={image}
                  alt={label}
                  width={64}
                  height={64}
                  className="object-contain"
                  /> */}
                </div>
              </Link>
              <span className="font-semibold">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800">
            Adotar
          </Button>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="text-muted-foreground relative bg-gray-100 px-10 py-10 text-sm">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-md space-y-2">
            <h3 className="flex items-center gap-2 text-lg font-bold text-black">
              <span className="text-xl">🐾</span> Web Pets
            </h3>
            <p>
              Web pets foi criado para estreitar laços entre pessoas que têm o
              sonho de adotar um pet e nossas ONGs e protetores parceiros.
            </p>
            <div className="mt-2 flex gap-3">
              {["f", "i", "x"].map((icon, i) => (
                <div
                  key={i}
                  className="flex size-6 items-center justify-center rounded-full bg-black text-xs text-white"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-black">Institucional</h4>
            <ul className="space-y-1">
              <li>Sobre Nós</li>
              <li>Histórias de Adotantes</li>
              <li>Doar</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-xs">
          © Copyright Web Pets 2025. Design by Webpets.
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-[url('/paws-pattern.png')] bg-repeat opacity-10" />
      </footer>
    </div>
  );
}
