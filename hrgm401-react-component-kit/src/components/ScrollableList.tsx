/**
 * @file src/components/ui/ScrollableList.tsx
 * @description スクロールできるボタンのリストコンポーネント
 */
import { useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TabButton } from "./TabButton";

type Option = { label: string; value: string };
type Props = {
  options: Option[];
  selected: string;
  handleChange: (value: string) => void;
};

export const ScrollableList = ({ options, selected, handleChange }: Props) => {
  // EmblaのHooks
  const [emblaViewportRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    duration: 50,
  });
  // スロットル（処理の間引き）のためのフラグ
  const isThrottled = useRef(false);

  // DOMノード取得用のref
  const viewportRef = useRef<HTMLDivElement>(null);

  // refの合体
  const emblaRef = useCallback(
    (node: HTMLDivElement) => {
      emblaViewportRef(node);
      viewportRef.current = node;
    },
    [emblaViewportRef]
  );

  // ボタン操作
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // ホイール操作を処理するuseEffect
  useEffect(() => {
    const viewportNode = viewportRef.current;
    if (!emblaApi || !viewportNode) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // isThrottledフラグがtrueなら、処理を中断
      if (isThrottled.current) return;

      // 処理を実行するので、フラグをtrueにセット
      isThrottled.current = true;

      if (e.deltaY < 0) {
        emblaApi.scrollPrev();
      } else {
        emblaApi.scrollNext();
      }

      // 150ms後にフラグをfalseに戻し、次のイベントを受け付けられるようにする
      setTimeout(() => {
        isThrottled.current = false;
      }, 150);
    };

    // passive: false をつけてリスナーを登録
    viewportNode.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      viewportNode.removeEventListener('wheel', handleWheel);
    };
  }, [emblaApi]);

  return (
    <div
      className="flex items-center bg-stone-100 rounded-xl overflow-hidden"
      style={{ maxWidth: "calc(100vw - 225px)" }}
    >
      <button
        className="embla__prev shrink-0 z-10 bg-sky-400/40 text-sm text-white h-14 px-2 font-bold hover:bg-sky-300 focus:ring-2 focus:ring-offset-1 focus:ring-sky-400"
        onClick={scrollPrev}
      >
        <ChevronLeft />
      </button>

      <div className="embla flex-1 min-w-0 h-14" ref={emblaRef}>
        <div className="embla__container flex">
          {options.map((item) => (
            <div key={item.value} className="embla__slide flex-shrink-0 px-1 py-2">
              <TabButton
                val={item}
                selectedVal={selected}
                handleChange={handleChange}
                unqUi={"none"}
              />
            </div>
          ))}
        </div>
      </div>

      <button 
        className="embla__next shrink-0 z-10 bg-sky-400/40 text-sm text-white h-14 px-2 font-bold hover:bg-sky-300 focus:ring-2 focus:ring-offset-1 focus:ring-sky-400"
        onClick={scrollNext}
      >
        <ChevronRight />
      </button>
    </div>
  );
};