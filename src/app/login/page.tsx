"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiFacebook, SiGoogle, SiX } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "Digite a senha" }),
  keepConnected: z.boolean().optional(),
});

type FormType = z.infer<typeof formSchema>;

export default function Page() {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", keepConnected: false },
  });

  async function onSubmit(values: FormType) {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log(result);
    if (result?.ok) {
      toast.success("Login bem sucedido");
      router.push("/manage-pets");
    }

    if (result?.error) toast.error("E-mail ou senha inválidos");
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-muted flex w-120 flex-col items-center justify-center rounded-xl px-15 py-4">
        <p className="my-6 text-2xl font-semibold tracking-tight uppercase">
          Login
        </p>
        <Form {...form}>
          <form
            className="flex w-full flex-1 flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="E-mail" type="email" {...field} />
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
                  <FormControl>
                    <Input placeholder="Senha" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="keepConnected"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="connected"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="connected"
                      className="text-sm leading-none font-medium"
                    >
                      Mantenha-me conectado
                    </label>
                  </div>
                )}
              />
              <span className="text-sm hover:underline">Esqueceu a senha?</span>
            </div>
            <Button className="text-lg" type="submit">
              Entrar
            </Button>
          </form>
        </Form>

        <div className="mt-6 flex w-full flex-col gap-2 text-sm">
          <div className="flex gap-2 self-center">
            <span>Ainda não tem uma conta?</span>
            <span className="hover:underline">Clique aqui</span>
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            <div className="bg-border h-px w-full" />
            ou
            <div className="bg-border h-px w-full" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="text-sm">
              Login rápido / Logar com sua rede social
            </span>

            <div className="flex justify-between gap-2 self-center">
              <Button variant="outline" size="icon">
                <SiFacebook />
              </Button>
              <Button variant="outline" size="icon">
                <SiGoogle />
              </Button>
              <Button variant="outline" size="icon">
                <SiX />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
