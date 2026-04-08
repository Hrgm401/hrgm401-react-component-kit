import { forwardRef, type ComponentProps, type CSSProperties } from "react";
import { buttonColorStyles, rippleColorStyles, type ColorType } from "../../../utils/colorStyles";
import { cn } from "../../../utils/cn";
import { triggerRipple } from "../../../utils/triggerRipple";

type Props = Omit<ComponentProps<"button">, "color"> & {
    color?: ColorType;
};
export const Button = forwardRef<HTMLButtonElement, Props>(
    ({ className, color = "primary", onClick, onKeyDown, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                type={rest.type ?? "button"}
                onClick={onClick}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        triggerRipple(e.currentTarget);
                    }
                    onKeyDown?.(e);
                }}
                className={cn(
                    "px-4 py-2 rounded-lg",
                    `focus-visible:outline-none focus-visible:ring-1 ${buttonColorStyles(color)}`,
                    "ripple text-white",
                    "transition-colors duration-150",
                    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
                    className,
                )}
                style={
                    {
                        ...rest.style,
                        "--ripple-color": rippleColorStyles(color),
                    } as CSSProperties
                }
                {...rest}
            ></button>
        );
    },
);
