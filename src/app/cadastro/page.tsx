"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { JURIDICO, RegisterRequestType } from "@/lib/api.schema";
import { $fetch } from "@/lib/fetch";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v4";
import pt from "zod/v4/locales/pt.js";

z.config(pt());
const phoneRegex = /^\(?\d{2}\)?[\s-]?9?\d{4}-?\d{4}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

const formSchema = z.object({
  name: z.string({ error: "Campo Obrigatório" }),
  email: z.email({ error: "Campo Obrigatório" }),
  phone: z
    .string({ error: "Campo Obrigatório" })
    .regex(phoneRegex, { error: "Telefone brasileiro inválido" }),
  cpf: z.string({ error: "Campo Obrigatório" }).optional(),
  cnpj: z
    .string({ error: "Campo Obrigatório" })
    .regex(cnpjRegex, { error: "CNPJ inválido" }),
  password: z.string({ error: "Campo Obrigatório" }),
});

export default function Cadastro() {
  const router = useRouter();

  const [accepted, setAccepted] = useState(false);

  const form = useForm<RegisterRequestType>({
    resolver: standardSchemaResolver(formSchema),
  });
  console.log(form.formState.errors);

  async function onSubmit(data: RegisterRequestType) {
    try {
      const payload = {
        ...data,
        UserType: JURIDICO,
      };
      console.log("pay", payload);

      if (!payload.cpf) delete payload.cpf;
      if (!payload.cnpj) delete payload.cnpj;

      const res = await $fetch("@post/auth/register", { body: payload });
      console.log("res", res);

      if (res.success) {
        toast.success("Cadastro realizado com sucesso!");

        router.push("/login");
      } else {
        toast.error(res.message || "Erro ao cadastrar");
      }
    } catch (e: unknown) {
      if (e && typeof e === "object" && "message" in e) {
        toast.error((e as { message?: string }).message || "Erro ao cadastrar");
      } else {
        toast.error("Erro ao cadastrar");
      }
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-muted flex w-[700px] flex-col items-center justify-center rounded-xl px-20 py-10">
        <p className="mb-4 text-6xl font-semibold tracking-tight uppercase">
          Cadastre-se
        </p>
        {/* 
        <div className="mb-8 flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Escolha o tipo de perfil:</span>
          <div className="flex gap-4">
            <Button
              variant={perfil === FISICO ? "default" : "outline"}
              onClick={() => setPerfil(FISICO)}
              type="button"
            >
              Adotante
            </Button>
            <Button
              variant={perfil === JURIDICO ? "default" : "outline"}
              onClick={() => setPerfil(JURIDICO)}
              type="button"
            >
              ONG / Protetor
            </Button>
          </div>
        </div> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1 flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome Completo:" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email:" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="Celular:" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="CPF:" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="CNPJ:" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Senha:" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="mt-6 text-2xl font-semibold tracking-tight uppercase">
              Aceite
            </p>
            <div className="flex items-start gap-2">
              <Checkbox
                id="connected"
                checked={accepted}
                onCheckedChange={(v) => setAccepted(!!v)}
              />
              <label
                htmlFor="connected"
                className="text-sm leading-snug font-medium"
              >
                Ao preencher o formulário, você confirma ser maior de 18 anos e
                aceita nossos termos de uso e política de privacidade. Suas
                informações permanecerão confidenciais e poderão ser usadas para
                mantê-lo informado sobre nosso trabalho. Nosso contato poderá
                ser feito, inclusive, por meio de notificações e e-mail.
              </label>
            </div>
            <Button
              className="mt-4 text-lg"
              type="submit"
              disabled={form.formState.isSubmitting || !accepted}
            >
              {form.formState.isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
