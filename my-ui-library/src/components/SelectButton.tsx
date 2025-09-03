/**
 * @file src/components/ui/SelectButton.tsx
 * @description 選択リストコンポーネント
 */
import CreatableSelect from 'react-select/creatable';
import Select, { type StylesConfig } from 'react-select';

type Option = { label: string; value: string };

export type Props = {
    name: string;
    list: Option[];
    selectedVal?: string;
    handleChange: (value: string) => void;
    placeholder?: string;
}

export const SelectButton = ({ name, list, selectedVal, handleChange, placeholder="選択してください" }: Props) => {
    const baseStyle = 'min-w-[150px] w-full rounded-xl col-span-2 text-sm';

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
            borderColor: state.isFocused ? 'oklch(0.828 0.111 230.318)' : 'oklch(0.967 0.003 264.542)',
            '&:hover': {
                borderColor: 'oklch(0.828 0.111 230.318)'
            }
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '12px',
            overflow: 'hidden',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'oklch(0.828 0.111 230.318)' : state.isFocused ? '#e9ecef' : undefined,
            color: state.isSelected ? 'white' : 'black',
        '&:active': {
            backgroundColor: 'oklch(0.746 0.16 232.661)',
            color: 'white',
        },
        }),
    };

    const clName = `${baseStyle} ${selectedVal ? 'bg-sky-100 border-sky-100' : 'bg-white border-white'}`;
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
                    formatCreateLabel={(inputValue) => `${inputValue}`}
                    onFocus={handleFocus}
                />
            </div>
        </div>
    );
}