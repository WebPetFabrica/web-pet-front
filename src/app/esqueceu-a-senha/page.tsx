import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SiFacebook, SiGoogle, SiInstagram, SiX, SiYoutube } from "@icons-pack/react-simple-icons";
 

export default function cadastro() {
  return (
    <div className="flex h-full w-full items-start justify-start">
      <div className="bg-muted flex w-[px] flex-col items-start justify-start rounded-xl px-[300px] py-20">
        <p className="text-5xl font-semibold tracking-tight uppercase mb-6">
          Redefinir senha
        </p>

        <label
          htmlFor="connected"
          className="text-sm leading-none font-medium"
        >
          Para redefinir sua senha, informe o usuário ou <br />
          e-mail cadastrado e enviaremos um link
        </label>

        <div className="flex w-full flex-1 flex-col gap-10 mt-10">
          <Input placeholder="Insira seu E-mail:" />
        </div>
        <Button className="text-lg self-center mt-10">Continuar</Button>
        <label
          htmlFor="connected"
          className="text-sm leading-none font-medium mt-80"
        >
          Web Pets foi criado para estreitar laços entre<br />
          pessoas que têm o sonho de adotar um pet e <br />
          nossas ONGs e protetores parceiros
        </label>
        <div className="flex justify-between gap-2 self-start mt-5">
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