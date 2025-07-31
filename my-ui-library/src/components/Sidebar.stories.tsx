import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';

const meta = {
    title: 'UI/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {control: 'text'}
    },
    decorators: [
        (Story) => (
            <div className='flex'>
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
        children: 'ボタンのテキスト',
    },
};