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
        <div className="relative border border-gray-300 rounded-xl w-96">
            <textarea ref={textareaRef}  placeholder="自由入力..." value={text} onInput={handleInput} onChange={(e) => onChange(e.target.value)} rows={1}
                style={{ resize: "none", paddingRight: "80px" }} className="p-4 w-full min-h-[24px] max-h-[150px] overflow-hidden bg-transparent
                    pr-16 pt-5 box-border focus:outline-none"/>
            <button style={{top: "7px", right: "13px"}} className="p-3 items-center bg-sky-100 hover:bg-sky-200 rounded-full font-semibold text-blue-600
                absolute top-5 right-5">
                <Send className="w-7 h-7" />
            </button>
        </div>
    )
}