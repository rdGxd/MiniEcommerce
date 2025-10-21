"use client";


import { ShirtIcon } from "lucide-react";
import Link from "next/link";
import { DesktopNav } from "../desktop-nav";
import { MobileNav } from "../mobile-nav";
import { UserActions } from "../user-actions";

// Estrutura de dados mais robusta
const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "On Sale", href: "/" },
  { name: "New Arrivals", href: "/" },
  { name: "Brands", href: "/" },
];

export default function Header() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center justify-between px-4 md:px-6">
        {/* Logo e Menu Mobile */}
        <div className="flex items-center gap-4 lg:hidden">
          <MobileNav navItems={navItems} />
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight uppercase"
          >
            shop.co
          </Link>
        </div>

        {/* Logo e Menu Desktop */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <ShirtIcon className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight uppercase">
              shop.co
            </span>
          </Link>
          <DesktopNav navItems={navItems} />
        </div>

        {/* Ações do Usuário */}
        <UserActions />
      </header>
    </div>
  );
}
