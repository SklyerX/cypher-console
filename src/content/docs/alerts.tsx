import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva("w-full max-w-[500px] p-4 rounded-md border", {
  variants: {
    variant: {
      default: "border-zinc-700 bg-zinc-900/50",
      destructive: "border-red-600 bg-red-500/50",
      info: "border-blue-600 bg-blue-500/50",
      alert: "border-yellow-600 bg-yellow-500/50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  text: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, text, ...props }, ref) => {
    return (
      <div
        className={cn(alertVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <p className="text-sm">{text}</p>
      </div>
    );
  }
);

export default Alert;
