import { useState, useRef, type ComponentProps } from "react";
import { PanelLeft } from "lucide-react";
import { TooltipPortal } from "../../TooltipPortal";
import { ringColorStyle, ripplePaleColorStyles, type ColorType } from "../../../utils/colorStyles";
import { cn } from "../../../utils/cn";
import { triggerRipple } from "../../../utils/triggerRipple";

type Props = ComponentProps<"aside"> & {
    themeColor?: ColorType;
    controlled?: boolean;
    onOpenChange?: (isClose: boolean) => void;
};

export const Sidebar = ({
    children,
    className = "",
    style,
    themeColor = "primary",
    controlled = false,
    onOpenChange,
}: Props) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [onIcon, setOnIcon] = useState(false);
    const [isClose, setIsClose] = useState(false);

    const handleToggle = () => {
        if (onOpenChange) {
            onOpenChange(!isClose);
        }
        setIsClose((prev) => !prev);
    };

    const styles = {
        "--ripple-color": ripplePaleColorStyles(themeColor),
        ...style,
    };

    return (
        <aside
            className={cn(
                "shadow shrink-0 border-e border-border h-full",
                "transition-all duration-300 ease-in-out",
                `${!controlled ? (!isClose ? "w-full" : "w-15") : ""}`,
                className,
            )}
            style={styles}
        >
            <div className="pt-2 pe-2 flex justify-end">
                <button
                    type="button"
                    ref={btnRef}
                    onMouseOver={() => setOnIcon(true)}
                    onMouseLeave={() => setOnIcon(false)}
                    onClick={handleToggle}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            triggerRipple(btnRef.current);
                        }
                    }}
                    className={`relative rounded-full p-2 text-text-muted
                        focus-visible:ring-1 focus-visible:outline-none ${ringColorStyle(themeColor)} ripple
                        hover:bg-black/6 dark:hover:bg-white/10`}
                >
                    <PanelLeft className="w-5 h-5" />
                    <TooltipPortal targetRef={btnRef} visible={onIcon}>
                        {isClose ? "サイドバーを開く" : "サイドバーを閉じる"}
                    </TooltipPortal>
                </button>
            </div>
            {!isClose && children}
        </aside>
    );
};
