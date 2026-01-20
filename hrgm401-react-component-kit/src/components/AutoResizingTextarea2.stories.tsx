import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { AutoResizingTextarea2 } from './AutoResizingTextarea2';

const meta = {
    title: 'UI/AutoResizingTextarea2',
    component: AutoResizingTextarea2,
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
        onSend: {
            description: '送信ボタン押下時に呼出し',
            action: 'click'
        }
    },
} satisfies Meta<typeof AutoResizingTextarea2>;

export default meta;
type Story = StoryObj<typeof AutoResizingTextarea2>;

export const Default: Story = {
    args: {
        text: ""
    },render: (args) => {
        const [inputted, setInputted] = useState(args.text);
        const [send, setSend] = useState(false);

        useEffect(() => {
            setInputted(args.text);
        },[args.text])

        const handleChange = (val: string) => {
            args.onChange(val);
            setInputted(val);
        };

        return(
            <div className='flex justify-center m-10 flex-col'>
                <div className='flex items-end'>
                    <div className='w-[500px] p-4'>
                        <AutoResizingTextarea2
                            {...args}
                            text={inputted}
                            onChange={handleChange}
                            onSend={() => setSend(true)}
                        />
                    </div>
                </div>
                {send && (
                    <div className='w-80 h-10 bg-red-300/60 rounded-md py-2 px-4 text-red-400 text-border m-5 border-s-3 border-red-400'>送信ボタンが押下されました。</div>
                )}
            </div>
            
        )
    }
};