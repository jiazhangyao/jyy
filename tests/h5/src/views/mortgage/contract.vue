<template>
    <div>
        <NavBar :navTitle="title" />
        <div class="contract_wrap">
            <p class="title_id">合同编号：{{baseData.orderNo || "--"}}</p>
            <van-panel title='0' class="sec special">
                <ul class="lis">
                    <li>甲方(卖方)</li>
                    <li>乙方(买方)</li>
                    <li class="blod">{{obligors || '--'}}</li>
                    <li class="blod">{{obkigees || '--'}}</li>
                </ul>
                <div class="tip">
                    根据《中华人民共和国合同法》、《不动产登记暂行条例实施细则》及其相关法律、法规之规定，买卖双方遵循平等、自愿、公平、守法和诚实信用原则经，协商一致，就该不动产买卖适宜订立本合同。
                </div>
            </van-panel>
            <van-panel title="第一条：不动产基本情况" class="sec">
                <ul class="lis">
                    <li>不动产坐落</li>
                    <li class="con">{{baseData.address || '--'}}</li>
                </ul>
                <ul class="lis">
                    <li>不动产权证号</li>
                    <li class="con">{{baseData.warrantNumber || '--'}}</li>
                </ul>
                <ul class="lis">
                    <li>建筑面积</li>
                    <li class="con">{{baseData.space || '--'}}平方米</li>
                </ul>
                <ul class="lis">
                    <li>规划用途</li>
                    <li class="con">{{baseData.planUse || '--'}}</li>
                </ul>
            </van-panel>
            <van-panel title="第二条：不动产价款" class="sec">
                <div class="des">该不动产的成交总价为人民币:
                    {{baseData.housePriceText || '--'}}（大写）¥：{{baseData.housePrice || '--'}}元（小写）。</div>
            </van-panel>

            <!-- 1 一次性付款 2 资金监管 3 其他方式 -->
            <van-panel title="第三条：不动产价款的支付方式" class="sec">
                <van-radio-group v-model='payWay' :disabled='signData ? true : false'>
                    <van-cell-group>
                        <van-cell title="一次性付款" @click="radio = '1'">
                            <van-radio name="1" />
                        </van-cell>
                        <van-cell title="资金监管" @click="radio = '2'">
                            <van-radio name="2" />
                        </van-cell>
                        <van-cell title="其他方式" clickable @click="radio = '3'">
                            <van-radio name="3" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
                <div v-if='payWay==1'>
                    <van-field v-model="dateVal" label="支付日期" placeholder="请选择" right-icon="arrow" required
                        class="date_wrap" @click="show=true" v-if='!signData' />
                    <div class="price">乙方于<span class="date_line">{{dateDeal(payDate) || '--'}}</span>前，按本合同第二条约定不动产价款
                        ，一次性支付人民币¥{{baseData.housePrice}}元。
                        <!-- <van-field v-model="payAmount" clearable placeholder="请输入金额" class="amount_input"
                            v-if='isTaxesPayer === 1' />
                        <van-field v-model="signData.payAmount" class="amount_text" v-else disabled /> -->
                        
                    </div>
                </div>
                <div v-if='payWay==2'>
                    <van-field v-model="dateVal" label="支付日期" placeholder="请选择" right-icon="arrow" required
                        class="date_wrap" @click="show=true" v-if='!signData' />
                    <div class="price">
                        乙方于<span class="date_line">{{dateDeal(payDate) || '--'}}</span>前，将不动产价款人民币¥
                        <!-- {{signData.payAmount || '--'}} -->
                        <van-field v-model="payAmount" clearable placeholder="请输入金额" class="amount_input"
                            v-if='!signData' />
                        <van-field v-model="signData.payAmount" class="amount_text" v-else disabled />
                        元存入资金监管账户。该不动产转移登记记载于登记簿后，甲方向资金监管中心申请划转交易监管资金（包括定金）。
                    </div>
                </div>
            </van-panel>
            <Popup v-model="show" position="bottom">
                <DatetimePicker v-model="payDate" type="date" @cancel="show=false" @confirm="confirm" />
            </Popup>
            <van-panel title="第四条：关于不动产份额的约定" class="sec">
                <div class="des">乙方约定共有人之间的不动产份额，具体为：</div>
                <ul class="lis" v-for="(item,index) in obkigeeArrs" :key='index'>
                    <li>权利人{{index+1}}</li>
                    <li class="con">{{item.name || '--'}} {{item.rightProportion || '--'}}</li>
                </ul>
            </van-panel>

            <van-panel title="第五条：关于买卖税费的约定" class="sec">
                <div class="des">甲方自愿承担应双方缴纳的税费。</div>
            </van-panel>
            <!-- 1 提交鹤岗仲裁委员会仲裁 2 依法向人民法院起诉 -->
            <van-panel title="第六条：" class="sec">
                <div class="des">甲、乙双方在履行本合同过程中发生的争议，应协商解决：协商不成的，按下 2 款方式解决(仅选一项)</div>
                <div class="panel_desc">争议处理方式</div>
                <van-radio-group v-model="controversyDealWay" :disabled='signData ? true : false'>
                    <van-cell-group>
                        <van-cell title="提交鹤岗仲裁委员会仲裁" @click="radio = '1'">
                            <van-radio name="1" />
                        </van-cell>
                        <van-cell title="依法向人民法院起诉" @click="radio = '2'">
                            <van-radio name="2" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-panel>

            <van-panel title="第七条：" class="sec">
                <div class="des">本合同未尽事宜，可由甲乙双方在合同补充协议内协商约定。本合同附件与本合同具有同等法律效力。本合同及其附件内，选择、输入部分的文字与固定部分的文字具有同等效力。</div>
            </van-panel>

            <van-panel title="第八条：" class="sec">
                <div class="des">本合同连同附件共 3 页，一式一份。</div>
            </van-panel>

            <van-panel title="第九条：" class="sec">
                <div class="des">本合同经双方签订后生效。</div>
            </van-panel>
            <van-panel title="第十条：" class="sec">
                <div class="des sel">
                    <div>是否有补充协议：</div>
                    <!-- <div class="sel_btn"><span class="yes">是</span><span class="no">否</span></div> -->
                    <van-radio-group v-model="supplementalAgreement" class="sel_btns" :disabled='signData ? true : false'>
                        <van-radio name="1">是</van-radio>
                        <van-radio name="2">否</van-radio>
                    </van-radio-group>
                </div>
                <van-cell-group class="textarea_con">
                    <van-field v-model="agreementContent" rows="6" autosize type="textarea" maxlength="1000"
                        readonl='true' placeholder="请输入补充协议内容，限制1000字" show-word-limit :disabled='(supplementalAgreement == 2 || signData) ? true : false' />
                </van-cell-group>
                <!-- <van-cell-group v-else class="textarea_con">
                    <van-field v-model="agreementContent" rows="6" autosize type="textarea" maxlength="1000"
                        readonl='true' placeholder="请输入补充协议内容，限制1000字" show-word-limit disabled />
                </van-cell-group> -->
            </van-panel>

            <van-panel title="甲方（卖方)合同信息签名" class="sec">
                <CellCard :list='cellData' :conData='signState' :sign=true @func="getSignSee" :imgs='signInfo' />
            </van-panel>
            <Popup v-model="showImg">
                <img class="img" :src='imgURL' />
            </Popup>
            <div v-if="butShow">
                <div class="btns_wrap" @click='submit'>
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
    import { Panel, Cell, RadioGroup, Radio, CellGroup, DatetimePicker, Popup, Field, Toast, Dialog } from 'vant';
    import Input from "@/components/input.vue";
    import FullButton from "@/components/fullButton.vue";
    import CellCard from "@/components/cellCard.vue";
    import { getContractInfo, contractSubmit } from "@/service/transfer";
    import { signStateText } from "./const.js";
    import router from "../../router";

    export default {
        data() {
            return {
                title: '鹤岗市不动产买卖合同',
                showImg: false,
                show: false,
                payWay: '1',
                payAmount: 800,
                payDate: new Date(),
                dateVal: '',
                controversyDealWay: '1',//争议处理方式
                supplementalAgreement: '1', //协议补充是否
                agreementContent: '',//协议内容
                obkigees: '',//卖方
                obligors: '',//买方
                baseData: {},
                signData: null,//合同信息info
                obkigeeArrs: [],//份额
                signInfo: [],
                signState: signStateText,
                cellData: [],
                imgURL: '',
                //判断合同是否签过
                isWrite: false,
                butShow: true,
            }
        },
        components: {
            VanPanel: Panel,
            VanRadioGroup: RadioGroup,
            VanCellGroup: CellGroup,
            VanCell: Cell,
            VanRadio: Radio,
            VanField: Field,
            DatetimePicker,
            Input,
            Popup,
            FullButton,
            Toast,
            CellCard
        },
        created() {
            this.payDate = this.dateDeal(this.payDate);
            this.dateVal = this.dateDeal(this.payDate);
        },
        mounted() {
            const { userFaceInfo } = this.$store.state.transfer;
            const { cardNo } = userFaceInfo;
            let params = this.$store.state.transfer.sessionParams;
            if (router.history.current.query.orderId && router.history.current.query.isDetail == 1) {
                params.orderId = router.history.current.query.orderId;
            }
            getContractInfo(params).then(res => {
                const { success, data, msg } = res;
                if (success) {
                    let arrSign = []
                    let arrSignType = []
                    let arrSignTypes = {}
                    arrSign = data.signInfoDTO.filter(ele => {
                        return ele.contractSignStatus === 1
                    })
                    const signTypeNum = this.$store.state.transfer.signType
                    for (let i of arrSign ) {
                        if (signTypeNum === i.type) {
                             arrSignType.push(i.type)
                        }
                    }
                    arrSignTypes = arrSignType.reduce(function (prev, next) {
                        prev[next] = (prev[next] + 1) || 1;
                        return prev;
                    }, {});

                this.$store.commit('mortgageApply/adjustSignObjs', arrSignTypes)

                const { houseRelateDTO, obkigees, obligors, contractSignInfo, obkigeeInfoDTOS, signInfoDTO } = data;
                const { housePrice } = houseRelateDTO;
                this.payAmount = Number(housePrice);
                let cellRes = [];
                if (contractSignInfo) {
                    const { payWay = '1', payDate, controversyDealWay, supplementalAgreement, payAmount, agreementContent } = contractSignInfo;
                    this.payDate = payDate;
                    this.payWay = payWay.toString();
                    this.payAmount = payAmount
                    this.controversyDealWay = controversyDealWay.toString();
                    this.supplementalAgreement = supplementalAgreement.toString();
                    this.agreementContent = agreementContent;
                    if (payWay && controversyDealWay) {
                        this.isWrite = true
                    }
                }
                for (let i in signInfoDTO) {
                    if (signInfoDTO[i].cardNo == cardNo && signInfoDTO[i].contractSignStatus === 1) {
                        this.butShow = false;
                    }
                }
                if (signInfoDTO) {
                    signInfoDTO.map((item, i) => {
                        cellRes.push({ name: item.name, state: item.contractSignStatus })
                    })
                }
                
                this.baseData = houseRelateDTO;
                this.obkigees = obkigees;
                this.obligors = obligors;
                this.signData = contractSignInfo;
                this.obkigeeArrs = obkigeeInfoDTOS;
                this.signInfo = signInfoDTO;
                this.cellData = cellRes;
                
            } else {
                Toast(msg || fieldErrors[0].msg);
            }
            })
        },
        methods: {
            //签名图片
            getSignSee(index, imgs) {
                if (imgs) {
                    imgs.map((item, i) => {
                        if (index == i && item.contractSignStatus == 1) {
                            this.showImg = true;
                            this.imgURL = '/web/api/file/' + item.contractKey + '.' + item.contractExt;
                        }
                    })
                }
            },
            confirm() {
                this.dateVal = this.dateDeal(this.payDate);
                this.show = false;
            },
            dateDeal(val) {
                if (!val) return;
                if (!(val instanceof Date)) {
                    val = new Date(val);
                }
                let year = val.getFullYear();
                let month = val.getMonth() + 1 < 10 ? '0' + (val.getMonth() + 1) : (val.getMonth() + 1);
                let day = val.getDate();
                return (year + '/' + month + '/' + day)
            },
            async submit() {
                const { orderId }= this.$store.getters.transferParams;
                let contractSignForm = {
                    controversyDealWay: Number(this.controversyDealWay),
                    payWay: Number(this.payWay),
                    payAmount: this.payAmount,
                    payDate: new Date(this.dateVal),
                    supplementalAgreement: Number(this.supplementalAgreement),
                    agreementContent: this.agreementContent,
                    orderId,
                    confirmStatus: 1,
                }
                const isWrites = this.isWrite
                this.$store.commit("mortgageApply/contractSignForms", contractSignForm)
                this.$router.push({ name: 'certificationh5', params: { paramList: 'contract', h5: true, isWrites } })  
            },
            async sub_fail() {
                Dialog.confirm({
                    title: '提示',
                    message: '终止后，本次交易将结束！是否需要终止？',
                }).then(() => {
                    const { orderId } = this.$store.getters.transferParams;
                    contractSubmit({ confirmStatus: 2, orderId: orderId }).then(res => {
                        if (res.success) {
                            router.push("/transfer/list");
                        } else {
                            Toast(res.msg);
                        }
                    })
                }).catch(() => {
                    this.$router.go(-1);
                });
            },
        }
    }
</script>

<style lang="less">
    .contract_wrap {
        padding: 16px;
        background-color: #f5f5f5;

        .title_id {
            padding: 13px 16px;
            background-color: #fff;
            /* border-bottom: 1px solid #D8D8D8; */
            font-size: 14px;
            color: #666666;
            position: absolute;
            top: 59px;
            z-index: 100;
        }

        .sec {
            background: #FFFFFF;
            box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.06);
            border-radius: 4px;
            margin-bottom: 16px;

            .van-cell:not(:last-child)::after {
                border-bottom: none;
            }

            .van-cell.van-cell--required::before {
                left: 61px;
                padding-left: 0;
            }

            &.special {
                .van-panel__header {
                    border-bottom: 1px solid #D8D8D8;
                    color: #666666;
                    padding-bottom: 10px;

                    .van-cell__title {
                        font-weight: normal;
                    }
                }

                .van-panel__content {
                    .van-cell.van-cell--required::before {
                        left: 61px;
                        padding-left: 0;
                    }


                    padding: 0 16px 16px;

                    .lis {
                        font-size: 16px;
                        display: inherit;
                        padding: 8px 0 16px;

                        li {
                            display: inline-block;
                            width: 48%;
                        }
                    }
                }

                .tip {
                    color: #666;
                }
            }

            .van-panel__header {
                border-bottom: none;
                font-size: 16px;
                color: #333333;
                padding-bottom: 4px;

                .van-cell__title {
                    font-weight: 700;

                    .van-cell__label {
                        font-size: 14px;
                        color: #333333;
                        padding-top: 9px;
                    }
                }
            }

            .van-panel__content {
                padding: 0px 16px 16px;

                .lis {
                    font-size: 14px;
                }

                .transfer-main {

                    &:last-child {
                        .van-cell {
                            border-bottom: none;
                        }
                    }

                    margin: 0;

                    .van-cell {
                        border-bottom: 0.02667rem solid #dfdfdf;
                        padding: 16px 0;
                    }
                }

                [class*=van-hairline]::after {
                    border-bottom: none;
                }

                .van-radio-group .van-cell {
                    display: flex;
                    justify-content: space-between;

                    &:last-child {
                        border-bottom: none;
                    }

                    border-bottom: 1px solid #dfdfdf;
                    padding: 8px 0;
                }

                .van-radio__icon--checked .van-icon {
                    color: #fff;
                }
                .van-radio__icon--disabled.van-radio__icon--checked .van-icon {
                    color: #c8c9cc;
                }

                .panel_desc {
                    padding: 16px 0 12px;
                    font-weight: 700;
                    font-size: 14px;
                }
            }

            .input_ .van-cell--large {
                padding: 8px 0;
            }

            .input_ {
                padding: 0;
            }

            .input_:after {
                left: 0;
            }

            /* .van-cell.van-field{ } */
            .van-radio-group .van-cell-group.van-hairline--top-bottom {
                border: none;
            }

            .van-radio__icon {
                height: auto;
            }



            .van-cell-group.van-hairline--top-bottom {
                &.textarea_con .van-cell .van-cell__value {
                    flex: 1;
                }

                border: 1px solid #DFDFDF;

                .van-cell {
                    display: flex;

                    .van-cell__title,
                    .van-cell__value {
                        flex: none;
                    }

                }

            }
        }

        .lis {
            font-size: 14px;
            color: #666666;
            display: flex;

            li {
                padding-top: 8px;

                &.blod {
                    font-weight: 700;
                    color: #333;
                }

                &.con {
                    color: #333;
                    margin-left: 32px;
                    flex: 1;
                }
            }
        }

        .des {
            font-size: 14px;
            padding-top: 6px;

            &.sel {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }

            .sel_btns {
                display: flex;

                .van-radio {
                    margin-left: 10px;
                }
            }

            .sel_btn span {
                width: 52px;
                height: 28px;
                line-height: 28px;
                border-radius: 2px;
                display: inline-block;
                text-align: center;
                margin-left: 8px;

                &.yes {
                    background: #309DE5;
                    color: #fff;
                }

                &.no {
                    background: #FFFFFF;
                    border: 1px solid #309DE5;
                }
            }
        }

        .date_wrap {
            padding: 0;
            justify-content: space-between;

            .van-field__control {
                text-align: right !important;
            }

            .van-cell--required::before {
                left: 62px;
            }
        }

        .price {
            margin-top: 12px;
            font-size: 14px;

            .date_line {
                padding: 0 5px;
                color: #309DE5;
                font-weight: 600;
            }

            .amount_input,
            .amount_text {
                width: 33%;
                display: inline-block;
                padding: 0;
                vertical-align: -7px;
            }

            .amount_input {
                border-bottom: 1px solid #999;
            }
        }

        .btns_wrap {
            padding: 16px 0;

            .nobg {
                margin-top: 16px;
            }
        }
    }
</style>