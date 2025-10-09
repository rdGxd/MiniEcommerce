import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, ShirtIcon } from "lucide-react";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
}

interface MobileNavProps {
  navItems: NavItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Abrir menu de navegação"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Link href="/" className="mb-4 flex items-center gap-2">
          <ShirtIcon className="h-6 w-6" />
          <span className="text-lg font-bold">shop.co</span>
        </Link>
        <div className="grid gap-2 py-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-primary flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
