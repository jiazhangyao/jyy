<template>
    <div class="form_title">
        {{name}}
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: ''
            },
        },
    }
</script>

<style lang="less" scoped>
    .form_title{
        height: 36px;
        line-height: 36px;
        background: rgba(203,210,222,.20);
        font-size: 12px;
        color: #5D6471;
        text-align: left;
        padding-left: 16px;

    }
</style>