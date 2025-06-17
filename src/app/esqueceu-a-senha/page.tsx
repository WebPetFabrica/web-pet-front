import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

export default function cadastro() {
  return (
    <div className="flex h-full w-full items-start justify-start">
      <div className="bg-muted flex w-[px] flex-col items-start justify-start rounded-xl px-[300px] py-20">
        <p className="mb-6 text-5xl font-semibold tracking-tight uppercase">
          Redefinir senha
        </p>

        <label htmlFor="connected" className="text-sm leading-none font-medium">
          Para redefinir sua senha, informe o usuário ou <br />
          e-mail cadastrado e enviaremos um link
        </label>

        <div className="mt-10 flex w-full flex-1 flex-col gap-10">
          <Input placeholder="Insira seu E-mail:" />
        </div>
        <Button className="mt-10 self-center text-lg">Continuar</Button>
        <label
          htmlFor="connected"
          className="mt-80 text-sm leading-none font-medium"
        >
          Web Pets foi criado para estreitar laços entre
          <br />
          pessoas que têm o sonho de adotar um pet e <br />
          nossas ONGs e protetores parceiros
        </label>
        <div className="mt-5 flex justify-between gap-2 self-start">
          <Button variant="outline" size="icon">
            <SiFacebook />
          </Button>
          <Button variant="outline" size="icon">
            <SiInstagram />
          </Button>
          <Button variant="outline" size="icon">
            <SiX />
          </Button>
          <Button variant="outline" size="icon">
            <SiYoutube />
          </Button>
        </div>
      </div>
    </div>
  );
}
