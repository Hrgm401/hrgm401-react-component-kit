/**
 * @file src/components/CodeBlock.tsx
 * @description Monaco Editorを使用した編集可能なコードブロック
 */
import { useState } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";

const LANG_MAP: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
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
}


type Props = {
  title: string;
  code: string;
  lang: string | null;
  onChange: (newCode: string) => void;
  isDarkMode?: boolean;
  readonly?: boolean;
};

export const CodeBlock = ({ title, code, lang, onChange, isDarkMode = true, readonly = false }: Props) => {
  const [copied, setCopied] = useState(false);

  const monacoLang = lang && LANG_MAP[lang] ? LANG_MAP[lang] : lang || "plaintext";

  const handleEditorWillMount = (monaco: Monaco) => {
    //dark theme
    monaco.editor.defineTheme('gumi-dark', {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6B7280" },
        { token: "keyword", foreground: "38BDF8" },

        { token: 'string', foreground: 'CE9178' },

        { token: "type", foreground: "4EC9B0" },
        { token: "class", foreground: "4EC9B0" },
        { token: "interface", foreground: "4EC9B0" },
        { token: "struct", foreground: "4EC9B0" },
        { token: "namespace", foreground: "4EC9B0" },

        { token: "function", foreground: "DCDCAA" },
        { token: "method", foreground: "DCDCAA" },

        { token: "tag", foreground: "569CD6" },
        { token: "attribute.name", foreground: "9CDCFE" },
        { token: "metatag", foreground: "808080" },

        { token: "number", foreground: "B5CEA8" },
        { token: "delimiter", foreground: "E5E7EB" },

        { token: "variable", foreground: "9CDCFE" },
        { token: "parameter", foreground: "9CDCFE" },
        { token: "property", foreground: "9CDCFE" },

        { token: "string.sql", foreground: "CE9178" },
        { token: "predefined.sql", foreground: "DCDCAA" },
        { token: "function.sql", foreground: "DCDCAA" },
      ],
      colors: {
        "editor.background": "#111827",
        "editor.lineHighlightBackground": "#00000000",
        "editor.lineHighlightBorder": "#1f2937",
        'editor.foreground': '#accbe0ff',
      },
    });

    //light
    monaco.editor.defineTheme("gumi-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "64748B" },
        { token: "keyword", foreground: "0284C7" },

        { token: 'string', foreground: 'B91C1C' },

        { token: "type", foreground: "0F766E" },
        { token: "class", foreground: "0F766E" },
        { token: "interface", foreground: "0F766E" },
        { token: "function", foreground: "B45309" },
        { token: "method", foreground: "B45309" },

        { token: "number", foreground: "15803D" },
        { token: "variable", foreground: "334155" },
        { token: "parameter", foreground: "334155" },
        { token: "property", foreground: "334155" },
        { token: "delimiter", foreground: "94A3B8" },
        { token: "delimiter.html", foreground: "334155" },
        { token: "delimiter.xml", foreground: "334155" },

        { token: "tag", foreground: "0284C7" },
        { token: "metatag", foreground: "0284C7" },
        { token: "attribute.name", foreground: "B91C1C" },
      ],
      colors: {
        "editor.background": "#f8fafc",
        "editor.lineHighlightBackground": "#00000000",
        "editor.lineHighlightBorder": "#e8f2ffff",
        'editorLineNumber.foreground': "#c6c9cc",
      },
    });
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
      }
    );
  };

  return (
    <div className={`rounded-lg my-4 overflow-hidden border w-full h-full ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
      <div className={`flex justify-between items-center px-4 py-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{title}</p>
          <button
            onClick={handleCopy}
            className="bg-sky-600 hover:bg-sky-700 disabled:bg-gray-500 text-white text-xs font-bold py-1 px-3 rounded-md transition-colors"
            disabled={!code}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
      </div>
      <div className="h-full w-hull">
        <Editor
          height="100%"
          defaultLanguage={monacoLang}
          language={monacoLang}
          value={code}
          theme={isDarkMode ? "gumi-dark" : "gumi-light"}
          onChange={(value) => onChange(value || "")}
          beforeMount={handleEditorWillMount}
          options={{
            readOnly: readonly,
            minimap: {enabled: false},
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            padding: {top: 16, bottom: 16},
          }}
        />
      </div>
    </div>
  );
};