/**
 * @file src/components/IconTabs.tsx
 * @description アイコンとラベル付きの汎用タブコンポーネント
 */
import React, { useEffect, useState } from 'react';

export interface TabOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface IconTabsProps {
  options: TabOption[];
  value: string;
  onChange: (id: string) => void;
  color?: string;
}

export const IconTabs: React.FC<IconTabsProps> = ({ options, value, onChange, color = "dark" }) => {
  const [btnColor, setBtnColor] = useState('text-white');
  const [btnColorOn, setBtnColorOn] = useState('text-gray-400 hover:text-white');
  useEffect(() => {
    setBtnColor(color === "light" ? 'text-gray-600' : 'text-white');
    setBtnColorOn(color === "light" ? 'text-gray-400 hover:text-gray-600' : 'text-gray-400 hover:text-white');
  }, [color]);

  return (
    <div className={`${color === "light" ? "flex border-gray-300 items-center space-x-4 border-b mb-6" : "flex border-gray-700 items-center space-x-4 border-b mb-6"}`}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors relative
            ${value === option.id ? btnColor : btnColorOn}`}
        >
          {option.icon}
          <span>{option.label}</span>
          {value === option.id && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-sky-400 rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
};
