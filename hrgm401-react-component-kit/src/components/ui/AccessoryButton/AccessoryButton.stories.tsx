import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Search, Send, Plus, Copy, RefreshCw } from "lucide-react";
import { AccessoryButton } from "./AccessoryButton";

const meta = {
    title: "UI/AccessoryButton",
    component: AccessoryButton,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "薄い背景色を持ち、要素の「副次的な主機能」を担うアクセサリボタンです。\n\n" +
                    "- テキスト入力欄内の「検索」や「送信」、カードやリストにおける「追加」「コピー」「更新」など、\n" +
                    "  はっきりとしたアクションを示したい場合に使用します。\n" +
                    "- 通常時から薄い背景色（`bg-bg-muted`）が表示され、よりクリック可能であることが伝わりやすくなっています。\n" +
                    "- `icon` prop で `lucide-react` のアイコンコンポーネントを指定して描画します。",
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
} satisfies Meta<typeof AccessoryButton>;

export default meta;
type Story = StoryObj<typeof AccessoryButton>;

// ============================================
// 基本
// ============================================

export const Default: Story = {
    args: {
        icon: Send,
        color: "primary",
        "aria-label": "送信",
    },
};

// ============================================
// 使用例
// ============================================

/**
 * 検索入力欄やチャット入力など、入力フィールドの中の送信ボタンとしての使用例です。
 */
export const InsideInputExample: Story = {
    name: "使用例1：入力フィールド内",
    render: () => {
        const [value, setValue] = useState("");
        const [sendedList, setSendedList] = useState<string[]>([]);
        return (
            <>
                <div className="w-80 relative flex items-center">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="メッセージを入力..."
                        className="w-full h-11 pl-4 pr-12 text-sm border border-border rounded-full bg-bg text-text focus:outline-none focus:ring-1 focus:ring-primary-400"
                    />
                    <AccessoryButton
                        icon={Send}
                        aria-label="送信"
                        color="primary"
                        className="absolute right-1.5"
                        disabled={!value.trim()}
                        onClick={() => {
                            setSendedList([...sendedList, `"${value}"を送信しました`]);
                            setValue("");
                        }}
                    />
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                    {sendedList.map((message, index) => (
                        <div
                            className="text-sm rounded-xl border border-primary-200 bg-primary-100 px-2 py-0.5"
                            key={index}
                        >
                            {message}
                        </div>
                    ))}
                </div>
            </>
        );
    },
};

/**
 * テキスト入力領域の外側に配置し、「追加」や「適用」などのアクションを促す例です。
 */
export const InlineActionExample: Story = {
    name: "使用例2：インラインの補助アクション",
    render: () => {
        const [tags, setTags] = useState(["React"]);
        const [tagInput, setTagInput] = useState("");

        return (
            <div className="w-80 space-y-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="新しいタグを追加"
                        className="flex-1 h-10 px-3 text-sm border border-border rounded-lg bg-bg text-text focus:outline-none focus:border-secondary-500"
                    />
                    <AccessoryButton
                        icon={Plus}
                        aria-label="追加"
                        color="secondary"
                        onClick={() => {
                            if (tagInput.trim()) {
                                setTags([...tags, tagInput.trim()]);
                                setTagInput("");
                            }
                        }}
                    />
                </div>
                <div className="flex flex-wrap gap-1">
                    {tags.map((t, i) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 bg-secondary-100 text-secondary-800 text-xs rounded border border-secondary-200"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        );
    },
};

/**
 * データ表示ブロックの右上に「コピー」や「更新」などのユーティリティを配置する用途です。
 */
export const CardUtilityExample: Story = {
    name: "使用例3：ブロック/カードのユーティリティ",
    render: () => {
        return (
            <div className="w-80 group relative p-4 bg-bg rounded-xl border border-border">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-semibold text-text">サーバーIPアドレス</h3>
                    <div className="flex gap-1">
                        <AccessoryButton
                            icon={RefreshCw}
                            aria-label="再フェッチ"
                            color="quaternary"
                            iconClassName="w-3.5 h-3.5"
                            className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <AccessoryButton
                            icon={Copy}
                            aria-label="コピー"
                            color="primary"
                            iconClassName="w-3.5 h-3.5"
                            className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => alert("コピーしました")}
                        />
                    </div>
                </div>
                <div className="bg-bg-muted p-2 rounded text-sm text-text-muted font-mono">192.168.1.100</div>
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
                            <AccessoryButton icon={Send} color={color} aria-label="送信" />
                            <AccessoryButton icon={Plus} color={color} aria-label="追加" />
                            <AccessoryButton icon={Search} color={color} aria-label="検索" />
                            <AccessoryButton icon={Copy} color={color} aria-label="コピー" />
                            <p className="text-xs text-text-muted ml-auto">フォーカスやクリックを試してください</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    },
};
