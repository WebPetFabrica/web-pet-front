"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Checkbox } from "@radix-ui/react-checkbox";

export function Filters() {
  return (
    <>
      <aside className="hidden md:block">
        <FilterItens />
      </aside>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="md:hidden" variant="outline">
            Abrir Filtros
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-xl">Filtros</DrawerTitle>
            <DrawerDescription>
              Selecione os filtros para achar seu próximo parceiro pra vida
            </DrawerDescription>
          </DrawerHeader>
          <FilterItens className="w-full overflow-y-auto" />
        </DrawerContent>
      </Drawer>
    </>
  );
}

function FilterItens({ className, ...props }: React.ComponentProps<"div">) {
  const [value, setValue] = useState([0, 100]);

  return (
    <div className={cn("border-border w-80 p-4", className)} {...props}>
      <div>
        <p className="mb-4 text-base font-semibold md:text-lg">
          Filtrar por categoria
        </p>

        <div className="w-full space-y-1">
          <FilterCategoryItem name="Domésticos" count={0} />
          <FilterCategoryItem name="Domésticos" count={0} />
          <FilterCategoryItem name="Domésticos" count={0} />
          <FilterCategoryItem name="Domésticos" count={0} />
        </div>
      </div>

      <div className="space-y-4">
        <p className="my-4 text-base font-semibold md:text-lg">Km de você</p>

        <Slider value={value} onValueChange={setValue} />

        <span>
          Distância: {value.at(0)}km - {value.at(1)}km
        </span>
      </div>

      <div>
        <p className="my-4 text-base font-semibold md:text-lg">
          Filtrar por Status ou Situação do Pet
        </p>

        <div className="w-full space-y-1">
          <FilterCategoryItem name="Domésticos" count={0} />
          <FilterCategoryItem name="Domésticos" count={0} />
          <FilterCategoryItem name="Domésticos" count={0} />
          <FilterCategoryItem name="Domésticos" count={0} />
        </div>
      </div>

      <div>
        <p className="my-4 text-base font-semibold md:text-lg">
          Filtrar por tags
        </p>

        <div className="flex flex-wrap gap-2">
          <Toggle variant="outline">Cão</Toggle>
          <Toggle variant="outline">Gato</Toggle>
          <Toggle variant="outline">Cavalo</Toggle>
          <Toggle variant="outline">Réptil</Toggle>
          <Toggle variant="outline">Réptil</Toggle>
          <Toggle variant="outline">Réptil</Toggle>
          <Toggle variant="outline">Réptil</Toggle>
          <Toggle variant="outline">Réptil</Toggle>
          <Toggle variant="outline">Réptil</Toggle>
          <Toggle variant="outline">Réptil</Toggle>
          <Toggle variant="outline">Réptil</Toggle>
          <Toggle variant="outline">Réptil</Toggle>
          <Toggle variant="outline">Dinossauro</Toggle>
        </div>
      </div>

      <div className="my-4 flex w-full">
        <Button>Confirmar</Button>
      </div>
    </div>
  );

  interface FilterCategoryItemProps {
    name: string;
    count: number;
  }

  function FilterCategoryItem({
    name,
    count,
    className,
    ...props
  }: React.ComponentProps<typeof Checkbox> & FilterCategoryItemProps) {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        <div className="flex items-center gap-2">
          <Checkbox {...props} /> <span>{name}</span>
        </div>
        <span className="text-primary justify-self-end">{count}</span>
      </div>
    );
  }
}
