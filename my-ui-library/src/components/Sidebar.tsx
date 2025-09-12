import { useState, type ReactNode } from 'react';
import { PanelLeft } from 'lucide-react';

type Props = {
  children?: ReactNode;
};

export const Sidebar = ({ children }: Props ) => {
    const [onIcon, setOnIcon] = useState(false);
    const [isClose, setIsClose] = useState(false);

    const clName = `h-screen bg-slate-50 shadow flex-shrink-0 border-e border-slate-200 transition-all duration-300 ease-in-out ${!isClose ? 'w-72' : 'w-15'}`;
    return (
        <aside style={{ height: '100vh' }} className={clName}>
            <div className='pt-2 pe-2 flex justify-end'>
                <div className='text-gray-500 hover:bg-sky-100 hover:rounded-full p-2 relative'
                    onMouseOver={() => setOnIcon(true)} 
                    onMouseLeave={() => setOnIcon(false)}
                    onClick={() => setIsClose(prev => !prev) }>
                    <PanelLeft className='w-5 h-5'/>
                    <div className={`absolute top-14 left-0 whitespace-nowrap -translate-y-1/2 bg-black w-auto rounded-xl text-white text-xs p-2 shadow-lg
                        transition-all duration-300 ease-out
                        ${onIcon ? 'animate-poyon' : 'opacity-0'}`}
                    >
                        {isClose? "サイドバーを開く" : "サイドバーを閉じる"}
                    </div>
                </div>
            </div>
            {!isClose && children}

        </aside>
    )
};
