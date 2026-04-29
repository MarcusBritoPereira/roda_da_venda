import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-vulp-lilac focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-vulp-electric/20 text-vulp-lilac border border-vulp-lilac/30",
        secondary:
          "border-transparent bg-ui-muted/20 text-ui-muted border border-ui-muted/30",
        promote:
          "border-transparent bg-status-promote/20 text-status-promote border border-status-promote/30",
        train:
          "border-transparent bg-status-train/20 text-status-train border border-status-train/30",
        critical:
          "border-transparent bg-status-critical/20 text-status-critical border border-status-critical/30",
        dismiss:
          "border-transparent bg-status-dismiss/20 text-status-dismiss border border-status-dismiss/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
