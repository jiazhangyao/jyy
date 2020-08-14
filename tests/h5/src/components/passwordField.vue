<template>
  <div>
    <van-field :value="value" @input="oninput" :type="type" :placeholder="placeholder" :autocomplete="autocomplete">
      <i slot="button" class="iconfont btn-control-password" :class="iconName" @click="onclick" />
    </van-field>
  </div>
</template>
<script>
import { Field } from "vant";
export default {
  name: "passwordField",
  data(){
    return {
      type: "password",
    }
  },
  props: ["placeholder", "value", "autocomplete"],
  components: {
    "van-field": Field
  },
  computed: {
    iconName(){
      return this.type === "password" ? "iconlogin_hide" : "iconlogin_display"
    }
  },
  methods: {
    oninput(val){
      this.$emit("input", val);
    },
    onclick(){
      if(this.type === "password"){
        this.type = "text";

      }else{
        this.type = "password"
      }
    }
  }
}
</script>

