import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect, useRef } from "react";
import { Maximize2, MoreVertical, Info, Settings, HelpCircle, X } from "lucide-react";
import { SubtleAccessoryButton } from "./SubtleAccessoryButton";

const meta = {
    title: "UI/SubtleAccessoryButton",
    component: SubtleAccessoryButton,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "通常時は背景を持たず、アイコンのみを表示する控えめな（Subtleな）アクセサリボタンです。\n\n" +
                    "- 設定メニューの呼び出し、アイテムリストの操作アクション、アラートの「閉じる」ボタンなど、\n" +
                    "  ユーザーの主要な目的を極力邪魔しない、補助的なアクションに使用します。\n" +
                    "- ホバー時やフォーカス時にのみ背景色が付きます。\n" +
                    "- `icon` prop に `lucide-react` 等のアイコンを渡して使用します。",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        color: {
            control: "select",
            options: ["primary", "secondary", "tertiary", "quaternary"],
            description: "ボタンのカラーテーマ",
        },
        disabled: {
            control: "boolean",
            description: "無効状態にするかどうか",
        },
        onClick: {
            action: "clicked",
            description: "クリック時のコールバック",
        },
    },
} satisfies Meta<typeof SubtleAccessoryButton>;

export default meta;
type Story = StoryObj<typeof SubtleAccessoryButton>;

// ============================================
// 基本
// ============================================

export const Default: Story = {
    args: {
        icon: Settings,
        color: "primary",
        "aria-label": "設定",
    },
};

// ============================================
// 使用例
// ============================================

/**
 * リストアイテムの右側に配置し、その他の操作やドロップダウンメニューなどを引き出す用途です。
 */
export const ListItemActionExample: Story = {
    name: "使用例1：リストアイテムのコンテキストメニュー",
    render: function Render() {
        const items = ["ドキュメント機能の設計", "UIコンポーネントの実装", "テストケースの作成"];
        const [open, setOpen] = useState<number | null>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setOpen(null);
                }
            };

            if (open !== null) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [open]);

        return (
            <div
                ref={containerRef}
                className="w-80 relative flex flex-col border border-border rounded-xl divide-y divide-border"
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-3 hover:bg-bg-subtle transition-colors"
                    >
                        <span className="text-sm text-text">{item}</span>
                        {/* Context Menu Button */}
                        <SubtleAccessoryButton
                            icon={MoreVertical}
                            aria-label={`${item} のメニューを開く`}
                            color="secondary"
                            onClick={() => setOpen(open === index + 1 ? null : index + 1)}
                        />
                    </div>
                ))}
                {open && (
                    <div className="text-xs absolute top-0 -right-34 w-32 bg-white border border-secondary-200 rounded-xl shadow-lg">
                        <div className="p-2 hover:bg-secondary-50 cursor-pointer" onClick={() => setOpen(null)}>
                            {open === 1 ? "機能1" : open === 2 ? "目的" : "テスト1"}
                        </div>
                        <div className="p-2 hover:bg-secondary-50 cursor-pointer" onClick={() => setOpen(null)}>
                            {open === 1 ? "機能2" : open === 2 ? "設計" : "テスト2"}
                        </div>
                        <div className="p-2 hover:bg-secondary-50 cursor-pointer" onClick={() => setOpen(null)}>
                            {open === 1 ? "機能3" : open === 2 ? "画面" : "テスト3"}
                        </div>
                    </div>
                )}
            </div>
        );
    },
};

/**
 * お知らせバナーやダイアログの「閉じる」ボタンとしての使用例です。
 */
export const DismissButtonExample: Story = {
    name: "使用例2：アラート等の「閉じる」ボタン",
    render: () => {
        const [isVisible, setIsVisible] = useState(true);

        if (!isVisible) {
            return (
                <button onClick={() => setIsVisible(true)} className="text-sm text-primary-500 hover:underline">
                    アラートを再表示する
                </button>
            );
        }

        return (
            <div className="w-80 flex items-start p-4 border border-tertiary-200 rounded-xl relative">
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-tertiary-800">重要なお知らせ</h4>
                    <p className="text-xs text-tertiary-700 mt-1">
                        システムのメンテナンスが今夜予定されています。詳細は案内をご確認ください。
                    </p>
                </div>
                <SubtleAccessoryButton
                    icon={X}
                    aria-label="閉じる"
                    color="tertiary"
                    className="absolute top-2 right-2 p-1.5"
                    iconClassName="w-4 h-4"
                    onClick={() => setIsVisible(false)}
                />
            </div>
        );
    },
};

/**
 * フォーム要素のラベル横などに配置し、ツールチップやヘルプ表示をトリガーする用途です。
 */
export const InlineHelpExample: Story = {
    name: "使用例3：インラインのヘルプ・情報アイコン",
    render: () => {
        const [showTooltip, setShowTooltip] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setShowTooltip(false);
                }
            };

            if (showTooltip) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [showTooltip]);

        return (
            <div className="w-80 flex flex-col gap-2">
                <div className="flex items-center gap-1 relative">
                    <label className="text-sm font-semibold text-text">APIキー</label>
                    <SubtleAccessoryButton
                        icon={HelpCircle}
                        aria-label="APIキーについての説明"
                        color="secondary"
                        iconClassName="w-3.5 h-3.5" // アイコンを少し小さく変更
                        className="p-1.5" // 全体の余白も小さく
                        onClick={() => setShowTooltip(!showTooltip)}
                    />
                    {showTooltip && (
                        <div
                            ref={containerRef}
                            className="text-xs absolute top-0 right-28 w-32 bg-bg-muted border border-border rounded-md shadow-lg"
                        >
                            <div className="p-2">
                                <p>APIキーの説明</p>
                                <p>説明---------------</p>
                                <p>-------------------</p>
                                <p>-------------------</p>
                            </div>
                        </div>
                    )}
                </div>
                <input
                    type="password"
                    defaultValue="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full text-sm p-2 bg-bg border border-border rounded-md text-text focus:outline-none focus:ring-1 focus:ring-secondary-400"
                />
            </div>
        );
    },
};

// ============================================
// カラーバリエーション
// ============================================

export const ColorVariants: Story = {
    name: "カラーバリエーション",
    render: () => {
        const colors = ["primary", "secondary", "tertiary", "quaternary"] as const;
        const labels = {
            primary: "Primary（青）",
            secondary: "Secondary（緑）",
            tertiary: "Tertiary（赤）",
            quaternary: "Quaternary（黄）",
        };

        return (
            <div className="w-125 space-y-6">
                {colors.map((color) => (
                    <div key={color} className="flex flex-col gap-2">
                        <p className="text-sm text-text-muted">{labels[color]}</p>
                        <div className="flex gap-4 items-center p-4 bg-bg rounded-xl border border-border">
                            <SubtleAccessoryButton icon={Settings} color={color} aria-label="設定" />
                            <SubtleAccessoryButton icon={Info} color={color} aria-label="情報" />
                            <SubtleAccessoryButton icon={MoreVertical} color={color} aria-label="メニュー" />
                            <SubtleAccessoryButton icon={Maximize2} color={color} aria-label="最大化" />
                            <p className="text-xs text-text-muted ml-auto">フォーカスやクリックを試してください</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    },
};
