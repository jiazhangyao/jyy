<template>
  <!-- 转移 -->
  <div>
    <div class="detail-btn-wrap" v-if="isTransfer">
      <div class="opt-btn" @click="goTransferUrl(id)" v-if="!!editable">编辑</div>
      <div class="opt-btn" v-else-if="status === 56" @click="goConfirm(id)">前往确认</div>
      <div class="opt-btn" v-else-if="status === 52" @click="goConfirm(id)">前往签署</div>
      <div class="opt-btn" v-else-if="status === 53" @click="goConfirm(id)">前往支付</div>
    </div>
    <!-- 非转移 -->
    <div class="detail-btn-wrap" v-if="isSealUp">
      <div class="opt-btn" @click="goSelaUpUrl(id)" v-if="!!editable">编辑</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detailBtn",
    props: {
      data: {
        type: Object,
        default: () => {}
      },
      registerType: {
        type: Number
      }
    },
    computed: {
      isTransfer() {
        return this.registerType === 5010 || this.registerType === 5020 || this.registerType === 5030;
      },
      editable() {
        return this.data.editable
      },
      status() {
        return this.data.status
      },
      id() {
        return this.data.id
      },
      isSealUp() {
        return this.data.registerPrimaryType === 40;
      }
    },
    methods: {
      goConfirm(id) {
        // 前往确认
        event.stopPropagation();
        localStorage.setItem('orderIds', id)
        this.$store.dispatch('login').then(res =>{
          if (res.success) {
            this.$router.push('/transfer/list')
          }
        })
      },
      goSign(id) {
        // 前往签署
        event.stopPropagation();
        this.$router.push(`/transfer/list?orderId=${id}&isDetail=1`);
      },
      goPay(id) {
        // 前往支付
        event.stopPropagation();
        this.$router.push(`/transfer/list?orderId=${id}&isDetail=1`);
      },
      goTransferUrl(id) {
        // 转移编辑页
        event.stopPropagation();
        this.$router.push(`/transfer/busiapply/edit?id=${id}&edit=1`);
      },
      goSelaUpUrl(id) {
        // 查封编辑页面
        event.stopPropagation();
        // this.$router.push({name: 'sealUpAdd', params: {id: id}})
        this.$router.push(`/sealUp/sealUpLink?id=${id}&edit=1`);
      }
    },
    mounted() {
      // console.log('123333', this.data, this.registerType);
    }
  };
  </script>

<style lang="less" scoped>
  .detail-btn-wrap {
    .opt-btn {
      display: block;
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-radius: 2px;
      background-color: #f5f7fe;
      color: #309de5;
      font-size: 16px;
      margin-top: 10px;
      font-weight: bold;
      text-align: center;
    }
  }
</style>