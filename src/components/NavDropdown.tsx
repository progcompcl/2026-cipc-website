import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownItem {
  label: string;
  href: string;
}

export const NavDropdown = ({ label, items }: { label: string; items: DropdownItem[] }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="font-mono text-lg text-black dark:text-white hover:text-logo-orange-600 dark:hover:text-logo-negative focus:outline-none relative hover:before:visible hover:after:visible before:content-['['] before:invisible after:content-[']'] after:invisible">
      {label}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="font-mono">
      {items.map((item) => (
        <DropdownMenuItem key={item.href} asChild>
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            {item.label}
          </a>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);