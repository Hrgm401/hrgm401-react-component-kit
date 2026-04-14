import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
    title: "UI/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        color: {
            control: "radio",
            options: ["primary", "secondary", "tertiary", "quaternary"],
        },
        disabled: {
            control: "boolean",
        },
        onClick: { action: "clicked" },
    },
    args: {
        children: "Button",
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのボタン (Primary)
export const Primary: Story = {
    args: {
        color: "primary",
    },
};

// Secondary カラー
export const Secondary: Story = {
    args: {
        color: "secondary",
    },
};

// Tertiary カラー
export const Tertiary: Story = {
    args: {
        color: "tertiary",
    },
};

// Quaternary カラー
export const Quaternary: Story = {
    args: {
        color: "quaternary",
    },
};

// 無効化状態
export const Disabled: Story = {
    args: {
        color: "primary",
        disabled: true,
        children: "Disabled Button",
    },
};

// 全カラーのバリエーション表示
export const AllColors: Story = {
    render: () => (
        <div className="flex gap-4">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="tertiary">Tertiary</Button>
            <Button color="quaternary">Quaternary</Button>
        </div>
    ),
};
