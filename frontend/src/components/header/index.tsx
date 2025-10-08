"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Cookies from "js-cookie";
import {
  LogInIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { JSX, SVGProps, useEffect, useState } from "react";
import { ModeToggle } from "../mode-toggle";

// Itens de navegação centralizados em um único array
const navItems = ["Home", "About", "Services", "Portfolio", "Contact"];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center justify-between px-4 md:px-6">
        {/* Menu mobile */}
        <Sheet>
          <div className="flex items-center lg:hidden">
            <SheetTrigger asChild>
              <Button size="icon" aria-label="Abrir menu de navegação">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <Link
              href="/"
              className="ml-3 text-2xl font-bold tracking-tight uppercase"
            >
              shop.co
            </Link>
          </div>
          <SheetContent side="left">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <ShirtIcon className="h-6 w-6" />
              <span className="text-lg font-bold">shop.co</span>
            </Link>
            <div className="grid gap-2 py-6">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-primary flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  {item}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Menu desktop */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <ShirtIcon className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight uppercase">
              shop.co
            </span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuLink asChild key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                    prefetch={false}
                  >
                    {item}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Ações do usuário */}
        <div className="flex items-center gap-2">
          <Button size="icon" aria-label="Pesquisar">
            <SearchIcon />
          </Button>

          {isLoggedIn && (
            <Button size="icon" aria-label="Perfil do usuário">
              <Link href="/profile">
                <UserCircleIcon />
              </Link>
            </Button>
          )}

          <Button size="icon" aria-label="Login">
            {!isLoggedIn && (
              <Link href="/login">
                <LogInIcon />
              </Link>
            )}
          </Button>

          <Button size="icon" aria-label="Registrar">
            {!isLoggedIn && (
              <Link href="/signup">
                <UserIcon />
              </Link>
            )}
          </Button>

          <Button size="icon" aria-label="Carrinho de compras">
            <ShoppingCartIcon />
          </Button>

          <ModeToggle />
        </div>
      </header>
    </div>
  );
}

/* =======================
  ÍCONES AUXILIARES
======================= */

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function ShirtIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}
