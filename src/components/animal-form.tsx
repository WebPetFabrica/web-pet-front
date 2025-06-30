"use client";

import { Input } from "@/components/ui/input";
import z from "zod/v4";
import { standardSchemaResolver as resolver } from "@hookform/resolvers/standard-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Category, Status } from "@/lib/api.schema";
import Image from "next/image";

z.config(z.locales.pt());

// <AspectRatio ratio={1 / 1}>
//   <div className="border-border flex h-full w-full rounded-xl border">
//     {/* <div className="size-100 bg-amber-500" /> */}
//     <div className="flex w-full items-center justify-center">
//       <span className="text-lg">Sem foto</span>
//     </div>
//   </div>
// </AspectRatio>
// <Input type="file" />

const categorySchema = Category;

const categoryOptions = categorySchema.options;
type CategoryOption = (typeof categoryOptions)[number];

export const categoryTranslations: Record<CategoryOption, string> = {
  DOG: "Cachorro",
  CAT: "Gato",
  BIRD: "Pássaro",
  FISH: "Peixe",
  REPTILE: "Réptil",
  RODENT: "Roedor",
  OTHER: "Outro",
};

const statusSchema = Status;

const statusOptions = statusSchema.options;
type StatusOption = (typeof statusOptions)[number];

export const statusTranslations: Record<StatusOption, string> = {
  AVAILABLE: "Disponível",
  ADOPTED: "Adotado",
};

const formSchema = z.object({
  // image: z.file().optional(),
  name: z.string({ error: "Escreva o nome do pet" }),
  description: z.string(),
  category: categorySchema,
  status: statusSchema,
});

export type AnimalFormType = z.infer<typeof formSchema>;

interface AnimalFormProps {
  defaultValues?: Partial<AnimalFormType>;
  onSubmit: (values: AnimalFormType) => void;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

export function AnimalForm({
  defaultValues,
  onSubmit,
  submitLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onCancel,
}: AnimalFormProps) {
  const form = useForm<AnimalFormType>({
    resolver: resolver(formSchema),
    defaultValues,
  });

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-8 *:p-8 lg:grid-cols-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex h-full w-full items-center justify-center space-y-2 place-self-center">
          <div className="border-border size-64 rounded-xl border">
            <Image
              src="/placeholder.webp"
              width={128}
              height={128}
              alt="Pet image"
              className="size-32 h-full w-full"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 p-16">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Pet</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva um pouco sobre o Pet"
                    // className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a categoria do Pet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {categoryTranslations[category] || category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status do Pet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {statusTranslations[status] || status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6 flex justify-end gap-2 *:data-[slot=button]:w-fit">
            {onCancel && (
              <Button variant="destructive" type="button" onClick={onCancel}>
                {cancelLabel}
              </Button>
            )}
            <Button type="submit">{submitLabel}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
