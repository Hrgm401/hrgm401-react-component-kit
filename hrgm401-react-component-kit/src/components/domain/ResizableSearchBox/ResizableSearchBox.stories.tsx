import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ResizableSearchBox } from "./ResizableSearchBox";

const meta = {
    title: "Domain/ResizableSearchBox",
    component: ResizableSearchBox,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "検索・送信ボタンを内蔵したテキストエリア。ResizableTextarea を拡張したコンポーネント。\n\n" +
                    "- Enter キー（Shift+Enter を除く）または送信ボタンで `onSearch` が発火する\n" +
                    "- Shift+Enter は改行として動作するため、複数行の検索クエリにも対応\n" +
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
            description: "入力・送信ボタンを無効化する。検索処理中のロック等に使用",
        },
        maxLength: {
            control: "number",
            description: "最大入力文字数",
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
        onSearch: {
            description:
                "送信ボタンのクリック、またはEnterキー（Shift+Enterを除く）で発火するコールバック。引数に現在の入力値が渡される",
            action: "searched",
        },
        doEnterSearch: {
            control: "boolean",
            description:
                "`true`（デフォルト）のとき、Enter キーで `onSearch` を発火する。\n\n" +
                "`false` にすると Enter キーでの検索を無効化し、送信ボタンのみで発火する。" +
                "複数行入力を主用途とする場合に使用する",
        },
    },
} satisfies Meta<typeof ResizableSearchBox>;

export default meta;
type Story = StoryObj<typeof ResizableSearchBox>;

// ============================================
// 基本
// ============================================

/**
 * デフォルトの状態。
 * Actions パネルで `onSearch` の発火タイミングと値を確認できる
 */
export const Default: Story = {
    args: {
        placeholder: "検索キーワードを入力...",
        color: "primary",
        doEnterSearch: true,
    },
};

// ============================================
// 使用例
// ============================================

/**
 * 検索クエリの履歴を表示する例。
 * Enter または送信ボタンで検索が発火し、入力欄がクリアされる
 */
export const KeywordSearch: Story = {
    name: "キーワード検索",
    parameters: {
        docs: {
            description: {
                story:
                    "検索後に入力欄をクリアする一般的なパターン。\n\n" +
                    "- Enter（Shift+Enter を除く）または送信ボタンで発火\n" +
                    "- `onSearch` 内で `setValue('')` を呼ぶことで入力欄をリセット\n" +
                    "- 空文字では発火しない",
            },
        },
    },
    render: () => {
        const [value, setValue] = useState("");
        const [history, setHistory] = useState<string[]>([]);

        const handleSearch = (v: string) => {
            if (!v.trim()) return;
            setHistory((prev) => [v.trim(), ...prev].slice(0, 5));
            setValue("");
        };

        return (
            <div className="w-125 space-y-4">
                <ResizableSearchBox
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onSearch={handleSearch}
                    placeholder="キーワードを入力して Enter または ▶ で検索..."
                />
                {history.length > 0 && (
                    <div className="space-y-1">
                        <p className="text-xs text-text-muted">検索履歴</p>
                        <ul className="space-y-1">
                            {history.map((q, i) => (
                                <li
                                    key={i}
                                    onClick={() => setValue(q)}
                                    className="text-xs text-text px-3 py-1.5 rounded-lg border border-border hover:bg-bg-subtle cursor-pointer"
                                >
                                    {q}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    },
};

/**
 * 入力に応じてリストをリアルタイムに絞り込む例。
 * `onChange` で絞り込み、Enter または送信ボタンで確定する
 */
export const ListFilter: Story = {
    name: "リスト絞り込み",
    parameters: {
        docs: {
            description: {
                story:
                    "`onChange` で入力のたびにリストを絞り込み、`onSearch` で選択を確定するパターン。\n\n" +
                    "サジェスト検索やフィルタリングUIに適している。",
            },
        },
    },
    render: () => {
        const items = [
            "ダッシュボード",
            "ユーザー管理",
            "レポート作成",
            "設定",
            "通知センター",
            "ファイル管理",
            "プロジェクト一覧",
            "タスク管理",
            "カレンダー",
            "ヘルプ",
        ];

        const [value, setValue] = useState("");
        const [confirmed, setConfirmed] = useState<string | null>(null);

        const filtered = value.trim()
            ? items.filter((item) => item.includes(value.trim()))
            : items;

        const handleSearch = (v: string) => {
            setConfirmed(v.trim() || null);
        };

        return (
            <div className="w-125 space-y-3">
                <ResizableSearchBox
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onSearch={handleSearch}
                    placeholder="メニューを検索..."
                />
                {confirmed && (
                    <p className="text-xs text-primary-600 font-medium">
                        確定: "{confirmed}"
                    </p>
                )}
                <ul className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                    {filtered.length > 0 ? (
                        filtered.map((item) => (
                            <li
                                key={item}
                                className="px-4 py-2 text-xs text-text hover:bg-bg-subtle cursor-pointer"
                                onClick={() => {
                                    setValue(item);
                                    setConfirmed(item);
                                }}
                            >
                                {item}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-3 text-xs text-text-muted text-center">
                            一致する項目がありません
                        </li>
                    )}
                </ul>
            </div>
        );
    },
};

/**
 * チャット形式のメッセージ送信例。
 * Shift+Enter で改行、Enter または送信ボタンでメッセージを送信する
 */
export const ChatInput: Story = {
    name: "チャット入力",
    parameters: {
        docs: {
            description: {
                story:
                    "複数行のメッセージ入力に対応したチャットUIパターン。\n\n" +
                    "- Shift+Enter で改行（複数行クエリ対応）\n" +
                    "- Enter または送信ボタンで送信\n" +
                    "- 送信後に入力欄をクリア",
            },
        },
    },
    render: () => {
        const [value, setValue] = useState("");
        const [messages, setMessages] = useState<{ text: string; time: string }[]>([
            { text: "こんにちは！何かお手伝いできますか？", time: "10:00" },
        ]);

        const handleSend = (v: string) => {
            if (!v.trim()) return;
            const now = new Date().toLocaleTimeString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
            });
            setMessages((prev) => [...prev, { text: v.trim(), time: now }]);
            setValue("");
        };

        return (
            <div className="w-125 flex flex-col gap-3">
                <ul className="space-y-2 max-h-60 overflow-y-auto p-3 bg-bg-subtle rounded-xl border border-border">
                    {messages.map((msg, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="text-xs text-text-muted shrink-0 mt-0.5">
                                {msg.time}
                            </span>
                            <p className="text-xs text-text whitespace-pre-wrap">{msg.text}</p>
                        </li>
                    ))}
                </ul>
                <ResizableSearchBox
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onSearch={handleSend}
                    placeholder="メッセージを入力（Shift+Enter で改行）..."
                />
            </div>
        );
    },
};

/**
 * `doEnterSearch={false}` のとき、Enter キーで検索は発火せず改行になる。
 * 送信ボタンのみで `onSearch` が発火する
 */
export const MultilineInput: Story = {
    name: "複数行入力モード（Enter無効）",
    parameters: {
        docs: {
            description: {
                story:
                    "`doEnterSearch={false}` を指定すると Enter キーでの検索を無効化する。\n\n" +
                    "複数行の入力を主用途とする場合（メモ・詳細説明など）に使用する。\n\n" +
                    "送信ボタンは引き続き動作する。",
            },
        },
    },
    render: () => {
        const [value, setValue] = useState("");
        const [sent, setSent] = useState<string | null>(null);

        const handleSearch = (v: string) => {
            if (!v.trim()) return;
            setSent(v.trim());
            setValue("");
        };

        return (
            <div className="w-125 space-y-3">
                <ResizableSearchBox
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onSearch={handleSearch}
                    doEnterSearch={false}
                    placeholder="Enter で改行、送信ボタンで送信..."
                />
                {sent && (
                    <div className="p-3 bg-bg-subtle rounded-xl border border-border">
                        <p className="text-xs text-text-muted mb-1">送信内容</p>
                        <p className="text-xs text-text whitespace-pre-wrap">{sent}</p>
                    </div>
                )}
            </div>
        );
    },
};

// ============================================
// カラーバリエーション
// ============================================

/**
 * `color` prop でフォーカス時のカラーを切り替える例。
 * 4色を並べて比較できる
 */
export const ColorVariants: Story = {
    name: "カラーバリエーション",
    parameters: {
        docs: {
            description: {
                story:
                    "`color` prop でフォーカス時のリングカラーを変更できる。\n\n" +
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
        const labels = {
            primary: "Primary（青）",
            secondary: "Secondary（緑）",
            tertiary: "Tertiary（赤）",
            quaternary: "Quaternary（黄）",
        };

        return (
            <div className="w-125 space-y-4">
                {colors.map((color) => (
                    <div key={color} className="space-y-1">
                        <p className="text-xs text-text-muted">{labels[color]}</p>
                        <ResizableSearchBox
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

/**
 * 検索処理中に `disabled` で入力をロックする例。
 * 送信後に非同期処理が完了するまで操作を受け付けない
 */
export const DisabledWhileSearching: Story = {
    name: "検索処理中（無効状態）",
    parameters: {
        docs: {
            description: {
                story:
                    "`disabled` で入力と送信ボタンを同時にロックできる。\n\n" +
                    "API呼び出し中など、二重送信を防ぎたい場面に使用する。",
            },
        },
    },
    render: () => {
        const [value, setValue] = useState("");
        const [isSearching, setIsSearching] = useState(false);
        const [result, setResult] = useState<string | null>(null);

        const handleSearch = (v: string) => {
            if (!v.trim()) return;
            setIsSearching(true);
            setResult(null);
            setTimeout(() => {
                setResult(`"${v.trim()}" の検索が完了しました`);
                setIsSearching(false);
                setValue("");
            }, 2000);
        };

        return (
            <div className="w-125 space-y-3">
                <ResizableSearchBox
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onSearch={handleSearch}
                    disabled={isSearching}
                    placeholder={isSearching ? "検索中..." : "キーワードを入力して検索..."}
                />
                {result && (
                    <p className="text-xs text-secondary-600">{result}</p>
                )}
            </div>
        );
    },
};
