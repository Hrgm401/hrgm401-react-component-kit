import { type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";

/**
 * light: 淡い灰色（--color-bg-muted, #f1f5f9）
 * dark: 黒
 * 16進数（Hex）カラーコード
 */
type TooltipColor = "auto" | "light" | "dark" | (string & {});

type Props = ComponentProps<"div"> & {
    children: ReactNode;
    targetRef: React.RefObject<HTMLButtonElement | null>;
    color?: TooltipColor;
    visible: boolean;
};

// 16進数判定ロジック
const isHexColor = (value: string) => /^#([A-Fa-f0-9]{3}){1,2}$/.test(value);

export const TooltipPortal = ({
    children,
    targetRef,
    visible,
    color = "auto",
    className = "",
    style,
    ...props
}: Props) => {
    if (!visible || !targetRef.current) return null;

    //ボタンの位置取得 表示位置計算
    const rect = targetRef.current.getBoundingClientRect();

    const isCustomHex = isHexColor(color);

    // テーマごとのTailwindクラス定義
    const themeClasses = {
        auto: "bg-black text-white dark:bg-slate-50 dark:text-black",
        light: "bg-black text-white",
        dark: "bg-bg-muted text-black",
    };

    const styles = {
        position: "fixed",
        top: rect.top + 60,
        left: rect.left,
        zIndex: 9999,
        ...(isCustomHex ? { backgroundColor: color, color: "#ffffff" } : {}),
        ...style,
    } as CSSProperties;

    return createPortal(
        <div
            style={styles}
            className={cn(
                "whitespace-nowrap -translate-y-1/2 w-auto rounded-xl text-xs p-2 shadow-lg transition-all",
                "duration-300 ease-out animate-poyon",
                `${!isCustomHex ? themeClasses[color as "auto" | "light" | "dark"] : ""}`,
                className,
            )}
            {...props}
        >
            {children}
        </div>,
        document.body,
    );
};
