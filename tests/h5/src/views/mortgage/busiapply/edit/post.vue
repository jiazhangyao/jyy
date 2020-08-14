<template>
  <div>
    <NavBar :navTitle="componentTitle" :goBack="goBack" />
    <div class="bisiapply-edit-mail">
      <div class="select-wrap">
        <div class="padding">
          <div
            v-for="(item, index) in selectItems"
            :key="index"
            class="select-item half-bottom-border"
            @click="onSelect(item.id)"
          >
            <span>{{item.name}}</span>
            <img src="@/assets/对号@2x.png" class="fr" v-if="isPost == item.id" />
          </div>
        </div>
      </div>
      <div v-if="isPost==1" class="indent">
        <Field label="收件人" v-model="orderMail.consignee" :disabled="!canEdit()" placeholder="请输入收件人"/>
        <Field label="收件人手机号" v-model="orderMail.mobile" type="number" :disabled="!canEdit()"  placeholder="请输入收件人手机号"/>
        <template v-if="canEdit()">
          <Area
            :provinceId="orderMail.addressInfo.provinceId"
            :cityId="orderMail.addressInfo.cityId"
            :countyId="orderMail.addressInfo.regionId"
            :onFinish="onFill"
          />
          <Field label="详细地址" v-model="orderMail.addressInfo.address" type="textarea"
            autosize
            rows="1"  placeholder="请输入详细地址" />
        </template>
        <template v-else>
          <Field
            label="详细地址"
            v-model="orderMail.addressInfo.mosaicAddress"
            disabled
            placeholder="请输入详细地址"
            type="textarea"
            autosize
            rows="1"
          ></Field>
        </template>
      </div>
      <Footer :toNextPage="finish" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mortgageBusiness from "@/mixins/mortgageBusiness.js";
import NavBar from "@/components/navBar.vue";
import { Button, Field } from "vant";
import Area from "@/components/area.vue";
import { Toast } from "vant";
import Footer from "./components/footer.vue";
export default {
  mixins: [mortgageBusiness],
  data() {
    return {
      isPost: "",
      selectItems: [{ id: 2, name: "否" }, { id: 1, name: "是" }],
      orderMail: {
        addressInfo: {
          address: "",
          cityId: "",
          provinceId: "",
          regionId: ""
        },
        consignee: "",
        mobile: ""
      }
    };
  },
  computed: {
    ...mapState("mortgageBusiapply", [
      "transferbusiapplyForm",
      "componentTitle"
    ]),
    valueName() {
      let res = this.selectItems.find(item => item.id == this.isPost);
      return (res && res.name) || "";
    }
  },
  methods: {
    finish() {
      let data = {
        isPost: this.isPost,
        orderMail: { ...this.orderMail }
      };

      this.$store.commit("mortgageBusiapply/setForm", {
        ...data
      });
      this.stage().then(this.goNext);
    },
    onSelect(item) {
      if (this.canEdit()) {
        this.isPost = item;
      }
    },
    onFill({ province, city, county }) {
      this.orderMail = {
        ...this.orderMail,
        addressInfo: {
          ...this.orderMail.addressInfo,
          provinceId: province.id,
          provinceName: province.name,
          cityId: city.id,
          cityName: city.name,
          regionId: county.id,
          regionName: county.name
        }
      };
    }
  },
  watch: {},
  mounted() {
    this.isPost = this.transferbusiapplyForm.isPost;
    this.orderMail = this.transferbusiapplyForm.orderMail || {};
    if (!this.orderMail.addressInfo) {
      this.orderMail = {
        ...this.orderMail,
        addressInfo: {
          address: "",
          cityId: "",
          provinceId: "",
          regionId: ""
        }
      };
    }
  },
  created() {},
  components: {
    Field,
    NavBar,
    Button,
    Area,
    Footer
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-mail {
  min-height: calc(100vh - 44px);
  .indent {
    padding-left: 16px;
  }
}
.select-wrap {
  .select-item {
    display: flex;
  }
}
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