import { forwardRef } from "react";
import type { ComponentProps, CSSProperties } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "../../../utils/cn";
import { triggerRipple } from "../../../utils/triggerRipple";
import { accessoryButtonColorStyles, ripplePaleColorStyles, type ColorType } from "../../../utils/colorStyles";

type Props = Omit<ComponentProps<"button">, "color"> & {
    /** 描画するLucideアイコンコンポーネント */
    icon: LucideIcon;
    /** カラーバリエーション default: primary */
    color?: ColorType;
    /** アイコンのサイズ（tailwindcssのクラスなど。デフォルトは w-4 h-4） */
    iconClassName?: string;
};

/**
 * 薄い背景色のアクセサリボタン
 * 入力フィールドの中、アクションの説明など
 */
export const AccessoryButton = forwardRef<HTMLButtonElement, Props>(
    ({ className, icon: Icon, color = "primary", iconClassName = "w-4 h-4", onClick, onKeyDown, ...rest }, ref) => {
        return (
            <button
                {...rest}
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
                    "p-2 rounded-full",
                    `focus-visible:outline-none focus-visible:ring-1 ${accessoryButtonColorStyles(color)}`,
                    "ripple text-text-muted bg-bg-muted",
                    "transition-colors duration-150",
                    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
                    className,
                )}
                style={
                    {
                        ...rest.style,
                        "--ripple-color": ripplePaleColorStyles(color),
                    } as CSSProperties
                }
            >
                <Icon className={iconClassName} />
            </button>
        );
    },
);
