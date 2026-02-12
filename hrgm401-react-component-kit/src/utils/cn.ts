import { twMerge } from "tailwind-merge";

/**
 * Tailwindクラスを安全にマージするユーティリティ
 * 同カテゴリのクラスが競合した場合、後に渡した方が優先される
 *
 * @example
 * ```ts
 * cn("bg-white text-black", "bg-red-500")
 * // → "text-black bg-red-500"（bg-whiteは消える）
 *
 * cn("p-2 rounded-xl", isExpanded && "max-h-125", className)
 * // → 条件付きクラスやundefinedも安全に処理
 * ```
 */
export const cn = (...inputs: (string | undefined | null | false)[]) => {
    return twMerge(inputs.filter(Boolean).join(" "));
};
