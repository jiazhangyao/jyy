import { Vue, Component, Ref } from "vue-property-decorator";
import { computeRem } from "@/common/js/computeRem";
import ChatRoom from "@/components/TeacherLive/ChatRoom.vue";
import studentQuestion from "@/components/TeacherLive/studentQuestion.vue";

@Component
export default class AreaSizeControlMixins extends Vue {
    protected limitHeight: number = 405; // 模块最小高度限制
    protected controlLineHeight: number = 12; // 控制线高度（粗细）
    protected containerHeight: number = 1920; // 主体容器高度
    protected areaTopHeight: number =
        this.containerHeight / 2 - this.controlLineHeight; // 上部区域高度
    protected areaBottomHeight: number =
        this.containerHeight - this.controlLineHeight - this.areaTopHeight - 2; // 下部区域高度,需预留 2px给hover事件边框

    protected debounceComputeSizeTimer!: number; // 防抖计时器

    protected mouseDownFlag: boolean = false;

    protected beforeScreenY: number = 0;

    @Ref() protected readonly chatRoom!: ChatRoom;

    @Ref() protected readonly studentQuestion!: studentQuestion;

    protected mounted(): void {
        this.computeSize();
        window.addEventListener("resize", this.debounceComputeSize);
    }

    protected destroyed(): void {
        window.removeEventListener("resize", this.debounceComputeSize);
        // 退出后移除fontsize
        document.documentElement.style.fontSize = "";
    }

    protected handleMouseDown(e: MouseEvent): void {
        this.mouseDownFlag = true;
        this.beforeScreenY = e.screenY;
        this.limitHeight = (document.getElementById('teacherAnswer') as HTMLElement).clientHeight;
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mouseleave', this.handleMouseLeave);
        document.documentElement.style.cursor = 'ns-resize';
    }

    protected handleMouseMove(e: MouseEvent): void {
        if (this.mouseDownFlag) {
            // 上移
            if (this.beforeScreenY - e.screenY >= 0 && this.areaTopHeight <= this.limitHeight) {
                return;
            }
            // 下移
            if (e.screenY - this.beforeScreenY > 0 && this.areaBottomHeight <= this.limitHeight) {
                return;
            }
            this.areaTopHeight = this.areaTopHeight - (this.beforeScreenY - e.screenY);
            this.areaBottomHeight = this.containerHeight - this.controlLineHeight - this.areaTopHeight - 2;
            this.beforeScreenY = e.screenY;
            // (this.chatRoom as any).scrollToBottom();
            // (this.studentQuestion as any).scrollToBottom();
        }
    }

    protected handleMouseUp(e: MouseEvent): void {
        this.mouseDownFlag = false;
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mouseleave', this.handleMouseLeave);
        document.documentElement.style.cursor = '';
        (this.chatRoom as any).scrollToBottom();
        (this.studentQuestion as any).scrollToBottom();
    }

    protected handleMouseLeave(e: MouseEvent): void {
        this.mouseDownFlag = false;
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mouseleave', this.handleMouseLeave);
        document.documentElement.style.cursor = '';
        (this.chatRoom as any).scrollToBottom();
        (this.studentQuestion as any).scrollToBottom();
    }

    // 防抖-计算各种尺寸
    private debounceComputeSize(): void {
        clearTimeout(this.debounceComputeSizeTimer);
        this.debounceComputeSizeTimer = setTimeout(() => {
            this.computeSize();
        }, 200);
    }

    // 计算各种尺寸
    private computeSize(): void {
        // 计算rem
        computeRem();
        // 计算主体容器高度
        this.containerHeight =
            window.innerHeight -
            (document.getElementById("teacherLiveTopBar") as HTMLElement)
                .clientHeight;
        this.areaTopHeight = this.containerHeight / 2 - this.controlLineHeight;
        this.areaBottomHeight =
            this.containerHeight - this.controlLineHeight - this.areaTopHeight - 2;
    }
}
