import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
}

/**
 * Textarea - Atomic Component
 * Reusable multiline field for longer form input with helper and error states.
 *
 * @example
 * <Textarea id="notes" placeholder="Share a few details" rows={5} />
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, id, ...props }, ref) => {
    const textareaId = React.useId();
    const resolvedId = id ?? textareaId;

    return (
      <div className="flex flex-col gap-1.5">
        <textarea
          ref={ref}
          id={resolvedId}
          className={cn(
            "flex min-h-[140px] w-full rounded-[1.25rem] border border-novaleap-navy/12 bg-transparent px-4 py-3",
            "text-base text-novaleap-navy placeholder:text-novaleap-navy/35",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-novaleap-aqua/35 focus:border-novaleap-aqua/70",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            error && "border-rose-400 focus:border-rose-400 focus:ring-rose-200",
            className
          )}
          {...props}
        />
        {error ? <span className="text-xs text-rose-500">{error}</span> : null}
        {helperText && !error ? (
          <span className="text-xs text-novaleap-navy/55">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;