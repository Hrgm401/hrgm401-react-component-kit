/**
 * @file src/components/IconTabs.tsx
 * @description アイコンとラベル付きの汎用タブコンポーネント
 */
import React from 'react';

export interface TabOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface IconTabsProps {
  options: TabOption[];
  value: string;
  onChange: (id: string) => void;
}

export const IconTabs: React.FC<IconTabsProps> = ({ options, value, onChange }) => {
  return (
    <div className="flex items-center space-x-4 border-b border-gray-700 mb-6">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors relative
            ${value === option.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
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
