import { useState, type ReactNode, type CSSProperties, useMemo } from 'react';
import { PanelLeft } from 'lucide-react';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

extend([namesPlugin]);

const DEFAULT_BG = '#f8fafc'; // bg-slate-50
const DEFAULT_TEXT = 'oklch(55.1% 0.027 264.364)';//bg-gray-500

type Props = {
  children?: ReactNode;
  color?: string;
};

export const Sidebar = ({ children, color = DEFAULT_BG }: Props ) => {
    const [onIcon, setOnIcon] = useState(false);
    const [isClose, setIsClose] = useState(false);

    const styles = useMemo(() => {
        const c = colord(color || DEFAULT_BG);
        if(!c.isValid()){
            return { backgroundColor: DEFAULT_BG, color: DEFAULT_TEXT };
        }

        const bgNormal = c;
        const bgHover = bgNormal.isDark() ? bgNormal.lighten(0.2) : bgNormal.darken(0.05);
        const btnTxtColor = bgNormal.isDark() ? 'oklch(92.9% 0.013 255.508)' : DEFAULT_TEXT;//bg-slate-50
        const descriptTxtColor = bgNormal.isDark() ? '#000000' : '#ffffff';
        const descriptBg = bgNormal.isDark() ? 'oklch(96.8% 0.007 247.896)' : '#000000';
        
        return {
            btn: {
                color: btnTxtColor,
                '--hover-bg': bgHover.toHex()
            },
            descript: {
                backgroundColor: descriptBg,
                color: descriptTxtColor
            }
            
        };
    }, [color]);

    const clName = `shadow flex-shrink-0 border-e border-slate-200 transition-all duration-300 h-full ease-in-out ${!isClose ? 'w-full' : 'w-15'}`;
    return (
        <aside style={{ backgroundColor: color }} className={clName}>
            <div className='pt-2 pe-2 flex justify-end'>
                <div style={styles.btn as CSSProperties}
                    onMouseOver={() => setOnIcon(true)} 
                    onMouseLeave={() => setOnIcon(false)}
                    onClick={() => setIsClose(prev => !prev) }
                    className={`hover:rounded-full p-2 relative active:bg-sky-200 hover:bg-[var(--hover-bg)]`}
                >
                    <PanelLeft className='w-5 h-5'/>
                    <div className={`absolute top-14 left-0 whitespace-nowrap -translate-y-1/2 w-auto rounded-xl text-xs p-2 shadow-lg
                        transition-all duration-300 ease-out
                        ${onIcon ? 'animate-poyon' : 'opacity-0'}`}
                        style={styles.descript}
                    >
                        {isClose? "サイドバーを開く" : "サイドバーを閉じる"}
                    </div>
                </div>
            </div>
            {!isClose && children}

        </aside>
    )
};
