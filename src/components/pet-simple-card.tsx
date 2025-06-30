import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Image from "next/image";

interface Props {
  name: string;
  age?: string;
  action?: () => void;
}

export function PetSimpleCard({
  name,
  age,
  action,
  className,
  ...props
}: React.ComponentProps<"div"> & Props) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground border-border flex max-w-55 flex-col overflow-hidden rounded-lg border",
        className,
      )}
      {...props}
    >
      <div className="border-border bg-background relative flex size-32 h-full w-full items-center justify-center">
        <Image
          src="/placeholder.webp"
          alt="Pet image"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col px-3 py-4">
        <div className="flex items-center justify-between">
          <span>{name}</span>
          <Button variant="ghost" onClick={action}>
            <MoveRight className="text-primary" />
          </Button>
        </div>
        {age && <span className="text-muted-foreground">{age}</span>}
      </div>
    </div>
  );
}
