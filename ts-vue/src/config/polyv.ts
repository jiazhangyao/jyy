// 保利威直播聊天室SDK
export const CHATROOM_SDK: string = `https://player.polyv.net/jssdk/polyv-chatroom.min.js`;
// 保利威直播聊天室socket地址
export const CHATROOM_SOCKET: string = 'https://chat.polyv.net';
// 保利威视直播播放器SDK地址
export const LIVE_PLAYER_SDK: string = 'https://player.polyv.net/livesdk/polyv-live.min.js';
// 保利威直播后台appId
let appId: string = '';

// 开发环境
if (process.env.NODE_ENV !== 'production') {
    appId = 'eznxyp8ir7';
}
// 测试环境
if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER === 'devServer') {
    appId = 'eznxyp8ir7';
}
// 生产环境
if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER === 'prodServer') {
    appId = '';
}

const CHATROOM_USER_TYPE_MAP: { [key: string]: string } = {
    teacher: '讲师',
    student: '', // 学生
    slice: '', // 云课堂学员
    manager: '管理员',
    assistant: '助教',
    guest: '', // 嘉宾
    viewer: '' // 参与者
};

export { appId, CHATROOM_USER_TYPE_MAP };
