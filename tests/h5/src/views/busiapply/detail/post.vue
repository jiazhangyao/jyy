<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-mail">
      <div v-for="(item, index) in selectItems" :key="index" class="select-item half-bottom-border">
        <span>{{item.name}}</span>
        <img src="@/assets/对号@2x.png" class="fr" v-if="value==item.name" />
      </div>
      <div v-if="form.isPost==1" class="indent">
        <Input label="收件人" :value.sync="form.orderMail.consignee" disabled placeholder="-" />
        <Input
          label="收件人手机号"
          :value.sync="form.orderMail.mobile"
          type="number"
          disabled
          placeholder="-"
        />
        <Input
          label="详细地址"
          :value.sync="form.orderMail.addressInfo.mosaicAddress"
          disabled
          placeholder="-"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/input.vue";
import NavBar from "@/components/navBar.vue";
import businessMix from "@/mixins/business.js";
export default {
  mixins: [businessMix],
  data() {
    return {
      selectItems: [{ id: 2, name: "否" }, { id: 1, name: "是" }]
    };
  },
  props: ["title", "changeComponent", "form"],
  computed: {
    value() {
      for (const item of this.selectItems) {
        if (this.form.isPost == item.id) {
          return item.name;
        }
      }
    }
  },
  methods: {},
  watch: {},
  mounted() {},
  created() {},
  components: {
    NavBar,
    Input
  }
};
</script>
<style lang="less" scoped>
.select-item {
  text-align: left;
  padding-left: 16px;
  min-height: 56px;
  line-height: 56px;
  font-size: 15px;
  color: #5d6471;
  position: relative;
}
.fr {
  margin-right: 0.42667rem;
  width: 0.53333rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
