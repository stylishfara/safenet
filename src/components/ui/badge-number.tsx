import { cn } from "@/lib/utils"

interface BadgeNumberProps {
  count: number | string
  className?: string
  variant?: "default" | "light"
}

export function BadgeNumber({ count, className, variant = "default" }: BadgeNumberProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[12px] font-normal leading-none",
        variant === "default"
          ? "bg-[rgb(16,185,129)] text-[rgb(250,250,250)]"
          : "bg-[rgb(245,245,245)] text-[rgb(38,38,38)]",
        className
      )}
    >
      {count}
    </span>
  )
}
