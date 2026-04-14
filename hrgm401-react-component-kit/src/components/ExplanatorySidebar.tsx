/**
 * @file src/components/ExplanatorySidebar.tsx
 * @description 右側から表示される汎用サイドバーコンポーネント
 */
import React from "react";
import { ClosedButton } from "./ClosedButton";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const ExplanatorySidebar: React.FC<SidebarProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ease-in-out ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />
            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white text-gray-700 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <ClosedButton aria-label="閉じる" handleClose={onClose} className="transition-colors" />
                </div>
                <div className="p-6 overflow-y-auto h-[calc(100%-65px)]">{children}</div>
            </div>
        </>
    );
};
