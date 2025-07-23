/**
 * @file src/components/ui/ScrollableList.tsx
 * @description スクロールできるボタンのリストコンポーネント
 */
import { useRef, useState, useEffect } from "react";
import { TabButton } from "./TabButton";

type Option = { label: string; value: string };
type Props = {
  options: Option[];
  selected: string;
  handleChange: (value: string) => void;
};

export const ScrollableList = ({ options, selected, handleChange }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (scrollRef.current) {
      setContainerWidth(scrollRef.current.clientWidth);
    }
  }, []);

  const renderScrolBtn = (direction: "left" | "right") => {
    const scrollDistance = direction === "left" ? -300 : 300;
    const label = direction === "left" ? "〈" : "〉";
    if (
      scrollRef.current &&
      scrollRef.current.scrollWidth > window.innerWidth - 225
    ) {
      return (
        <button
          onClick={() =>
            scrollRef.current?.scrollBy({
              left: scrollDistance,
              behavior: "smooth",
            })
          }
          className="shrink-0 z-10 bg-sky-300 text-sm text-black h-11 px-2 font-bold hover:bg-sky-400 hover:text-white focus:ring-2 focus:ring-offset-1 focus:ring-sky-400"
        >
          {label}
        </button>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div
      className="flex items-center overflow-hidden bg-stone-100 rounded-xl mb-4"
      style={{
        maxWidth: "calc(100vw - 225px)",
        ...(containerWidth ? { width: containerWidth } : {}),
      }}
    >
      {renderScrolBtn("left")}
      <div
        ref={scrollRef}
        className="flex flex-nowrap scroll-smooth overflow-hidden gap-1"
      >
        {options.slice(1).map((item) => (
          <TabButton
            key={item.value}
            val={item}
            selectedVal={selected}
            handleChange={handleChange}
            unqUi={"none"}
          />
        ))}
      </div>
      {renderScrolBtn("right")}
    </div>
  );
};
