import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { buttonVariants } from "@shared/constants/variants.constant";
import { cn } from "@shared/lib/cn.util";

export type ButtonProps = {
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";
