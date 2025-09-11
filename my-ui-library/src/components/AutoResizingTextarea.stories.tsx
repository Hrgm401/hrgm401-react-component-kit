import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { AutoResizingTextarea } from './AutoResizingTextarea';

const meta = {
    title: 'UI/AutoResizingTextarea',
    component: AutoResizingTextarea,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        text: {control: "text"},
        onChange: {
            description: '入力値変更時に呼出し',
            action: 'changed'
        },
    },
} satisfies Meta<typeof AutoResizingTextarea>;

export default meta;
type Story = StoryObj<typeof AutoResizingTextarea>;

export const Default: Story = {
    args: {
        text: ""
    },render: (args) => {
        const [inputted, setInputted] = useState(args.text);
        useEffect(() => {
            setInputted(args.text);
        },[args.text])

        const handleChange = (val: string) => {
            args.onChange(val);
            setInputted(val);
        };

        return(
            <div className='flex justify-center mt-20'>
                <div className='flex items-end'>
                    <div className='w-[1000px] p-4'>
                        <AutoResizingTextarea
                            {...args}
                            text={inputted}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            
        )
    }
};