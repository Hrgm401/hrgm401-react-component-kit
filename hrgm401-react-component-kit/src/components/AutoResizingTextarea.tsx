import { Maximize2, Minimize2 } from "lucide-react";
import { useState, useRef } from "react";
type Props = {
    text: string,
    placeholder?: string,
    onChange: (value: string) => void;
}
export const AutoResizingTextarea = ({text, placeholder = '自由入力...', onChange}: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [expandBoxSize, setExpandBoxSize] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [hasShadow, setHasShadow] = useState(false);

    const adjustHeight = () => {
        if(textareaRef.current){
            // ① テキストエリアの高さを一度リセット
            textareaRef.current.style.height = 'auto';

            const scrollHeight = textareaRef.current.scrollHeight;
            const style = window.getComputedStyle(textareaRef.current);
            const borderTop = parseInt(style.borderTopWidth, 10);
            const borderBtm = parseInt(style.borderBottomWidth, 10);
            const totalHeight = scrollHeight + borderTop + borderBtm;
            textareaRef.current.style.height = `${totalHeight}px`;

            setHasShadow(totalHeight > 80);

            if((scrollHeight + borderTop + borderBtm) > 180){
                setExpandBoxSize(true);
            } else{
                setExpandBoxSize(false);
            }
        }
    }
    return (
        <div className={`relative w-full text-xs ${hasShadow ? 'shadow-[0_-35px_60px_-15px_rgba(255,255,255,0.9)]' : 'shadow-none'} `}>
            <textarea ref={textareaRef}  placeholder={placeholder} value={text} onInput={adjustHeight} onChange={(e) => onChange(e.target.value)} rows={1}
                className={`p-2 w-full min-h-[80px] ${isShow ? 'max-h-[500px]' : 'max-h-[180px]'} overflow-y-auto bg-white focus:outline-none focus:ring-0.5 focus:ring-sky-300 focus:border-sky-300
                    pr-10 box-border focus:outline-none resize-none border border-gray-300 rounded-xl `}/>
            {expandBoxSize && (
                <button className="absolute top-[8px] right-4 p-2 hover:bg-gray-200/60 hover:rounded-full text-gray-500 active:bg-sky-300/60"
                    onClick={() => setIsShow((prev) => !(prev))}>
                    {isShow ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
            )}
        </div>
    )
}