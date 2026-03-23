import { type Monaco } from "@monaco-editor/react";

/**
 * カスタムプロパティ（CSS変数）から実際の色を取得する
 * @param varName '--color-primary-600' などの変数名
 * @param removeHash trueの場合、Monacoのrules用に先頭の '#' を削除して返す
 * @param isDark trueの場合、一時的にdarkクラスを付与してダークモード時の値を取得する
 */
export const getCssVarColor = (varName: string, removeHash = false, isDark = false): string => {
    // SSR環境対策
    if (typeof window === "undefined") return fallbackColor(removeHash);

    // モード（Light/Dark）ごとに正確な色を取得するため、一時的なDOM要素を生成
    // モノコエディタ初期化時点のライト/ダークに縛られず、両方の色を同時に抽出できます
    const tempEl = document.createElement("div");
    if (isDark) {
        tempEl.className = "dark";
    }
    tempEl.style.display = "none";
    document.body.appendChild(tempEl);

    // rootや.darkで定義された変数は、この要素から取得可能
    const computed = getComputedStyle(tempEl);
    const hex = computed.getPropertyValue(varName).trim();

    document.body.removeChild(tempEl);

    if (!hex) return fallbackColor(removeHash);
    if (removeHash && hex.startsWith("#")) {
        return hex.slice(1);
    }
    return hex;
};

// CSS変数がうまく取れなかった時のフォールバック色
const fallbackColor = (removeHash: boolean) => (removeHash ? "000000" : "#000000");

/**
 * Monaco EditorにGumi独自のテーマを登録し、コンパイラオプションを設定する
 */
export const setupMonacoEnvironment = (monaco: Monaco) => {
    // 1. エラー表示設定
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true, // 型チェックなどの意味論的エラー（赤い波線）
        noSyntaxValidation: true, // 構文エラー
    });
    // 2. コンパイラオプション設定
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.React, // JSX/TSX許可
        jsxFactory: "React.createElement",
        reactNamespace: "React",
        allowNonTsExtensions: true, //拡張子許容
        allowJs: true,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
    });

    // ▼ ライトテーマ用のカラー抽出 (isDark = false)
    const lightBg = getCssVarColor("--color-bg-subtle", false, false);
    const lightBorder = getCssVarColor("--color-border-strong", false, false);
    const lightText = getCssVarColor("--color-text", true, false);
    const lightComment = getCssVarColor("--color-text-muted", true, false);
    const lightLineBg = getCssVarColor("--color-primary-100", false, false); // 選択行をほんのり青く

    const lightPrimary = getCssVarColor("--color-primary-600", true, false);
    const lightSecondary = getCssVarColor("--color-secondary-600", true, false);
    const lightTertiary = getCssVarColor("--color-tertiary-600", true, false);
    const lightQuaternary = getCssVarColor("--color-quaternary-600", true, false);

    monaco.editor.defineTheme("gumi-light", {
        base: "vs",
        inherit: true,
        rules: [
            { token: "comment", foreground: lightComment },
            { token: "keyword", foreground: lightPrimary }, // 予約語は青
            { token: "string", foreground: lightTertiary }, // 文字列は赤
            { token: "number", foreground: lightSecondary }, // 数値は緑
            { token: "type", foreground: lightPrimary }, // 型も青
            { token: "class", foreground: lightPrimary },
            { token: "interface", foreground: lightPrimary },
            { token: "function", foreground: lightQuaternary }, // 関数は黄色
            { token: "method", foreground: lightQuaternary },
            { token: "variable", foreground: lightText },
            { token: "parameter", foreground: lightText },
            { token: "property", foreground: lightText },
        ],
        colors: {
            "editor.background": lightBg,
            "editor.lineHighlightBackground": lightLineBg + "80", // + "80" で透明度を付加
            "editor.lineHighlightBorder": "#00000000",
            "editorLineNumber.foreground": lightBorder,
        },
    });

    // ▼ ダークテーマ用のカラー抽出 (isDark = true)
    const darkBg = getCssVarColor("--color-bg-subtle", false, true);
    const darkBorder = getCssVarColor("--color-border-strong", false, true);
    const darkText = getCssVarColor("--color-text", true, true);
    const darkComment = getCssVarColor("--color-text-muted", true, true);
    const darkLineBg = getCssVarColor("--color-bg-muted", false, true); // 選択行

    const darkPrimary = getCssVarColor("--color-primary-400", true, true);
    const darkSecondary = getCssVarColor("--color-secondary-400", true, true);
    const darkTertiary = getCssVarColor("--color-tertiary-400", true, true);
    const darkQuaternary = getCssVarColor("--color-quaternary-400", true, true);

    monaco.editor.defineTheme("gumi-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: darkComment },
            { token: "keyword", foreground: darkPrimary },
            { token: "string", foreground: darkTertiary },
            { token: "number", foreground: darkSecondary },
            { token: "type", foreground: darkPrimary },
            { token: "class", foreground: darkPrimary },
            { token: "interface", foreground: darkPrimary },
            { token: "function", foreground: darkQuaternary },
            { token: "method", foreground: darkQuaternary },
            { token: "variable", foreground: darkText },
            { token: "parameter", foreground: darkText },
            { token: "property", foreground: darkText },
        ],
        colors: {
            "editor.background": darkBg,
            "editor.lineHighlightBackground": darkLineBg + "80", // + "80"透明度
            "editor.lineHighlightBorder": "#00000000",
            "editorLineNumber.foreground": darkBorder,
            "editor.foreground": darkText,
        },
    });
};
