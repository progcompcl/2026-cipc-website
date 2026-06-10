import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";

interface NavItem {
  label: string;
  href: string;
  isActive: boolean;
}

interface MobileNavProps {
  navItems: NavItem[];
  variant: "default" | "home";
}

export function MobileNav({ navItems, variant }: MobileNavProps) {
  const menuIconClasses = cn("h-6 w-6", variant === "home" ? "text-white" : "");

  const triggerButtonVariant = variant === "home" ? "ghost" : "outline";
  const triggerButtonClasses = cn(
    variant === "home"
      ? "hover:bg-white/20 focus-visible:ring-offset-0 focus-visible:ring-white/50"
      : "",
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={triggerButtonClasses}>
          <Menu className={menuIconClasses} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4 sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Navegación</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col w-full items-center space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className="justify-end w-full text-xl h-10 font-mono"
              asChild
            >
              <NavLink
                href={item.href}
                label={item.label}
                isActive={item.isActive}
              />
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
