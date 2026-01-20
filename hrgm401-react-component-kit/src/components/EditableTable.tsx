import { type FC, type ChangeEvent } from 'react';
import { SelectBox } from './SelectBox'; // SelectBoxコンポーネントをインポート

// --- 型定義 (変更なし) ---
interface FieldDef {
  field: string;
  label: string;
}
interface SelectOption {
  field: string | number;
  label: string;
}
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
interface EditableTableProps<T extends Record<string, any>> {
  fields: FieldDef[];
  items: T[] | T;
  rowKeyProp: keyof T;
  fieldRule?: FieldRule;
  itemRule?: ItemRule;
  editable?: boolean;
  color?: "default" | "gray";
  handleClick?: (key: string, itemIdx: number) => void;
  handleDeleteClick?: (key: string, itemIdx: number) => void;
  handleChange?: (value: any, key: string, itemIdx: number) => void;
}

// --- ユーティリティ関数 (一部変更なし) ---
const fmtToTime = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return "00:00";
  const min = String(num % 60).padStart(2, '0');
  const hour = String(Math.floor(num / 60)).padStart(2, '0');
  return `${hour}:${min}`;
};
const fmtToNumber = (time: string, isNumberValue: boolean): number | string => {
  if (isNumberValue) {
    const [hourStr, minStr] = time.split(':');
    const hour = parseInt(hourStr, 10) || 0;
    const min = parseInt(minStr, 10) || 0;
    return hour * 60 + min;
  }
  return time;
};
const fmtInt = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): number | null => {
  const parsed = parseInt(e.target.value, 10);
  return isNaN(parsed) ? null : parsed;
};
const fmtFloat = (e: ChangeEvent<HTMLInputElement>): number | null => {
  const parsed = parseFloat(e.target.value);
  return isNaN(parsed) ? null : parsed;
};
const fmtCustomDate = (date: string | Date | null): string | null => {
  if (!date) return null;
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return null;
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  const hour = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  return `${month}/${d} ${hour}:${minutes}`;
};


// --- 子コンポーネント (Tailwindで再実装) ---
const XButton: FC<{ onClick?: (key: string, idx: number) => void; itemKey: string; itemIdx: number }> = ({ onClick, itemKey, itemIdx }) => (
    <button
      type="button"
      className="absolute top-1 right-1 z-10 p-1 rounded-full bg-gray-300 text-white hover:bg-gray-500 transition-colors duration-200"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(itemKey, itemIdx);
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
);


// --- メインコンポーネント (Tailwindで再実装) ---
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
  const itemsArray = Array.isArray(items) ? items : [items];

  // --- スタイル定義 ---
  const theme = {
    default: {
      header: "bg-sky-100 text-sky-800",
      rowHover: "hover:bg-sky-50",
    },
    gray: {
      header: "bg-gray-100 text-gray-800",
      rowHover: "hover:bg-gray-50",
    },
  };

  // 共通の入力スタイル
  const inputBaseStyle = "w-full h-full box-border px-3 py-2 bg-transparent hover:bg-sky-200 focus:outline-none focus:border-2 focus:border-sky-300 focus:border-opacity-50 transition-shadow duration-200";

  return (
    <div className="overflow-x-auto h-full ">
      <table className="w-full table-fixed border-collapse h-full ">
        {/* Header */}
        <thead>
          <tr className={`${theme[color].header}`}>
            {fields.map((field) => {
              if (fieldRule?.displayRules?.includes(field.field)) return null;
              return (
                <th key={field.field} className="p-3 text-left text-sm font-semibold tracking-wider">
                  {field.label}
                </th>
              );
            })}
          </tr>
        </thead>
        
        {/* Body */}
        <tbody className="bg-white divide-y divide-gray-200 h-full">
          {itemsArray.map((item, itemIdx) => (
            <tr key={item[rowKeyProp] ?? itemIdx} className={`h-full transition-colors duration-200 ${editable ? theme[color].rowHover : ''}`}>
              {fields.map((field) => {
                const key = field.field;

                // --- ルール判定 ---
                if (fieldRule?.displayRules?.includes(key)) return null;
                if (itemRule?.displayRules?.includes(key) && !item[key] && itemIdx !== 0) {
                    return <td className="border-none h-full"></td>;
                }

                const isInput = itemRule?.inputRules?.includes(key);
                const isFloat = itemRule?.floatInputRules?.includes(key);
                const isNum = itemRule?.numInputRules?.includes(key);
                const isTime = itemRule?.timeRules?.includes(key);
                const selectRule = itemRule?.selectRules?.find(r => r[key]);
                const colorRule = itemRule?.colorRules?.find(r => r[key]);
                const isClickable = itemRule?.clickRules?.includes(key);

                // --- スタイル計算 ---
                const hasValue = item[key] !== null && item[key] !== undefined && item[key] !== '';
                const isEditableField = isInput || isFloat || isNum || isTime || selectRule || isClickable;
                const cellBgColor = editable && isEditableField 
                  ? (hasValue ? 'bg-green-50' : 'bg-red-50') 
                  : 'bg-white';
                
                const cellDynamicStyle = colorRule?.[key] ? { backgroundColor: colorRule[key] } : {};

                // --- セルのレンダリング ---
                const renderCellContent = () => {
                  if (!editable) {
                    return <div className="min-h-[2.5rem] flex items-center px-3 py-2">{item[key]}</div>;
                  }

                  if (isInput) return <input type="text" className={inputBaseStyle} value={item[key] ?? ''} onChange={(e) => handleChange?.(e.target.value, key, itemIdx)} />;
                  if (isFloat || isNum) return <input type="number" step={isFloat ? "0.1" : "1"} min="0" className={inputBaseStyle} value={item[key] ?? ''} onChange={(e) => handleChange?.(isFloat ? fmtFloat(e) : fmtInt(e), key, itemIdx)} />;
                  if (isTime) return <input type="time" className={`${inputBaseStyle} text-center`} value={fmtToTime(item[key])} onChange={(e) => handleChange?.(fmtToNumber(e.target.value, typeof item[key] === "number"), key, itemIdx)} />;
                  
                  if (selectRule) {
                    const options = selectRule[key] || [];
                    // SelectBoxのvalueはlabel(string)を期待するため、現在の値(field)から対応するlabelを探す
                    const currentLabel = options.find(opt => opt.field === item[key])?.label || '';
                    return (
                      <SelectBox
                        options={options.map(o => o.label)}
                        value={currentLabel}
                        onChange={(label) => {
                          // onChangeで受け取ったlabelから対応するfield値を探して渡す
                          const selectedOption = options.find(opt => opt.label === label);
                          if (selectedOption) {
                            handleChange?.(selectedOption.field, key, itemIdx);
                          }
                        }}
                      />
                    );
                  }

                  if (isClickable) {
                    return (
                      <div className="relative w-full h-full">
                        <button
                          type="button"
                          className="w-full h-full text-left px-3 py-2 text-sky-600 hover:bg-sky-200 active:bg-sky-300 transition-colors duration-200 disabled:text-gray-400 disabled:bg-transparent"
                          onClick={() => handleClick?.(key, itemIdx)}
                          disabled={!editable}
                        >
                          <span className="min-h-[1.5rem] block">{fmtCustomDate(item[key]) || '日付を選択'}</span>
                        </button>
                        {hasValue && editable && <XButton onClick={handleDeleteClick} itemKey={key} itemIdx={itemIdx} />}
                      </div>
                    );
                  }

                  // デフォルトのテキスト表示
                  return <div className="min-h-[2.5rem] flex items-center px-3 py-2">{item[key]}</div>;
                };

                return (
                  <td key={key} className={`relative p-0 text-gray-700 text-sm ${cellBgColor}`} style={cellDynamicStyle}>
                    {renderCellContent()}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;