import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function OngsPage() {
  const ongs = [
    {
      name: "Patinhas Amigas",
      description:
        "Nisi nunc vitae integer ridiculus ultrices quam a scelerisque est. Sollicitudin volutpat blandit maecenas ornare dictum tempor. Amet sem non rutrum et duis. Id nisi ac vitae enim neque sapien.",
      image: "/ongs/patinhas.png",
    },
    {
      name: "Ampara Anima",
      description:
        "Eu arcu consectetur etiam bibendum fermentum sed lobortis fringilla imperdiet. Aliquet ultrices risus dolor gravida. Faucibus sodales semper a magnis sapien viverra purus sed tortor. Amet risus blandit nunc odio rutrum.",
      image: "/ongs/ampara.png",
    },
    {
      name: "Gatópoles – Adoção de Gatinhos",
      description:
        "Nisi nunc vitae integer ridiculus ultrices quam a scelerisque est. Sollicitudin volutpat blandit maecenas ornare dictum tempor. Amet sem non rutrum et duis. Id nisi ac vitae enim neque sapien.",
      image: "/ongs/gatopoles.png",
    },
    {
      name: "Instituto Luísa Mell",
      description:
        "Eu arcu consectetur etiam bibendum fermentum sed lobortis fringilla imperdiet. Aliquet ultrices risus dolor gravida. Faucibus sodales semper a magnis sapien viverra purus sed tortor. Amet risus blandit nunc odio rutrum.",
      image: "/ongs/luisamell.png",
    },
  ];

  return (
    <div className="bg-white text-black">
      {/* Banner */}
      <section className="relative bg-[#FFF8F2] py-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="z-10">
            <h2 className="text-3xl font-bold text-orange-500">Web Pets</h2>
            <p className="text-2xl font-extrabold mt-2 text-black leading-tight">
              Conheça nossos <br /> apoiadores
            </p>
          </div>
          <img
            src="/ongs/banner-ongs.png"
            alt="Banner ONGs"
            className="max-w-full md:w-[500px] ml-auto z-10"
          />
        </div>
      </section>

      {/* Lista de ONGs */}
      <section className="px-6 py-10 space-y-8 max-w-7xl mx-auto">
        {ongs.map((ong, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`flex flex-col md:flex-row ${
                !isEven ? "md:flex-row-reverse" : ""
              } gap-6 items-center bg-white rounded-2xl border shadow-sm p-6`}
            >
              <img
                src={ong.image}
                alt={ong.name}
                className="w-full md:w-64 h-48 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{ong.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {ong.description}
                </p>
                <div className="flex items-center gap-4 mt-4 text-gray-600">
                  <Facebook size={18} />
                  <Instagram size={18} />
                  <Mail size={18} />
                </div>
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-900 rounded-md mt-4"
                >
                  Adotar
                </Button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Rodapé */}
      <footer className="relative bg-[#F6F6F6] mt-10 px-6 pt-14 pb-10 border-t overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6 z-10 relative">
          <div>
            <h4 className="font-bold text-lg">🐾 Web Pets</h4>
            <p className="text-sm mt-2 max-w-sm">
              Web Pets foi criado para estreitar laços entre pessoas que têm o
              sonho de adotar um pet e nossas ONGs e protetores parceiros.
            </p>
            <div className="flex gap-4 mt-4 text-gray-600">
              <Facebook size={18} />
              <Instagram size={18} />
              <Mail size={18} />
            </div>
          </div>
          <div className="text-sm space-y-2">
            <h5 className="font-semibold">Institucional</h5>
            <p>Sobre Nós</p>
            <p>Histórias de Adotantes</p>
            <p>Doar</p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8 relative z-10">
          © Copyright Web Pets 2025. Design by Webpets.
        </p>
        <img
          src="/ongs/patas-bg-footer.png"
          alt="Pegadas"
          className="absolute bottom-0 left-0 w-full object-cover opacity-10 z-0"
        />
      </footer>
    </div>
  );
}
