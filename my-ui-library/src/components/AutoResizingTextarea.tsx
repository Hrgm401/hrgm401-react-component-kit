import { Send } from "lucide-react";
import { useRef } from "react";
export type Props = {
    text: string,
    placeholder?: string,
    onChange: (value: string) => void;
}
export const AutoResizingTextarea = ({text, placeholder = '自由入力...', onChange}: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const handleInput = () => {
        if(textareaRef.current){
            // ① テキストエリアの高さを一度リセット
            textareaRef.current.style.height = 'auto';

            const scrollHeight = textareaRef.current.scrollHeight;
            const style = window.getComputedStyle(textareaRef.current);
            const borderTop = parseInt(style.borderTopWidth, 10);
            const borderBtm = parseInt(style.borderBottomWidth, 10);
            textareaRef.current.style.height = `${scrollHeight + borderTop + borderBtm}px`;
        }
    }
    return (
        <div className="relative w-full">
            <textarea ref={textareaRef}  placeholder={placeholder} value={text} onInput={handleInput} onChange={(e) => onChange(e.target.value)} rows={1}
                className="p-2 w-full min-h-[28px] max-h-[400px] overflow-y-auto bg-white focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300
                    pr-16 box-border focus:outline-none resize-none border border-gray-300 rounded-xl"/>
            <button className="p-1.5 me-2 bg-sky-100 text-gray-700 hover:bg-sky-200 rounded-full font-semibold hover:text-sky-500
                absolute bottom-3 right-2">
                <Send className="w-4 h-4" />
            </button>
        </div>
    )
}