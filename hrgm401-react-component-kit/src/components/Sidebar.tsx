import { useState, type ReactNode, type CSSProperties, useMemo, useRef } from "react";
import { PanelLeft } from "lucide-react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { TooltipPortal } from "./TooltipPortal";

extend([namesPlugin]);

const DEFAULT_BG = "#f8fafc"; // bg-slate-50
const DEFAULT_TEXT = "oklch(55.1% 0.027 264.364)"; //bg-gray-500

type Props = {
    children?: ReactNode;
    color?: string;
    controlled?: boolean;
    onToggle?: (isClose: boolean) => void;
};

export const Sidebar = ({ children, color = DEFAULT_BG, controlled = false, onToggle }: Props) => {
    const btnRef = useRef(null);
    const [onIcon, setOnIcon] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const [tipColor, setTipColor] = useState("#000000");

    const styles = useMemo(() => {
        const c = colord(color || DEFAULT_BG);
        if (!c.isValid()) {
            return { backgroundColor: DEFAULT_BG, color: DEFAULT_TEXT };
        }

        const bgNormal = c;
        const bgHover = bgNormal.isDark() ? bgNormal.lighten(0.2) : bgNormal.darken(0.05);
        const btnTxtColor = bgNormal.isDark() ? "oklch(92.9% 0.013 255.508)" : DEFAULT_TEXT; //bg-slate-50
        setTipColor(bgNormal.isDark() ? "#000000" : "#ffffff");

        return {
            color: btnTxtColor,
            "--hover-bg": bgHover.toHex(),
        };
    }, [color]);

    const handleToggle = () => {
        if (onToggle) {
            onToggle(!isClose);
        }
        setIsClose((prev) => !prev);
    };

    const clName = `shadow flex-shrink-0 border-e border-slate-200 transition-all duration-300 h-full ease-in-out ${!controlled ? (!isClose ? "w-full" : "w-15") : ""}`;
    return (
        <aside style={{ backgroundColor: color }} className={clName}>
            <div className="pt-2 pe-2 flex justify-end">
                <div
                    ref={btnRef}
                    style={styles as CSSProperties}
                    onMouseOver={() => setOnIcon(true)}
                    onMouseLeave={() => setOnIcon(false)}
                    onClick={handleToggle}
                    className={`relative hover:rounded-full p-2 active:bg-sky-200 hover:bg-(--hover-bg)`}
                >
                    <PanelLeft className="w-5 h-5" />
                    <TooltipPortal targetRef={btnRef} visible={onIcon} color={tipColor}>
                        {isClose ? "サイドバーを開く" : "サイドバーを閉じる"}
                    </TooltipPortal>
                </div>
            </div>
            {!isClose && children}
        </aside>
    );
};
