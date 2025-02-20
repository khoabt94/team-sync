import React, { forwardRef, CSSProperties } from "react";

import styles from "./Action.module.css";
import { cn } from "@shared/util/cn.util";

export type Props = {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
} & React.HTMLAttributes<HTMLButtonElement>;

export const Action = forwardRef<HTMLButtonElement, Props>(({ active, className, cursor, style, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(styles.Action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          "--fill": active?.fill,
          "--background": active?.background,
        } as CSSProperties
      }
    />
  );
});
