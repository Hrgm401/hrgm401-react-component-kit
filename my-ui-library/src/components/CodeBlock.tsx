/**
 * @file src/components/CodeBlock.tsx
 * @description コードを表示するコンポーネント。ファイル名をタイトルとしてつけられます
 */
import { useState, useEffect } from "react";
//highlight.jsの場合
// import hljs from 'highlight.js';
// import 'highlight.js/styles/atom-one-dark.css';

// import javascript from 'highlight.js/lib/languages/javascript';
// import typescript from 'highlight.js/lib/languages/typescript';
// import sql from 'highlight.js/lib/languages/sql';
// import csharp from 'highlight.js/lib/languages/csharp';
// import python from 'highlight.js/lib/languages/python';
// import bash from 'highlight.js/lib/languages/bash';
// import json from 'highlight.js/lib/languages/json';
// import markdown from 'highlight.js/lib/languages/markdown';

// // 言語を登録
// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('typescript', typescript);
// hljs.registerLanguage('sql', sql);
// hljs.registerLanguage('csharp', csharp);
// hljs.registerLanguage('python', python);
// hljs.registerLanguage('bash', bash);
// hljs.registerLanguage('json', json);
// hljs.registerLanguage('markdown', markdown);

//Primsの場合
import 'prismjs/themes/prism-okaidia.css';

import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';


type Props = {
  title: string;
  code: string;
  lang: string | null;
};

export const CodeBlock = ({ title, code, lang }: Props) => {
  const [copied, setCopied] = useState(false);
  // const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // codeやlanguageが変更されたらハイライトを再実行
    // if(codeRef.current){
    //   hljs.highlightElement(codeRef.current);
    // }
    Prism.highlightAll();
  }, [code, lang]);

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
      <pre className="bg-gray-800 p-4 text-sm whitespace-pre-wrap break-all overflow-x-auto">
        {/* <code ref={codeRef} className={lang ? `language-${lang}` : ''}>{code || "// Enter table and column information to generate code."}</code> */}
        <code className={lang ? `language-${lang} ` : ''}>{code || "// Enter table and column information to generate code."}</code>
      </pre>
    </div>
  );
};