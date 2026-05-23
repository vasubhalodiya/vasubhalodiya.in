import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "outline-dashed" | "accent" | "accent-lg";

const variantClasses: Record<Variant, string> = {
  "outline-dashed":
    "gap-2 font-clash-display font-medium text-center border border-dashed border-accent/40 rounded-lg w-full h-10 flex items-center justify-center cursor-pointer",
  accent:
    "inline-flex items-center justify-center gap-2 font-clash-display font-medium text-accent-foreground transition-opacity hover:opacity-70 text-center border border-transparent bg-accent rounded-lg w-full h-10 cursor-pointer px-5",
  "accent-lg":
    "inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-accent px-5 text-[15px] font-semibold tracking-normal text-accent-foreground transition-opacity hover:opacity-90",
};

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "outline-dashed", className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={`${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

type LinkButtonProps = {
  variant?: Variant;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function LinkButton({ variant = "accent", className = "", children, ...rest }: LinkButtonProps) {
  return (
    <a className={`${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
