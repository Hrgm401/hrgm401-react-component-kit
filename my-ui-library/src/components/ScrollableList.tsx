/**
 * @file src/components/ui/ScrollableList.tsx
 * @description スクロールできるボタンのリストコンポーネント
 */
import { useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { throttle } from 'lodash-es';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TabButton } from "./TabButton";

export type Option = { label: string; value: string };
type Props = {
  options: Option[];
  selected: string;
  handleChange: (value: string) => void;
};

export const ScrollableList = ({ options, selected, handleChange }: Props) => {
  //1. refとapiを受け取る
  const [emblaViewportRef, emblaApi] = useEmblaCarousel({ align: 'start', duration: 30 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const emblaRef = useCallback((node: HTMLDivElement) => {
    emblaViewportRef(node);
    viewportRef.current = node;
  },[emblaViewportRef]);
  
  //2. APIを使って前後にスクロールする関数を作る
  const scrollPrev = useCallback(() => {
    if(emblaApi) emblaApi.scrollPrev()
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if(emblaApi) emblaApi.scrollNext()
  }, [emblaApi]);

  //マウスホイール処理
  // useEffect(() => {
  //   const viewportNode = viewportRef.current;
  //   if(!emblaApi || !viewportNode) return;

  //   const handleWheel = (e: WheelEvent) => {
  //     e.preventDefault();

  //     if(e.deltaY < 0) emblaApi.scrollPrev();
  //     else emblaApi.scrollNext();
  //   };

  //   const throttledHandleWheel = throttle(handleWheel, 200, {
  //     leading: true,
  //     trailing: false,
  //   });

  //   viewportNode.addEventListener('wheel', throttledHandleWheel, { passive: false });

  //   return () => {
  //     viewportNode.removeEventListener('wheel', throttledHandleWheel);
  //   }
  // }, [emblaApi]);
  useEffect(() => {
    const viewportNode = viewportRef.current;
    if (!emblaApi || !viewportNode) return;

    // スロットル（処理の間引き）のためのフラグ
    const isThrottled = useRef(false);

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
      className="flex items-center overflow-hidden bg-stone-100 rounded-xl mb-4"
      style={{
        maxWidth: "calc(100vw - 225px)"
      }}
    >
      <button className="embla__prev shrink-0 z-10 bg-sky-300 text-sm text-white h-12 px-2 font-bold hover:bg-sky-400 hover:text-blue-500 focus:ring-2 focus:ring-offset-1 focus:ring-sky-400" onClick={scrollPrev}>
        <ChevronLeft />
      </button>
      {/* 1. ビューポート: はみ出しを隠す役割 */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        {/* 2. コンテナ: flexで要素を横に並べる役割 */}
        <div className="embla__container flex">
          {/* 3. スライド: 個々の要素。縮まないようにする */}
          {options.map((item) => (
            <div key={item.value} className="embla__slide flex-shrink-0 px-1">
              <TabButton
                key={item.value}
                val={item}
                selectedVal={selected}
                handleChange={handleChange}
                unqUi={"none"}
              />
          </div>
        ))}
        </div>
      </div>
      <button className="embla__next shrink-0 z-10 bg-sky-300 text-sm text-white h-12 px-2 font-bold hover:bg-sky-400 hover:text-blue-500 focus:ring-2 focus:ring-offset-1 focus:ring-sky-400" onClick={scrollNext}>
        <ChevronRight />
      </button>
    </div>
  );
};
