import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";

interface Props {
  name: string;
  age: string;
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
        "bg-card text-card-foreground border-border flex flex-col overflow-hidden rounded-lg border",
        className,
      )}
      {...props}
    >
      <div className="border-border bg-header-background size-32 h-full w-full">
        Imagem aqui
      </div>
      <div className="flex flex-col px-3 py-4">
        <div className="flex items-center justify-between">
          <span>{name}</span>
          <Button variant="ghost" onClick={action}>
            <MoveRight className="text-primary" />
          </Button>
        </div>
        <span className="text-muted-foreground">{age}</span>
      </div>
    </div>
  );
}
