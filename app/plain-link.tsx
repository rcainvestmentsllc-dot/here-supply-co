import type { AnchorHTMLAttributes, ReactNode } from "react";

type PlainLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/**
 * A normal browser link. The site is deployed as a mostly static resource,
 * so reliable document navigation is more valuable than client-side routing.
 */
export function PlainLink({ children, ...props }: PlainLinkProps) {
  return <a {...props}>{children}</a>;
}
