//ピクセルをパーセンテージに変えるutilメソッド
export const pixelToPercent = (targetPx: number, containerRef: React.RefObject<HTMLElement | null>) => {
    if (!containerRef.current) return 0;
    return (targetPx / containerRef.current.offsetWidth) * 100;
};