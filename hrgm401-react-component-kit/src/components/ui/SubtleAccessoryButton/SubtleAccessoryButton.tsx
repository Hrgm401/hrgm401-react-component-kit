import { forwardRef } from "react";
import type { ComponentProps, CSSProperties } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "../../../utils/cn";
import { triggerRipple } from "../../../utils/triggerRipple";
import { ringColorStyle, ripplePaleColorStyles, type ColorType } from "../../../utils/colorStyles";

type Props = Omit<ComponentProps<"button">, "color"> & {
    /** 描画するLucideアイコンコンポーネント */
    icon: LucideIcon;
    /** カラーバリエーション default: primary */
    color?: ColorType;
    /** アイコンのサイズ（tailwindcssのクラスなど。デフォルトは w-4 h-4） */
    iconClassName?: string;
};

/**
 * 通常時はアイコンのみ表示され、ホバー時に背景色がつくアイコンボタン
 * テキストエリアの拡張/収縮などの補助的なアクションに使用
 */
export const SubtleAccessoryButton = forwardRef<HTMLButtonElement, Props>(
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
                    `focus-visible:ring-1 ${ringColorStyle(color)} focus-visible:outline-none focus-visible:bg-bg-muted`,
                    "transition-colors duration-300 ripple",
                    "text-text-muted",
                    "hover:bg-bg-muted",
                    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
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
