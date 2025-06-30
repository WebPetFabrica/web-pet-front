"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Category, CategoryType, Status, StatusType } from "@/lib/api.schema";
import { cn } from "@/lib/utils";
import {
  categoryTranslations,
  statusTranslations,
} from "@/components/animal-form";

interface FiltersProps {
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (value: string | null) => void;
}

export function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}: FiltersProps) {
  // Validate category and status here
  const validCategory =
    selectedCategory &&
    Category.options.includes(selectedCategory as CategoryType)
      ? (selectedCategory as CategoryType)
      : null;
  const validStatus =
    selectedStatus && Status.options.includes(selectedStatus as StatusType)
      ? (selectedStatus as StatusType)
      : null;

  return (
    <>
      <aside className="hidden md:block">
        <FilterItens
          selectedCategory={validCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={validStatus}
          setSelectedStatus={setSelectedStatus}
        />
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
          <FilterItens
            className="w-full overflow-y-auto"
            selectedCategory={validCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={validStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}

interface FilterItensProps extends React.ComponentProps<"div"> {
  selectedCategory: CategoryType | null;
  setSelectedCategory: (value: CategoryType | null) => void;
  selectedStatus: StatusType | null;
  setSelectedStatus: (value: StatusType | null) => void;
}

function FilterItens({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  className,
  ...props
}: FilterItensProps) {
  return (
    <div className={cn("border-border w-80 p-4", className)} {...props}>
      <div>
        <p className="mb-4 text-base font-semibold md:text-lg">
          Filtrar por categoria
        </p>
        <div className="w-full space-y-1">
          {Category.options.map((cat) => (
            <FilterCategoryItem
              key={cat}
              name={categoryTranslations[cat] || cat}
              checked={selectedCategory === cat}
              onCheckedChange={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
              count={0}
            />
          ))}
        </div>
      </div>
      {/*
      <div className="space-y-4">
        <p className="my-4 text-base font-semibold md:text-lg">Km de você</p>
        <Slider value={value} onValueChange={setValue} />
        <span>
          Distância: {value.at(0)}km - {value.at(1)}km
        </span>
      </div>
      */}
      <div>
        <p className="my-4 text-base font-semibold md:text-lg">
          Filtrar por Status ou Situação do Pet
        </p>
        <div className="w-full space-y-1">
          {Status.options.map((status) => (
            <FilterCategoryItem
              key={status}
              name={statusTranslations[status] || status}
              checked={selectedStatus === status}
              onCheckedChange={() =>
                setSelectedStatus(selectedStatus === status ? null : status)
              }
              count={0}
            />
          ))}
        </div>
      </div>
      {/*
      <div>
        <p className="my-4 text-base font-semibold md:text-lg">
          Filtrar por tags
        </p>
        <div className="flex flex-wrap gap-2">
          <Toggle variant="outline">Tag</Toggle>
        </div>
      </div>
      */}
      <div className="my-4 flex w-full">
        <Button>Confirmar</Button>
      </div>
    </div>
  );

  interface FilterCategoryItemProps {
    name: string;
    count: number;
    checked?: boolean;
    onCheckedChange?: () => void;
  }

  function FilterCategoryItem({
    name,
    count,
    checked,
    onCheckedChange,
    className,
    ...props
  }: React.ComponentProps<typeof Checkbox> & FilterCategoryItemProps) {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checked}
            onCheckedChange={onCheckedChange}
            {...props}
          />{" "}
          <span>{name}</span>
        </div>
        {/* <span className="text-primary justify-self-end">{count}</span> */}
      </div>
    );
  }
}
