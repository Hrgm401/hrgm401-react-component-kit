/**
 * @file src/components/ui/SelectButton.tsx
 * @description 選択リストコンポーネント
 */
import { type ChangeEvent } from "react";

type Option = { label: string; value: string };

type Props = {
    name: string;
    list: Option[];
    selectedVal?: string;
    handleChange: (value: string) => void;
}

export const SelectButton = ({ name, list, selectedVal, handleChange }: Props) => {
    const baseStyle = 'min-w-[150px] w-full rounded-xl border col-span-2 text-sm py-1 px-3 focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300';

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        handleChange(e.target.value);
    }

    const clName = `${baseStyle} ${selectedVal ? 'bg-sky-100 border-sky-100' : 'bg-white border-white'}`;
    return (
        <div className="w-full">
            <div className="grid grid-cols-3 py-1 rounded-xl px-4">
                <label className="w-16 col-span-1 text-sm py-1 font-medium">{name}</label>
                <select
                    name={name}
                    className={clName}
                    onChange={(e) => onChange(e)}
                    value={selectedVal}
                >
                    {list.map((opt, idx) => {
                        if (idx === 0) return <option key={opt.value} value={opt.value} className="bg-stone-300 text-white" disabled> {opt.label}</option>;
                        return <option key={opt.value} value={opt.value} className="bg-white"> {opt.label}</option>;
                    })}
                </select>
            </div>
        </div>
    );
}