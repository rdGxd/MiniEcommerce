"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  LogInIcon,
  LogOutIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

export function UserActions() {
  const { isLoggedIn, logout } = useAuth();
  const { itemCount } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="icon" variant="ghost" aria-label="Pesquisar">
        <SearchIcon />
      </Button>

      {isLoggedIn ? (
        <>
          <Button size="icon" variant="ghost" aria-label="Perfil do usuário">
            <Link href="/profile">
              <UserCircleIcon />
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <LogOutIcon />
          </Button>
        </>
      ) : (
        <>
          <Button size="icon" variant="ghost" aria-label="Login">
            <Link href="/login">
              <LogInIcon />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" aria-label="Registrar">
            <Link href="/signup">
              <UserIcon />
            </Link>
          </Button>
        </>
      )}

      <Button
        size="icon"
        variant="ghost"
        aria-label="Carrinho de compras"
        className="relative"
      >
        <Link href="/cart">
          <ShoppingCartIcon />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </Button>

      <ModeToggle />
    </div>
  );
}
