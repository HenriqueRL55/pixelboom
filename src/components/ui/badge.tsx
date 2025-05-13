import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "bg-[#F4F4F5] text-[#18181B] h-[1.25rem] px-[0.625rem] py-[0.25rem] min-w-[3.0625rem]", // Ativo
        secondary: "bg-white text-[#71717A] border border-[#E4E4E7] h-[1.25rem] px-[0.625rem] py-[0.25rem] min-w-[3.5625rem]", // Inativo
        destructive: "bg-destructive text-destructive-foreground",
        outline: "text-foreground border border-input",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }