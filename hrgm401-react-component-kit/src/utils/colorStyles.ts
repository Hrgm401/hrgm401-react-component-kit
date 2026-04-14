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

/**
 * ボタンのスタイル
 * @param color - テーマカラー
 * @returns Hover, Focusなどのtailwindクラス
 */
export const buttonColorStyles = (color: ColorType) =>
    ({
        primary: "bg-primary-500 hover:bg-primary-600 focus-visible:ring-primary-600",
        secondary: "bg-secondary-500 hover:bg-secondary-600 focus-visible:ring-secondary-600",
        tertiary: "bg-tertiary-500 hover:bg-tertiary-600 focus-visible:ring-tertiary-600",
        quaternary: "bg-quaternary-500 hover:bg-quaternary-600 focus-visible:ring-quaternary-600",
    })[color];

/**
 * アクセサリボタンのスタイル
 * @param color - テーマカラー
 * @returns Hover, Focusなどのtailwindクラス
 */
export const accessoryButtonColorStyles = (color: ColorType) =>
    ({
        primary: "hover:bg-primary-100 focus-visible:ring-primary-400 focus-visible:bg-primary-50",
        secondary: "hover:bg-secondary-100 focus-visible:ring-secondary-400 focus-visible:bg-secondary-50",
        tertiary: "hover:bg-tertiary-100 focus-visible:ring-tertiary-400 focus-visible:bg-tertiary-50",
        quaternary: "hover:bg-quaternary-100 focus-visible:ring-quaternary-400 focus-visible:bg-quaternary-50",
    })[color];

/**
 * rippleクラスをつけた時の背景色
 * @param color - テーマカラー
 * @returns 背景色
 */
export const rippleColorStyles = (color: ColorType) =>
    ({
        primary: "var(--color-primary-700)",
        secondary: "var(--color-secondary-700)",
        tertiary: "var(--color-tertiary-700)",
        quaternary: "var(--color-quaternary-700)",
    })[color];

/**
 * rippleクラスをつけた時の背景色の薄いバージョン
 * @param color - テーマカラー
 * @returns 薄いバージョンの背景色
 */
export const ripplePaleColorStyles = (color: ColorType) =>
    ({
        primary: "var(--color-primary-300)",
        secondary: "var(--color-secondary-300)",
        tertiary: "var(--color-tertiary-300)",
        quaternary: "var(--color-quaternary-300)",
    })[color];

/**
 * focus-visibleでリングをつけた時の色
 * @param color - テーマカラー
 * @returns リングの色
 */
export const ringColorStyle = (color: ColorType) =>
    ({
        primary: "focus-visible:ring-primary-400",
        secondary: "focus-visible:ring-secondary-400",
        tertiary: "focus-visible:ring-tertiary-400",
        quaternary: "focus-visible:ring-quaternary-400",
    })[color];
