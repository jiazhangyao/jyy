<template>
  <div v-if="show">
    <NavBar :navTitle="selectTitle" :goBack="closeSelectPage" />
    <div class="wrap">
      <div class="padding">
        <div
          v-for="(item, index) in select"
          :key="index"
          class="select-item half-bottom-border"
          @click="choose(item.name, index, item)"
        >
          <div v-if="!!item.name">
            <span>{{item.name}}</span>
            <img src="@/assets/对号@2x.png" class="fr" v-if="checkSelected(item.name, index, item)" />
            <Icon class="select-right-icon" v-if="iconName != ''" :name="iconName" />
          </div>
        </div>
        <div class="dis_bottom dis_bottom_action_one" v-if="!disabled" @click="done">
          <FullButton :name="btn_name" cls="select-bottom" @click="done" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
import FullButton from "@/components/fullButton.vue";
export default {
  props: {
    select: {
      type: Array,
      default: []
    },
    btn_name: {
      type: String,
      default: "完成"
    },
    propsValue: {},
    nextPage: {
      type: String,
      default: "one"
    },
    show: {
      ///nav的title
      type: Boolean,
      default: false
    },
    selectTitle: {
      type: String,
      default: "请选择"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconName: {
      type: String,
      default: ""
    },
    onSelect: {}
  },
  data() {
    return {
      value: undefined
    };
  },
  components: {
    FullButton,
    Icon
  },
  watch:{
    propsValue:{
      handler(v) {    
        this.value = v;
      }
    },
    immediate: true
  },
  methods: {
    checkSelected(val, index, item) {
      if (this.value === item.name) {
        this.index = index;
        this.item = item;
        return !this.disabled;
      } else {
        return false;
      }
    },
    choose(val, index, item) {
      this.value = val;
      this.index = index;
      this.item = item;
      if (this.onSelect) {
        this.onSelect(val, index, item);
      }
    },
    done() {
      if (!this.value) {
        console.log("请选择value");
        return false;
      }
      this.$emit("pageChange", this.value, this.index, this.item);
      this.value = undefined
    },
    closeSelectPage() {
      this.$emit("hideSelect");
    }
  }
};
</script>

<style lang="less" scoped>
.padding {
  position: relative;
  height: 500px;
  display: block;
  overflow: scroll;
  padding-bottom: 80px;
}
.wrap {
  min-height: calc(100vh - 44px);
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 2;
  width: 100%;
  background: #fff !important;
  opacity: 1;

  .select-item {
    display: flex;
  }
}
.select-item {
  text-align: left;
  padding: 16px 20px 16px 20px;
  font-size: 15px;
  color: #5d6471;
  position: relative;
}
.fr {
  margin-right: 0.42667rem;
  width: 0.53333rem;
  /* top: 50%; */
  position: absolute;
  /* -webkit-transform: translateY(-50%); */
  /* transform: translateY(50%); */
  /* vertical-align: middle; */
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.select-bottom {
  border-radius: 4px;
  padding: 0 16px;
  bottom: 32px;
  //  background:#fff;
  //  bottom:40px;
}
.select-right-icon {
  display: block;
  position: absolute;
  right: 16px;
  top: 50%;
  margin-top: -11px;
  color: #aab0b9 !important;
}
</style>