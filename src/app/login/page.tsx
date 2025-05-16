import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SiFacebook, SiGoogle, SiX } from "@icons-pack/react-simple-icons";

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-muted flex w-120 flex-col items-center justify-center rounded-xl px-15 py-4">
        <p className="my-6 text-2xl font-semibold tracking-tight uppercase">
          Login
        </p>

        <div className="flex w-full flex-1 flex-col gap-3">
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="connected" />
              <label
                htmlFor="connected"
                className="text-sm leading-none font-medium"
              >
                Mantenha-me conectado
              </label>
            </div>
            <a className="text-sm hover:underline">Esqueceu a senha?</a>
          </div>

          <Button className="text-lg">Entrar</Button>
        </div>

        <div className="mt-6 flex w-full flex-col gap-2 text-sm">
          <div className="flex gap-2 self-center">
            <span>Ainda não tem uma conta?</span>
            <a className="hover:underline">Clique aqui</a>
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
