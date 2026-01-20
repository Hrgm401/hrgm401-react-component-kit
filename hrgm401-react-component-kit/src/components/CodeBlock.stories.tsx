import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@storybook/test';
import { CodeBlock } from './CodeBlock';

const meta = {
  title: 'UI/CodeBlock', // 指定されたタイトル
  component: CodeBlock,
  tags: ['autodocs'], // 自動ドキュメント生成
  parameters: {
    // Monaco Editorは重いので、表示時のレイアウト崩れを防ぐ設定
    layout: 'padded', 
  },
  // コンポーネントが h-full (親要素の高さ) に依存しているため、
  // Storybook上で高さを確保するためのラッパー（デコレーター）を設定します
  decorators: [
    (Story) => (
      <div className="h-[500px] w-full min-w-[600px] resize-y overflow-hidden border border-dashed border-gray-300 p-4">
        {/* ↑ 点線は「ここがコンテナの境界線」とわかるようにするための装飾です */}
        <Story />
      </div>
    ),
  ],
  // Propsのコントロール設定
  argTypes: {
    lang: {
      control: 'select',
      // 主要な言語を選択肢として提供（コンポーネント内のLANG_MAPに合わせる）
      options: ['ts', 'js', 'sql', 'python', 'html', 'css', 'json', 'bash'],
      description: 'シンタックスハイライトの言語',
    },
    isDarkMode: {
      control: 'boolean',
      description: 'ダークモードの切り替え',
    },
    readonly: {
      control: 'boolean',
      description: '編集不可モード',
    },
    // イベントハンドラはActionsパネルにログが出るようにする
    onChange: { table: { disable: true } }, 
  },
  // 全ストーリー共通のデフォルト値
  args: {
    onChange: fn(), // アクションのモック
    title: 'ExampleCode.ts',
    code: `const greet = (name: string) => {
  console.log("Hello, " + name);
};

greet("World");`,
    lang: 'ts',
    isDarkMode: true,
    readonly: false,
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. プレイグラウンド: 自由に触れる標準の状態
export const Playground: Story = {};

// 2. ライトモード: 明るいテーマの確認
export const LightMode: Story = {
  args: {
    isDarkMode: false,
    title: 'LightTheme.tsx',
  },
};

// 3. 読み取り専用: 編集できない状態の確認
// 実際の利用シーン（ドキュメント表示など）を想定
export const ReadOnly: Story = {
  args: {
    readonly: true,
    title: 'ReadOnlyConfig.json',
    lang: 'json',
    code: `{
  "appName": "MyApp",
  "version": "1.0.0",
  "features": {
    "darkMode": true
  }
}`,
  },
};

// 4. SQLの例: 別の言語でのハイライト確認
export const SQLQuery: Story = {
  args: {
    title: 'select_users.sql',
    lang: 'sql',
    code: `SELECT id, name, email
FROM users
WHERE status = 'active'
ORDER BY created_at DESC;`,
  },
};

// 5. 長文コード: スクロールバーの挙動確認（エッジケース）
export const LongContent: Story = {
  args: {
    title: 'LongScript.py',
    lang: 'py',
    code: Array(50).fill('print("This is a long line to test scrolling behavior in the editor component")').join('\n'),
  },
};