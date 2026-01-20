import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
//import { action } from '@storybook/addon-actions';

import EditableTable from './EditableTable'; // コンポーネントのパスを適切に設定してください

// --- Storybookの基本設定 ---
const meta: Meta<typeof EditableTable> = {
  title: 'UI/EditableTable',
  component: EditableTable,
  tags: ['autodocs'],
  argTypes: {
    // StorybookのコントロールパネルでPropsを動的に変更できるように設定
    editable: { control: 'boolean' },
    color: {
      control: 'radio',
      options: ['default', 'gray'],
    },
    // itemsやfieldsなどは複雑なため、コントロールを無効化
    fields: { control: false },
    items: { control: false },
    rowKeyProp: { control: false },
    fieldRule: { control: false },
    itemRule: { control: false },
    handleClick: { control: false },
    handleDeleteClick: { control: false },
    handleChange: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- モックデータ & 型定義 ---
interface MockItem {
  id: number;
  name: string;
  role: number | null;
  age: number | null;
  score: number | null;
  workTime: number | null; // 分単位
  lastLogin: string | null;
  status: string;
}

const fields = [
  { field: 'id', label: 'ID' },
  { field: 'name', label: '名前' },
  { field: 'role', label: '役割' },
  { field: 'age', label: '年齢' },
  { field: 'score', label: 'スコア(小数)' },
  { field: 'workTime', label: '稼働時間' },
  { field: 'lastLogin', label: '最終ログイン' },
  { field: 'status', label: 'ステータス' },
];

const initialItems: MockItem[] = [
  { id: 1, name: '山田 太郎', role: 1, age: 32, score: 85.5, workTime: 480, lastLogin: new Date('2023-10-27T10:30:00').toISOString(), status: '有効' },
  { id: 2, name: '鈴木 花子', role: 2, age: 28, score: 92.0, workTime: 510, lastLogin: new Date('2023-10-27T11:00:00').toISOString(), status: '有効' },
  { id: 3, name: '佐藤 次郎', role: null, age: null, score: null, workTime: null, lastLogin: null, status: '無効' },
  { id: 4, name: '高橋 三郎', role: 3, age: 45, score: 78.5, workTime: 450, lastLogin: new Date('2023-10-26T18:00:00').toISOString(), status: '保留' },
];


// --- 各ストーリーの定義 ---

/**
 * ## 基本的なテーブル
 * `editable={false}`のデフォルト状態です。データは読み取り専用で表示されます。
 */
export const Default: Story = {
  args: {
    fields,
    items: initialItems,
    rowKeyProp: 'id',
    editable: false,
    color: 'default',
  },
};

/**
 * ## 編集可能なテーブル
 * `editable={true}`の状態です。テキストフィールドなどが編集可能になります。
 * 変更内容は **Actions** タブにログとして出力されます。
 */
export const Editable: Story = {
    // ReactのuseStateを使って、インタラクティブな変更をストーリーに反映させる
    render: (args) => {
        const [items, setItems] = useState(initialItems);
        const handleChange = (value: any, key: string, itemIdx: number) => {
            //action('handleChange')(value, key, itemIdx); // StorybookのActionにログを出力
            const newItems = [...items];
            (newItems[itemIdx] as any)[key] = value;
            setItems(newItems);
        };
        return <EditableTable {...args} items={items} handleChange={handleChange} />;
    },
    args: {
        ...Default.args,
        editable: true,
        itemRule: {
            inputRules: ['name'],
            numInputRules: ['age'],
            floatInputRules: ['score'],
        }
    },
};

/**
 * ## グレーテーマ
 * `color="gray"`を指定したテーブルです。ヘッダーの背景色などが変わります。
 */
export const GrayTheme: Story = {
  args: {
    ...Default.args,
    color: 'gray',
  },
};

/**
 * ## 全機能を使った例
 * `fieldRule`と`itemRule`を最大限に活用した複雑なテーブルです。
 * - **列の非表示**: ID列を非表示
 * - **入力**: 名前(text), 年齢(integer), スコア(float)
 * - **時間入力**: 稼働時間
 * - **セレクトボックス**: 役割
 * - **クリック/日付**: 最終ログイン (クリックでアクション、値があれば削除ボタン表示)
 * - **条件付き色付け**: ステータス列の背景色を変更
 */
export const FullFeatured: Story = {
    render: (args) => {
        const [items, setItems] = useState(initialItems);
        
        const handleChange = (value: any, key: string, itemIdx: number) => {
            //action('handleChange')(value, key, itemIdx);
            const newItems = [...items];
            (newItems[itemIdx] as any)[key] = value;
            setItems(newItems);
        };
        
        const handleClick = (key: string, itemIdx: number) => {
            //action('handleClick')(key, itemIdx);
            // 例: クリックで現在日時をセット
            const newItems = [...items];
            (newItems[itemIdx] as any)[key] = new Date().toISOString();
            setItems(newItems);
        };

        const handleDeleteClick = (key: string, itemIdx: number) => {
            //action('handleDeleteClick')(key, itemIdx);
            // 例: 削除ボタンクリックで値をnullにする
            const newItems = [...items];
            (newItems[itemIdx] as any)[key] = null;
            setItems(newItems);
        };

        return (
            <EditableTable 
                {...args} 
                items={items} 
                handleChange={handleChange}
                handleClick={handleClick}
                handleDeleteClick={handleDeleteClick}
            />
        );
    },
    args: {
        fields,
        items: initialItems,
        rowKeyProp: 'id',
        editable: true,
        fieldRule: {
            displayRules: ['id'], // ID列を非表示
        },
        itemRule: {
            inputRules: ['name'],
            numInputRules: ['age'],
            floatInputRules: ['score'],
            timeRules: ['workTime'],
            selectRules: [
                {
                    role: [
                        { field: 1, label: '管理者' },
                        { field: 2, label: '編集者' },
                        { field: 3, label: '閲覧者' },
                    ],
                },
            ],
            clickRules: ['lastLogin'],
            colorRules: [
                { status: '#fffacd' }, // '有効'の背景色 (例)
                // itemの値に応じて動的に色を変える場合は、コンポーネント側での実装が必要
            ],
        },
    },
};

/**
 * ## データが単一オブジェクトの場合
 * `items` propに配列ではなく単一のオブジェクトを渡した場合の表示です。
 */
export const SingleItem: Story = {
  args: {
    ...Default.args,
    items: initialItems[0], // 配列の最初の要素だけを渡す
  },
};

/**
 * ## ヘッダーテキストが長い場合
 * ヘッダーのラベルが長く、複数行になる場合のレイアウト崩れを防ぐロジックの動作を確認します。
 */
export const LongHeaderText: Story = {
    args: {
        ...Default.args,
        fields: [
            { field: 'id', label: 'ユニーク識別子 (ID)' },
            { field: 'name', label: 'ユーザーのフルネーム' },
            { field: 'role', label: '権限と役割' },
            { field: 'age', label: '年齢' },
            { field: 'score', label: 'パフォーマンススコア' },
            { field: 'workTime', label: '月間総稼働時間' },
            { field: 'lastLogin', label: '最終ログイン日時' },
            { field: 'status', label: 'アカウントステータス' },
        ],
    },
};