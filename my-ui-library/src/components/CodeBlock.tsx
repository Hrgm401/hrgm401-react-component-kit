/**
 * @file src/components/CodeBlock.tsx
 * @description コードを表示するコンポーネント。ファイル名をタイトルとしてつけられます
 */
import { useState } from "react";

type Props = {
  title: string;
  code: string;
};

export const CodeBlock = ({ title, code }: Props) => {
  const [copied, setCopied] = useState(false);

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
    <div className="bg-gray-800 text-white rounded-lg my-4 relative font-mono">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
          <p className="text-sm text-gray-300">{title}</p>
          <button
            onClick={handleCopy}
            className="bg-sky-600 hover:bg-sky-700 disabled:bg-gray-500 text-white text-xs font-bold py-1 px-3 rounded-md transition-colors"
            disabled={!code}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
      </div>
      <pre className="p-4 text-sm whitespace-pre-wrap break-all overflow-x-auto">
        <code>{code || "// Enter table and column information to generate code."}</code>
      </pre>
    </div>
  );
};