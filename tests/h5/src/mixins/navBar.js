const nav = {
    //自动提取data里的title（有的话）,存放在store里的state
    mounted() {
        if (this.title && this.title !== "图形验证码") {// 图形验证码的dialog的title干扰
            this.$store.commit('SET_TITLE',this.title)
        }
    }
}
export default nav;