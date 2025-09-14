/**
 * @file src/components/ui/SelectButton.tsx
 * @description 選択リストコンポーネント
 */
import CreatableSelect from 'react-select/creatable';
import { type StylesConfig } from 'react-select';

type Option = { label: string; value: string };

export type Props = {
    name: string;
    list: Option[];
    selectedVal?: string;
    handleChange: (value: string) => void;
    placeholder?: string;
}

export const SelectButton = ({ name, list, selectedVal, handleChange, placeholder="選択してください" }: Props) => {
    const baseStyle = 'min-w-[150px] w-full col-span-2 text-sm';

    const selectedOption = list.find(opt => opt.value === selectedVal);
    const onChange = (selected: Option| null) => {
        const newVal = selected ? selected.value : '';
        handleChange(newVal);
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select();
    };

    const customStyles: StylesConfig<Option, false> = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: '12px',
            boxShadow: state.isFocused ? '0 0 0 1px #7dd3fc' : provided.boxShadow,
            borderColor: state.isFocused ? '#7dd3fc' : '#d1d5db',
            '&:hover': {
                borderColor: '#7dd3fc'
            }
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        menu: (provided) => ({
            ...provided,
            marginTop: '4px', // mt-1
            borderRadius: '12px', // rounded-xl
            border: '1px solid #e5e7eb', // border border-gray-200
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow-lg
            overflow: 'hidden',
        }),
        option: (provided, state) => ({
            ...provided,
            padding: '8px 16px', // px-4 py-2
            cursor: 'pointer',
            // state.isFocusedがhover状態にあたる
            backgroundColor: state.isSelected ? '#e0f2fe' : state.isFocused ? '#f0f9ff' : 'white', // 選択済み(sky-100), hover(sky-50), 通常
            color: state.isSelected ? '#0369a1' : state.isFocused ? '#0369a1' : '#374151', // 選択済み(sky-700), hover(sky-700), 通常(gray-700)
            // クリック(active)時のスタイル
            '&:active': {
                backgroundColor: '#bae6fd', // bg-sky-200 相当
            },
        }),
    };

    const clName = baseStyle;
    return (
        <div className="w-full">
            <div className="grid grid-cols-3 py-1 rounded-xl px-4 flex items-center">
                <label className="w-16 col-span-1 text-sm py-1 font-medium">{name}</label>
                <CreatableSelect
                    name={name}
                    value={selectedOption}
                    onChange={onChange}
                    options={list}
                    placeholder={placeholder || "選択してください"}
                    className={clName}
                    styles={customStyles}
                    // formatCreateLabel={(inputValue) => `${inputValue}`}
                    onFocus={handleFocus}
                />
            </div>
        </div>
    );
}