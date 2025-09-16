/**
 * @file src/components/ui/TabWithLine.tsx
 * @description ライン付きタブコンポーネント。handleDeleteを渡すとタブを消すことができます
 */
import { TabButton } from "./TabButton";

type Option = { label: string; value: string };
type Props = {
  options: Option[];
  selected: string;
  handleChange: (value: string) => void;
  handleDelete?: (value: string) => void;
  unqUi: string;
};

export const TabWithLine = ({
  options,
  selected,
  handleChange,
  handleDelete,
  unqUi,
}: Props) => {
  return (
    <div>
      <div className="flex flex-nowrap scroll-smooth overflow-hidden gap-2 p-3">
        {options.map((item) => (
          <div key={item.value} className="relative group">
          <TabButton
            key={item.value}
            val={item}
            selectedVal={selected}
            handleChange={handleChange}
            unqUi={unqUi}
          />
          {options.length > 1 && handleDelete && (
              <button
                onClick={() => handleDelete(item.value)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                title={`Delete ${item.label}`}
              >
                ✕
              </button>
          )}
          </div>
        ))}
      </div>
      <div
        style={{ margin: "0 0 30px 0", borderBottom: "1.5px solid #ddd" }}
      ></div>
    </div>
  );
};
