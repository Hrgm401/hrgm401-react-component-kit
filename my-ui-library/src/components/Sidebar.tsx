import { useState, type ReactNode } from 'react';
import { PanelLeft } from 'lucide-react';

type Props = {
  children?: ReactNode;
};

export const Sidebar = ({ children }: Props ) => {
    const [onMouse, setOnMouse] = useState(false);
    const [isClose, setIsClose] = useState(false);

    const clName = !isClose ? "w-72 h-screen bg-slate-50 shadow flex-shrink-0 border-e border-slate-200" : "w-15 h-screen bg-slate-50 shadow flex-shrink-0 border-e border-slate-200"
    return (
        <aside style={{ height: '100vh' }} className={clName}>
            <div className='pt-2 pe-2 flex justify-end'>
                <div className='text-gray-500 hover:bg-sky-100 hover:rounded-full p-2 relative'
                    onMouseOver={() => setOnMouse(true)} 
                    onMouseLeave={() => setOnMouse(false)}
                    onClick={() => setIsClose(prev => !prev) }>
                    <PanelLeft className='w-5 h-5'/>
                    {onMouse && 
                        <div className='absolute top-14 left-0 whitespace-nowrap -translate-y-1/2 bg-black w-auto rounded-xl text-white text-xs p-2 animate-poyon'>
                            {isClose? "サイドバーを開く" : "サイドバーを閉じる"}
                        </div>
                    }
                </div>
            </div>
            {!isClose && children}

        </aside>
    )
};
