import { Button } from "@/components/ui/button";
import {
  LogInIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

interface UserActionsProps {
  isLoggedIn: boolean;
}

export function UserActions({ isLoggedIn }: UserActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button size="icon" variant="ghost" aria-label="Pesquisar">
        <SearchIcon />
      </Button>

      {isLoggedIn ? (
        <Button size="icon" variant="ghost" aria-label="Perfil do usuário">
          <Link href="/profile">
            <UserCircleIcon />
          </Link>
        </Button>
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

      <Button size="icon" variant="ghost" aria-label="Carrinho de compras">
        <ShoppingCartIcon />
      </Button>

      <ModeToggle />
    </div>
  );
}
