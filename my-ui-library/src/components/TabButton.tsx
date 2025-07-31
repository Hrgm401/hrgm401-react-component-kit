/**
 * @file src/components/TabButton.tsx
 * @description タブボタンコンポーネント
 */
type Option = { label: string; value: string };

type Props = {
  val: Option;
  selectedVal?: string;
  handleChange: (value: string) => void;
  unqUi?: string;
};

export const TabButton = ({ val, selectedVal, handleChange, unqUi }: Props) => {
  let style = "";
  if (unqUi === "tab-btn-line") {
    const baseClasses =
      "relative p-1.5 px-2 rounded-lg border border-transparent transition-all duration-200 font-bold text-base min-w-[100px] max-w-[200px] shrink grow basis-auto focus:outline-none";
    const normalStateClasses =
      "bg-transparent text-gray-700 hover:bg-gray-200 hover:after:content-[''] hover:after:absolute hover:after:left-[20%] hover:after:bottom-[-13px] hover:after:h-[3px] hover:after:w-[60%] hover:after:rounded-t-[10px] hover:after:bg-gray-400";
    const activeStateClasses =
      "bg-sky-200 text-sky-800 hover:bg-sky-200 focus:bg-sky-200 after:content-[''] after:absolute after:left-[20%] after:bottom-[-13px] after:h-[3px] after:w-[60%] after:rounded-t-[10px] after:bg-sky-500";
    style = `${baseClasses} ${
      selectedVal === val.value ? activeStateClasses : normalStateClasses
    }`;
  } else {
    const baseClasses =
      "w-30 rounded-lg col-span-2 flex-shrink-0 text-sm py-[8px] px-3 focus:bg-white";
    const normalStateClasses =
      "bg-gray-100 hover:shadow hover:border hover:border-gray-200 hover:bg-gray-50";
    const activeStateClasses = "shadow bg-white border border-gray-200";
    style = `${baseClasses} ${
      selectedVal === val.value ? activeStateClasses : normalStateClasses
    }`;
  }
  return (
    <button
      className={style}
      value={val.value}
      onClick={() => handleChange(val.value)}
    >
      {val.label}
    </button>
  );
};
