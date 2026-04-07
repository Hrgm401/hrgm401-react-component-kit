import { type ComponentProps, type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";

/**
 * light: 淡い灰色（--color-bg-muted, #f1f5f9）
 * dark: 黒
 * 16進数（Hex）カラーコード
 */
type TooltipColor = "auto" | "light" | "dark" | (string & {});

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

type Props = ComponentProps<"div"> & {
    children: ReactNode;
    targetRef: React.RefObject<HTMLButtonElement | null>;
    color?: TooltipColor;
    placement?: TooltipPlacement;
    visible: boolean;
};

// 16進数判定ロジック
const isHexColor = (value: string) => /^#([A-Fa-f0-9]{3}){1,2}$/.test(value);

export const TooltipPortal = ({
    children,
    targetRef,
    visible,
    color = "auto",
    placement = "bottom",
    className = "",
    style,
    ...props
}: Props) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ top: -9999, left: -9999, opacity: 0 });

    useLayoutEffect(() => {
        if (!visible || !targetRef.current || !tooltipRef.current) {
            return;
        }

        const updatePosition = () => {
            if (!targetRef.current || !tooltipRef.current) return;
            const targetRect = targetRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            let newTop = 0;
            let newLeft = 0;
            const PADDING = 8;

            if (placement === "top") {
                newTop = targetRect.top - tooltipRect.height - PADDING;
                newLeft = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
                // 見切れ（上）対策：上が見切れるなら下に出す
                if (newTop < PADDING) {
                    newTop = targetRect.bottom + PADDING;
                }
            } else if (placement === "bottom") {
                newTop = targetRect.bottom + PADDING;
                newLeft = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
                // 見切れ（下）対策：下が見切れるなら上に出す
                if (newTop + tooltipRect.height > window.innerHeight - PADDING) {
                    newTop = targetRect.top - tooltipRect.height - PADDING;
                }
            } else if (placement === "left") {
                newTop = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
                newLeft = targetRect.left - tooltipRect.width - PADDING;
                // 見切れ（左）対策：左が見切れるなら右に出す
                if (newLeft < PADDING) {
                    newLeft = targetRect.right + PADDING;
                }
            } else if (placement === "right") {
                newTop = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
                newLeft = targetRect.right + PADDING;
                // 見切れ（右）対策：右が見切れるなら左に出す
                if (newLeft + tooltipRect.width > window.innerWidth - PADDING) {
                    newLeft = targetRect.left - tooltipRect.width - PADDING;
                }
            }

            // 二次軸（X/Y軸）のはみ出し対策（画面外に行かないように押し込む）
            if (placement === "top" || placement === "bottom") {
                if (newLeft + tooltipRect.width > window.innerWidth - PADDING) {
                    newLeft = window.innerWidth - tooltipRect.width - PADDING;
                }
                if (newLeft < PADDING) {
                    newLeft = PADDING;
                }
            } else {
                if (newTop + tooltipRect.height > window.innerHeight - PADDING) {
                    newTop = window.innerHeight - tooltipRect.height - PADDING;
                }
                if (newTop < PADDING) {
                    newTop = PADDING;
                }
            }

            setCoords({ top: newTop, left: newLeft, opacity: 1 });
        };

        updatePosition();

        // スクロールやリサイズで位置を再計算
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [visible, targetRef, placement]);

    if (!visible) return null;

    const isCustomHex = isHexColor(color);

    // テーマごとのTailwindクラス定義
    const themeClasses = {
        auto: "bg-black text-white dark:bg-slate-50 dark:text-black",
        light: "bg-black text-white",
        dark: "bg-bg-muted text-black",
    };

    const styles = {
        position: "fixed",
        top: coords.top,
        left: coords.left,
        opacity: coords.opacity,
        zIndex: 9999,
        ...(isCustomHex ? { backgroundColor: color, color: "#ffffff" } : {}),
        ...style,
    } as CSSProperties;

    return createPortal(
        <div
            ref={tooltipRef}
            style={styles}
            className={cn(
                "whitespace-nowrap w-auto rounded-xl text-xs p-2 shadow-lg transition-opacity duration-300",
                "animate-poyon",
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
