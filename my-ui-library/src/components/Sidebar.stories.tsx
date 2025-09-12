import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';
import { AutoResizingTextarea } from './AutoResizingTextarea';
import { InputSelect } from './InputSelect';
import { useState } from 'react';

const meta = {
    title: 'UI/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        children: { control: false }
    },
    decorators: [
        (Story) => (
            <div className='flex h-screen'>
                {/* Story() を呼び出すと、argsが適用されたSidebarが描画される */}
                <Story />
                <main className="flex-grow p-8">
                    <h1 className="text-2xl font-bold">メインコンテンツ</h1>
                    <p>ここに内容が入ります。</p>
                </main>
            </div>
        ),
    ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
    args: {
        children: (
        <div className="flex flex-col h-full p-2">
            <div className="flex-grow overflow-y-auto mb-4">
                {/* チャット履歴などの表示エリア */}
                <p className="text-sm text-gray-600 pl-3">サイドバーコンテンツが入ります。</p>
            </div>
        </div>
        ),
    },
};

export const WithContentsTemplate: Story = {
    args: {},
    render: (args) => {
        const [text, setText] = useState("");
        const [selectedlang, setSelectedLang] = useState('');
        const [selectedfm, setSelectedFm] = useState('');

        const langOptions: string[] = ['TypeScript', 'JavaScript'];
        const fwOptions: string[] = ['React', 'Angular', 'Vue'];

        return (
            <Sidebar {...args}>
                <div>
                    <button className='ms-4 mt-4 py-2 px-3 bg-sky-300 rounded-xl text-white text-sm font-bold hover:bg-sky-400'>コード作成</button>
                    <div className='bg-white m-3 rounded-xl inset-shadow-sm p-4'>
                        <label className='text-xs ps-2 font-bold text-sky-400'>言語</label>
                        <InputSelect
                        options={langOptions}
                        value={selectedlang}
                        onChange={(e) => setSelectedLang(e)}
                        placeholder='言語を選択または入力'
                        />
                        <label className='text-xs ps-2 font-bold text-sky-400'>フレームワーク</label>
                        <InputSelect
                        options={fwOptions}
                        value={selectedfm}
                        onChange={(e) => setSelectedFm(e)}
                        placeholder='フレームワークを選択または入力'
                        />
                    </div>
                    <div className='p-4 absolute bottom-0 left-0'>
                        <AutoResizingTextarea
                            text={text}
                            onChange={(e) => setText(e)}
                        />
                    </div>
                </div>
            </Sidebar>
        )
    }
}
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
            elements: ["コードメーカー", "Gitテスト", "エンティティ作成ツール", "SQLメーカー", "コード匿名化ツール", "画像文字抽出ツール"],
        }

        const style = (idx: number) => {
            const isActive = linkOptions.elements[idx] === current;
            return [
                'px-4 py-2 font-bold text-sm w-full block',
                isActive
                    ? 'text-sky-500 bg-white rounded-full shadow'
                    : 'text-zinc-500 hover:text-sky-500 hover:rounded-full hover:shadow',
            ].join(' ');
        }

        return (
            <Sidebar {...args}>
                <ul className="space-y-3 p-3">
                    <button className="text-base font-bold text-black" onClick={() => setCurrent(linkOptions.elements[0])}>{linkOptions.title}</button>
                    {linkOptions.elements.map((element, idx) => (
                        <li key={element} className={style(idx)}  onClick={() => setCurrent(element)}>{linkOptions.elements[idx]}</li>
                    ))}
                </ul>
            </Sidebar>
        )
    }
}