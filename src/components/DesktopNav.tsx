import React from "react";
import { NavLink } from "./NavLink";

interface NavItem {
  label: string;
  href: string;
  isActive: boolean;
}

interface DesktopNavProps {
  navItems: NavItem[];
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => (
  <nav className="font-mono hidden lg:flex flex-auto justify-center text-nowrap">
    <ul className="flex w-full justify-center items-center gap-4">
      {navItems.map((item) => (
        <li key={item.href}>
          <NavLink
            href={item.href}
            label={item.label}
            isActive={item.isActive}
          />
        </li>
      ))}
    </ul>
  </nav>
);
