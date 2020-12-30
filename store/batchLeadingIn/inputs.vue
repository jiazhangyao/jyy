<template>
  <div class="batchin-input-number">
    <div>
      <button @click="minus" :class="{'is-disabled': min>=myValue || disabled}">-</button>
      <input
        v-model.number="myValue"
        type="number"
        @input="inputChange(myValue)"
        :disabled="disabled"
      />
      <button
        @click="plus"
        :disabled="max<=myValue || disabled"
        :class="{'is-disabled': max<=myValue || disabled}"
      >+</button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'input-number',
  props: {
    value: {
      type: [ Number, String ],
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 9999
    },
    disabled: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    storeCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      myValue: 0,
    }
  },
  watch: {
    value: {
      handler:function(newValue,oldValue){
        this.myValue = newValue
      },
      immediate:true 
    } 
  },
  methods: {
      inputChange(val) {
        if (this.myValue >= this.max) {
          this.myValue = this.max
        }
        this.$emit('judgeNums', this.myValue, this.index)
        this.$store.commit('batchLeadingIn/changeSkuNum', {index: this.index, val: this.myValue})
      },
    setTipHide() {
      this.tipsVisible = false
    },
  
    plus() {
      if (this.myValue > this.max) {
          this.myValue = this.max
      } else {
          this.myValue ++
      }
      this.$emit('judgeNums', this.myValue, this.index)
      this.$store.commit('batchLeadingIn/changeSkuNum', {index: this.index, val: this.myValue})
    },
    minus() {
         if (this.myValue <= this.min) {
          this.myValue = this.min
      } else {
          this.myValue --
      }
      this.$emit('judgeNums', this.myValue, this.index)
      this.$store.commit('batchLeadingIn/changeSkuNum', {index: this.index, val: this.myValue})
    },
    judgeChange( v ) {
      if ( this.disabled ) {
        return this.value
      }
      if ( v < this.min ) {
        return this.min
      }
      if ( v > this.realmax ) {
        return this.realmax
      }
      if ( this.goodsSaleLimit && v > this.limitNum ) {
        this.tipsVisible2 = true
      } else {
        this.tipsVisible2 = false
      }
      return v
    }
  }
}
</script>
<style lang="stylus" scoped>
$primary = #00a8cb;

.batchin-input-number {
  display: inline-block;
  position: relative;

  >div {
    display: flex;
  }
}

.batchin-input-number {
  button {
    width: 20px;
    height: 28px;
    line-height: 26px;
    font-size: 12px;
    border: 1px solid #dddddd;
    color: #bbb;

    &.is-disabled {
      color: #dddd;
      cursor: not-allowed;
    }

    &:hover:not(.is-disabled) {
      color: $primary;
      border-color: $primary;
    }
  }

  input {
    width: 56px;
    border-left: none;
    border-right: none;
    text-align: center;

    &[type=number] {
      -moz-appearance: textfield;

      &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }
    }

    &[disabled] {
      color: #bbb;
    }
  }

  &[small] {
    input {
      background: transparent;
      border: none;
      line-height: 16px;
      font-size: 12px;
      width: 32px;
      color: #666;
      text-align: center;
    }

    button {
      width: 14px;
      height: 14px;
      line-height: 13px;

      &:hover {
        background: transparent;
      }
    }
  }
}

.subscribe-tip {
  top: -35px;
  height: 20px;
}
</style>
