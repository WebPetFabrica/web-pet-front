"use client";

import { Skeleton } from "./skeleton";
import { TableCell, TableRow } from "./table";

interface Props {
  length: number;
}

export const TableSkeleton = ({ length }: Props) => {
  return Array.from({ length: 10 }, (_, index) => index + 1).map((i) => (
    <TableRow key={i}>
      {Array.from({ length }, (_, index) => index + 1).map((j) => (
        <TableCell key={j}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ));
};
