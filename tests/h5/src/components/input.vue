// TODO input type
<template>
  <div class="input_" :class="{'select_input':icon}">
    <Field
      :placeholder="placeholder"
      type="textarea"
      rows="1"
      autosize
      :input-align="align"
      :label="label"
      :label-width="labelWidth"
      label-align="left"
      size="large"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      v-model="curValue"
      @input="fileChange"
      :right-icon="icon"
      :required="required"
    >
      <div
        v-if="sufix"
        slot="right-icon"
        size="small"
        type="primary"
        :style="{ 'color': '#5d6471'}"
      >{{sufix}}</div>
    </Field>
  </div>
</template>

<script>
import { Field, Button } from "vant";
export default {
  data() {
    return {
      curValue: this.value
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入"
    },
    sufix: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: "标签"
    },
    align: {
      type: String,
      default: "right"
    },
    value: {
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: Number,
      default: 140
    },
    validateType: {
      type: Number,
      default: 0
    }
  },
  components: {
    Field,
    "van-button": Button
  },
  watch: {
    value: {
      handler(n, old) {
        this.curValue = n;
      },
      immediate: true
    },
    curValue(newV, old) {
      this.$emit("update:value", newV);
    }
  },
  methods: {
    clickMe() {
      this.$emit("inputCilck", "two");
    },
    fileChange(value) {
      if (this.validateType === 1) {
        value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        value = value
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
        if (value.indexOf(".") < 0 && value != "") {
          //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          value = parseFloat(value);
        }
        if (!value || value == "0" || value == "0.0" || value == "0.00") {
          return;
        }
        this.curValue = value;
      } else if (this.validateType === 2) {
        // 证件号码
        value = value.replace(/[^x^X^\d+]/g, "");
        this.curValue = value;
      }
    }
  }
};
</script>

<style lang="less" >
.input_ .van-cell--required div.van-field__label--left span {
  position: relative;
}

.input_ .van-cell--required div.van-field__label--left span::before {
  content: "*";
  position: absolute;
  right: -14px;
  font-size: 14px;
  color: #f44;
}

.input_ .van-cell--required::before {
  content: none;
}

.input_ {
  position: relative;
  padding: 0 16px;
  background: #fff;
  .van-cell--large .van-cell__title {
    font-size: 15px;
  }
  .an-field__clear,
  .van-field__right-icon {
    padding-left: 7px;
  }
  .van-field__left-icon .van-icon,
  .van-field__right-icon .van-icon {
    color: #aab0b9 !important;
  }
  .van-cell--large {
    padding: 16px 0;
    font-size: 15px;
    & > .van-cell__title {
      font-size: 15px;
    }
  }

  .van-field__label--left {
    text-align: left;
  }
  &:after {
    content: "";
    width: calc(100% - 16px);
    height: 1Px;
    background: #ddd;
    position: absolute;
    bottom: 0;
    left: 16px;
    transform: scaleY(0.5);
  }
}
</style>