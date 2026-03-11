/** テーマカラー */
export type ColorType = "primary" | "secondary" | "tertiary" | "quaternary";

/**
 * 入力フォーム（Input/ Textarea）のスタイル
 * @param color - テーマカラー
 * @returns Hover, Focusなどのtailwindクラス
 */
export const inputColorStyles = (color: ColorType) =>
    ({
        primary: "hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
        secondary: "hover:border-secondary-400 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20",
        tertiary: "hover:border-tertiary-400 focus:border-tertiary-500 focus:ring-2 focus:ring-tertiary-500/20",
        quaternary: "hover:border-quaternary-400 focus:border-quaternary-500 focus:ring-2 focus:ring-quaternary-500/20",
    })[color];

export const buttonColorStyles = (color: ColorType) =>
    ({
        primary: "hover:bg-primary-100 focus-visible:ring-primary-400 focus-visible:bg-primary-50",
        secondary: "hover:bg-secondary-100 focus-visible:ring-secondary-400 focus-visible:bg-secondary-50",
        tertiary: "hover:bg-tertiary-100 focus-visible:ring-tertiary-400 focus-visible:bg-tertiary-50",
        quaternary: "hover:bg-quaternary-100 focus-visible:ring-quaternary-400 focus-visible:bg-quaternary-50",
    })[color];

export const rippleColorStyles = (color: ColorType) =>
    ({
        primary: "var(--color-primary-300)",
        secondary: "var(--color-secondary-300)",
        tertiary: "var(--color-tertiary-300)",
        quaternary: "var(--color-quaternary-300)",
    })[color];

export const ringColorStyle = (color: ColorType) =>
    ({
        primary: "focus-visible:ring-primary-400",
        secondary: "focus-visible:ring-secondary-400",
        tertiary: "focus-visible:ring-tertiary-400",
        quaternary: "focus-visible:ring-quaternary-400",
    })[color];
