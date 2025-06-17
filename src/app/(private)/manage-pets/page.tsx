import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus } from "lucide-react";
import { DeleteButton } from "./_components/delete-button";
import Link from "next/link";

interface IData {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  status: string;
}

const fakeData: IData[] = [
  {
    id: 1,
    nome: "Elizabeth",
    descricao: "Bobona que faz fotossíntese",
    categoria: "Gato",
    status: "Disponível",
  },
];

export default function ManagePetsPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pets</h2>
        <p className="text-muted-foreground">
          Organize os pets disponíveis para adoção
        </p>
      </div>

      <div className="flex items-baseline justify-between">
        <div>Filtros aqui...</div>
        <div>
          <Button>
            <Plus /> Adicionar
          </Button>
        </div>
      </div>

      <div className="border-border w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fakeData.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.nome}</TableCell>
                <TableCell>{pet.descricao}</TableCell>
                <TableCell>{pet.categoria}</TableCell>
                <TableCell>{pet.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" asChild>
                    <Link href="/manage-pets/edit">
                      <Pencil />
                    </Link>
                  </Button>
                  <DeleteButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
