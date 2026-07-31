import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-6 text-[15px] font-medium transition-colors duration-[250ms]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "border border-navy bg-card text-navy hover:bg-navy hover:text-navy-foreground",
        ghost: "px-0 text-navy hover:text-primary link-underline",
        onDark:
          "border border-navy-foreground/40 text-navy-foreground hover:bg-navy-foreground hover:text-navy",
      },
      size: { md: "h-11", lg: "h-13 px-8 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = VariantProps<typeof ctaVariants> & {
  to?: string;
  params?: Record<string, string>;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "children" | "className">;

/** Single CTA primitive for links (internal/external) and buttons. */
export function CtaButton({
  to,
  params,
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(ctaVariants({ variant, size }), className);
  if (to) {
    return (
      <Link to={to} params={params} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
