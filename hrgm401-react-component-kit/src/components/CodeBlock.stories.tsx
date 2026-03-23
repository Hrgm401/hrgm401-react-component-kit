import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "@storybook/test";
import { useState, useEffect } from "react";
import { CodeBlock } from "./CodeBlock";

const meta = {
    title: "UI/CodeBlock",
    component: CodeBlock,
    tags: ["autodocs"],
    parameters: {
        // Monaco Editorは重いので、表示時のレイアウト崩れを防ぐ設定
        layout: "padded",
    },
    // コンポーネントが h-full (親要素の高さ) に依存しているため、
    // Storybook上で高さを確保するためのラッパー（デコレーター）を設定
    decorators: [
        (Story) => (
            <div className="h-[500px] w-full min-w-[600px] resize-y overflow-hidden border border-dashed border-gray-300 p-4">
                <Story />
            </div>
        ),
    ],
    args: {
        onChange: fn(),
    },
    // Propsのコントロール設定
    argTypes: {
        lang: {
            control: "select",
            options: ["ts", "tsx", "js", "jsx", "sql", "python", "html", "css", "json", "bash"],
            description: "シンタックスハイライトの言語を指定します。",
        },
        isDarkMode: {
            control: "boolean",
            description: "ダークモードの切り替えを行います。",
        },
        readonly: {
            control: "boolean",
            description: "編集不可モード（読み取り専用）にします。",
        },
        onChange: { table: { disable: true } },
    },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 言語ごとの最小構成サンプルコードマップ
 * Storybook上で言語を切り替えた際、それぞれの言語に応じたコードがセットされます。
 */
const SAMPLE_CODES: Record<string, string> = {
    ts: `// TypeScript Sample\ninterface User {\n  id: number;\n  name: string;\n}\n\nconst greet = (user: User): string => {\n  return \`Hello, \${user.name}!\`;\n};`,
    tsx: `import React, { useState } from "react";\n\ninterface User {\n  id: number;\n  name: string;\n  isActive: boolean;\n}\n\nexport const UserProfile = ({ user }: { user: User }) => {\n  const [likes, setLikes] = useState(0);\n\n  if (!user.isActive) {\n    return <div className="text-red-500">User is inactive</div>;\n  }\n\n  return (\n    <div className="profile-card">\n      <h2>{user.name}</h2>\n      <button onClick={() => setLikes(p => p + 1)}>Like {likes}</button>\n    </div>\n  );\n};`,
    js: `// JavaScript Sample\nfunction calculateTotal(price, tax) {\n  const total = price * (1 + tax);\n  console.log("Total:", total);\n  return total;\n}`,
    jsx: `import React from "react";\n\nconst Banner = ({ message }) => {\n  return (\n    <div className="bg-blue-500 text-white p-2">\n      <strong>Alert:</strong> {message}\n    </div>\n  );\n};\nexport default Banner;`,
    sql: `-- SQL Sample\nSELECT u.id, u.name, COUNT(o.id) as order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE u.status = 'active'\nGROUP BY u.id\nORDER BY order_count DESC;`,
    python: `# Python Sample\ndef fetch_data(url: str):\n    """Fetch data from API"""\n    import requests\n    response = requests.get(url)\n    if response.status_code == 200:\n        return response.json()\n    else:\n        raise Exception("Failed to fetch")`,
    html: `<!-- HTML Sample -->\n<!DOCTYPE html>\n<html lang="ja">\n<head>\n  <meta charset="UTF-8">\n  <title>Document</title>\n</head>\n<body>\n  <h1 id="main-title">Hello World</h1>\n  <script src="app.js"></script>\n</body>\n</html>`,
    css: `/* CSS Sample */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  background-color: #f8fafc;\n}\n\n.container > p {\n  color: #334155;\n  font-weight: bold;\n}`,
    json: `{\n  "project": "UI Kit",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  },\n  "isPublished": false\n}`,
    bash: `#!/bin/bash\n# Bash Sample\n\necho "Starting deployment..."\n\nif [ -d "./build" ]; then\n  rm -rf ./build\nfi\n\nnpm run build\necho "Deployment complete!"`,
};

/**
 * Storybook上でフックルールエラーを防ぎつつ、言語切り替えでサンプルコードを入れ替える
 * プレイグラウンド専用のラッパーコンポーネントです。
 */
const PlaygroundRender = (args: React.ComponentProps<typeof CodeBlock>) => {
    // args.lang が undefined の場合を考慮して安全に文字列として取得
    const targetLang = typeof args.lang === "string" ? args.lang : "tsx";

    const extension = targetLang === "python" ? "py" : targetLang === "bash" ? "sh" : targetLang;

    // ユーザーが入力を編集できるようにStateを持たせる
    const [title, setTitle] = useState(args.title ?? "");
    const [code, setCode] = useState(args.code || SAMPLE_CODES[targetLang] || "");

    // StorybookのControls（langプロパティ）が切り替わったときに実行される処理
    // 新しい言語のサンプルコードに自動で置き換え
    useEffect(() => {
        if (SAMPLE_CODES[targetLang]) {
            setCode(SAMPLE_CODES[targetLang]);
            setTitle(`Example.${extension}`);
        }
    }, [targetLang]);

    useEffect(() => {
        if (args.code) {
            setCode(args.code);
        }
    }, [args.code]);

    useEffect(() => {
        if (args.title) {
            setTitle(args.title);
        }
    }, [args.title]);

    return <CodeBlock {...args} title={title} code={code} onChange={setCode} />;
};

/**
 * #### プレイグラウンド
 * 自由にコードを選択・編集でき、言語などを変更してハイライトの挙動を確認できるストーリーです。
 * 内部でStateを持っているため、実際に文字を入力して動作を確認できます。
 * 言語（lang）コントロールを変更すると、自動的にその言語のサンプルコードに切り替わります（そのまま編集も可能です）。
 */
export const Playground: Story = {
    args: {
        title: "Example.tsx",
        lang: "tsx",
        isDarkMode: true,
        readonly: false,
        code: SAMPLE_CODES["tsx"],
    },
    render: PlaygroundRender,
};

/**
 * #### ライトモード
 * \`isDarkMode\` プロパティを \`false\` にすることで、明るいテーマになります。
 */
export const LightMode: Story = {
    args: {
        ...Playground.args,
        title: "LightMode.tsx",
        isDarkMode: false,
    },
};

/**
 * #### 読み取り専用
 * \`readonly\` プロパティを \`true\` にすることで、編集不可のコードブロックになります。
 * ドキュメントやブログ記事でのスニペット表示などに適しています。
 */
export const ReadOnly: Story = {
    args: {
        title: "config.json",
        lang: "json",
        isDarkMode: true,
        readonly: true,
        code: `{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true
  }
}`,
    },
};
/**
 * #### 長文コード
 * スクロールバーの挙動確認（エッジケース）
 */
export const LongContent: Story = {
    args: {
        title: "LongScript.py",
        lang: "py",
        code: Array(50)
            .fill('print("This is a long line to test scrolling behavior in the editor component")')
            .join("\n"),
    },
};
