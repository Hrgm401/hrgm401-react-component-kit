import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { SelectButton } from './SelectButton';
import { type Option } from '../types/Option';

const meta = {
    title: 'UI/SelectButton',
    component: SelectButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {control: 'text'},
        list: {control: 'object'},
        selectedVal: {control: 'text'},
        handleChange: {action: 'changed'},
    },
}satisfies Meta<typeof SelectButton>;

export default meta;
type Story = StoryObj<typeof SelectButton>;

const defaultOptions: Option[] = [
  { label: 'コーヒー', value: 'coffee' },
  { label: '紅茶', value: 'black_tea' },
  { label: '緑茶', value: 'green_tea' },
  { label: '水', value: 'water' },
  { label: 'オレンジジュース', value: 'orange_juice' },
  { label: 'りんごジュース', value: 'apple_juice' },
  { label: '牛乳', value: 'milk' },
  { label: 'コーラ', value: 'cola' },
];

export const Default: Story = {
    args: {
        name: "飲み物",
        list: defaultOptions,
        selectedVal: undefined,
    },
    argTypes: {
        selectedVal: {list: defaultOptions.map(opt => opt.value)},
    },
}

export const WithBackground: Story = {
    args: {
        name: "飲み物",
        list: defaultOptions,
        selectedVal: undefined,
    },
    argTypes: {
        selectedVal: {list: defaultOptions.map(opt => opt.value)},
    },
    render: (args) => {
        const [current, setCurrent] = useState(args.selectedVal);
        useEffect(() => {
            setCurrent(args.selectedVal);
        },[args.selectedVal])

        const onChange = (v: string) => {
            args.handleChange(v);
            setCurrent(v);
        };
        return(
            <div className='bg-sky-100 py-1 px-2 rounded-3xl'>
                <SelectButton
                    {...args}
                    selectedVal={current}
                    handleChange={onChange}
                />
            </div>
        )
    }
}