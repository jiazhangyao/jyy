declare const PolyvChatRoom: any;

declare const PolyvLiveSdk: any;

interface OnlineUserListInfo {
    count: number;
    userlist: OnlineUserInfo[];
}

interface OnlineUserInfo {
    actor?: string;
    banned?: boolean;
    channelId?: string;
    clientIp?: string;
    nick: string;
    pic: string;
    roomId?: string;
    uid?: string;
    userId: string;
    userType: string;
}

interface SpeakInfo {
    EVENT?: "SPEAK";
    id: string;
    time: number;
    user: OnlineUserInfo;
    content: string;
    reward?: boolean;
    custom?: boolean;
    currentUser?: boolean;
    imgchat?: boolean;
    formatTime?: string;
    specialUser?: boolean;
    msgType?: string;
}

type UserType = 'teacher' | 'admin' | 'guest' | 'assistant' | 'viewer';

interface PolyvLiveConfig {
    pptEl?: string; // ppt文档元素选择器，非云课堂可不填
    el: string; // 讲师区域元素
    width?: string | number; // 讲师区域宽，默认'100%'
    height?: string | number; // 讲师区域高，默认'100%'
    pptWidth?: string | number; // ppt区域宽，默认'100%'
    pptHeight?: string | number; // ppt区域高，默认'100%'
    type?: 'auto' | 'live' | 'vod' | 'record'; // 播放器播放类型，'auto'(根据频道实际设置自动选择播放类型) 、'live'(直播) 、'vod'(回放) 、'record'(暂存), 默认'auto'，选择'auto'后，播放器会以直播 -> 回放列表视频 -> 第一个暂存视频（优先级由大到小）的优先级播放
    autoplay?: boolean; // 是否自动播放，默认false
    audioMode?: boolean; // 讲师画面以音频模式播放, 默认false
    controller?: boolean; // 是否显示控制栏, 默认true
    controllerPosition?: string; // 控制栏现在在哪个区域 'ppt'（ppt区域）、'player'（讲师区域）, 默认ppt
    pptNav?: boolean; // 是否显示ppt控制控件，默认true
    pptNavBottom?: string; // ppt控制栏距离底部距离，例 //pptNavBottom: '50px'
    pptPlaceholder?: boolean; // 是否在直播模式并且当前暂无直播时在ppt区域显示占位图，默认false
    fileId?: string; // ppt数据id，回放模式必填
    url?: string; // 回放视频链接，回放模式必填
    sessionId?: string; // 回放场次id，回放模式必填
    vid?: string; // 回放id，回放模式下传入该参数可不传fileId、url、sessionId
    barrage?: boolean; // 是否开启弹幕，默认 false
    defaultBarrageStatus?: boolean; // 播放器加载时弹幕转台是否显示开启，默认 true
    switchPlayer?: boolean; // 是否在控制栏显示ppt与player切换按钮，用于实现主副屏切换，需要监听player实例的'switchPlayer' 事件做处理，移动端不响应改事件，默认false
    controllerEl?: HTMLElement; // 控制栏区域，设置后控制栏不跟随ppt与播放器的位置，设置后点击全屏会将控制栏所在元素全屏，可以实现全屏后同时显示ppt与讲师
}

