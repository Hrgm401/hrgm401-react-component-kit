/**
 * @file src/components/ui/Tabs/Tabs.tsx
 * @description タブコンポーネント。handleDeleteを渡すとタブを消すことができます
 */
import { ClosedButton } from "../../ClosedButton";
import { TabButton } from "./TabButton";

import { forwardRef, useEffect, useRef, type ComponentProps } from "react";
import type { ColorType } from "../../../utils/colorStyles";
import { cn } from "../../../utils/cn";
import type { TabVariant, TabOption } from "../../../types/Tabs";

type Props = Omit<ComponentProps<"div">, "color"> & {
    options: TabOption[];
    selected: string;
    handleChange: (value: string) => void;
    handleDelete?: (value: string) => void;
    variant?: TabVariant;
    color?: ColorType;
};

export const Tabs = forwardRef<HTMLDivElement, Props>(
    (
        {
            className,
            options,
            selected,
            handleChange,
            handleDelete = undefined,
            variant = "default",
            color = "primary",
            ...rest
        },
        ref,
    ) => {
        const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
        const scrollRef = useRef<HTMLDivElement>(null);

        // マウスの縦スクロール（ホイール）を横スクロールに変換する処理
        useEffect(() => {
            const el = scrollRef.current;
            if (!el) return;

            const handleWheel = (e: WheelEvent) => {
                if (e.deltaY !== 0) {
                    const maxScrollLeft = el.scrollWidth - el.clientWidth;
                    if (maxScrollLeft > 0) {
                        // 親要素へのスクロール伝播を止めて、横スクロールに反映する
                        e.preventDefault();
                        el.scrollLeft += e.deltaY;
                    }
                }
            };

            // スクロールイベントをフックし、preventDefaultを有効化するためには passive: false が必要
            el.addEventListener("wheel", handleWheel, { passive: false });
            // クリーンアップ
            return () => el.removeEventListener("wheel", handleWheel);
        }, []);

        // 矢印キー検知
        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
            if (e.key === "ArrowRight") {
                e.preventDefault();
                const nextIndex = (index + 1) % options.length;
                tabRefs.current[nextIndex]?.focus();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                const nextIndex = (index - 1 + options.length) % options.length;
                tabRefs.current[nextIndex]?.focus();
            } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleChange(options[index].value);
            }
        };

        return (
            <div
                ref={ref}
                className={cn("w-full relative tab-container-line", className)}
                style={{ marginBottom: "30px" }}
                {...rest}
            >
                <style>{`
                /* Webkit (Chrome, Safari, Edge) */
                .hover-scrollbar::-webkit-scrollbar {
                    height: 4px;
                }
                .hover-scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                    margin: 0px;
                    border-radius: 4px;
                }
                .hover-scrollbar::-webkit-scrollbar-thumb {
                    background-color: transparent;
                    border-radius: 4px;
                }
                /* コンテナホバー時にトラック（背景）も表示 */
                .hover-scrollbar:hover::-webkit-scrollbar-track {
                    background-color: #e2e8f0; /* bg-slate-200 */
                }
                
                
                /* コンテナホバー時にサム（バー）を表示 */
                .hover-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #94a3b8; /* bg-slate-400 */
                }
                /* バー自体へのホバー時 */
                .hover-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #64748b; /* bg-slate-500 */
                }
                
                /* 左右の矢印ボタンを完全に非表示 */
                .hover-scrollbar::-webkit-scrollbar-button {
                    display: none !important;
                    width: 0 !important;
                    height: 0 !important;
                }

                /* Firefox専用設定 */
                @supports (-moz-appearance: none) {
                    .hover-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: transparent transparent;
                    }
                    .hover-scrollbar:hover {
                        scrollbar-color: #94a3b8 #e2e8f0;
                    }
                }

            `}</style>
                <div ref={scrollRef} className="overflow-x-auto overflow-y-hidden hover-scrollbar">
                    <div
                        role="tablist"
                        aria-label="タブメニュー"
                        className="flex flex-nowrap gap-2 px-3 pt-3 pb-[10px] min-w-full w-max"
                        style={{ borderBottom: variant === "line" ? "1.5px solid #ddd" : "none" }}
                    >
                        {options.map((item, index) => (
                            <div key={item.value} className="relative group shrink-0">
                                <TabButton
                                    ref={(el) => {
                                        tabRefs.current[index] = el;
                                    }}
                                    key={item.value}
                                    val={item}
                                    selectedVal={selected}
                                    handleChange={handleChange}
                                    variant={variant}
                                    color={color}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                                {options.length > 1 && handleDelete && (
                                    <ClosedButton
                                        aria-label={`${item.label}タブを削除`}
                                        handleClose={() => handleDelete(item.value)}
                                        className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 transition-opacity"
                                        tabIndex={selected === item.value ? 0 : -1}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
);
