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
  href?: string;
  isActive: boolean;
  children?: { label: string; href: string }[];
}

interface MobileNavProps {
  navItems: NavItem[];
  variant: "default" | "home";
}

export function MobileNav({ navItems, variant }: MobileNavProps) {
  const menuIconClasses = cn("h-6 w-6", variant === "home" ? "text-white" : "");
  const triggerButtonClasses = cn(
    variant === "home"
      ? "hover:bg-white/20 focus-visible:ring-offset-0 focus-visible:ring-white/50"
      : "",
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={variant === "home" ? "ghost" : "outline"} size="icon" className={triggerButtonClasses}>
          <Menu className={menuIconClasses} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4 sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Navegación</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col w-full items-end space-y-2 mt-4">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="w-full text-right">
                  <p className="text-sm font-bold text-gray-500 font-mono mb-1">{item.label}</p>
                  {item.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-mono py-1.5 hover:text-logo-orange-600 dark:hover:text-logo-negative transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              );
            }

            return (
              <Button
                key={item.href}
                variant="ghost"
                className="justify-end w-full text-xl h-10 font-mono"
                asChild
              >
                <NavLink
                  href={item.href || "#"}
                  label={item.label}
                  isActive={item.isActive}
                />
              </Button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}