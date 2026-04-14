import { useCallback } from "react";

/**
 * 複数のrefを結合して1つのref関数として返すカスタムフック
 * @param refs 結合したいrefの配列（useRefの戻り値やforwardRefの引数など）
 * @returns 結合されたrefを受け取る関数
 */
export function useMergeRefs<T>(...refs: (React.ForwardedRef<T> | React.RefObject<T | null> | null | undefined)[]) {
    return useCallback(
        (value: T | null) => {
            refs.forEach((ref) => {
                if (typeof ref === "function") {
                    ref(value);
                } else if (ref != null) {
                    (ref as React.RefObject<T | null>).current = value;
                }
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refs,
    );
}
