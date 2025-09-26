import * as React from "react";
import { cn } from "../lib/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function Spinner({ className, size = 16, ...props }: SpinnerProps) {
  const style: React.CSSProperties = { width: size, height: size };
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-slate-300 border-t-slate-900",
        className
      )}
      style={style}
      {...props}
    />
  );
}

export default Spinner;
