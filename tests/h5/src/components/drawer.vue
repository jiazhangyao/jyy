<template>
    <div>
       
        <transition name="fade">
            <div class="modal-cover" @click="close" v-if="show_drawer"></div>
        </transition>
        <transition name="right">
            <div class="drawer"  v-if="show_drawer" @click="close">
                <div class="drawer-content">
                    <ul>
                        <router-link to="/">
                            <li >首页</li>
                        </router-link>
                        <router-link to="/account/home">
                            <li>个人中心</li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        
        data() {
            return {
               
                show_drawer:false,
            }
        },
        methods: {
            close() {
                this.show_drawer = false;
   
                document.body.style.overflow = 'scroll'
 
            },
            
            
            

        },
    }
    
</script>

<style lang="less" scoped>

   

    .modal-cover{
        position:absolute;
        z-index: 1002;
        left:0;
        top:44px;
        right:0;
        bottom: 0;
        background: rgba(0,0,0,0.4)
    }
    .drawer{
        .drawer-content{
            width:100%;
            position: relative;
        }
        position: fixed;;
        top:44px;
        bottom: 0;
        width:264px;
        right:0;
        padding:0 32px;
        background: #fff;
        z-index: 1003;
        li{
            height: 74px;
            line-height: 74px;
            text-align: left;
            font-size: 18px;
            color: #333;
            position: relative;
            &::after{ 
                content: '';
                width: 100%;
                position: absolute;
                height: 0.02667rem;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                bottom: 0;
                left: 0;
                background: #cbd2de;

            }

        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .right-enter-active, .right-leave-active {
        transition: all cubic-bezier(0.86, 0, 0.07, 1) 0.4s;
        transform: translateX(0)
    }

    .right-enter, .right-leave-to {
        transform: translateX(102%)
    }


    
</style>