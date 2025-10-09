import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
}

interface DesktopNavProps {
  navItems: NavItem[];
}

export function DesktopNav({ navItems }: DesktopNavProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuLink asChild key={item.name}>
            <Link
              href={item.href}
              className="group bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
              prefetch={false}
            >
              {item.name}
            </Link>
          </NavigationMenuLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
