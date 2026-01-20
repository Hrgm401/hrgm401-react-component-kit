import { type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
    children: ReactNode,
    targetRef: React.RefObject<HTMLDivElement | null>,
    color?: string,
    visible: boolean
};

export const TooltipPortal = ({children, targetRef, visible, color = '#000000'}: Props) => {
    if(!visible || !targetRef.current) return null;

    //ボタンの位置取得 表示位置計算
    const rect = targetRef.current.getBoundingClientRect();

    const descriptTxtColor = color === '#000000' ? color : '#ffffff';
    const descriptBg = color === '#000000' ? 'oklch(96.8% 0.007 247.896)' : '#000000';

    const styles = {
            position: 'fixed',
            top: rect.top + 60,
            left: rect.left,
            zIndex: 9999,
            backgroundColor: descriptBg,
            color: descriptTxtColor
        }as React.CSSProperties;

    return createPortal(
        <div className='whitespace-nowrap -translate-y-1/2 w-auto rounded-xl text-xs p-2 shadow-lgtransition-all duration-300 ease-out animate-poyon'
            style={styles}
        >
            {children}
        </div>,
        document.body
    )
}