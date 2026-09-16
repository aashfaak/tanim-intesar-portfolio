import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  showArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  showArrow = true,
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 text-sm px-5 py-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

  const styles = {
    primary: "bg-navy text-paper hover:bg-navy-light",
    secondary: "border border-ink/30 text-ink hover:border-ink",
    ghost: "text-ink hover:text-navy px-0 py-0",
  };

  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {children}
      {showArrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
