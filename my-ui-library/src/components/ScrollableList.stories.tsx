import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { ScrollableList, type Option } from './ScrollableList';

const meta = {
    title: 'UI/ScrollableList',
    component: ScrollableList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        options: {control: 'object'},
        selected: {control: 'text'},
        handleChange: {
            action: 'changed',
            description: 'タブ変更時に呼び出されるコールバック関数'
        },
    },
} satisfies Meta<typeof ScrollableList>;

export default meta;
type Story = StoryObj<typeof ScrollableList>;

const shortOptions: Option[] = [
    { label: 'ホーム', value: 'home' },
    { label: 'プロフィール', value: 'profile' },
    { label: '設定', value: 'settings' },
    { label: 'ログアウト', value: 'logout' },
];

const defaultOptions: Option[] = [
  { label: 'ダッシュボード', value: 'dashboard' },
  { label: 'ユーザー管理', value: 'user-management' },
  { label: '商品リスト', value: 'product-list' },
  { label: '注文履歴', value: 'order-history' },
  { label: 'レポート', value: 'reports' },
  { label: 'アナリティクス', value: 'analytics' },
  { label: 'メッセージ', value: 'messages' },
  { label: '通知', value: 'notifications' },
  { label: 'ヘルプセンター', value: 'help-center' },
  { label: 'FAQ', value: 'faq' },
  { label: 'お問い合わせ', value: 'contact' },
  { label: 'プライバシーポリシー', value: 'privacy-policy' },
  { label: '利用規約', value: 'terms-of-service' },
  { label: 'サブスクリプション', value: 'subscription' },
  { label: '支払い履歴', value: 'payment-history' },
  { label: 'お気に入り', value: 'favorites' },
  { label: '最近見た商品', value: 'recently-viewed' },
  { label: 'ウィッシュリスト', value: 'wishlist' },
  { label: 'アカウント設定', value: 'account-settings' },
  { label: 'フィードバック', value: 'feedback' },
];

export const Default: Story = {
    args:{
        options: defaultOptions,
        selected: defaultOptions[0].value,
    },
    argTypes:{
        selected: {options: defaultOptions.map(opt => opt.value)},
    },
    render: (args) => {
        const [current, setCurrent] = useState(args.selected);
        useEffect(() => {
            setCurrent(args.selected);
        }, [args.selected]);

        const onChange = (val: string) => {
            args.handleChange(val);
            setCurrent(val);
        }

        return(
            <ScrollableList 
                {...args}
                selected={current}
                handleChange={onChange}
            />
        )
    }
}

export const ShortBersion: Story = {
    args:{
        options: shortOptions,
        selected: shortOptions[0].value,
    },
    argTypes:{
        selected: {options: shortOptions.map(opt => opt.value)},
    },
    render: (args) => {
        const [current, setCurrent] = useState(args.selected);
        useEffect(() => {
            setCurrent(args.selected);
        }, [args.selected]);

        const onChange = (val: string) => {
            args.handleChange(val);
            setCurrent(val);
        }

        return(
            <div className='w-80'>
                <ScrollableList 
                {...args}
                selected={current}
                handleChange={onChange}
            />
            </div>
        )
    }
}
