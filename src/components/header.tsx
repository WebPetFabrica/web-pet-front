import { PawPrint, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-muted m-2 flex h-fit justify-between rounded-2xl p-2">
      <div className="flex-1">
        <div>
          <Button asChild variant="ghost">
            <Link href="/">
              <PawPrint />
              <h1 className="font-semibold tracking-tight">WebPet</h1>
            </Link>
          </Button>
        </div>
      </div>

      <nav className="flex flex-1 justify-center justify-self-center">
        <Button asChild variant="ghost">
          <Link href="/">Inicio</Link>
        </Button>

        <Button asChild variant="ghost">
          <Link href="/">Buscar Pets</Link>
        </Button>

        <Button asChild variant="ghost">
          <Link href="/">ONGs/Protetores</Link>
        </Button>

        <Button asChild variant="ghost">
          <Link href="/">Doar</Link>
        </Button>
      </nav>

      <div className="flex flex-1 justify-end gap-2">
        <Input
          placeholder="Procurar na sua cidade"
          className="w-min rounded-2xl"
        />
        <Button variant="outline" size="icon" className="rounded-full">
          <UserRound />
        </Button>
      </div>
    </header>
  );
}
