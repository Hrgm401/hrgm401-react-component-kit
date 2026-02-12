/** テーマカラー */
type ColorType = "primary" | "secondary" | "tertiary" | "quaternary";

/**
 * 入力フォーム（Input/ Textarea）のスタイル
 * @param color - テーマカラー
 * @returns Hover, Focusなどのtailwindクラス
 */
export const inputColorStyles = (color: ColorType) => {
    const styles: Record<ColorType, string> = {
        primary:
            "hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
        secondary:
            "hover:border-secondary-400 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20",
        tertiary:
            "hover:border-tertiary-400 focus:border-tertiary-500 focus:ring-2 focus:ring-tertiary-500/20",
        quaternary:
            "hover:border-quaternary-400 focus:border-quaternary-500 focus:ring-2 focus:ring-quaternary-500/20",
    };
    return styles[color];
};
