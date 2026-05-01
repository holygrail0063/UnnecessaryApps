"use client";

import { useRouter } from "next/navigation";
import { pickRandomLiveRoute } from "@/data/apps";

type RandomAppButtonProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
};

export function RandomAppButton({
  children,
  className,
  label = "Open a random live app",
}: RandomAppButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onClick={() => router.push(pickRandomLiveRoute())}
    >
      {children}
    </button>
  );
}
