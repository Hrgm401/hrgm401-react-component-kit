import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { SelectBox } from './SelectBox';

const meta = {
    title: 'UI/SelectBox',
    component: SelectBox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        options: {control: 'object'},
        value: {
            control: 'select',
            description: '現在選択中の選択肢名',
        },
        onChange: {
            action: 'changed',
            description: '選択肢変更時に呼び出されるコールバック関数',
        },
        placeholder: {control: 'text'}
    },
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof SelectBox>;

const defaultOptions: string[] = ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift'];

export const Default: Story = {
    args: {
        options: defaultOptions,
        value: "",
        placeholder: '言語を入力、または選択'
    },
    argTypes: {
        value: { options: defaultOptions.map(opt => opt) },
    },
    render: (args) => {
        const [current, setCurrent] = useState(args.value);
        useEffect(() => {
            setCurrent(args.value);
        }, [args.value]);

        const handleChange = (val: string) => {
            args.onChange(val);
            setCurrent(val);
        };

        return (
            <div  className='w-[219px]'>
                <SelectBox
                {...args}
                value={current}
                onChange={handleChange}
            />
            </div>
            
        )
    }
}