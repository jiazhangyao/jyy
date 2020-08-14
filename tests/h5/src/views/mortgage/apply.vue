<template>
    <div>
        <NavBar :navTitle="title" />
        <div class="tran_detail">
            <PanelCard :list='ywInfo' kind='业务信息' />
            <PanelCard :list='cqInfo' kind='产权信息' />
            <PanelCard :list='jyInfo' kind='交易信息' />
            <PanelCard :list='sellerInfo' kind='转让人信息' v-if="registerType == 5010 || registerType == 5030" />
            <PanelCard :list='buyerInfo' :kind=" registerType === 5020 ? '申请人信息' : '受让人信息' " />
            <PanelCard :kind=" registerType === 5020 ? '申请人询问信息' : buyerOrSeller === 1 ? '转让人询问信息' : '受让人询问信息' " desc='1.申请事项是否为申请人真实意思'
                :status='isState[askInfo.isLaw] && isState[askInfo.isLaw].text || "-"' />
            <PanelCard :list='ownerData' desc='2.申请登记的房屋有无共有人' cls="together"
                :status='isState[askInfo.haveJoinOwner] && isState[askInfo.haveJoinOwner].text || "-"' />
            <PanelCard desc='3.是否保证所提交的申请登记材料、申请信息真实、合法、有效、如有不实，愿承担一切法律责任，与登记机构无关' cls="together"
                :status='isState[askInfo.isReal] && isState[askInfo.isReal].text || "-"' />

            <div class="cell_wrap">{{registerType === 5020 ? '申请人' : buyerOrSeller === 1 ? "转让人" : "受让人"}}申请信息签名</div>
            <CellCard :list='signData' :conData='signState' :sign=true @func="getSignSee" :imgs='signImgs' />
            <Popup v-model="showImg">
                <img class="img" :src='imgURL' />
            </Popup>
            <div v-if="butShow">
                <div class="btns_wrap" @click="signs">
                    <FullButton name="前往签名" class="blue" />
                </div>
                <div @click='sub_fail'>
                    <FullButton name="终止" class="nobg" />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    import { Dialog, Popup } from 'vant';
    import PanelCard from "@/components/panelCard.vue";
    import CellCard from "@/components/cellCard.vue";
    import FullButton from "@/components/fullButton.vue";
    import { mapState } from 'vuex'
    import { signStateText, isText } from "./const.js";
    export default {
        data() {
            return {
                name: 'transfer-apply',
                title: '转移登记信息',
                showImg: false,
                signState: signStateText,
                isState: isText,
                cqInfo: [],
                jyInfo: [],
                ywInfo: [],
                imgURL: ''
            }
        },
        components: {
            PanelCard,
            CellCard,
            FullButton,
            Popup
        },
        created() {
            this.$store.dispatch('applyinfo/getApplyInfo', this.$store.getters.transferParams);
        },
        computed: {
            ...mapState({
                sellerInfo: state => state.applyinfo.sellerInfo,
                buyerInfo: state => state.applyinfo.buyerInfo,
                ownerData: state => state.applyinfo.ownerData,
                signData: state => state.applyinfo.signData,
                signImgs: state => state.applyinfo.signImgs,
                askInfo: state => state.applyinfo.askInfo,
                buyerOrSeller: state => state.applyinfo.buyerOrSeller,
                butShow: state => state.applyinfo.butShow,
                registerType: state => state.applyinfo.registerType,
            })
        },
        mounted() {
            const { state: { applyinfo: { ywInfo, cqInfo, jyInfo } } } = this.$store;
            this.ywInfo = ywInfo;
            this.cqInfo = cqInfo;
            this.jyInfo = jyInfo;
        },
        // /web/api/file/{key}.{ext}
        methods: {
            signs() {
                // 1 申请书 2 合同
                this.$router.push({ name: 'certificationh5', params: { paramList: 'apply', h5: true } })
            },
            getSignSee(index, imgs) {
                if (imgs) {
                    imgs.map((item, i) => {
                        if (index == i && item.applicationSignStatus === 1) {
                            this.showImg = true;
                            this.imgURL = '/web/api/file/' + item.applicationKey + '.' + item.applicationExt;
                        }
                    })
                }
            },
            // 1、确认 2、终止 ,
            sub_fail() {
                Dialog.confirm({
                    title: '提示',
                    message: '终止后，本次交易将结束！是否需要终止？',
                }).then(() => {
                    this.$store.dispatch('applyinfo/applyInfoSign', { confirmStatus: 2 })
                }).catch(() => {
                    this.$router.go(-1);
                });
            },
        },
    }
</script>

<style lang="less">
    .tran_detail {
        font-size: 14px;
        padding: 16px;
        background-color: #f5f5f5;

        .cell_wrap {
            font-size: 16px;
            color: #333333;
            background-color: #fff;
            padding: 16px 12px 4px;
            font-weight: 700;
        }

        .cellcard_wrap .transfer-main {
            margin-bottom: 0;
        }

        .van-cell__title {
            font-weight: 700;
        }

        .btns_wrap {
            padding: 16px 0;

            .nobg {
                margin-top: 16px;
            }
        }

        .img {
            display: inline-block;
            width: 250px;
            height: 250px;
        }
    }
</style>