/**
 * @file src/components/SelectBox.tsx
 * @description 入力から選択肢を推測して表示するカスタムUIコンポーネント。
 */
import { useState, useRef, useEffect } from 'react';

interface SelectProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SelectBox: React.FC<SelectProps> = ({ options, value, onChange, placeholder="選択してください" }) => {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleOptionClick = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 w-full h-[39px] px-3 pr-6 py-2 bg-white border border-gray-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-sky-300 focus:border-sky-300 transition-colors ${
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
        {isOpen && (
            <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto 
                        scrollbar scrollbar-track-transparent scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
            {options.map((option, index) => (
                <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-sky-100 hover:text-sky-700 first:rounded-t-xl last:rounded-b-xl"
                >
                {option}
                </li>
            ))}
            </ul>
        )}
    </div>
  );
};
