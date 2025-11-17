/**
 * @file src/components/SelectBox.tsx
 * @description 入力から選択肢を推測して表示するカスタムUIコンポーネント。
 */
import { useState, useRef, useEffect,type FC } from 'react';
import { createPortal } from 'react-dom';

interface SelectProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// ドロップダウンメニュー部分を別コンポーネントとして切り出す
const DropdownMenu: FC<{
  options: readonly string[];
  value: string;
  targetRect: DOMRect | null;
  onOptionClick: (option: string) => void;
}> = ({ options, value, targetRect, onOptionClick }) => {
  if (!targetRect) return null;

  // メニューの位置を計算（ボタンの真下に表示）
  const style = {
    top: `${targetRect.bottom + window.scrollY + 4}px`,
    left: `${targetRect.left + window.scrollX}px`,
    width: `${targetRect.width}px`,
  };

  return createPortal(
    <ul style={style} onMouseDown={(e) => e.stopPropagation()}
      className="absolute top-3 r-0 z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto 
                                scrollbar scrollbar-track-transparent scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
      {options.map((option, index) => (
        <li
          key={index}
          onClick={() => onOptionClick(option)}
          className={`px-4 py-2 text-gray-700 text-xs cursor-pointer hover:bg-sky-50 hover:text-sky-700 first:rounded-t-xl last:rounded-b-xl active:bg-sky-200
                      ${option === value && 'bg-sky-100 text-sky-700 hover:bg-sky-100'}`}
        >
          {option}
        </li>
      ))}
    </ul>,
    document.body // DOMのbody要素の末尾にレンダリングする
  );
};

export const SelectBox: React.FC<SelectProps> = ({ options, value, onChange, placeholder="選択してください" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // コンポーネントの外側をクリックしたときにドロップダウンを閉じる
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggle = () => {
        if (wrapperRef.current) {
        // ボタンの位置とサイズを取得してstateに保存
        setTargetRect(wrapperRef.current.getBoundingClientRect());
        }
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={`flex text-xs items-center box-border justify-between gap-2 w-full h-[30px] px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-hidden focus:border-1 focus:border-sky-300 transition-colors ${
          !value ? 'text-gray-400' : 'text-gray-800'
        }`}
      >
        <span>{value || placeholder}</span>
        <svg
            className={`w-4 h-4 transition-transform duration-200 hover:text-gray-700 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        </button>
        {isOpen && <DropdownMenu options={options} value={value} targetRect={targetRect} onOptionClick={handleOptionClick} />}
    </div>
  );
};
