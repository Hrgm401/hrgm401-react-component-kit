/**
 * @file src/components/ui/NomalTable.stories.tsx
 * @description NomalTableコンポーネントのStorybookファイル
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NomalTable } from './NomalTable';

// Storybookのメタデータを定義
const meta: Meta<typeof NomalTable> = {
  title: 'UI/NomalTable',
  component: NomalTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    datas: {
      control: 'object',
      description: 'テーブルに表示するデータの配列です。',
    },
    colName: {
      control: 'object',
      description: 'テーブルのヘッダー情報です。`label`がデータキー、`value`が表示名に対応します。',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- モックデータ ---

// 基本的なストーリーで使用するヘッダー定義
const defaultColName = [
  { label: 'id', value: 'ID' },
  { label: 'name', value: '名前' },
  { label: 'email', value: 'メールアドレス' },
];

// 基本的なストーリーで使用するデータ
const defaultDatas = [
  { id: 1, name: '山田 太郎', email: 'taro.yamada@example.com' },
  { id: 2, name: '佐藤 花子', email: 'hanako.sato@example.com' },
  { id: 3, name: '鈴木 一郎', email: 'ichiro.suzuki@example.com' },
  { id: 4, name: '高橋 四郎', email: 'shiro.takahashi@example.com' },
];

// --- ストーリー ---

/**
 * ### 基本的なテーブル
 * データが渡された場合の標準的な表示です。
 */
export const Primary: Story = {
  args: {
    datas: defaultDatas,
    colName: defaultColName,
  },
};

/**
 * ### データが空のテーブル
 * `datas` プロパティに空の配列を渡した場合の表示です。ヘッダーのみが表示されます。
 */
export const Empty: Story = {
  args: {
    datas: [],
    colName: defaultColName,
  },
};

/**
 * ### セルにReactノードを含むテーブル
 * `datas` の値として文字列や数値だけでなく、Reactノード（コンポーネントやJSX）を渡すことも可能です。
 * この例では、ステータスを色付きの `<span>` 要素で表現しています。
 */
export const WithReactNode: Story = {
  args: {
    colName: [
      { label: 'id', value: 'ID' },
      { label: 'task', value: 'タスク' },
      { label: 'status', value: 'ステータス' },
    ],
    datas: [
      {
        id: 'TASK-001',
        task: '新しいUIデザインを作成する',
        status: (
          <span style={{ color: 'white', backgroundColor: 'royalblue', padding: '2px 8px', borderRadius: '12px' }}>
            進行中
          </span>
        ),
      },
      {
        id: 'TASK-002',
        task: 'APIエンドポイントのテスト',
        status: (
          <span style={{ color: 'white', backgroundColor: 'mediumseagreen', padding: '2px 8px', borderRadius: '12px' }}>
            完了
          </span>
        ),
      },
      {
        id: 'TASK-003',
        task: 'ドキュメントの更新',
        status: (
          <span style={{ color: 'white', backgroundColor: 'crimson', padding: '2px 8px', borderRadius: '12px' }}>
            保留
          </span>
        ),
      },
    ],
  },
};