/**
 * キーボードイベント時、アニメーションrippleを適用する
 * @param element   HTML要素
 * @returns
 */
export const triggerRipple = (element: HTMLElement | null) => {
    if (!element) return;
    // scale(0) + 不透明に即座に変更
    element.classList.add("ripple-trigger");
    // 次の2フレームで除去：transitionが広がって消える
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.classList.remove("ripple-trigger");
        });
    });
};
