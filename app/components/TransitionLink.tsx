"use client";

import Link, { LinkProps } from "next/link";
import { useTransition } from "./TransitionProvider";
import { ReactNode } from "react";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export default function TransitionLink({ children, href, className, ...props }: TransitionLinkProps) {
  const { handleTransition } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleTransition(href.toString());
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}