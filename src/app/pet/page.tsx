import { Button } from "@/components/ui/button";
import { House, Syringe } from "lucide-react";

export default function PetPage() {
  return (
    <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
      <div className="flex size-fit justify-self-center">
        {/* <Image
          width={500}
          height={500}
          alt=""
          src="https://i1.wp.com/petsbagunceiros.com/wp-content/uploads/2020/03/cachorro-racao.png"
        /> */}
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Bob</h1>
          <span className="text-muted-foreground text-sm">6 meses</span>
        </div>

        <div>
          <p className="line-clamp-6 leading-7">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
            earum ipsam hic! Ducimus corporis fuga beatae quidem ipsa repellat
            et repellendus perspiciatis illo sequi ex, molestias, consequatur
            dolor autem iusto. Asperiores pariatur cum mollitia. Numquam id
            iusto quidem in libero laborum delectus facere dolores esse,
            repellat hic vitae non, dolorem pariatur. Veniam eaque ut corrupti
            amet eum? Sed, natus autem? Ipsa dolore nisi laboriosam similique
            aliquid pariatur doloremque natus nostrum odio ipsam magni aperiam
            omnis magnam, reprehenderit tempora nesciunt necessitatibus placeat
            ex nobis quo expedita ullam fugit? Quisquam, blanditiis molestias!
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-4 **:data-[slot=button]:w-fit">
          <div className="flex flex-col gap-4 md:flex-row">
            <Button variant="secondary">
              <Syringe /> Baixar dados médicos
            </Button>
            <Button variant="secondary">
              <House /> Baixar histórico de lar
            </Button>
          </div>
          <Button size="lg">Adotar</Button>
        </div>
      </div>
    </div>
  );
}
