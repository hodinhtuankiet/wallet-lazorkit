import * as React from "react"

import { cn } from "../../lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    
    return (
      <div className="relative group">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border-2 border-input bg-background/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
            "hover:border-primary/50 hover:bg-background/80 hover:shadow-md",
            "focus-visible:border-primary focus-visible:bg-background focus-visible:shadow-lg focus-visible:shadow-primary/20",
            isFocused && "border-primary bg-background shadow-lg shadow-primary/20",
            className
          )}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />
        
        {/* Animated border gradient */}
        <div className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-purple-500 to-primary opacity-0 transition-opacity duration-300 -z-10",
          "before:absolute before:inset-[2px] before:rounded-[10px] before:bg-background",
          isFocused && "opacity-100"
        )} />
        
        {/* Shine effect */}
        <div className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none",
          "group-hover:opacity-100"
        )} />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
