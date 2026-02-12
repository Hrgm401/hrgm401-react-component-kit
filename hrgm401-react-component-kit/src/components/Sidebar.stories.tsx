import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "./Sidebar";
import { ResizableTextarea } from "./ui/ResizableTextarea/ResizableTextarea";
import { InputSelect } from "./InputSelect";
import { SelectBox } from "./SelectBox";
import { useState, useRef } from "react";
import { pixelToPercent } from "../utils/pixelToPercent";

import {
    PanelGroup,
    Panel,
    PanelResizeHandle,
    ImperativePanelHandle,
} from "react-resizable-panels";

const meta = {
    title: "UI/Sidebar",
    component: Sidebar,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        children: { control: false },
        color: {
            control: { type: "color" },
            description: "デフォルトは薄いグレーです。",
        },
        controlled: { control: false },
        onToggle: { control: "boolean" },
    },
    decorators: [
        (Story) => (
            <div className="flex h-screen">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
    args: {
        controlled: false,
    },
    render: (args) => {
        return (
            <div className="w-80 h-dvh">
                <Sidebar {...args}>
                    <div className="w-72">
                        <div className="flex-grow overflow-y-auto mb-4">
                            {/* チャット履歴などの表示エリア */}
                            <p className="text-2xl font-bold text-sky-600 pl-8">
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
        controlled: true,
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
                        <Sidebar {...args} controlled={true} onToggle={handleToggle}>
                            <div className="p-4 w-64">
                                <h2 className="font-bold text-sky-600 mb-2">パネル連動モード</h2>
                                <p className="text-sm text-gray-600">
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
                        className="w-[2px] bg-slate-300 hover:w-[4px] hover:bg-sky-400 transition-all cursor-col-resize z-10"
                        onDragging={(active) => setIsDragging(active)}
                    />

                    <Panel className="bg-white p-10">
                        <h1 className="text-2xl font-bold">メインコンテンツエリア</h1>
                        <p>右側のパネルです。</p>
                    </Panel>
                </PanelGroup>
            </div>
        );
    },
};

export const WithContentsTemplate: Story = {
    args: { controlled: false },
    render: (args) => {
        const [text, setText] = useState("");
        const [selectedlang, setSelectedLang] = useState("");
        const [selectedfm, setSelectedFm] = useState("");
        const [theme, setTheme] = useState("");

        const langOptions: string[] = ["TypeScript", "JavaScript", "Python", "-"];
        const fwOptions: string[] = ["React", "Angular", "Vue"];
        const themeOpts: string[] = ["明るい", "暗い", "いい感じ"];

        return (
            <div className="w-80 relative h-dvh">
                <Sidebar {...args}>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-end">
                            <button className="me-4 mt-4 py-2 px-6 bg-sky-300 rounded-full text-white text-sm font-bold hover:bg-sky-400 w-20">
                                決定
                            </button>
                        </div>
                        <div className="bg-white m-3 rounded-xl inset-shadow-sm p-4 flex flex-col gap-2">
                            <div className="w-34">
                                <label className="text-xs ps-2 font-bold text-gray-500">言語</label>
                                <SelectBox
                                    options={langOptions}
                                    value={selectedlang}
                                    onChange={(e) => setSelectedLang(e)}
                                    placeholder="言語を選択"
                                />
                            </div>
                            <div className="w-42">
                                <label className="text-xs ps-2 font-bold text-gray-500">
                                    フレームワーク
                                </label>
                                <SelectBox
                                    options={fwOptions}
                                    value={selectedfm}
                                    onChange={(e) => setSelectedFm(e)}
                                    placeholder="フレームワークを選択"
                                />
                            </div>
                        </div>
                        <div className="bg-white mx-3 mt-1 rounded-xl inset-shadow-sm p-4 flex flex-col gap-2">
                            <div className="w-48">
                                <label className="text-xs ps-2 font-bold text-gray-500">
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
                        <div className="p-3 w-80 absolute bottom-px">
                            <ResizableTextarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                    </div>
                </Sidebar>
            </div>
        );
    },
};
export const WithLinkTemplate: Story = {
    args: {},
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
                "px-4 py-2 font-bold text-sm w-full block",
                isActive
                    ? "text-sky-500 bg-white rounded-full shadow"
                    : "text-zinc-500 hover:text-sky-500 hover:rounded-full hover:shadow",
            ].join(" ");
        };

        return (
            <div className="w-64 h-dvh">
                <Sidebar {...args}>
                    <ul className="space-y-3 p-3">
                        <button
                            className="text-base font-bold text-black"
                            onClick={() => setCurrent(linkOptions.elements[0])}
                        >
                            {linkOptions.title}
                        </button>
                        {linkOptions.elements.map((element, idx) => (
                            <li
                                key={element}
                                className={style(idx)}
                                onClick={() => setCurrent(element)}
                            >
                                {linkOptions.elements[idx]}
                            </li>
                        ))}
                    </ul>
                </Sidebar>
            </div>
        );
    },
};
