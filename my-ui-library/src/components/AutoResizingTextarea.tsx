import { Send } from "lucide-react";
import { useRef } from "react";
export type Props = {
    text: string,
    onChange: (value: string) => void;
}
export const AutoResizingTextarea = ({text, onChange}: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const handleInput = () => {
        if(textareaRef.current){
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }
    return (
        <div className="relative border border-gray-300 rounded-xl w-full">
            <textarea ref={textareaRef}  placeholder="自由入力..." value={text} onInput={handleInput} onChange={(e) => onChange(e.target.value)} rows={1}
                className="p-4 w-full min-h-[24px] max-h-[500px] overflow-y-auto bg-transparent
                    pr-16 pt-5 box-border focus:outline-none resize-none"/>
            <button className="p-3 bg-sky-100 hover:bg-sky-200 rounded-full font-semibold text-blue-800
                absolute top-2 right-3">
                <Send className="w-7 h-7 pt-[2px] pr-[3px]" />
            </button>
        </div>
    )
}