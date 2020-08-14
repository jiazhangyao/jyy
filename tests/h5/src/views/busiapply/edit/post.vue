<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-mail">
      <div class="select-wrap">
        <div class="padding">
          <div
            v-for="(item, index) in selectItems"
            :key="index"
            class="select-item half-bottom-border"
            @click="isPost = item.id"
          >
            <span>{{item.name}}</span>
            <img src="@/assets/对号@2x.png" class="fr" v-if="isPost == item.id" />
          </div>
        </div>
      </div>
      <div v-if="isPost==1" class="indent">
        <Input label="收件人" :value.sync="orderMail.consignee" required />
        <Input label="收件人手机号" :value.sync="orderMail.mobile" type="number" required />
        <Area
          :provinceId="orderMail.addressInfo.provinceId"
          :cityId="orderMail.addressInfo.cityId"
          :countyId="orderMail.addressInfo.regionId"
          :onFinish="onFill"
          required
        />
        <Input label="详细地址" :value.sync="orderMail.addressInfo.address" required />
      </div>
      <footer @click="finish">
        <FullButton name="完成" cls="water-edit-footer-btn" />
      </footer>
    </div>
  </div>
</template>

<script>
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import Area from "@/components/area.vue";
import { Toast } from "vant";
export default {
  mixins: [businessMix],
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
  props: ["title", "changeComponent", "updateForm", "form"],
  computed: {
    valueName() {
      let res = this.selectItems.find(item => item.id == this.isPost);
      return (res && res.name) || "";
    }
  },
  methods: {
    finish() {
      let data = {
        isPost: this.isPost,
        orderMail: this.orderMail
      };
      let res = this.postValid(data.isPost, data.orderMail);
      if (res.result) {
        this.updateForm(data);
        this.goBack();
      } else {
        Toast(res.msg);
      }
    },
    onSelect(value, index, item) {
      let res = this.selectItems.find(item => item.name == value);
      this.isPost = res.id || 0;
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
    this.isPost = this.form.isPost;
    this.form.orderMail = this.form.orderMail || {};
    this.orderMail = {
      ...this.orderMail,
      ...this.form.orderMail,
      addressInfo: {
        ...this.orderMail.addressInfo,
        ...this.form.orderMail.addressInfo
      }
    };
  },
  created() {},
  components: {
    Input,
    NavBar,
    FullButton,
    Area
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-mail {
  min-height: calc(100vh - 44px);
  .indent {
    padding-left: 16px;
  }
  footer {
    position: absolute;
    bottom: 40px;
    width: 100%;
    .button {
      display: block;
      width: 343px;
      line-height: 48px;
      margin: auto;
      text-align: center;
    }
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