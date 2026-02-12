import { useRef, useState, useCallback } from "react";

type Options = {
    /** 影を表示する高さの閾値（px） default: 80 */
    shadowThreshold?: number;
    /** 展開ボタンを表示する高さの閾値（px） default: 180 */
    expandThreshold: number;
};

/**
 * テキストエリアの高さ計算 + 影が出るかの判定を行うカスタムフック
 * @param externalRef - forwardRefで受け取った外部ref
 * @param options - 閾値の設定（省略可）
 *
 * @example
 * ```tsx
 * const { ref, adjustHeight } = useResizableTextarea(forwardedRef);
 * <textarea ref={ref} onInput={adjustHeight} />
 * ```
 */
export const useResizableTextarea = (
    externalRef: React.ForwardedRef<HTMLTextAreaElement>,
    options?: Options,
) => {
    /** デフォルト値 */
    const { shadowThreshold = 80, expandThreshold = 180 } = options ?? {};

    const internalRef = useRef<HTMLTextAreaElement>(null);
    const [expandBoxSize, setExpandBoxSize] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasShadow, setHasShadow] = useState(false);

    /** 内部refと外部refの結合 */
    const setRef = useCallback(
        (el: HTMLTextAreaElement | null) => {
            // 内部ref更新
            internalRef.current = el;

            if (typeof externalRef === "function") {
                externalRef(el);
            } else if (externalRef) {
                externalRef.current = el;
            }
        },
        [externalRef],
    );

    const adjustHeight = useCallback(() => {
        const el = internalRef.current;

        if (el) {
            el.style.height = "auto";

            const scrollHeight = el.scrollHeight;
            const style = window.getComputedStyle(el);
            const borderTop = parseInt(style.borderTopWidth, 10);
            const borderBtm = parseInt(style.borderBottomWidth, 10);
            const totalHeight = scrollHeight + borderTop + borderBtm;
            el.style.height = `${totalHeight}px`;

            setHasShadow(totalHeight > shadowThreshold);

            if (totalHeight > expandThreshold) {
                setExpandBoxSize(true);
            } else {
                setExpandBoxSize(false);
            }
        }
    }, [shadowThreshold, expandThreshold]);

    const toggleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    return {
        /** textareaに渡すref（内部refと外部refを統合済み） */
        ref: setRef,
        /** テキスト入力時、textareaの高さの自動調節を行う。onInputに渡す */
        adjustHeight,
        /** テキスト量が多い時にtrue（影の表示判定用） */
        hasShadow,
        /** 展開ボタンを表示すべきかどうか */
        expandBoxSize,
        /** 現在展開されているかどうか */
        isExpanded,
        /** 展開/縮小の切り替え */
        toggleExpand,
    };
};
