"use client"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { RotateCcw, X } from "lucide-react"

const bannerVariants = cva(
  "flex w-full items-center gap-[10px] px-[23px] py-1 text-[12px] font-normal",
  {
    variants: {
      variant: {
        positive:     "bg-[rgb(220,252,231)] text-[rgb(22,163,74)]",
        caution:      "bg-[rgb(254,243,199)] text-[rgb(217,119,6)]",
        highlight:    "bg-[rgb(250,232,255)] text-[rgb(192,38,211)]",
        neutral:      "bg-[rgb(245,245,245)] text-[rgb(38,38,38)]",
        destructive:  "bg-[rgb(254,226,226)] text-[rgb(220,38,38)]",
        informative:  "bg-[rgb(219,234,254)] text-[rgb(37,99,235)]",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
)

interface InfoBannerProps extends VariantProps<typeof bannerVariants> {
  message: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  className?: string
}

export function InfoBanner({
  variant,
  message,
  actionLabel = "Restore",
  onAction,
  onDismiss,
  className,
}: InfoBannerProps) {
  return (
    <div className={cn(bannerVariants({ variant }), className)}>
      <span className="flex-1 leading-none">{message}</span>
      <div className="flex items-center gap-1">
        {onAction && (
          <button
            onClick={onAction}
            className="flex items-center gap-1 rounded-[8px] bg-white px-2 py-0.5 text-[12px] font-medium text-[rgb(38,38,38)]"
          >
            <RotateCcw size={12} />
            {actionLabel}
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex items-center gap-1 rounded-[8px] bg-white px-2 py-0.5 text-[12px] font-medium text-[rgb(38,38,38)]"
          >
            <X size={12} />
            Dismiss
          </button>
        )}
      </div>
    </div>
  )
}
