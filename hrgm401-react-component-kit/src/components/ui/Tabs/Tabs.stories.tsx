/**
 * @file src/components/ui/Tabs/Tabs.stories.tsx
 * @description TabsコンポーネントのStorybookファイル
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";
import { useState } from "react";
import { Home, Settings, User, Bell } from "lucide-react";

// Storybookのメタデータを定義
const meta: Meta<typeof Tabs> = {
    title: "UI/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    // propsの情報をStorybookのUIに表示
    argTypes: {
        options: {
            control: "object",
            description: "タブの選択肢の配列です。",
        },
        selected: {
            control: "text",
            description: "選択されているタブのvalueです。",
        },
        handleChange: {
            action: "handleChange",
            description: "タブがクリックされたときに呼ばれるコールバック関数です。",
        },
        handleDelete: {
            action: "handleDelete",
            description:
                "削除ボタンがクリックされたときに呼ばれるコールバック関数です。このpropを渡さないと削除ボタンは表示されません。",
        },
        variant: {
            control: "radio",
            options: ["default", "pill", "line"],
            description: "タブのデザインバリエーションです。",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- モックデータ ---
const sampleOptions = [
    { label: "ダッシュボード", value: "dashboard" },
    { label: "設定", value: "settings" },
    { label: "プロフィール", value: "profile" },
    { label: "通知一覧", value: "notifications" },
];

// --- ストーリー ---

/**
 * ### 基本的なタブ
 * 削除機能なしの標準的な表示です。タブをクリックすると選択状態が切り替わります。
 */
export const Default: Story = {
    render: (args) => {
        // Story内で状態を管理し、インタラクティブにする
        const [selected, setSelected] = useState(args.options[0]?.value || "");

        const handleTabChange = (value: string) => {
            setSelected(value);
            // StorybookのActionsパネルにも出力する
            args.handleChange(value);
        };

        return (
            <Tabs
                {...args}
                selected={selected}
                handleChange={handleTabChange}
                // handleDeleteは渡さない
                handleDelete={undefined}
            />
        );
    },
    args: {
        options: sampleOptions,
        variant: "default",
    },
};

/**
 * ### 削除可能なタブ
 * `handleDelete` propを渡した場合の表示です。タブにマウスホバーすると削除ボタン（✕）が表示されます。
 * 実際に削除ボタンをクリックすると、タブがリストから削除されます。
 */
export const Deletable: Story = {
    render: (args) => {
        const [currentOptions, setCurrentOptions] = useState(args.options);
        const [selected, setSelected] = useState(args.options[0]?.value || "");

        const handleTabChange = (value: string) => {
            setSelected(value);
            args.handleChange(value);
        };

        const handleTabDelete = (value: string) => {
            const newOptions = currentOptions.filter((opt) => opt.value !== value);
            setCurrentOptions(newOptions);
            if (args.handleDelete) args.handleDelete(value);

            // もし選択中のタブを削除したら、先頭のタブを選択状態にする
            if (selected === value) {
                setSelected(newOptions[0]?.value || "");
            }
        };

        return (
            <Tabs
                {...args}
                options={currentOptions}
                selected={selected}
                handleChange={handleTabChange}
                handleDelete={handleTabDelete}
            />
        );
    },
    args: {
        options: sampleOptions,
        variant: "default",
    },
};

/**
 * ### タブが多くスクロールバーが出る場合
 * タブがコンテナの幅を超えた場合の表示です。
 * カスタムスクロールバーが適用されており、マウスホバー時にスクロールバーが表示されます。
 * マウスの縦ホイールでも横スクロールが可能です。
 */
export const ManyTabs: Story = {
    render: (args) => {
        const [currentOptions, setCurrentOptions] = useState(args.options);
        const [selected, setSelected] = useState(args.options[0]?.value || "");

        const handleTabChange = (value: string) => {
            setSelected(value);
            if (args.handleChange) args.handleChange(value);
        };

        const handleTabDelete = (value: string) => {
            const newOptions = currentOptions.filter((opt) => opt.value !== value);
            setCurrentOptions(newOptions);
            if (args.handleDelete) args.handleDelete(value);

            if (selected === value) {
                setSelected(newOptions[0]?.value || "");
            }
        };

        return (
            <div
                style={{
                    maxWidth: "400px",
                    width: "100vw",
                    padding: "16px",
                    border: "1px dashed #cbd5e1",
                    borderRadius: "8px",
                }}
            >
                <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "16px" }}>
                    ※ 親要素の幅を400pxに制限しています。
                    <br />
                    ホバーしてスクロールバーを確認してください。
                </p>
                <Tabs
                    {...args}
                    options={currentOptions}
                    selected={selected}
                    handleChange={handleTabChange}
                    handleDelete={handleTabDelete}
                />
            </div>
        );
    },
    args: {
        options: Array.from({ length: 15 }, (_, i) => ({
            label: `項目 ${i + 1}`,
            value: `item${i + 1}`,
        })),
        variant: "default",
    },
};

/**
 * ### デザインバリエーション比較
 * \`variant\` propで指定できるすべてのデザイン（default, pill, line）の一覧です。
 */
export const Variants: Story = {
    render: (args) => {
        const [selected, setSelected] = useState(args.options[0]?.value || "");

        const handleTabChange = (value: string) => {
            setSelected(value);
            if (args.handleChange) args.handleChange(value);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%", minWidth: "400px" }}>
                <div>
                    <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px", fontWeight: "bold" }}>
                        Default
                    </p>
                    <Tabs {...args} variant="default" selected={selected} handleChange={handleTabChange} />
                </div>
                <div>
                    <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px", fontWeight: "bold" }}>Pill</p>
                    <Tabs {...args} variant="pill" selected={selected} handleChange={handleTabChange} />
                </div>
                <div>
                    <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px", fontWeight: "bold" }}>Line</p>
                    <Tabs {...args} variant="line" selected={selected} handleChange={handleTabChange} />
                </div>
            </div>
        );
    },
    args: {
        options: sampleOptions,
    },
};

/**
 * ### テーマカラー
 * \`color\` propを指定することで、異なるテーマカラーを適用できます。
 */
export const Colors: Story = {
    render: (args) => {
        const [selected, setSelected] = useState(args.options[0]?.value || "");

        const handleTabChange = (value: string) => {
            setSelected(value);
            if (args.handleChange) args.handleChange(value);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", width: "100%", minWidth: "400px" }}>
                <div>
                    <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px", fontWeight: "bold" }}>
                        Primary (デフォルト)
                    </p>
                    <Tabs {...args} color="primary" selected={selected} handleChange={handleTabChange} />
                </div>
                <div>
                    <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px", fontWeight: "bold" }}>
                        Secondary
                    </p>
                    <Tabs {...args} color="secondary" selected={selected} handleChange={handleTabChange} />
                </div>
                <div>
                    <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px", fontWeight: "bold" }}>
                        Tertiary
                    </p>
                    <Tabs {...args} color="tertiary" selected={selected} handleChange={handleTabChange} />
                </div>
                <div>
                    <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px", fontWeight: "bold" }}>
                        Quaternary
                    </p>
                    <Tabs {...args} color="quaternary" selected={selected} handleChange={handleTabChange} />
                </div>
            </div>
        );
    },
    args: {
        options: sampleOptions,
        variant: "default",
    },
};

/**
 * ### アイコン付きのタブ
 * \`icon\` propを指定することで、タブにアイコンを表示できます。
 * アイコンのみのタブも可能です。
 */
export const WithIcons: Story = {
    render: (args) => {
        const [selected, setSelected] = useState(args.options[0]?.value || "");

        const handleTabChange = (value: string) => {
            setSelected(value);
            if (args.handleChange) args.handleChange(value);
        };

        return <Tabs {...args} selected={selected} handleChange={handleTabChange} />;
    },
    args: {
        options: [
            { label: "ホーム", value: "home", icon: <Home size={18} /> },
            { label: "設定", value: "settings", icon: <Settings size={18} /> },
            { value: "profile", icon: <User size={18} /> }, // アイコンのみ
            { label: "通知", value: "notifications", icon: <Bell size={18} /> },
        ],
        variant: "default",
    },
};
