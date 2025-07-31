import React, { useEffect, useRef, type FC, type ChangeEvent } from 'react';

// --- 型定義 ---

// 各列の定義
interface FieldDef {
  field: string;
  label: string;
}

// selectの選択肢の型
interface SelectOption {
  field: string | number;
  label: string;
}

// ルールの型定義
interface FieldRule {
  displayRules?: string[];
}

interface ItemRule {
  displayRules?: string[];
  inputRules?: string[];
  floatInputRules?: string[];
  numInputRules?: string[];
  timeRules?: string[];
  selectRules?: Array<Record<string, SelectOption[]>>;
  colorRules?: Array<Record<string, string>>;
  clickRules?: string[];
}

// コンポーネントのPropsの型定義
// ジェネリクス<T>を使い、どんな形のデータ配列(items)にも対応できるようにしています。
interface EditableTableProps<T extends Record<string, any>> {
  fields: FieldDef[];
  items: T[] | T;
  rowKeyProp: keyof T; // 各行を一位に特定するためのキーとなるプロパティ名
  fieldRule?: FieldRule;
  itemRule?: ItemRule;
  editable?: boolean;
  color?: "default" | "gray";
  handleClick?: (key: string, itemIdx: number) => void;
  handleDeleteClick?: (key: string, itemIdx: number) => void;
  handleChange?: (value: any, key: string, itemIdx: number) => void;
}

// --- ユーティリティ関数 (コンポーネント外に配置) ---

// テキスト幅取得
const getTextWidth = (text: string, font: string): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 0;
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

// 時間フォーマッター (分単位の数値 -> HH:mm)
const fmtToTime = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return "00:00";
  const min = String(num % 60).padStart(2, '0');
  const hour = String(Math.floor(num / 60)).padStart(2, '0');
  return `${hour}:${min}`;
};

// 時間フォーマッター (HH:mm -> 分単位の数値)
const fmtToNumber = (time: string, isNumberValue: boolean): number | string => {
  if (isNumberValue) {
    const [hourStr, minStr] = time.split(':');
    const hour = parseInt(hourStr, 10) || 0;
    const min = parseInt(minStr, 10) || 0;
    return hour * 60 + min;
  }
  return time;
};

// 数値フォーマッター
const fmtInt = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): number | null => {
  const parsed = parseInt(e.target.value, 10);
  return isNaN(parsed) ? null : parsed;
};

const fmtFloat = (e: ChangeEvent<HTMLInputElement>): number | null => {
  const parsed = parseFloat(e.target.value);
  return isNaN(parsed) ? null : parsed;
};

// 日時フォーマッター
const fmtCustomDate = (date: string | Date | null): string | null => {
  if (!date) return null;
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return null; // 無効な日付はnullを返す

  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  const hour = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${month}/${d} ${hour}:${minutes}`;
};


// --- 子コンポーネント ---

// 削除ボタン (propsで型を指定)
const XButton: FC<{ onClick?: (key: string, idx: number) => void; itemKey: string; itemIdx: number }> = ({ onClick, itemKey, itemIdx }) => (
    <button
        style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: '#aaa', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }}
        onClick={(e) => {
            e.stopPropagation(); // 親のonClickイベントが発火しないようにする
            onClick?.(itemKey, itemIdx);
        }}
    >
        ×
    </button>
);


// --- メインコンポーネント ---

const EditableTable: FC<EditableTableProps<any>> = ({
  fields,
  items,
  rowKeyProp,
  fieldRule,
  itemRule,
  editable = false,
  color = "default",
  handleClick,
  handleDeleteClick,
  handleChange
}) => {
  const clName = color === "gray" ? "table-with-title flexible-table" : "table-nomal";
  const tableRef = useRef<HTMLTableElement>(null);
  
  // itemsが単一オブジェクトの場合、配列に変換
  const itemsArray = Array.isArray(items) ? items : [items];

  // 列幅調整ロジック
  useEffect(() => {
    const tableElement = tableRef.current;
    if (!tableElement) return;

    const adjustLayout = () => {
      // 初期化
      tableElement.classList.remove('is-layout-adjusted');
      const thCells = tableElement.querySelectorAll('thead th');
      thCells.forEach(cell => cell.classList.remove('is-long-colmun'));

      const longColIdxs = new Set<number>();

      thCells.forEach((cell, idx) => {
        const style = window.getComputedStyle(cell);
        const text = (cell as HTMLElement).innerText;

        const availableWidth = cell.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const textWidth = getTextWidth(text, font);

        if (textWidth > availableWidth) {
          const lineHeight = parseFloat(style.lineHeight);
          if (cell.scrollHeight > lineHeight + 2) { // 2行以上になっているかチェック
            longColIdxs.add(idx);
          }
        }
      });
      
      if (longColIdxs.size > 0) {
        tableElement.classList.add('is-layout-adjusted');
        tableElement.querySelectorAll('tr').forEach(row => {
          row.querySelectorAll('th, td').forEach((cell, idx) => {
            if (longColIdxs.has(idx)) {
              cell.classList.add('is-long-colmun');
            }
          });
        });
      }
    };

    // 初期描画時とitemsの変更時に実行
    adjustLayout();
  }, [itemsArray.length]); // itemsの数が変わった時に再計算

  return (
    <table className={clName} ref={tableRef}>
      {/* Header */}
      <thead>
        <tr>
          {fields.map((field) => {
            const isHidden = fieldRule?.displayRules?.includes(field.field);
            if (isHidden) return null;
            return <th key={field.field}>{field.label}</th>;
          })}
        </tr>
      </thead>
      
      {/* Body */}
      <tbody>
        {itemsArray.map((item, itemIdx) => (
          <tr key={item[rowKeyProp] ?? itemIdx}>
            {fields.map((field) => {
              const key = field.field;

              // ルール判定
              const isHiddenCol = fieldRule?.displayRules?.includes(key);
              if (isHiddenCol) return null;
              
              const isHiddenCell = itemRule?.displayRules?.includes(key) && !item[key] && itemIdx !== 0;
              if (isHiddenCell) return <td style={{ border: "none" }}></td>;
              
              const isInput = itemRule?.inputRules?.includes(key);
              const isFloat = itemRule?.floatInputRules?.includes(key);
              const isNum = itemRule?.numInputRules?.includes(key);
              const isTime = itemRule?.timeRules?.includes(key);
              const selectRule = itemRule?.selectRules?.find(r => r[key]);
              const colorRule = itemRule?.colorRules?.find(r => r[key]);
              const isClickable = itemRule?.clickRules?.includes(key);

              // スタイル計算
              const getCellStyle = (): React.CSSProperties => {
                if (isInput || isFloat || isNum || isTime || selectRule || isClickable) {
                  return {
                    width: "100%",
                    height: "30px",
                    padding: "0px",
                    boxSizing: "border-box",
                    backgroundColor: item[key] ? "#dff0d8" : "#ffe6ea",
                    position: isClickable ? "relative" : undefined,
                  };
                }
                if (colorRule?.[key]) return { backgroundColor: colorRule[key] };
                return {};
              };
              
              const cellStyle = getCellStyle();
              const inputStyle: React.CSSProperties = { backgroundColor: "transparent", height: "30px", padding: "4px 8px", boxSizing: "border-box" };

              // --- セルのレンダリング ---
              if (isInput) {
                return (
                  <td key={key} style={cellStyle}>
                    <input style={inputStyle} type="text" className="form-control no-border" value={item[key] ?? ''} onChange={(e) => handleChange?.(e.target.value, key, itemIdx)} readOnly={!editable} />
                  </td>
                );
              }

              if (isFloat || isNum) {
                return (
                  <td key={key} style={cellStyle}>
                    <input style={inputStyle} type="number" step={isFloat ? "0.1" : "1"} min="0" className="form-control no-border" value={item[key] ?? ''} onChange={(e) => handleChange?.(isFloat ? fmtFloat(e) : fmtInt(e), key, itemIdx)} readOnly={!editable} />
                  </td>
                );
              }

              if (isTime) {
                const isNumberValue = typeof item[key] === "number" || item[key] === null;
                const formattedTime = fmtToTime(item[key]);
                return (
                  <td key={key} style={cellStyle}>
                    <input style={{...inputStyle, textAlign: 'center'}} type="time" className="form-control no-border" value={formattedTime} onChange={(e) => handleChange?.(fmtToNumber(e.target.value, isNumberValue), key, itemIdx)} readOnly={!editable} />
                  </td>
                );
              }

              if (selectRule) {
                const options = selectRule[key] || [];
                return (
                  <td key={key} className="no-padding" style={cellStyle}>
                    <select className="form-control no-border" value={item[key] ?? "未選択"} onChange={(e) => handleChange?.(fmtInt(e), key, itemIdx)} disabled={!editable} style={inputStyle}>
                      <option value="未選択" disabled>未選択</option>
                      {options.map((option) => (
                        <option key={option.field} value={option.field}>{option.label}</option>
                      ))}
                    </select>
                  </td>
                );
              }

              if (isClickable) {
                return (
                  <td key={key} style={cellStyle}>
                    <button style={{ width: "100%", height: "100%" }} type="button" className="no-border" onClick={() => handleClick?.(key, itemIdx)} disabled={!editable}>
                      {fmtCustomDate(item[key])}
                    </button>
                    {item[key] && <XButton onClick={handleDeleteClick} itemKey={key} itemIdx={itemIdx} />}
                  </td>
                );
              }
              
              // デフォルトのテキスト表示
              return <td key={key} className="text-left" style={cellStyle}><div style={{ minHeight: "18px" }}>{item[key]}</div></td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;