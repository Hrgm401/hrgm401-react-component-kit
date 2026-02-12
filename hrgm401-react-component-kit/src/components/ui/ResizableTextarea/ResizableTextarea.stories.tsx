import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ResizableTextarea } from "./ResizableTextarea";

const meta = {
    title: "UI/ResizableTextarea",
    component: ResizableTextarea,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "テキスト量に応じて高さを自動調節するテキストエリア。\n\n" +
                    "- 入力に合わせて高さが伸縮する\n" +
                    "- 一定量を超えると展開/縮小ボタンが表示される\n" +
                    "- `className` でスタイルの上書きが可能（tailwind-merge による安全なマージ）\n" +
                    "- `forwardRef` 対応。外部から `ref` を渡してDOM操作が可能",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        placeholder: {
            control: "text",
            description: "プレースホルダーテキスト",
        },
        disabled: {
            control: "boolean",
            description: "入力を無効化する",
        },
        maxLength: {
            control: "number",
            description: "最大入力文字数",
        },
        readOnly: {
            control: "boolean",
            description: "読み取り専用にする",
        },
        color: {
            control: "select",
            options: ["primary", "secondary", "tertiary", "quaternary"],
            description: "フォーカス時のカラーバリエーション",
        },
        className: {
            control: "text",
            description:
                "追加のTailwindクラス。既存スタイルと競合する場合は上書きされる",
        },
    },
} satisfies Meta<typeof ResizableTextarea>;

export default meta;
type Story = StoryObj<typeof ResizableTextarea>;

// ============================================
// 基本
// ============================================

/** デフォルトの状態。空のテキストエリアが表示される */
export const Default: Story = {
    args: {
        placeholder: "テキストを入力...",
        color: "primary",
    },
};

// ============================================
// 使用例
// ============================================

/**
 * コメント入力欄としての使用例。
 * `value` と `onChange` を使って制御コンポーネントとして動作する
 */
export const CommentInput: Story = {
    name: "コメント入力",
    parameters: {
        docs: {
            description: {
                story: "フォームのコメント欄として使用する例。入力内容を状態管理し、文字数を表示する。",
            },
        },
    },
    render: () => {
        const [value, setValue] = useState("");
        const maxLength = 500;

        return (
            <div className="w-125 space-y-2">
                <label className="text-sm font-medium text-text">
                    コメント
                </label>
                <ResizableTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="コメントを入力してください..."
                    maxLength={maxLength}
                />
                <p className="text-xs text-text-muted text-right">
                    {value.length} / {maxLength}
                </p>
            </div>
        );
    },
};

/**
 * 長文が入力された状態。展開/縮小ボタンが表示される
 */
export const LongText: Story = {
    name: "長文入力時（展開ボタン表示）",
    parameters: {
        docs: {
            description: {
                story: "テキスト量が閾値を超えると、右上に展開/縮小ボタンが自動表示される。",
            },
        },
    },
    render: () => {
        const longText = Array(20)
            .fill(
                "これは長文テストです。テキストエリアの高さが自動調整され、展開ボタンが表示されることを確認できます。"
            )
            .join("\n");

        const [value, setValue] = useState(longText);

        return (
            <div className="w-125">
                <ResizableTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        );
    },
};

// ============================================
// カラーバリエーション
// ============================================

/**
 * `color` prop で フォーカス時のカラーを切り替える例。
 * 4色を並べて比較できる
 */
export const ColorVariants: Story = {
    name: "カラーバリエーション",
    parameters: {
        docs: {
            description: {
                story: "`color` prop でフォーカス時のリングカラーを変更できる。\n\n" +
                    "| color | 説明 |\n" +
                    "|-------|------|\n" +
                    "| `primary` | 青系（デフォルト） |\n" +
                    "| `secondary` | 緑系 |\n" +
                    "| `tertiary` | 赤系 |\n" +
                    "| `quaternary` | 黄系 |",
            },
        },
    },
    render: () => {
        const colors = ["primary", "secondary", "tertiary", "quaternary"] as const;
        const labels = { primary: "Primary（青）", secondary: "Secondary（緑）", tertiary: "Tertiary（赤）", quaternary: "Quaternary（黄）" };

        return (
            <div className="w-125 space-y-4">
                {colors.map((color) => (
                    <div key={color} className="space-y-1">
                        <p className="text-xs text-text-muted">{labels[color]}</p>
                        <ResizableTextarea
                            color={color}
                            placeholder={`color="${color}" — フォーカスして確認`}
                        />
                    </div>
                ))}
            </div>
        );
    },
};

// ============================================
// 状態バリエーション
// ============================================

/** `disabled` を指定した場合。入力が無効化される */
export const Disabled: Story = {
    name: "無効状態",
    args: {
        disabled: true,
        value: "この入力欄は無効化されています",
        placeholder: "入力できません",
    },
};

/** `readOnly` を指定した場合。内容は表示されるが編集できない */
export const ReadOnly: Story = {
    name: "読み取り専用",
    args: {
        readOnly: true,
        value: "この内容は読み取り専用です。選択やコピーは可能ですが、編集はできません。",
    },
};

// ============================================
// スタイルカスタマイズ
// ============================================

/**
 * `className` を使ってスタイルを上書きする例。
 * tailwind-merge により、競合するクラスは安全に置き換えられる
 */
export const CustomStyle: Story = {
    name: "スタイル上書き（className）",
    parameters: {
        docs: {
            description: {
                story: "`className` でコンポーネントのデフォルトスタイルを上書きできる。\n\n" +
                    "```tsx\n" +
                    '<ResizableTextarea className="bg-primary-50 border-primary-300 rounded-none" />\n' +
                    "```\n\n" +
                    "`tailwind-merge` により `bg-bg` → `bg-primary-50` のように同カテゴリのクラスが安全に置き換わる。",
            },
        },
    },
    render: () => {
        const [value, setValue] = useState("");

        return (
            <div className="w-125 space-y-4">
                <div>
                    <p className="text-xs text-text-muted mb-1">
                        背景色・ボーダー色を変更
                    </p>
                    <ResizableTextarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="bg-primary-50 border-primary-300"
                        className="bg-primary-50 border-primary-300"
                    />
                </div>
                <div>
                    <p className="text-xs text-text-muted mb-1">
                        角丸なし
                    </p>
                    <ResizableTextarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="rounded-none"
                        className="rounded-none"
                    />
                </div>
            </div>
        );
    },
};

// ============================================
// 複数配置
// ============================================

/**
 * フォーム内で複数の ResizableTextarea を使う例
 */
export const MultipleInForm: Story = {
    name: "フォーム内での複数配置",
    parameters: {
        docs: {
            description: {
                story: "問い合わせフォームなど、複数のテキストエリアを並べて使用する例。",
            },
        },
    },
    render: () => {
        const [title, setTitle] = useState("");
        const [body, setBody] = useState("");

        return (
            <form
                className="w-125 space-y-4"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="space-y-1">
                    <label className="text-sm font-medium text-text">
                        件名
                    </label>
                    <ResizableTextarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="件名を入力..."
                        maxLength={100}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-text">
                        本文
                    </label>
                    <ResizableTextarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="お問い合わせ内容を入力..."
                        maxLength={2000}
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-text-inverted rounded-md hover:bg-primary-hover"
                >
                    送信
                </button>
            </form>
        );
    },
};
