/**
 * @file src/components/ui/TabWithLine.stories.tsx
 * @description TabWithLineコンポーネントのStorybookファイル
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabWithLine } from './TabWithLine';
import { useState } from 'react';
//import { action } from '@storybook/addon-actions';

// Storybookのメタデータを定義
const meta: Meta<typeof TabWithLine> = {
  title: 'UI/TabWithLine',
  component: TabWithLine,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  // propsの情報をStorybookのUIに表示
  argTypes: {
    options: {
      control: 'object',
      description: 'タブの選択肢の配列です。',
    },
    selected: {
      control: 'text',
      description: '選択されているタブのvalueです。',
    },
    handleChange: {
      action: 'handleChange',
      description: 'タブがクリックされたときに呼ばれるコールバック関数です。',
    },
    handleDelete: {
      action: 'handleDelete',
      description: '削除ボタンがクリックされたときに呼ばれるコールバック関数です。このpropを渡さないと削除ボタンは表示されません。',
    },
    unqUi: {
      control: 'text',
      description: 'コンポーネント内で使用するユニークなIDです。',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- モックデータ ---
const sampleOptions = [
  { label: 'ダッシュボード', value: 'dashboard' },
  { label: '設定', value: 'settings' },
  { label: 'プロフィール', value: 'profile' },
  { label: '通知一覧', value: 'notifications' },
];

// --- ストーリー ---

/**
 * ### 基本的なタブ
 * 削除機能なしの標準的な表示です。タブをクリックすると選択状態が切り替わります。
 */
export const Default: Story = {
  render: (args) => {
    // Story内で状態を管理し、インタラクティブにする
    const [selected, setSelected] = useState(args.options[0]?.value || '');

    const handleTabChange = (value: string) => {
      setSelected(value);
      // StorybookのActionsパネルにも出力する
      args.handleChange(value);
    };

    return (
      <TabWithLine
        {...args}
        selected={selected}
        handleChange={handleTabChange}
        // handleDeleteは渡さない
        handleDelete={undefined}
      />
    );
  },
  args: {
    options: sampleOptions,
    unqUi: 'tab-btn-line',
  },
};

/**
 * ### 削除可能なタブ
 * `handleDelete` propを渡した場合の表示です。タブにマウスホバーすると削除ボタン（✕）が表示されます。
 * 実際に削除ボタンをクリックすると、タブがリストから削除されます。
 */
export const Deletable: Story = {
  render: (args) => {
    const [currentOptions, setCurrentOptions] = useState(args.options);
    const [selected, setSelected] = useState(args.options[0]?.value || '');

    const handleTabChange = (value: string) => {
      setSelected(value);
      args.handleChange(value);
    };

    const handleTabDelete = (value: string) => {
      const newOptions = currentOptions.filter((opt) => opt.value !== value);
      setCurrentOptions(newOptions);
      args.handleDelete(value);

      // もし選択中のタブを削除したら、先頭のタブを選択状態にする
      if (selected === value) {
        setSelected(newOptions[0]?.value || '');
      }
    };

    return (
      <TabWithLine
        {...args}
        options={currentOptions}
        selected={selected}
        handleChange={handleTabChange}
        handleDelete={handleTabDelete}
      />
    );
  },
  args: {
    options: sampleOptions,
    unqUi: 'tab-btn-line',
  },
};

/**
 * ### タブが多い場合
 * タブがコンテナの幅を超えた場合の表示です。コンポーネント自体は横スクロールのスタイルを持っていませんが、
 * `flex-nowrap`と`overflow-hidden`により、はみ出した部分は表示されなくなります。
 * （親要素でスクロールコンテナを実装する必要があります）
 */
export const ManyTabs: Story = {
  ...Deletable, // Deletableストーリーのインタラクティブなロジックを再利用
  args: {
    options: Array.from({ length: 15 }, (_, i) => ({
      label: `項目 ${i + 1}`,
      value: `item${i + 1}`,
    })),
    unqUi: 'tab-btn-line',
  },
};