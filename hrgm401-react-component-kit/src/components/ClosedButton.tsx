import { X } from "lucide-react";
import { type ComponentProps, forwardRef, useRef } from "react";
import { cn } from "../utils/cn";
import { useMergeRefs } from "../hooks/useMergeRefs";

type Props = ComponentProps<"button"> & {
    handleClose: () => void;
};
export const ClosedButton = forwardRef<HTMLButtonElement, Props>(({ className, handleClose, ...rest }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    // 内部refと外部refの結合
    const mergedRef = useMergeRefs(internalRef, ref);

    // 矢印キー検知
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            internalRef.current?.focus();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            internalRef.current?.focus();
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClose();
        }
    };
    return (
        <button
            ref={mergedRef}
            type={rest.type ?? "button"}
            className={cn(
                "rounded-xl bg-white border border-gray-300 z-31 p-1",
                "hover:bg-bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400",
                className,
            )}
            onClick={handleClose}
            style={{
                ...rest.style,
                cursor: "pointer",
            }}
            onKeyDown={handleKeyDown}
            {...rest}
        >
            <span className="sr-only">Close</span>
            <X className="w-3 h-3" aria-hidden="true" />
        </button>
    );
});
