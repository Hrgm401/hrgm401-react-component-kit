import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ExplanatorySidebar } from './ExplanatorySidebar';

const meta = {
    title: 'UI/ExplanatorySidebar',
    component: ExplanatorySidebar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'サイドバーの開閉を制御',
        },
        onClose: {
            description: 'サイドバーを閉じる際に呼び出されるコールバック関数',
            action: 'closed',
        },
        title: {control: 'text'},
        children: {
            control: false,
            description: 'サイドバーに表示されるコンテンツ'
        },
    },
} satisfies Meta<typeof ExplanatorySidebar>;

export default meta;
type Story = StoryObj<typeof ExplanatorySidebar>;

export const OpenedState: Story = {
    args: {
        isOpen: true,
        title: 'ヘルプ',
        children: (
            <div className="space-y-4">
            <h3 className="text-lg font-semibold text-sky-400">セクション1</h3>
            <p>ここに説明文が入ります。コンポーネントの子要素として、自由にコンテンツを配置できます。</p>
            <h3 className="text-lg font-semibold text-sky-400">セクション2</h3>
            <p>リスト表示も可能です。</p>
            <ul className="list-disc list-inside">
            <li>項目A</li>
            <li>項目B</li>
            </ul>
        </div>
        ),
    },
};

export const Interactive: Story = {
    args: {
        title: '動作確認デモ',
        children: <p>このサイドバーはStorybook上で実際に開閉できます。</p>,
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);

        return(
            <>
                <div className="p-8">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        サイドバーを開く
                    </button>
                </div>
                <ExplanatorySidebar
                    {...args} // titleやchildrenなどのargsを渡す
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)} // 閉じるボタンで状態を更新
                />
            </>
        )
    }
}