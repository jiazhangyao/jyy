import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $messagevalue: { [propName: string]: string };
        $mathQueue: (element: HTMLElement, callback: () => void) => void;
        $author: any;
        $matomo: any;
    }
}
