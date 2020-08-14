<template>
    <div :class='[ (kind && desc) ? "tit_desc": "",(status && status) ? "status" : "",cls,"det_item"]'>
        <van-panel :title='kind' :desc='desc' :status='status'>
            <div :class='"block "+item.cls' v-for='(item,index) in list' :key="index">
                <div :class='setClass(item.cls)'>{{item.name}}</div>
                <div class="item.feditFla?cons:con">{{item.value}}</div>
            </div>
        </van-panel>
    </div>
</template>

<script>
    import { Panel, Cell } from 'vant';
    export default {
        data() {
            return {}
        },
        props: {
            list: {
                type: Array,
                default: () => []
            },
            kind: {
                type: String,
                default: ""
            },
            desc: {
                type: String,
                default: ""
            },
            status: {
                type: String,
                default: ""
            },
            cls: {
                type: String,
                default: ""
            }
        },
        components: {
            VanPanel: Panel,
            VanCell: Cell,
        },
        methods: {
            setClass(value) {
                let obj = { tit: true };
                if (value == undefined) {
                    obj[`${value}`] = false;
                } else {
                    obj[`${value}`] = true;
                }
                return obj;
            }
        }
    }
</script>

<style lang="less">
    .det_item {
        margin-bottom: 16px;

        &.status {
            .van-cell-group .van-panel__content {}

            .van-panel__header {
                .van-cell__value {
                    display: block;
                }
            }

            .van-panel__content {
                padding-bottom: 16px;
            }
        }

        &.status.tit_desc {
            .van-cell-group .van-panel__header .van-cell__title .van-cell__label {
                margin: 16px 0 1px;
            }
        }

        &.tit_desc {
            .van-cell-group .van-panel__header {
                padding-bottom: 0;

                .van-cell__title .van-cell__label {
                    margin: 12px 0 12px;
                }

                &.van-cell {
                    display: flex;
                    align-items: flex-end;
                }
            }
        }

        &.together {
            margin-top: -16px;

            .van-cell-group .van-panel__header .van-cell__title .van-cell__label {
                margin: 2px 0 2px;
            }
        }
    }

    .van-cell-group {

        /* padding-bottom: 16px; */
        .van-panel__header {
            &.van-cell {
                padding: 14px 15px 10px;
                display: flex;
                align-items: flex-start;
            }

            display: flex;
            align-items: flex-end;

            &.van-cell:not(:last-child)::after {
                border-bottom: none;
            }

            .van-cell__title {
                flex: 1;

                span {
                    font-size: 16px;
                    color: #333333;
                }

                .van-cell__label {
                    &.tit_desc {
                        margin: 8px 0 10px;
                    }

                    font-size: 14px;
                    color: #333333;
                    margin: 0;
                }
            }

            .van-cell__value {
                display: none;
                flex: none;

                span {
                    display: inline-block;
                    width: 38px;
                    height: 23px;
                    text-align: center;
                    margin-left: 24px;
                    background-image: linear-gradient(45deg, #94E652 0%, #7FC448 100%);
                    border-radius: 100px;
                    font-size: 14px;
                    color: #FFFFFF;
                }
            }
        }

        .van-panel__content {
            padding: 0 16px 16px;

            .block {
                display: flex;
                margin-top: 8px;
                &.black{font-weight: 600;.tit{color: #333;}}
                &.red{color: #D82323;font-weight: 600;.tit{color: #333;}}

                &:first-child {
                    margin-top: 0;
                }

                .tit {
                    padding-right: 32px;
                    color: #666;
                    &.red{color: #D82323;}
                    /* flex: 1; */
                    &.rentit {
                        font-size: 14px;
                        color: #333333;
                        font-weight: 700;
                        
                    }
                   
                }

                .cons, .con {
                    word-break: break-all;
                    flex: 1;
                }
                .cons {
                    color: #D82323;
                }
            }
        }
    }
</style>