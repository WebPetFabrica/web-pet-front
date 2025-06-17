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

z.config(z.locales.pt());

const categorySchema = z.enum(
  ["Gato", "Cachorro", "Pássaro", "Peixe", "Réptil", "Outro"],
  { error: "Selecione uma categoria" },
);

const categoryOptions = categorySchema.options;

const statusSchema = z.enum(["Disponível", "Adotado"], {
  error: "Selecione um status",
});

const statusOptions = statusSchema.options;

const formSchema = z.object({
  image: z.file().optional(),
  name: z.string({ error: "Escreva o nome do pet" }),
  description: z.string().optional(),
  category: categorySchema,
  status: statusSchema,
});

type FormType = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<FormType>({
    resolver: resolver(formSchema),
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Editar Pet</h2>
      </div>

      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-8 *:p-8 lg:grid-cols-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2 place-self-center">
            <AspectRatio ratio={1 / 1}>
              <div className="border-border flex h-full w-full rounded-xl border">
                {/* <div className="size-100 bg-amber-500" /> */}
                <div className="flex w-full items-center justify-center">
                  <span className="text-lg">Sem foto</span>
                </div>
              </div>
            </AspectRatio>

            <Input type="file" />
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
                            {category}
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
                            {status}
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
              <Button variant="destructive">Cancelar</Button>
              <Button>Confirmar</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
