import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@shared/util/cn.util";
import { buttonVariants } from "@shared/constants/variants.constant";
import { VariantProps } from "class-variance-authority";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
