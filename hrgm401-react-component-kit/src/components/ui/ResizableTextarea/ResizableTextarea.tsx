import { Maximize2, Minimize2 } from "lucide-react";
import { forwardRef } from "react";
import { useResizableTextarea } from "../../../hooks/useResizableTextarea";
import { cn } from "../../../utils/cn";
import { inputColorStyles } from "../../../utils/colorStyles";
type Props = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "style" | "rows"> & {
    /**カラーバリエーション default: primary */
    color?: "primary" | "secondary" | "tertiary" | "quaternary";
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
                        // ベーススタイル（構造）
                        "p-2 pr-10 w-full overflow-y-auto box-border min-h-20 resize-none rounded-xl outline-none",
                        // テーマカラー
                        "bg-bg text-text border border-border",
                        // フォーカス
                        inputColorStyles(color),
                        // 動的クラス
                        isExpanded ? "max-h-125" : "max-h-45",
                        // 利用者のclassName（最優先で上書き）
                        className,
                    )}
                />
                {expandBoxSize && (
                    <button
                        className={cn(
                            "absolute top-2 right-4 p-2",
                            "text-text-muted",
                            "hover:bg-bg-muted hover:rounded-full",
                            "active:bg-primary-300/60",
                        )}
                        onClick={toggleExpand}
                    >
                        {isExpanded ? (
                            <Minimize2 className="w-4 h-4" />
                        ) : (
                            <Maximize2 className="w-4 h-4" />
                        )}
                    </button>
                )}
            </div>
        );
    },
);
