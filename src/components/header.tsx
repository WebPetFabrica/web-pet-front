"use client";

import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, PawPrint, UserRound } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";

interface INavLink {
  title: string;
  link: string;
}

const navLinks: INavLink[] = [
  { link: "/", title: "Inicio" },
  { link: "/pets", title: "Buscar Pets" },
  { link: "/ongs", title: "ONGs/Protetores" },
  { link: "/doar", title: "Doar" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const pathname = usePathname();

  return (
    <header className="bg-header-background m-2 flex h-fit justify-between rounded-2xl p-2">
      <div className="flex flex-1">
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80svh] p-0">
            <VisuallyHidden>
              <DrawerHeader>
                <DrawerTitle>WebPet</DrawerTitle>
              </DrawerHeader>
            </VisuallyHidden>

            <div className="overflow-auto p-6">
              <div className="flex flex-col space-y-3">
                {navLinks.map(({ link, title }) => (
                  <MobileLink
                    key={link + title}
                    href={link}
                    onOpenChange={setOpen}
                  >
                    {title}
                  </MobileLink>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        <div>
          <Button asChild variant="ghost">
            <Link href="/">
              <PawPrint />
              <h1 className="font-semibold tracking-tight">WebPet</h1>
            </Link>
          </Button>
        </div>
      </div>

      <nav className="hidden flex-1 justify-center space-x-2 justify-self-center md:flex">
        {navLinks.map(({ link, title }) => (
          <Button
            key={link + title}
            variant="ghost"
            className={cn(
              "rounded-none hover:bg-inherit hover:text-inherit",
              pathname === link &&
                "text-primary border-primary hover:text-primary border-b-2",
            )}
            asChild
          >
            <Link href={link}>{title}</Link>
          </Button>
        ))}
      </nav>

      <div className="flex flex-1 justify-end gap-2">
        <Input
          placeholder="Procurar na sua cidade"
          className="hidden w-min rounded-2xl md:inline"
        />
        <Button variant="outline" size="icon" className="rounded-full">
          <UserRound />
        </Button>
      </div>
    </header>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-[1.15rem]", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
