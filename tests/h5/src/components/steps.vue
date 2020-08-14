<template>
    <div>
        <div class="stepWrap" v-show="isShow">
        <ul class="regist-nav" id="J_regist_nav">
            <!-- <li class="sf" :class="step>1?'done':step==1?'doing':''">
                <div>
                    <span class="sf_l"></span>
                    <span class="sf_m"></span>
                    <span class="sf_r"></span>
                </div>
                <p>1. 个人信息</p>
            </li>
            <li class="sf " :class="step>2?'done':step==2?'doing':''">
                <div>
                    <span class="sf_l"></span>
                    <span class="sf_m"></span>
                    <span class="sf_r"></span>
                </div>
                <p>2. 实人认证</p>
            </li>
            <li class="sf "  :class="step>=3?'doing':''">
                <div>
                    <span class="sf_l"></span>
                    <span class="sf_m"></span>
                    <span class="sf_r"></span>
                </div>
                <p>3. 完成</p>
            </li> -->
            <li class="sf" :class="at>item.step?'done':at==item.step?'doing':''" v-for="(item , index ) in steps" :key="item.step">
                <div>
                    <span class="sf_l"></span>
                    <span class="sf_m"></span>
                    <span class="sf_r"></span>
                </div>
                <p>{{++index}}. {{item.name}}</p>
            </li>
        </ul>
    </div>
    </div>
    
</template>

<script>
    export default {


        props: {
            steps: {
                type: Array,
                default:()=>[
                    {name:'登记信息',step:1},
                    {name:'实人认证',step:2},
                    {name:'进度查询',step:3},
                ] 
            },
            at: {
                type: Number,
                default:2
            },
        },
        components: {},
        data() {
            return {
                step:1,
                isShow:false
            }
        },
        methods: {},
        mounted() {
            let path = this.$route.fullPath;
            if(path.indexOf('step1')>-1){
                this.step=1
            }else if(path.indexOf('step2')>-1){
                this.step=2
            }else if(path.indexOf('step3')>-1||path.indexOf('agree')>-1){
                this.step=3
            }
            if(this.step<3){
                this.isShow = true;
            }
        }
    }
</script>

<style lang="less">

   

    @gov-blue: #60a7f9;
    span{
        display: inline-block;
    }
    .stepWrap{
        z-index:2;
        background: #fff;
        text-align: center;
        padding: 16px 0;
        ul.regist-nav {
            display: -webkit-box;
            display: flex;

            li {
                -webkit-box-flex: 4;
                flex: 4;
                padding-top: 0;
                div {
                    display: -webkit-box;
                    display: flex;

                    .sf_l, .sf_r {
                        -webkit-box-flex: 1;
                        flex: 1;
                        display: block;
                        height: 14px;
                        border-bottom: 1px solid #DEDEDE;
                    }
                    .sf_m {
                        display: block;
                        box-sizing: content-box;
                        width: 16px;
                        height: 16px ;
                        background: #CECECE;
                        border-radius: 16px;
                        border: 6px solid #F0F0F0;
                    }
                }
                p {
                    line-height: 18px;
                    margin-top: 12px;
                    font-size: 14px;
                }
                &:first-child {
                    .sf_l {
                        border: 1px solid #fff !important;
                    }
                }
                &:last-child {
                    .sf_r {
                        border:1px solid #fff !important;
                    }
                }
                &.doing {
                    .sf_l {
                        /*border-bottom-color: @bg-color;*/
                        border-bottom-color: #4A90E2;
                    }
                    .sf_m {
                        background: @gov-blue;
                        border: 6px solid #e0f1fb;
                    }
                    p {
                        color: @gov-blue;
                    }
                }
                &.done {
                    .sf_m {
                        background: @gov-blue;
                        border: 6px solid #e0f1fb;
                    }
                    .sf_l, .sf_r {
                        border-bottom-color: #4A90E2;
                    }
                    p {
                        color: @gov-blue;
                    }
                }
            }
        }
        .sf{
            color: #9B9B9B;
        }
    }
</style>