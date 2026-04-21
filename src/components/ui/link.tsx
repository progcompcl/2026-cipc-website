import React from "react";
import { Button, type ButtonProps } from "./button";

export interface LinkProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, target, rel, ...props }) => {
  return (
    <Button {...props} asChild>
      <a href={href} target={target} rel={rel}>{children}</a>
    </Button>
  );
};

export { Link };
