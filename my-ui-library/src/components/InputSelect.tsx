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

  const showOptions = isFocused && filteredOptions.length > 0;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        className="w-full h-[39px] px-3 text-white py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      {showOptions && (
        <ul className="absolute z-10 w-full mt-1 text-white bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-700"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
