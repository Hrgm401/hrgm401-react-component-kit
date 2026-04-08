/**
 * @file src/components/CodeBlock.tsx
 * @description Monaco Editorを使用した編集可能なコードブロック
 */
import { forwardRef, useState, type ComponentProps } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import { cn } from "../utils/cn";
import { setupMonacoEnvironment } from "../utils/monaco-theme";
import { Button } from "./ui/Button/Button";
import type { ColorType } from "../utils/colorStyles";

const LANG_MAP: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    sh: "shell",
    sql: "sql",
    json: "json",
    md: "markdown",
    html: "html",
    css: "css",
    scss: "scss",
    py: "python",
    cs: "csharp",
    go: "go",
    java: "java",
    c: "c",
    cpp: "cpp",
    rs: "rust",
    php: "php",
    rb: "ruby",
    yaml: "yaml",
    yml: "yaml",
    xml: "xml",
    ini: "ini",
    dockerfile: "dockerfile",
    bat: "bat",
    diff: "diff",
};

type Props = Omit<ComponentProps<"div">, "onChange"> & {
    title: string;
    code: string;
    lang: string | null;
    onChange: (newCode: string) => void;
    isDarkMode?: boolean;
    readonly?: boolean;
    color?: string;
};

export const CodeBlock = forwardRef<HTMLDivElement, Props>(
    (
        {
            title,
            code,
            lang,
            onChange,
            isDarkMode = true,
            color = "primary",
            readonly = false,
            className,
            ...rest
        }: Props,
        ref,
    ) => {
        const [copied, setCopied] = useState(false);

        const monacoLang = lang && LANG_MAP[lang] ? LANG_MAP[lang] : lang || "plaintext";

        const handleEditorWillMount = (monaco: Monaco) => {
            setupMonacoEnvironment(monaco);
        };

        const handleCopy = () => {
            if (!code) return;
            navigator.clipboard.writeText(code).then(
                () => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                },
                (err) => {
                    console.error("Failed to copy: ", err);
                },
            );
        };

        return (
            <div
                ref={ref}
                {...rest}
                className={cn(
                    "rounded-lg overflow-hidden border w-full h-full flex flex-col",
                    isDarkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white",
                    className,
                )}
            >
                <div
                    className={`flex justify-between items-center px-4 py-2 border-b shrink-0 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                >
                    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{title}</p>
                    <Button
                        onClick={handleCopy}
                        disabled={!code}
                        className="py-1 px-3 text-xs"
                        color={color as ColorType}
                    >
                        {copied ? "Copied!" : "Copy"}
                    </Button>
                </div>
                <div className="flex-1 w-full min-h-0 relative">
                    <Editor
                        height="100%"
                        defaultLanguage={monacoLang}
                        path={title}
                        language={monacoLang}
                        value={code}
                        theme={isDarkMode ? "gumi-dark" : "gumi-light"}
                        onChange={(value) => onChange(value || "")}
                        beforeMount={handleEditorWillMount}
                        options={{
                            readOnly: readonly,
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            wordWrap: "on",
                            padding: { top: 16, bottom: 64 },
                            scrollbar: {
                                alwaysConsumeMouseWheel: false,
                            },
                        }}
                    />
                </div>
            </div>
        );
    },
);
