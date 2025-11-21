/**
 * @file src/components/InputSelect.tsx
 * @description 入力から選択肢を推測して表示するカスタムUIコンポーネント。
 */
import { useState, useRef, useEffect } from 'react';
import { useInferOptions } from '../hooks/useInferOptions';

interface InputSelectProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const InputSelect: React.FC<InputSelectProps> = ({ options, value, onChange, placeholder }) => {
  const { inputValue, setInputValue, filteredOptions } = useInferOptions(options);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // コンポーネントの外側をクリックしたときにドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // 親から渡されたvalueが変更されたら、内部のinputValueも更新する
  useEffect(() => {
    setInputValue(value);
  }, [value, setInputValue]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value); // 入力中も親コンポーネントに値を反映
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setInputValue(option);
    setIsFocused(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
    setIsFocused(true)
  }

  const showOptions = isFocused && filteredOptions.length > 0;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={(e) => handleFocus(e)}
        placeholder={placeholder}
        className="w-full h-[30px] px-4 py-2 text-xs text-gray-800 bg-white border-1 border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-sky-300 focus:border-sky-300 transition-colors"
      />
      {showOptions && (
        <ul className="absolute top-8 w-full z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto 
                        scrollbar scrollbar-track-transparent scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 text-gray-600 text-xs cursor-pointer hover:bg-sky-100/50 hover:text-sky-700 first:rounded-t-xl last:rounded-b-xl"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
