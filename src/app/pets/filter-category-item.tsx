import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  name: string;
  count: number;
}

export function FilterCategoryItem({
  name,
  count,
  className,
  ...props
}: React.ComponentProps<typeof Checkbox> & Props) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <Checkbox {...props} /> <span>{name}</span>
      </div>
      <span className="text-primary justify-self-end">{count}</span>
    </div>
  );
}
