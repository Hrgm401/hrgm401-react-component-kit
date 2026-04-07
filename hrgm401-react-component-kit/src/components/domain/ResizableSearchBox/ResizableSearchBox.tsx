import { Send } from "lucide-react";
import { forwardRef, useState, useRef } from "react";
import { ResizableTextarea } from "../../ui/ResizableTextarea/ResizableTextarea";
import { triggerRipple } from "../../../utils/triggerRipple";
import { AccessoryButton } from "../../ui/AccessoryButton/AccessoryButton";

type Props = React.ComponentProps<typeof ResizableTextarea> & {
    /**
     * 検索/送信ボタンが押されたとき、またはEnterキー（Shift+Enterを除く）で発火する
     * @param value - 現在のテキストエリアの値
     */
    onSearch?: (value: string) => void;
    /** エンターキーで送信するかどうか */
    doEnterSearch?: boolean;
    /** 送信ボタンのラベル（スクリーンリーダー用） default: "送信" */
    submitLabel?: string;
};

/**
 * 検索・送信ボタンを内蔵したテキストエリアコンポーネント。ResizableTextarea を拡張する。
 *
 * - テキスト量に応じて高さが自動調節される（ResizableTextarea継承）
 * - Enter キー（Shift+Enter を除く）で `onSearch` を発火
 * - 右下の送信ボタンでも `onSearch` を発火
 * - 制御コンポーネント（`value` + `onChange`）・非制御コンポーネントの両方に対応
 * - `forwardRef` 対応。外部から `ref` を渡してDOM操作が可能
 *
 * @param { className, color, onSearch, ...rest } - HTMLTextAreaElement の全属性 + onSearch
 * colorについてはバリエーション参考（省略可）
 * @param ref - 省略可（HTMLTextAreaElement への ref）
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState("");
 *
 * <ResizableSearchBox
 *     value={value}
 *     onChange={(e) => setValue(e.target.value)}
 *     onSearch={(v) => search(v)}
 *     placeholder="検索キーワードを入力..."
 * />
 * ```
 */
export const ResizableSearchBox = forwardRef<HTMLTextAreaElement, Props>(
    ({ onSearch, doEnterSearch = true, submitLabel, value, onChange, onKeyDown, ...rest }, ref) => {
        const buttonRef = useRef<HTMLButtonElement>(null);

        const [internalValue, setInternalValue] = useState(
            typeof rest.defaultValue === "string" ? rest.defaultValue : "",
        );
        const isControlled = value !== undefined;
        const currentValue = isControlled ? value : internalValue;

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!isControlled) setInternalValue(e.target.value);
            onChange?.(e);
        };

        const handleSearch = () => {
            onSearch?.(String(currentValue ?? ""));
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                if (doEnterSearch) {
                    e.preventDefault();
                    triggerRipple(buttonRef.current);
                    handleSearch();
                }
                return;
            }
            onKeyDown?.(e);
        };

        return (
            <div role="search" className="relative">
                <ResizableTextarea
                    {...rest}
                    ref={ref}
                    value={currentValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <AccessoryButton
                    ref={buttonRef}
                    aria-label={submitLabel ?? "送信"}
                    icon={Send}
                    color={rest.color}
                    disabled={rest.disabled}
                    onClick={handleSearch}
                    className="absolute bottom-3 right-4"
                />
            </div>
        );
    },
);
