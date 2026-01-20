import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { IconTabs, type TabOption } from './IconTabs';

import {
    Edit3, FileText, Play,
    BrainCircuit, Code, Rocket, BarChart3
} from 'lucide-react';

const meta = {
    title: 'UI/IconTabs',
    component: IconTabs,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'select',
            description: '現在選択中のタブid',
        },
        onChange: {
            action: 'changed',
            description: 'タブ変更時に呼び出されるコールバック関数',
        },
        color: {
            options: ['dark', 'light'],
            control: 'radio',
        },
        options: {
            control: 'object',
            description: 'タブとして表示するオプション配列',
        },
    },
} satisfies Meta<typeof IconTabs>;

export default meta;
type Story = StoryObj<typeof IconTabs>;

const defaultOptions: TabOption[] = [
  { id: 'form', label: 'フォーム', icon: <Edit3 /> },
  { id: 'csv', label: 'CSV', icon: <FileText /> },
  { id: 'run', label: '実行', icon: <Play /> },
];

const thematicOptions: TabOption[] = [
  { id: 'plan', label: '計画', icon: <BrainCircuit /> },
  { id: 'develop', label: '開発', icon: <Code /> },
  { id: 'launch', label: 'ローンチ', icon: <Rocket /> },
  { id: 'analyze', label: '分析', icon: <BarChart3 /> },
];

export const Default: Story = {
    args: {
        options: defaultOptions,
        value: defaultOptions[0].id,
    },
    argTypes: {
        value: {
            options: defaultOptions.map(opt => opt.id),
        }
    },
    render: (args) => {
        const [currentTab, setCurrentTab] = useState(args.value);
        useEffect(() => {
            setCurrentTab(args.value);
        }, [args.value]);

        const handleChange = (id: string) => {
            args.onChange(id);
            setCurrentTab(id);
        }

        return (
            <div className={`${args.color && args.color === 'light' ? 'p-6 rounded-lg shadow-lg' : "bg-gray-800 p-6 rounded-lg shadow-lg" }`}>
                <IconTabs
                    {...args}
                    value={currentTab}
                    onChange={handleChange}
                />
            </div>
        )
    }
};

export const ThematicIcons: Story = {
  args: {
    options: thematicOptions,
    value: thematicOptions[0].id,
    color: 'light',
  },
  argTypes: {
    value: {
      options: thematicOptions.map(opt => opt.id),
    }
  },

  render: (args) => {
    const [currentTab, setCurrentTab] = useState(args.value);

    const handleChange = (id: string) => {
      args.onChange(id);
      setCurrentTab(id);
    };

    return (
        <div className={`${args.color === 'light' ? 'p-6 rounded-lg shadow-lg' : "bg-gray-800 p-6 rounded-lg shadow-lg"}`}>
            <IconTabs
                {...args}
                value={currentTab}
                onChange={handleChange}
            />
        </div>
    );
  },
};