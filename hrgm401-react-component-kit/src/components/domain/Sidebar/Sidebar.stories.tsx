import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "./Sidebar";
import { ResizableTextarea } from "../../ui/ResizableTextarea/ResizableTextarea"; // パスは適宜合わせてください
import { InputSelect } from "../../InputSelect";
import { SelectBox } from "../../SelectBox";
import { useState, useRef, useEffect } from "react";
import { pixelToPercent } from "../../../utils/pixelToPercent";

import { PanelGroup, Panel, PanelResizeHandle, ImperativePanelHandle } from "react-resizable-panels";

type SidebarStoryProps = React.ComponentProps<typeof Sidebar> & {
    isDarkMode?: boolean;
};

const meta = {
    title: "Domain/Sidebar",
    component: Sidebar,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        themeColor: {
            control: "select",
            options: ["primary", "secondary", "tertiary", "quaternary"],
        },
        controlled: { control: false },
        onToggle: { control: "boolean" },
        // ダークモード手動切り替え用のトグル
        isDarkMode: {
            control: "boolean",
            description: "Storybook上で手動でダークモードを切り替える",
        },
    },
    decorators: [
        (Story, context) => {
            const { isDarkMode } = context.args;

            // <html>タグ自体にdarkクラスを付与/削除する
            useEffect(() => {
                const html = document.documentElement;
                if (isDarkMode) {
                    html.classList.add("dark");
                } else {
                    html.classList.remove("dark");
                }
            }, [isDarkMode]);

            return (
                <div
                    className={`flex h-screen w-full transition-colors duration-300 ${isDarkMode ? "bg-slate-950" : "bg-white"}`}
                >
                    <Story />
                </div>
            );
        },
    ],
} satisfies Meta<SidebarStoryProps>;

export default meta;
type Story = StoryObj<SidebarStoryProps>;

export const Default: Story = {
    args: {
        themeColor: "primary",
        controlled: false,
        isDarkMode: false,
    },
    render: (args) => {
        return (
            <div className="w-80 h-dvh">
                {/* Sidebar自体の背景色もダークモードに対応させる */}
                <Sidebar {...args} className="bg-bg-muted dark:bg-surface-dark">
                    <div className="w-72">
                        <div className="flex-grow overflow-y-auto mb-4">
                            <p className="text-2xl font-bold text-sky-600 dark:text-sky-400 pl-8 pt-4">
                                サイドバーコンテンツ
                            </p>
                        </div>
                    </div>
                </Sidebar>
            </div>
        );
    },
};

export const ResizableIntegration: Story = {
    args: {
        themeColor: "primary",
        controlled: true,
        isDarkMode: false,
    },
    render: (args) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const panelRef = useRef<ImperativePanelHandle>(null);
        const [isDragging, setIsDragging] = useState(false);

        const handleToggle = (isClose: boolean) => {
            const panel = panelRef.current;
            if (isClose) {
                panel?.resize(pixelToPercent(60, containerRef));
            } else {
                panel?.resize(pixelToPercent(340, containerRef));
            }
        };

        return (
            <div ref={containerRef} className="h-screen w-full">
                <PanelGroup direction="horizontal" className="flex h-full w-full relative">
                    <Panel
                        ref={panelRef}
                        defaultSize={20}
                        minSize={4}
                        className={!isDragging ? "transition-all duration-300 ease-in-out" : ""}
                    >
                        <Sidebar {...args} onOpenChange={handleToggle} className="bg-primary-50 dark:bg-surface-dark">
                            <div className="p-4 w-64">
                                <h2 className="font-bold text-primary-600 dark:text-primary-400 mb-2">
                                    パネル連動モード
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    境界線をドラッグしても、ボタンで開閉しても動作します。
                                    <br />
                                    <br />
                                    <strong>確認ポイント:</strong>
                                    <br />
                                    閉じた状態でアイコンにカーソルを乗せてください。
                                    <br />
                                    ツールチップがリサイズバーの上に重なって表示されればPortal成功です。
                                </p>
                            </div>
                        </Sidebar>
                    </Panel>

                    <PanelResizeHandle
                        className="w-[2px] bg-slate-300 dark:bg-slate-700 hover:w-[4px] hover:bg-primary-400 dark:hover:bg-primary-500 transition-all cursor-col-resize z-10"
                        onDragging={(active) => setIsDragging(active)}
                    />

                    {/* 右側のメインパネルもダークモード対応 */}
                    <Panel className="bg-white dark:bg-slate-900 p-10 text-slate-900 dark:text-slate-100 transition-colors duration-300">
                        <h1 className="text-2xl font-bold">メインコンテンツエリア</h1>
                        <p className="mt-2">右側のパネルです。</p>
                    </Panel>
                </PanelGroup>
            </div>
        );
    },
};

export const WithContentsTemplate: Story = {
    args: { themeColor: "primary", controlled: false, isDarkMode: false },
    render: (args) => {
        const [text, setText] = useState("");
        const [selectedlang, setSelectedLang] = useState("");
        const [selectedfm, setSelectedFm] = useState("");
        const [theme, setTheme] = useState("");

        const langOptions = ["TypeScript", "JavaScript", "Python", "-"];
        const fwOptions = ["React", "Angular", "Vue"];
        const themeOpts = ["明るい", "暗い", "いい感じ"];

        return (
            <div className="w-80 relative h-dvh">
                <Sidebar {...args} className="bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex flex-col w-full h-full">
                        <div className="flex justify-end p-4">
                            <button className="py-2 px-6 bg-sky-500 dark:bg-sky-600 rounded-full text-white text-sm font-bold hover:bg-sky-400 dark:hover:bg-sky-500 w-20 transition-colors">
                                決定
                            </button>
                        </div>
                        {/* 内部パネルのダークモード対応 */}
                        <div className="bg-white dark:bg-slate-800 mx-3 rounded-xl shadow-sm p-4 flex flex-col gap-2 transition-colors">
                            <div className="w-full">
                                <label className="text-xs ps-2 font-bold text-slate-500 dark:text-slate-400">
                                    言語
                                </label>
                                <SelectBox
                                    options={langOptions}
                                    value={selectedlang}
                                    onChange={(v) => setSelectedLang(v)}
                                />
                            </div>
                            <div className="w-full mt-2">
                                <label className="text-xs ps-2 font-bold text-slate-500 dark:text-slate-400">
                                    フレームワーク
                                </label>
                                <SelectBox options={fwOptions} value={selectedfm} onChange={(v) => setSelectedFm(v)} />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 mx-3 mt-3 rounded-xl shadow-sm p-4 flex flex-col gap-2 transition-colors">
                            <div className="w-full">
                                <label className="text-xs ps-2 font-bold text-slate-500 dark:text-slate-400">
                                    テーマ・雰囲気
                                </label>
                                <InputSelect
                                    options={themeOpts}
                                    value={theme}
                                    onChange={(e) => setTheme(e)}
                                    placeholder="雰囲気を入力または選択"
                                />
                            </div>
                        </div>
                        <div className="p-3 w-80 absolute bottom-0">
                            <ResizableTextarea value={text} onChange={(e) => setText(e.target.value)} />
                        </div>
                    </div>
                </Sidebar>
            </div>
        );
    },
};

export const WithLinkTemplate: Story = {
    args: { themeColor: "primary", controlled: false, isDarkMode: false },
    render: (args) => {
        type SidebarOption = {
            title: string;
            elements: string[];
        };

        const [current, setCurrent] = useState("便利ツール");
        const linkOptions: SidebarOption = {
            title: "便利ツール",
            elements: [
                "コードメーカー",
                "Gitテスト",
                "エンティティ作成ツール",
                "SQLメーカー",
                "コード匿名化ツール",
                "画像文字抽出ツール",
            ],
        };

        const style = (idx: number) => {
            const isActive = linkOptions.elements[idx] === current;
            return [
                "px-4 py-2 font-bold text-sm w-full text-left transition-all duration-200 cursor-pointer", // cursor-pointer追加
                isActive
                    ? // アクティブ時：背景白（ダーク時は濃いグレー）、文字色はテーマカラー系
                      "text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-800 rounded-full shadow"
                    : // 非アクティブ時：ホバー効果
                      "text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:rounded-full hover:shadow-sm",
            ].join(" ");
        };

        return (
            <div className="w-64 h-dvh">
                <Sidebar {...args} className="bg-slate-50 dark:bg-slate-900/50">
                    <ul className="space-y-1 p-3">
                        <li className="mb-2">
                            <button
                                className="text-base font-bold text-slate-900 dark:text-slate-100 px-4 py-2 w-full text-left"
                                onClick={() => setCurrent(linkOptions.elements[0])}
                            >
                                {linkOptions.title}
                            </button>
                        </li>
                        {linkOptions.elements.map((element, idx) => (
                            <li key={element}>
                                <button className={style(idx)} onClick={() => setCurrent(element)}>
                                    {linkOptions.elements[idx]}
                                </button>
                            </li>
                        ))}
                    </ul>
                </Sidebar>
            </div>
        );
    },
};
