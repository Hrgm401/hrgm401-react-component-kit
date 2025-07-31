import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const Sidebar = ({ children }: Props ) => {

    return (
        <aside style={{ height: '100vh' }} className="w-64 h-screen bg-slate-50 shadow p-4 flex-shrink-0 border-e border-slate-200">
            {children}
        </aside>
    )
};
