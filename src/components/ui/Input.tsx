import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-ui-border bg-ui-surface/50 px-4 py-2 text-sm text-vulp-white ring-offset-vulp-void file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ui-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vulp-lilac focus-visible:border-vulp-lilac disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
