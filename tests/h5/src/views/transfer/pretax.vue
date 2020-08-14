<template>
    <div>
        <NavBar :navTitle="title" />
        <div class="pretax_wrap">
            <PanelCard :list='basicInfo' kind='基本信息' />
            <PanelCard :list='cqInfo' kind='产权信息' />
            <PanelCard :list='jyInfo' kind='交易信息' />
            <PanelCard :list='fgzInfo' kind='房屋评估信息' />
             <div class="pretax-wrap-icon">
                <p v-if="taxesPayerText === 1" @click="showIcon">!</p>
                <PanelCard :list='sellerTcInfo' kind='转让人套次信息' v-if="registerType == 5010 || registerType == 5030" />
            </div>
            <div class="pretax-wrap-icon">
                <p v-if="taxesPayerText === 2 || 3" @click="showIcon">!</p>
                <PanelCard :list='buyerTcInfo' :kind=" registerType === 5020 ? '申请人套次信息' : '受让人套次信息' " />
            </div>
            <PanelCard :list='noTaxInfo' kind='非税信息（元）' />
            <PanelCard :list='sellerTax' kind='转让人（义务人）预核税信息（元）' v-if="registerType == 5010 || registerType == 5030" />
            <PanelCard :list='buyerTax' :kind=" registerType === 5020 ? '申请人预核税信息（元）' : '受让人（权利人）预核税信息（元）' " />


            <p class="tip">以上预核算结果，与最终支付的账单有可能会有误差！</p>
            <div v-if="pretaxStatus === 0">
                <van-checkbox class="notice" v-model="checked" @change='subRead'>我已认真阅读并确认</van-checkbox>
                <section>
                    <div :class='["btns_wrap",this.checked ? "":"disabled"]' @click='subok'>
                        <FullButton name="无异议" class="blue" />
                    </div>
                    <div @click='sub_fail' :class='[this.checked ? "":"disabled"]'>
                        <FullButton name="有异议" class="nobg" />
                    </div>
                </section>
            </div>          
        </div>
    </div>
</template>

<script>
    import { Checkbox, Dialog } from 'vant';
    import PanelCard from "@/components/panelCard.vue";
    import FullButton from "@/components/fullButton.vue";
    import { mapState } from 'vuex';
    import router from "../../router";
    export default {
        data() {
            return {
                title: '转移登记预核税信息',
                checked: true,
                basicInfo: [],
                cqInfo: [],
                jyInfo: [],
                fgzInfo: [],
                noTaxInfo: [],
            }
        },
        components: {
            VanCheckbox: Checkbox,
            PanelCard,
            FullButton
        },
        created() {
            const transferToken = this.$store.getters.transferParams
            if (router.history.current.query.orderId && router.history.current.query.isDetail == 1) {
                transferToken.orderId = router.history.current.query.orderId;
                this.$store.dispatch('transfer/confirmInfo', transferToken).then((res) => {
                    if (res) {
                        this.$store.dispatch('pretaxinfo/getPretaxInfo', transferToken);
                    }  
                });
            } else {
                this.$store.dispatch('pretaxinfo/getPretaxInfo', transferToken);
            }
        },
        computed: {
            ...mapState({
                sellerTcInfo: state => state.pretaxinfo.sellerTcInfo,
                buyerTcInfo: state => state.pretaxinfo.buyerTcInfo,
                sellerTax: state => state.pretaxinfo.sellerTax,
                buyerTax: state => state.pretaxinfo.buyerTax,
                pretaxStatus: state => state.pretaxinfo.pretaxStatus,
                registerType: state => state.pretaxinfo.registerType,
                taxesPayerText: state => state.pretaxinfo.taxesPayerText
            })
        },
        mounted() {
            const { state: { pretaxinfo: {
                basicInfo, cqInfo, jyInfo, fgzInfo, noTaxInfo,
                sellerInfo, buyerInfo } } } = this.$store;
            this.basicInfo = basicInfo;
            this.cqInfo = cqInfo;
            this.jyInfo = jyInfo;
            this.fgzInfo = fgzInfo;
            this.noTaxInfo = noTaxInfo;
        },
        methods: {
            showIcon() {
                Dialog.alert({
                    title: '提示',
                    message: '标红部分为审核人员新增家庭成员，请注意核对!',
                    confirmButtonText: "确定"
                })
            },
            // 1、确认 2、终止,
            subok() {
                if(!this.checked){
                    return;
                }
                Dialog.alert({
                    title: '办理成功',
                    message: '您本次业务已成功办理！',
                    confirmButtonText: "我知道了"
                }).then(() => {
                    this.$store.dispatch('pretaxinfo/subPreTaxConfirm', { confirmStatus: 1 })
                });
            },
            sub_fail() {
                if(!this.checked){
                    return;
                }
                Dialog.confirm({
                    title: '提示',
                    message: '终止后，本次交易将结束！是否需要终止？',
                }).then(() => {
                    this.$store.dispatch('pretaxinfo/subPreTaxConfirm', { confirmStatus: 2 })
                }).catch(() => {
                    this.$router.go(-1);
                    // this.$router.push({ name: 'transferList' })
                });
            },
            subRead() {
                if (this.checked) {
                    console.log(this.checked, '333');
                } else {
                    console.log(this.checked, '555');
                }
            },
        }
    }
</script>

<style lang="less">
    .pretax_wrap {
        font-size: 14px;
        padding: 16px;
        background-color: #f5f5f5;
        .van-checkbox__icon .van-icon{width: 20px; height: 20px;}
        .notice { margin-top: 12px;}
        .disabled .button.nobg,.disabled .button.blue {
            background-color: darkgrey;
            color: #333;
            border: none;
        }
        .btns_wrap {padding: 16px 0 0;}
        .nobg { margin-top: 16px;}
        .pretax-wrap-icon {
            position: relative;
            p {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1200;
                width: 20px;
                height: 20px;
                background: #eee;
                border-radius: 50%;
                text-align: center;
                line-height: 20px;
                font-weight: 600;
                top: 16px;
                left: 140px;
            }
        }
    }
</style>