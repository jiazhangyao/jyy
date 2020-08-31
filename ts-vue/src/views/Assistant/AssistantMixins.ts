import { Component, Vue, Ref } from "vue-property-decorator";
import { CHATROOM_SDK, LIVE_PLAYER_SDK, appId } from '@/config/polyv';
import { getPolyvChatToken, getPolyvChatHistory, getPolyvChatStudentQuestionHistory, getVideoSocket, getPolyvChatBannedList, getPlanDetailInfo, delPolyvChatBarrage, getPolyvApiSignInfo } from '@/server/Video';
import { EXPRESS_LIST, POLYV_EXPRESS_PATH, EXPRESS_REG } from "@/config/express";
import Dayjs from "dayjs";
import ChatRoom from "@/components/Assistant/ChatRoom.vue";
import OnlineUser from "@/components/Assistant/OnlineUser.vue";
import studentQuestion from "@/components/Assistant/studentQuestion.vue";
import { getToken } from '@/server/base';
import { ANSWER_STUDENT_NAME_PLACEHOLDER } from "@/config/liveConfig";
import { SOCKET_RELINK_TIME } from '@/config/socket';
import md5 from 'js-md5';
import { AxiosResponse, AxiosPromise } from 'axios';

@Component
export default class AssistantMixins extends Vue {
    // 聊天室对象
    protected polyvChatRoom: any;
    // 聊天室chat对象
    protected chat: any;
    // 聊天室socket对象
    protected chatSocket: any;
    // 加载状态
    protected loading: boolean = true;
    // 课程id
    protected subjectId: number = 323;
    // 课次id
    protected planId: number = 1504;
    // 房间(频道)号
    protected roomId: number = 565988; // 开发使用
    // 在线学员
    protected onlineUserList: OnlineUserInfo[] = [];
    // 禁言用户列表
    protected bannedUserList: string[] = [];
    // 在线学员单页数量
    protected onlineUserListPageCount: number = 9999;
    // 在线学员当前页码
    protected onlineUserListPageNumber: number = 1;
    // 聊天记录
    protected speakList: SpeakInfo[] = [];
    // 进入聊天室时间
    protected startTimeStamp!: number;
    // 在线列表刷新防抖
    protected onlineUserListReloadTimer!: number;
    // 提问记录
    protected studentQuestionList: any[] = [];
    // 自有socket
    protected jiahuiSocket!: WebSocket;
    // 学生信息查询缓存
    protected studentInfoFindListCache: StudentInfoFindListCache = {};
    // 传递给保利威视的网校用户id，用于统计
    protected polyvUserId: string = this.$store.state.userInfo.id + '_';
    // 用户身份
    protected userType: UserType = this.$store.state.userInfo.role === 'SPEAKER' ? 'teacher' : 'assistant';
    // 回复对象信息存储
    protected teacherAnswerInfo: any = {};
    // socket重连计时器
    protected reLinkTimer!: number;
    // 课次信息
    protected planInfo: any = {};
    // polyv播放器实例
    protected liveSDK: any = null;


    @Ref() protected readonly chatRoom!: ChatRoom;

    @Ref() protected readonly onlineUser!: OnlineUser;

    @Ref() protected readonly studentQuestion!: studentQuestion;

    protected mounted(): void {
        const initChatRoom: () => void = () => {
            // 调用polyv接口换取token
            getPolyvChatToken(this.roomId.toString(), this.polyvUserId, this.userType).then(polyvres => {
                this.initChatRoom(polyvres.data.data);
            });
        };
        console.log(typeof this.$store.state.userInfo !== undefined);
        // if (typeof this.$store.state.userInfo !== undefined) {
        //     if (this.$store.state.userInfo.role !== 'HELPER') {
        //         this.$message.error('你不是辅导老师！');
        //         return;
        //     }
        // } else {
        //     this.$message.error('你还没有登录！');
        //     this.$router.replace('./login');
        // }
        // 获取频道id
        if (typeof this.$route.query.roomId === 'string' || typeof this.$route.query.roomId === 'number') {
            this.roomId = Number(this.$route.query.roomId);
        }
        // 获取课次id
        if (typeof this.$route.query.planId === 'string' || typeof this.$route.query.planId === 'number') {
            this.planId = Number(this.$route.query.planId);
        }
        // 获取课程id
        if (typeof this.$route.query.subjectId === 'string' || typeof this.$route.query.subjectId === 'number') {
            this.subjectId = Number(this.$route.query.subjectId);
        }
        this.polyvUserId = this.$store.state.userInfo.id + '_' + this.subjectId;
        if (typeof PolyvChatRoom === 'undefined') {
            const script: HTMLScriptElement = document.createElement("script");
            script.type = "text/javascript";
            script.src = CHATROOM_SDK;
            document.getElementsByTagName("head")[0].appendChild(script);
            script.onload = initChatRoom;
        } else {
            initChatRoom();
        }
        if (typeof PolyvLiveSdk === 'undefined') {
            const script: HTMLScriptElement = document.createElement("script");
            script.type = "text/javascript";
            script.src = LIVE_PLAYER_SDK;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
        console.log(this.onlineUser);
        // 获取礼物信息
        // getGiftList().then(res => {
        //     console.log(res);
        // });

    }

    /**
     * 初始化聊天室
     *
     * @protected
     * @param {{ mediaChannelKey: string, token: string }} chatRoomToken
     * @memberof PolyvChatRoomMixins
     */
    protected initChatRoom(chatRoomToken: { mediaChannelKey: string, token: string }): void {
        this.startTimeStamp = new Date().getTime();
        this.polyvChatRoom = new PolyvChatRoom({
            roomId: this.roomId.toString(),
            userId: this.polyvUserId,
            pic: this.$store.state.headerImg,
            nick: this.$store.state.userInfo.name,
            userType: this.userType,
            token: chatRoomToken.token,
            mediaChannelKey: chatRoomToken.mediaChannelKey,
            version: '2.0',
            roomMessage: (data: any) => {
                // TODO
                // data为聊天室socket消息，当有聊天室消息时会触发此方法
                console.log(data);
                switch (data.EVENT) {
                    case "LOGIN": // 登录
                        this.handleOnlineUserListChange(data);
                        break;
                    case "LOGOUT": // 登出
                        this.handleOnlineUserListChange(data);
                        break;
                    case "TEACHER_INFO": // 老师信息
                        break;
                    case "O_TEACHER_INFO": // 助教信息
                        break;
                    case "SPEAK": // 有人发言
                        this.handleChatSpeak(data);
                        break;
                    case "SEND_MESSAGE": // 自己发言
                        break;
                    case "KICK": // 踢人
                        // this.reloadOnlineUserList();
                        break;
                    case "ADD_SHIELD": // 禁言
                        this.handleShieldStatusChange(data);
                        break;
                    case "REMOVE_SHIELD": // 解除禁言
                        this.handleShieldStatusChange(data);
                        break;
                    case "S_QUESTION": // 学生提问
                        this.handleStudentAskQuestion(data);
                        break;
                    case "T_ANSWER": // 老师/管理员/助教回复提问
                        this.handleStudentAskQuestion(data);
                        break;
                    case "REWARD": // 有人打赏(送礼)
                        this.handleStudentReward(data);
                        break;
                    case "SELF_SPEAK": // 当前用户本人发言
                        this.handleChatSpeak(data);
                        break;
                }
            }
        });
        this.chat = this.polyvChatRoom.chat;
        this.chatSocket = this.chat.socket;
        // 初始化
        Promise.all([
            // 获取在线列表
            this.handleGetOnlineUserList({ onlineUserListPageNumber: this.onlineUserListPageNumber, onlineUserListPageCount: this.onlineUserListPageCount }),
            // 创建livecenter项目socket连接
            this.createJiahuiSocket(),
            // 获取课次信息
            this.getPlanDetailInfo(),
            // 初始化保利威视播放器
            this.initLivePlayer()
        ]).then(res => {
            return Promise.all([
                // 获取历史提问信息
                this.getStudentAskQuestionHistory(),
                // 获取历史信息
                this.getHistoryMessage()
            ]).then(() => {
                this.loading = false;
            });
        }).catch(err => {
            console.log(err);
            this.loading = false;
            this.$message.error('初始化失败，请重试');
        });
    }

    /**
     * 初始化polyv播放器
     *
     * @protected
     * @returns {Promise<any>}
     * @memberof AssistantMixins
     */
    protected initLivePlayer(): Promise<any> {
        return getPolyvApiSignInfo({ channelId: this.roomId.toString(), appId }).then(res => {
            this.liveSDK = new PolyvLiveSdk({
                channelId: this.roomId,
                appId,
                sign: res.data.retval.sign,
                timestamp: res.data.retval.timestamp,
                socket: this.chatSocket,
                user: {
                    userId: this.polyvUserId,
                    userName: this.$store.state.userInfo.name,
                    pic: this.$store.state.headerImg
                }
            });
            const config: PolyvLiveConfig = {
                el: '#polyvLivePlayerContainer',
                type: 'live'
            };
            // 监听频道信息并初始化播放器
            this.liveSDK.on(PolyvLiveSdk.EVENTS.CHANNEL_DATA_INIT, (event: any, data: any) => {
                console.log(event, data);
                this.liveSDK.setupPlayer(config);
            });
        });
    }

    /**
     * 获取课次详情
     *
     * @protected
     * @returns {(Promise<void | AxiosResponse<any>>)}
     * @memberof AssistantMixins
     */
    protected getPlanDetailInfo(): Promise<void | AxiosResponse<any>> {
        return getPlanDetailInfo(this.planId).then(res => {
            this.planInfo = res.data.retval;
        });
    }

    /**
     * 获取历史聊天记录
     *
     * @protected
     * @memberof PolyvChatRoomMixins
     */
    protected getHistoryMessage(): Promise<any> {
        console.log(this.planInfo.startTime, this.startTimeStamp);
        // TODO: 接入直播列表后修改为获取直播开始时至当前为止的聊天记录
        return getPolyvChatHistory(this.roomId.toString(), Dayjs(this.planInfo.startTime).format('YYYY-MM-DD HH:mm:ss'), Dayjs(this.startTimeStamp).format('YYYY-MM-DD HH:mm:ss')).then(res => {
            const historyMessage: any[] = res.data.data;
            for (let i: number = res.data.data.length - 1; i >= 0; i--) {
                this.speakList.unshift({
                    id: historyMessage[i].id,
                    user: historyMessage[i].user,
                    time: historyMessage[i].time,
                    content: typeof historyMessage[i].content === 'string' ? this.replaceAllExpress(historyMessage[i].content) : historyMessage[i].content,
                    msgType: historyMessage[i].msgType
                });
            }
        }).then(() => {
            (this.chatRoom as any).scrollToBottom();
        });
    }

    /**
     * 聊天室实时聊天信息处理
     *
     * @protected
     * @param {*} data
     * @memberof PolyvChatRoomMixins
     */
    protected handleChatSpeak(data: any): void {
        if (data.EVENT === 'SELF_SPEAK') {
            data.content = data.values[0];
        }
        // 处理表情
        data.content = this.replaceAllExpress(data.content);
        // 添加至聊天记录并显示
        this.speakList.push(data);
    }

    /**
     * 识别并替换表情
     *
     * @protected
     * @param {string} content
     * @returns {string}
     * @memberof PolyvChatRoomMixins
     */
    protected replaceAllExpress(content: string): string {
        let newContent: string = '';
        function replaceExpress(text: string): any {
            // 匹配中括号[]内容
            const expressMatchArray: RegExpMatchArray | null = text.match(EXPRESS_REG);
            if (expressMatchArray !== null) {
                // 查询是否为表情
                const expressListIndex: number = EXPRESS_LIST.indexOf(expressMatchArray[0]);
                if (expressListIndex !== -1) {
                    // 替换为img
                    newContent = newContent.concat(text.slice(0, (expressMatchArray.index as number)) + `<img class="express_img" src="${POLYV_EXPRESS_PATH + (expressListIndex + 1)}.png" alt="${typeof expressMatchArray[0] === 'string' ? `[${expressMatchArray[0]}]` : ''}"/>`);
                } else {
                    // 保留原字符
                    newContent = newContent.concat(text.slice(0, (expressMatchArray.index as number)) + expressMatchArray[0]);
                }
                // 递归匹配后面的字符串
                replaceExpress(text.slice(expressMatchArray[0].length + (expressMatchArray.index as number)));
            } else {
                newContent = newContent.concat(text);
            }
        }
        replaceExpress(content);
        return newContent;
    }

    /**
     * 加载在线学员
     *
     * @protected
     * @param {{ onlineUserListPageNumber: number, onlineUserListPageCount: number }} data
     * @memberof PolyvChatRoomMixins
     */
    protected handleGetOnlineUserList(data: { onlineUserListPageNumber: number, onlineUserListPageCount: number }): void {
        // 参数：页码，数量
        this.chat.getUserList(data.onlineUserListPageNumber, data.onlineUserListPageCount).then((res: OnlineUserListInfo) => {
            // 检测去除讲师
            let tmp: OnlineUserInfo[] = [];
            const indexCache: number[] = [];
            res.userlist.forEach((e, index) => {
                if (e.userType === 'teacher') {
                    indexCache.push(index);
                }
            });
            tmp = res.userlist.filter((e, index) => {
                if (indexCache.indexOf(index) === -1) {
                    return e;
                }
            });
            this.onlineUserList.push(...tmp);
        });
    }

    /**
     * 添加/解除禁言处理
     *
     * @protected
     * @param {*} data
     * @memberof PolyvChatRoomMixins
     */
    protected handleShieldStatusChange(data: any): void {
        if (data.data.banType === 'userId') {
            const index: number = this.onlineUserList.findIndex(e => {
                return e.userId === data.data.userId;
            });
            if (index !== -1) {
                if (data.EVENT === "ADD_SHIELD") {
                    this.onlineUserList[index].banned = true;
                } else {
                    this.onlineUserList[index].banned = false;
                }
            }
            if (data.EVENT === "ADD_SHIELD") {
                this.bannedUserList.push(this.onlineUserList[index].userId);
            } else {
                this.bannedUserList.splice(index, 1);
            }
        }
    }

    /**
     * 提问区新消息处理
     *
     * @protected
     * @param {*} data
     * @memberof PolyvChatRoomMixins
     */
    protected handleStudentAskQuestion(data: any): void {
        // 处理表情
        data.content = this.replaceAllExpress(data.content);
        // 添加至聊天记录并显示
        const length: number = this.studentQuestionList.push(data);
        // TODO: 逻辑优化，防止不必要查询
        if (data.EVENT === 'T_ANSWER') {
            this.selectNeedInfoUserIdPushInCache(data, length - 1);
            if (typeof data.s_userId === 'string' && data.s_userId !== '') {
                this.findUserNameByUserIds([data.s_userId.split('_')[0]]);
                if (this.teacherAnswerInfo !== null && this.teacherAnswerInfo.messageData !== undefined) {
                    const messageData: any = JSON.parse(this.teacherAnswerInfo.messageData);
                    if (data.user.userId === this.polyvUserId && data.content === messageData.content && data.s_userId === messageData.s_userId) {
                        this.$set(this.studentQuestionList[length - 1], 'studentContent', this.teacherAnswerInfo.content);
                    }
                }
            }
        }
    }

    /**
     * 获取咨询提问历史记录
     *
     * @protected
     * @returns {Promise<any>}
     * @memberof PolyvChatRoomMixins
     */
    protected getStudentAskQuestionHistory(): Promise<any> {
        return getPolyvChatStudentQuestionHistory(this.roomId.toString()).then(res => {
            // 此处polyv接口与历史弹幕接口返回值排序逻辑相反
            const historyQuestion: any[] = res.data.data;
            for (let i: number = 0; i <= historyQuestion.length - 1; i++) {
                // 倒叙推入提问区
                this.studentQuestionList.unshift({
                    id: historyQuestion[i].id,
                    user: historyQuestion[i].user,
                    time: historyQuestion[i].time,
                    content: this.replaceAllExpress(historyQuestion[i].content),
                    s_userId: historyQuestion[i].s_userId,
                    EVENT: historyQuestion[i].event
                });
            }
            // 遍历提问区记录查询老师回复中所有需要查询的回复对象userid
            for (let i: number = 0; i <= this.studentQuestionList.length - 1; i++) {
                this.selectNeedInfoUserIdPushInCache(this.studentQuestionList[i], i);
            }
            // TODO: 逻辑优化，防止不必要查询
            console.log(this.studentInfoFindListCache);
            const needFindList: string[] = Object.keys(this.studentInfoFindListCache);
            if (needFindList.length > 0) {
                this.findUserNameByUserIds(needFindList);
            }
        }).then(() => {
            (this.studentQuestion as any).scrollToBottom();
        });
    }

    /**
     * 将待查询回复对象userid相关信息存入缓存
     *
     * @protected
     * @param {*} data
     * @param {number} index
     * @memberof ChatRoomMixins
     */
    protected selectNeedInfoUserIdPushInCache(data: any, index: number): void {
        if (data.EVENT === 'T_ANSWER' && typeof data.s_userId === 'string' && data.s_userId !== '') {
            // 网校传给polyv的userid结构为 ${userId}_${subjectId}
            const userId: any = data.s_userId.split('_')[0];

            if (this.studentInfoFindListCache.hasOwnProperty(userId)) {
                this.studentInfoFindListCache[userId].idxs.push(index);
            } else {
                this.studentInfoFindListCache[userId] = {
                    idxs: [index],
                    name: ANSWER_STUDENT_NAME_PLACEHOLDER,
                    mobile: '',
                    s_userid: data.s_userId
                };
            }
        }
    }

    /**
     * 通过id批量查询用户信息
     *
     * @protected
     * @param {string[]} ids
     * @returns {*}
     * @memberof ChatRoomMixins
     */
    protected findUserNameByUserIds(ids: string[]): any {
        const ids_string: string = ids.join(',');
        this.checkJiahuiSocketIsReady(this.jiahuiSocket).then(res => {
            this.jiahuiSocket.send(JSON.stringify({
                userId: this.$store.state.userInfo.id,
                messageType: "select",
                ids: ids_string,
                token: getToken()
            }));
        }).catch(err => {

        });
    }

    /**
     * 处理某个提问区内容被点击事件
     *
     * @protected
     * @param {*} e
     * @memberof ChatRoomMixins
     */
    protected handleSelectQuestion(e: any): void {

        if (e.event === 'S_QUESTION' || e.EVENT === 'S_QUESTION') {
            console.log('handleSelectQuestion', e);
            this.teacherAnswerInfo = {
                user: e.user,
                content: e.content
            };
        }
    }

    /**
     * 老师回复消息事件处理
     *
     * @protected
     * @param {*} e
     * @memberof ChatRoomMixins
     */
    protected handleSendAnswer(e: any): void {
        const messageData: string = JSON.stringify({
            EVENT: 'T_ANSWER',
            roomId: this.roomId,
            user: {
                userId: this.polyvUserId,
                pic: this.$store.state.headerImg,
                nick: this.$store.state.userInfo.name,
                userType: this.userType,
                actor: this.userType === 'teacher' ? '讲师' : '助教'
            },
            s_userId: e.s_userId,
            content: e.content
        });
        this.chatSocket.emit('message', messageData);
        this.teacherAnswerInfo.messageData = messageData;
    }

    /**
     * 创建Video项目socket连接
     *
     * @protected
     * @returns {Promise<any>}
     * @memberof PolyvChatRoomMixins
     */
    protected createJiahuiSocket(): Promise<any> {
        return new Promise((ok, err) => {
            clearTimeout(this.reLinkTimer);
            // 初始化video项目socket 此处userid不能使用this.userId
            this.jiahuiSocket = getVideoSocket(this.$store.state.userInfo.id.toString(), this.planId.toString());
            console.log(this.jiahuiSocket);
            this.jiahuiSocket.onopen = (e: Event) => {
                ok(e);
            };
            this.jiahuiSocket.onerror = (e: Event) => {
                this.jiahuiSocket.close();
                console.log('error', e, this.jiahuiSocket);
                err(e);
            };
            this.jiahuiSocket.onclose = (e: Event) => {
                console.log('closed', e, this.jiahuiSocket);
                this.reLinkTimer = setTimeout(() => {
                    this.createJiahuiSocket();
                }, SOCKET_RELINK_TIME * 1000);
                err(e);
            };
            this.jiahuiSocket.onmessage = (e: MessageEvent) => {
                this.handleJiahuiSocketOnMessage(e);
            };
        });
    }

    /**
     * Video项目socket接受消息处理
     *
     * @protected
     * @param {MessageEvent} e
     * @memberof PolyvChatRoomMixins
     */
    protected handleJiahuiSocketOnMessage(e: MessageEvent): void {
        console.log(JSON.parse(e.data));
        let data: any;
        try {
            data = JSON.parse(e.data);
        } catch (e) {
            console.log(e);
        }
        console.log(data);
        if (data.code === '0') {
            switch (data.event) {
                case 'select_member': // 批量查询学生信息返回
                    this.handleSelectMemberOver(data);
                    break;
            }
        } else {
            console.log('scoketResponseErr:', data);
        }
    }

    /**
     * 处理学生信息查询结果
     *
     * @protected
     * @param {*} data
     * @memberof PolyvChatRoomMixins
     */
    protected handleSelectMemberOver(data: any): void {
        console.log(data);
        // 将查询到的信息存入缓存
        for (const studentInfo of data.data) {
            if (this.studentInfoFindListCache.hasOwnProperty(studentInfo.id)) {
                this.studentInfoFindListCache[studentInfo.id].mobile = studentInfo.mobile;
                this.studentInfoFindListCache[studentInfo.id].name = studentInfo.name;
            }
        }
        const delList: string[] = [];
        // 遍历插入学生信息
        for (const userId in this.studentInfoFindListCache) {
            if (this.studentInfoFindListCache.hasOwnProperty(userId)) {
                const name: string = this.studentInfoFindListCache[userId].name;
                if (name !== ANSWER_STUDENT_NAME_PLACEHOLDER && name !== '') {
                    for (const idx of this.studentInfoFindListCache[userId].idxs) {
                        this.$set(this.studentQuestionList[idx], 'studentName', name);
                    }
                }
                delList.push(userId);
            }
        }

        // 出栈,清空需要补充姓名的列表
        for (const userId of delList) {
            this.studentInfoFindListCache[userId].idxs = [];
        }
    }

    /**
     * 检查socket是否就绪
     *
     * @protected
     * @param {WebSocket} socket
     * @returns {Promise<any>}
     * @memberof PolyvChatRoomMixins
     */
    protected checkJiahuiSocketIsReady(socket: WebSocket): Promise<any> {
        return new Promise((ok, err) => {
            switch (socket.readyState) {
                case 0:
                    err('connecting');
                case 1:
                    ok('open');
                case 2:
                    err('closing');
                case 3:
                    err('closed');
            }
        });
    }

    /**
     * 学生送礼(打赏)处理
     *
     * @protected
     * @param {*} data
     * @memberof AssistantMixins
     */
    protected handleStudentReward(data: any): void {
        // 处理表情
        data.user = data.content.rewardUser;
        data.msgType = 'reward';
        // 添加至聊天记录并显示
        this.speakList.push(data);
    }

    /**
     * 搜索禁言列表
     *
     * @protected
     * @memberof AssistantMixins
     */
    protected handleSearchBannedUserList(): void {
        getPolyvChatBannedList(this.roomId.toString()).then(res => {
            this.bannedUserList = res.data.data;
        });
    }

    /**
     * 登陆/登出事件处理
     *
     * @protected
     * @param {*} data
     * @memberof AssistantMixins
     */
    protected handleOnlineUserListChange(data: any): void {
        if (data.EVENT === 'LOGIN') {
            const index: number = this.onlineUserList.findIndex(e => {
                return e.userId === data.user.userId;
            });
            if (index === -1 && data.user.userType !== 'teacher') {
                this.onlineUserList.push(data.user);
            }
        } else if (data.EVENT === 'LOGOUT') {
            const index: number = this.onlineUserList.findIndex(e => {
                return e.userId === data.userId;
            });
            if (index !== -1) {
                this.onlineUserList.splice(index, 1);
            }
        }
    }

    /**
     * 禁言/解除禁言用户
     *
     * @protected
     * @memberof AssistantMixins
     */
    protected handleBannedUser(e: any): void {
        const messageData: any = {
            EVENT: e.type === 'ban' ? 'SHIELD' : 'REMOVE_SHIELD',
            roomId: this.roomId,
            channelId: this.roomId,
            type: 'userId', // 踢出类型，ip/userId
            value: e.userId, // 用户的ip或userId值
            sign: md5('polyv_room_sign' + this.roomId)
        };
        this.chatSocket.emit('message', JSON.stringify(messageData));
    }

    /**
     * 发送信息
     *
     * @protected
     * @param {string} e
     * @memberof AssistantMixins
     */
    protected handleSendMessage(e: string): void {
        if (typeof e === 'string' && e !== '') {
            const messageData: any = JSON.stringify({
                EVENT: 'SPEAK',
                values: [e],
                roomId: this.roomId
            });
            this.chatSocket.emit('message', messageData);
            this.speakList.push({
                content: this.replaceAllExpress(e),
                id: Math.random().toString(36).substring(2),
                time: new Date().getTime(),
                msgType: "",
                user: {
                    userId: this.polyvUserId,
                    pic: this.$store.state.headerImg,
                    nick: this.$store.state.userInfo.name,
                    userType: this.userType
                }
            });
        }
    }

    /**
     * 删除单条弹幕记录
     *
     * @protected
     * @param {string} barrageId
     * @memberof AssistantMixins
     */
    protected handleDelBarrage(barrageId: string): void {
        delPolyvChatBarrage(this.roomId.toString(), barrageId).then(res => {
            if (res.data.code === 200) {
                this.$message.success('操作成功');
            }
        });
    }


    protected destroyed(): void {
        this.destroyAll();
    }

    protected beforeRouteLeave(to: any, from: any, next: () => void): void {
        this.destroyAll();
        next();
    }

    // 退出时资源回收
    protected destroyAll(): void {
        // 清空计时器
        clearTimeout(this.reLinkTimer);
        clearTimeout(this.onlineUserListReloadTimer);
        // 关闭所有socket链接
        this.chatSocket.close();
        this.jiahuiSocket.close();
        // 销毁播放器实例
        this.liveSDK.destroy(true);
        this.liveSDK = null;
    }
}
