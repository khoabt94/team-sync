import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { badgeVariants } from "@shared/constants/variants.constant";
import { cn } from "@shared/util/cn.util";

export type BadgeProps = {} & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
