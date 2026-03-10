import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

interface GetButtonClassesOptions {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

export const getButtonClasses = ({
  variant = "primary",
  size = "md",
  className,
}: GetButtonClassesOptions = {}) => {
  const baseStyles =
    "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full border border-b-[6px] border-novaleap-navy font-semibold tracking-tight text-center text-white shadow-[0_16px_30px_-18px_rgba(17,34,78,0.55)] transform-gpu origin-bottom transition-[transform,box-shadow,background-color,color,border-color,text-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_22px_34px_-18px_rgba(17,34,78,0.65)] hover:[text-shadow:0_2px_8px_rgba(17,34,78,0.4)] active:translate-y-0 active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-100";

  const variants = {
    primary:
      "bg-novaleap-aqua before:bg-[linear-gradient(90deg,#00b7b5_0%,#977abc_50%,#00b7b5_100%)] focus-visible:ring-novaleap-aqua",
    secondary:
      "bg-novaleap-purple before:bg-[linear-gradient(90deg,rgba(151,122,188,0.9)_0%,rgba(0,183,181,0.85)_50%,rgba(151,122,188,0.9)_100%)] focus-visible:ring-novaleap-purple",
    outline:
      "border-novaleap-navy/80 bg-white/90 text-novaleap-navy before:bg-[linear-gradient(90deg,rgba(0,183,181,0.14)_0%,rgba(151,122,188,0.18)_50%,rgba(0,183,181,0.14)_100%)] focus-visible:ring-novaleap-aqua",
    ghost:
      "border-novaleap-navy/70 bg-white/12 text-novaleap-navy backdrop-blur-md before:bg-[linear-gradient(90deg,rgba(151,122,188,0.14)_0%,rgba(0,183,181,0.18)_50%,rgba(151,122,188,0.14)_100%)] focus-visible:ring-novaleap-purple",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-base sm:text-lg",
  };

  return cn(baseStyles, variants[variant], sizes[size], className);
};

/**
 * Button - Atomic Component
 * 
 * A reusable button component with multiple variants and sizes.
 * Leverages Tailwind CSS with NOVALEAP brand colors.
 * 
 * @example
 * <Button variant="primary" size="lg">Click Me</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={getButtonClasses({ variant, size, className })}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
