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
import {
  RegisterRequest,
  RegisterRequestType,
  UserTypeType,
} from "@/lib/api.schema";
import { $fetch } from "@/lib/fetch";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Cadastro() {
  const [perfil, setPerfil] = useState<"adotante" | "protetor">("adotante");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<RegisterRequestType>({
    resolver: standardSchemaResolver(RegisterRequest),
    defaultValues: {},
  });

  const onSubmit = async (data: RegisterRequestType) => {
    setError(null);
    setSuccess(null);
    try {
      const userType =
        perfil === "adotante" ? "FISICO" : ("JURIDICO" as UserTypeType);
      const payload = {
        ...data,
        userType: userType,
      };
      if (!payload.cpf) delete payload.cpf;
      if (!payload.cnpj) delete payload.cnpj;

      const res = await $fetch("@post/auth/register", { body: payload });

      if (res.success) {
        setSuccess("Cadastro realizado com sucesso!");
        form.reset();
      } else {
        setError(res.message || "Erro ao cadastrar");
      }
    } catch (e: unknown) {
      if (e && typeof e === "object" && "message" in e) {
        setError((e as { message?: string }).message || "Erro ao cadastrar");
      } else {
        setError("Erro ao cadastrar");
      }
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-muted flex w-[700px] flex-col items-center justify-center rounded-xl px-20 py-10">
        <p className="mb-4 text-6xl font-semibold tracking-tight uppercase">
          Cadastre-se
        </p>

        {/* Alternância de perfil */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Escolha o tipo de perfil:</span>
          <div className="flex gap-4">
            <Button
              variant={perfil === "adotante" ? "default" : "outline"}
              onClick={() => setPerfil("adotante")}
              type="button"
            >
              Adotante
            </Button>
            <Button
              variant={perfil === "protetor" ? "default" : "outline"}
              onClick={() => setPerfil("protetor")}
              type="button"
            >
              ONG / Protetor
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            Perfil selecionado: <strong>{perfil}</strong>
          </p>
        </div>

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
            {perfil === "adotante" ? (
              <FormField
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
              />
            ) : (
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
            )}
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
            {error && <p className="text-destructive text-sm">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
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
