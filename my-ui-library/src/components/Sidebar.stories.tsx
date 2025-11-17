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
                <div className='w-72'>
                    <Story />
                </div>
                <main className="flex-grow p-8 pt-11">
                    <h1 className="text-2xl font-bold pb-2">メインコンテンツ</h1>
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
        <div className="">
            <div className="flex-grow overflow-y-auto mb-4">
                {/* チャット履歴などの表示エリア */}
                <p className="text-2xl font-bold text-sky-600 pl-8">サイドバーコンテンツ</p>
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
        const [theme, setTheme] = useState('');

        const langOptions: string[] = ['TypeScript', 'JavaScript'];
        const fwOptions: string[] = ['React', 'Angular', 'Vue'];
        const themeOpts: string[] = ['明るい', '暗い', 'いい感じ'];

        return (
            <Sidebar {...args}>
                <div className='flex flex-col'>
                    <div className='flex justify-end'>
                        <button className='me-4 mt-4 py-2 px-6 bg-sky-300 rounded-full text-white text-sm font-bold hover:bg-sky-400 w-20'>決定</button>
                    </div>
                    
                    <div className='bg-white m-3 rounded-xl inset-shadow-sm p-4 flex flex-col gap-2'>
                        <div className='w-48'>
                            <label className='text-xs ps-2 font-bold text-gray-500'>言語</label>
                            <InputSelect
                                options={langOptions}
                                value={selectedlang}
                                onChange={(e) => setSelectedLang(e)}
                                placeholder='言語を選択または入力'
                            />
                        </div>
                        <div className='w-34'>
                            <label className='text-xs ps-2 font-bold text-gray-500'>フレームワーク</label>
                            <InputSelect
                                options={fwOptions}
                                value={selectedfm}
                                onChange={(e) => setSelectedFm(e)}
                                placeholder='フレームワークを選択または入力'
                            />
                        </div>
                    </div>
                    <div className='bg-white mx-3 mt-1 rounded-xl inset-shadow-sm p-4 flex flex-col gap-2'>
                        <div className='w-48'>
                            <label className='text-xs ps-2 font-bold text-gray-500'>テーマ・雰囲気</label>
                            <InputSelect
                                options={fwOptions}
                                value={selectedfm}
                                onChange={(e) => setSelectedFm(e)}
                                placeholder='雰囲気を入力'
                            />
                        </div>
                    </div>
                    <div className='p-4 absolute bottom-0 left-0 w-72'>
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