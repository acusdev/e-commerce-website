import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disableVisibility?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "peer",
            startIcon && "pl-9",
            endIcon && "pr-9",
            className
          )}
          ref={ref}
          {...props}
        />
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-primary transition-colors">
            {startIcon}
          </div>
        )}
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-primary transition-colors">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, disableVisibility = false, startIcon, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    const toggleVisibility = () => setVisible((prev) => !prev);

    const endIcon = React.useMemo(() => {
      if (disableVisibility) return null;
      return visible ? (
        <EyeOff className="size-4.5 cursor-pointer hover:text-primary" onClick={toggleVisibility} />
      ) : (
        <Eye className="size-4.5 cursor-pointer hover:text-primary" onClick={toggleVisibility} />
      );
    }, [disableVisibility, visible]);

    return (
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        placeholder="••••••••"
        className={className}
        startIcon={startIcon}
        endIcon={endIcon}
        {...props}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
