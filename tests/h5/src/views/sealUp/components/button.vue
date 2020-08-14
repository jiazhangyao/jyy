<template>
    <button :class="type" @click="alts">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'btns-padding'
        }
    },
    methods: {
        alts() {
            this.$emit('save')
        }
    }
}
</script>

<style lang='less' scoped>
.btns {
    width: 90%;
    //margin-left: calc((10% - 20px) / 2);
    height: 50px; 
    border-radius: 4px;
    font-size: 18px;
    margin-top: 20px;
}
//全色主体样式
.btns-padding {
    .btns;
    background: #309DE5;
    color: #fff;
}
//边框主体样式
.btns-border {
    .btns;
    background: #fff;
}
.primary-border {
    .btns-border;
    color: #309DE5;
    border: 1px solid #309DE5;
}
.primary-border-danger {
    .btns-border;
    color: #C66F6F;
    border: 1px solid #C66F6F;
}
</style>