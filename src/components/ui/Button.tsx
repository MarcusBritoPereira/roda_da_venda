import * as React from "react"
import { slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vulp-lilac disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-vulp-brand text-white shadow-glow-electric hover:brightness-110",
        outline:
          "border-2 border-vulp-electric bg-transparent text-vulp-lilac hover:bg-vulp-electric/10",
        ghost:
          "border border-ui-border bg-ui-surface text-vulp-white hover:bg-ui-border/50",
        promote:
          "bg-status-promote text-white hover:brightness-110",
        critical:
          "bg-status-dismiss text-white hover:brightness-110",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 py-1.5 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button" // Simplificado sem Radix Slot por enquanto
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
