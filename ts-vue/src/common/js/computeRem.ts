const UI_BASE_WIDTH: number = 1080;

export function computeRem(): void {
    const docEl: HTMLElement = document.documentElement;
    const clientWidth: number = docEl.clientWidth;
    const clientHeight: number = docEl.clientHeight;
    if (!clientWidth) return;
    if (clientWidth >= UI_BASE_WIDTH) {
        // docEl.style.fontSize = (750 / clientWidth) * 100 + "px";
        // this.$store.commit("setRem", (750 / clientWidth) * 100);
        docEl.style.fontSize = 100 + "px";
    } else {
        docEl.style.fontSize = (clientWidth / UI_BASE_WIDTH) * 100 + "px";
    }
}
