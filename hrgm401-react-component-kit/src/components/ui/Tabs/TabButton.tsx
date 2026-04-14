import { cn } from "../../../utils/cn";
import type { ColorType } from "../../../utils/colorStyles";
import type { TabVariant, TabOption } from "../../../types/Tabs";
import { forwardRef, type KeyboardEvent } from "react";

type Props = {
    val: TabOption;
    selectedVal?: string;
    handleChange: (value: string) => void;
    variant?: TabVariant;
    color?: ColorType;
    onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
};
/**
 * @file src/components/TabButton.tsx
 * @description タブボタンコンポーネント
 */
export const TabButton = forwardRef<HTMLButtonElement, Props>(
    ({ val, selectedVal, handleChange, variant = "default", color = "primary", onKeyDown }, ref) => {
        const bgColorClasses = (color: ColorType) =>
            ({
                primary: "bg-primary-100 hover:bg-primary-100 focus:bg-primary-100",
                secondary: "bg-secondary-100 hover:bg-secondary-100 focus:bg-secondary-100",
                tertiary: "bg-tertiary-100 hover:bg-tertiary-100 focus:bg-tertiary-100",
                quaternary: "bg-quaternary-100 hover:bg-quaternary-100 focus:bg-quaternary-100",
            })[color];
        const textColorClasses = (color: ColorType) =>
            ({
                primary: "text-primary-600",
                secondary: "text-secondary-600",
                tertiary: "text-tertiary-600",
                quaternary: "text-quaternary-600",
            })[color];
        const lineColorClasses = (color: ColorType) =>
            ({
                primary: "after:bg-primary-500",
                secondary: "after:bg-secondary-500",
                tertiary: "after:bg-tertiary-500",
                quaternary: "after:bg-quaternary-500",
            })[color];

        const isActive = selectedVal === val.value;

        const baseClasses =
            "flex items-center justify-center gap-2 relative h-full p-1.5 px-2 rounded-full border border-transparent transition-all duration-200 font-bold text-base min-w-[100px] max-w-[200px] shrink grow basis-auto focus:outline-none";

        const normalStateClasses = cn(
            "bg-transparent text-gray-700 hover:after:content-[''] hover:after:absolute focus-visible:after:content-[''] focus-visible:after:absolute",
            variant !== "pill"
                ? "hover:after:left-[10%] hover:after:bottom-[-12px] hover:after:h-[3px] hover:after:w-[80%] hover:after:rounded-t-[30px] hover:after:bg-gray-400 focus-visible:after:left-[10%] focus-visible:after:bottom-[-12px] focus-visible:after:h-[3px] focus-visible:after:w-[80%] focus-visible:after:rounded-t-[30px] focus-visible:after:bg-gray-400"
                : "hover:bg-gray-100 focus-visible:bg-gray-100",
        );

        const activeStateClasses = cn(
            variant === "pill" && bgColorClasses(color),
            textColorClasses(color),
            variant !== "pill" && lineColorClasses(color),
            "after:content-[''] after:absolute after:left-[10%] after:bottom-[-12px] after:h-[3px] after:w-[80%] after:rounded-t-[30px]",
        );

        const style = cn(baseClasses, isActive ? activeStateClasses : normalStateClasses);

        return (
            <button
                ref={ref}
                className={style}
                value={val.value}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tab-panel-${val.value}`}
                id={`tab-${val.value}`}
                onClick={() => handleChange(val.value)}
                onKeyDown={onKeyDown}
                tabIndex={isActive ? 0 : -1}
            >
                {val.icon && <span className="shrink-0 flex items-center justify-center">{val.icon}</span>}
                {val.label && <span className="truncate">{val.label}</span>}
            </button>
        );
    },
);
