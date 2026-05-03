import type { ReactNode } from "react";

const VARIANTS = {
  cream: "bg-bg-cream",
  pink: "bg-pink-soft",
  salmon: "bg-pink-main",
  blue: "bg-blue-main",
  tan: "bg-tan",
} as const;

export type CartoonCardVariant = keyof typeof VARIANTS;

type CartoonCardProps = {
  children: ReactNode;
  className?: string;
  variant?: CartoonCardVariant;
  /** Extra shadow on hover */
  hoverLift?: boolean;
};

export function CartoonCard({
  children,
  className = "",
  variant = "cream",
  hoverLift = true,
}: CartoonCardProps) {
  return (
    <div
      className={`rounded-[24px] border-[3px] border-ink p-6 shadow-cartoon sm:p-8 ${VARIANTS[variant]} ${hoverLift ? "transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-cartoon-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
