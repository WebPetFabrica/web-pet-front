"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, Handshake, MoveRight, Search, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const petsContainerRef = useRef<HTMLDivElement>(null);

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
      
      <div className="flex h-[550px] w-full items-center justify-between bg-[#FFF7EC] px-32 py-10 shadow-md relative overflow-hidden">
        
        <div className="space-y-4 w-1/2 z-10">
          <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#FA893E] rounded-[35%] opacity-80 -z-0"></div>

          <h1 className="text-4xl font-bold text-[#FA893E]">Web Pets</h1>
          <h2 className="text-2xl font-semibold">Quem somos nós?</h2>
          <p className="w-4/5 text-sm text-muted-foreground leading-relaxed">
            Conectamos adotantes a ONGs e protetores em espaços estratégicos de adoção.<br />
            Juntos, promovemos lares cheios de amor e cuidado para os pets.
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-gray-900">
            Adotar
          </Button>
        </div>

        <div className="relative w-1/2 flex justify-center items-center z-10">
          <Image
            src="/images/hero-bg-shape.png"
            alt="Fundo decorativo"
            width={420}
            height={420}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-0"
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
          />
        </div>
      </div>

      {/* Seção: Conheça alguns amiguinhos */}
      <div className="px-10 py-16">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-wide">
            Conheça alguns amiguinhos
          </h2>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full" onClick={() => scrollPets("left")}>
              <span className="sr-only">Voltar</span>
              &#8592;
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full" onClick={() => scrollPets("right")}>
              <span className="sr-only">Avançar</span>
              &#8594;
            </Button>
          </div>
        </div>

        <div
          ref={petsContainerRef}
          className="flex gap-6 mt-10 overflow-x-auto no-scrollbar flex-nowrap"
        >
          {[
            { nome: "Flora", idade: "6 meses", src: "/images/flora.jpg" },
            { nome: "Galileu", idade: "2 anos", src: "/images/galileu.jpg" },
            { nome: "Rabito", idade: "1 ano", src: "/images/rabito.jpg" },
            { nome: "Faísca", idade: "5 anos", src: "/images/faisca.jpg" },
            { nome: "Tico", idade: "3 anos", src: "/images/faisca.jpg" },
            { nome: "Luna", idade: "1 ano", src: "/images/faisca.jpg" },
          ].map((pet, index) => (
            <div
              key={index}
              className="bg-white text-black border border-gray-200 rounded-xl w-60 flex-shrink-0 overflow-hidden shadow-sm"
            >
              <Image
                src={pet.src}
                alt={pet.nome}
                width={240}
                height={160}
                className="w-full h-40 object-cover"
              />
              <div className="px-4 py-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{pet.nome}</span>
                  <Button variant="ghost" size="icon">
                    <MoveRight className="text-primary" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{pet.idade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processo de adoção */}
      <div className="bg-white px-10 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          Qual o Processo de adoção?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: Search, label: "Ache seu Pet" },
            { icon: ClipboardList, label: "Formulário de Interesse" },
            { icon: Star, label: "Avaliação do Adotante" },
            { icon: Handshake, label: "Adoção Finalizada" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center bg-[#6b5e4c] text-white rounded-lg p-6 h-36 shadow-md"
            >
              <Icon className="size-6 mb-3 text-orange-400" />
              <span className="text-center text-sm font-medium text-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Categorias */}
      <div className="px-10 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          Seu possível amiguinho, está em alguma dessas categorias?
        </h2>
        <div className="flex justify-center gap-20">
          {[
            { label: "Domésticos", image: "/cat-icon.svg" },
            { label: "Silvestres", image: "/bird-icon.svg" },
            { label: "Exóticos", image: "/turtle-icon.svg" },
          ].map(({ label, image }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="relative size-28 rounded-full mb-4 bg-gradient-to-tl from-orange-400 to-orange-200 flex items-center justify-center">
                <Image
                  src={image}
                  alt={label}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <span className="font-semibold">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800">
            Adotar
          </Button>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-gray-100 px-10 py-10 text-sm text-muted-foreground relative">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          <div className="space-y-2 max-w-md">
            <h3 className="font-bold text-black flex items-center gap-2 text-lg">
              <span className="text-xl">🐾</span> Web Pets
            </h3>
            <p>
              Web pets foi criado para estreitar laços entre pessoas que têm o sonho de adotar um pet e nossas ONGs e protetores parceiros.
            </p>
            <div className="flex gap-3 mt-2">
              {["f", "i", "x"].map((icon, i) => (
                <div key={i} className="bg-black text-white rounded-full size-6 flex items-center justify-center text-xs">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-2">Institucional</h4>
            <ul className="space-y-1">
              <li>Sobre Nós</li>
              <li>Histórias de Adotantes</li>
              <li>Doar</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs mt-10">
          © Copyright Web Pets 2025. Design by Webpets.
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[url('/paws-pattern.png')] bg-repeat opacity-10 pointer-events-none" />
      </footer>
    </div>
  );
}
