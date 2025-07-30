import type { Meta, StoryObj } from '@storybook/react-vite';
import { DragFileSpace } from './DragFileSpace';

const meta = {
    title: 'UI/DragFileSpace',
    component: DragFileSpace,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        handleFileChange: {
            description: 'ファイルが選択/ドロップされた際に呼び出されるコールバック関数',
            action: 'file-dropped'
        },
    },
} satisfies Meta<typeof DragFileSpace>;

export default meta;
type Story = StoryObj<typeof DragFileSpace>;

export const Default: Story = {

};