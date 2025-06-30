import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { OngType } from "@/lib/api.schema";
import { cn } from "@/lib/utils";

export function OngCard({ ong, even }: { ong: OngType; even?: boolean }) {
  return (
    <div
      className={cn(
        "bg-background border-foreground/10 flex flex-col items-center gap-6 rounded-2xl border p-6 shadow-sm md:flex-row",
        even && "md:flex-row-reverse",
      )}
    >
      <Image
        src="/placeholder.webp"
        alt={ong.name}
        width={256}
        height={192}
        className="h-48 w-full rounded-xl object-contain md:w-64"
      />
      <div className="flex-1">
        <h3 className="mb-2 text-xl font-bold">{ong.name}</h3>
        <p className="text-foreground/70 text-sm leading-relaxed">
          {ong.description}
        </p>
        <div className="text-foreground/70 mt-4 flex flex-col gap-2">
          {ong.email && (
            <a
              href={`mailto:${ong.email}`}
              className="flex items-center gap-1 hover:underline"
            >
              <Mail size={18} />
              <span>{ong.email}</span>
            </a>
          )}
          {ong.phone && (
            <a
              href={`tel:${ong.phone}`}
              className="flex items-center gap-1 hover:underline"
            >
              <Phone size={18} />
              <span>{ong.phone}</span>
            </a>
          )}
        </div>
        {/* <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 mt-4 rounded-md">Adotar</Button> */}
      </div>
    </div>
  );
}
