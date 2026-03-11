import { Maximize2, Minimize2 } from "lucide-react";
import { forwardRef, useRef, type ComponentProps, type CSSProperties } from "react";
import { useResizableTextarea } from "../../../hooks/useResizableTextarea";
import { cn } from "../../../utils/cn";
import { triggerRipple } from "../../../utils/triggerRipple";
import { ringColorStyle, inputColorStyles, rippleColorStyles, type ColorType } from "../../../utils/colorStyles";
type Props = Omit<ComponentProps<"textarea">, "style" | "rows"> & {
    /**カラーバリエーション default: primary */
    color?: ColorType;
};

/**
 * テキスト量に応じて高さを自動調節する
 * @param { className, color, ...rest } - HTMLTextAreaElement
 * colorについてはバリエーション参考（省略可）
 * @param ref - 省略可
 *
 * @example
 * ```tsx
 * <ResizableTextarea ref={ref} className="" />
 * ```
 */
export const ResizableTextarea = forwardRef<HTMLTextAreaElement, Props>(
    ({ className, color = "primary", ...rest }, ref) => {
        const {
            ref: textareaRef,
            adjustHeight,
            hasShadow,
            expandBoxSize,
            isExpanded,
            toggleExpand,
        } = useResizableTextarea(ref);

        const expandBtnRef = useRef(null);

        return (
            <div
                className={cn(
                    "relative w-full text-xs",
                    hasShadow ? "shadow-[0_-35px_60px_-15px_rgba(255,255,255,0.9)]" : "shadow-none",
                )}
            >
                <textarea
                    {...rest}
                    ref={textareaRef}
                    onInput={(e) => {
                        adjustHeight();
                        rest.onInput?.(e);
                    }}
                    rows={1}
                    className={cn(
                        "p-2 pr-10 w-full overflow-y-auto box-border min-h-20 resize-none rounded-xl outline-none",
                        "transition-[max-height] duration-300 ease-in-out",
                        "bg-bg text-text border border-border",
                        inputColorStyles(color),
                        isExpanded ? "max-h-125" : "max-h-45",
                        // 利用者のclassName（上書き）
                        className,
                    )}
                />
                {expandBoxSize && (
                    <button
                        ref={expandBtnRef}
                        aria-label="テキストエリアの拡張と収縮を行うボタン"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                triggerRipple(expandBtnRef.current);
                            }
                        }}
                        className={cn(
                            "absolute top-2 right-4 p-2 rounded-full",
                            `focus-visible:ring-1 ${ringColorStyle(color ?? "primary")} focus-visible:outline-none focus-visible:bg-bg-muted`,
                            "transition-colors duration-300 ripple",
                            "text-text-muted",
                            "hover:bg-bg-muted",
                        )}
                        onClick={toggleExpand}
                        style={{ "--ripple-color": rippleColorStyles(color ?? "primary") } as CSSProperties}
                    >
                        {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                )}
            </div>
        );
    },
);
