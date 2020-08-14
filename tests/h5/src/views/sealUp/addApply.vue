<template>
  <div class="seal-up-add">
    <NavBar :navTitle="title" />

    <section class="add-form">
        <AutoForm v-model="form" :data="testData" class="box"></AutoForm>
    </section>
    <footer class="btns">
        <Button @save="add">保存</Button>
    </footer>
  </div>
</template>

<script>
import nav from "@/mixins/navBar.js"
import AutoForm from "@forms/AutoForm"
import Button from './components/button'
// import { getSealUpType } from "../../service/sealUp";
import sealUpMix from "@/mixins/sealUp.js";

export default {
  mixins: [nav, sealUpMix],
  components: {
      Button,
      AutoForm
  },
//   async created() {
//     const types = await getSealUpType()
//     const { data: { name }} = types
//     this.maps[0][1] = name
//     this.$set(this.maps,[0][1], this.$store.state.sealUp.sealUpType)

//   },
props: {
    hide: {}
},
  data() {
      return {
          title: '添加申请人',
          form: {},
         testData: [
            {
                type: 1,
                key: "name", 
                inputType: "text",
                label: "申请人姓名",
                value: "44", 
                required: true 
            },
            {
                type: 1, 
                key: "cardType", 
                inputType: "text",
                label: "证件类型",
                value: "工作证", 
                required: true 
            },
            {
                type: 1,
                key: "cardNo", 
                inputType: "text",
                label: "证件号码",
                value: "11111111", 
                required: true 
            },
            {
                type: 1,
                key: "mobile", 
                inputType: "text",
                label: "联系号码",
                value: "18500000000", 
                required: true 
            },
        ],
      }
  },
  methods: {
      add() {
          delete this.form.cardType
          const { name, cardNo, mobile } = this.form
          let addApplyParams = []
          addApplyParams.push({ applyListsAdd: [[name, mobile], ['工作证件号', cardNo]] })
          this.$store.commit('sealUp/changeAddApplyLists', addApplyParams)
          this.hide();
      }
  }
};
</script>

<style lang='less' scoped>
.seal-up-add {
    // height: 95vh; 
    position: relative;
    height: calc(100vh - 44px);
    overflow: hidden;
    z-index: 100000;

    /deep/ .box {
        padding: 0 4px;
        color: red;
    }
    background: #eee;
    section {
        margin-top: 10px;
    }
    .add-form {
        padding: 0 10px;
        background: #fff;
    }
    .add-apply-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        .add-apply {
            padding: 5px 16px;
            color: #309DE5;
            background: transparent;
            border: 1px solid #309DE5;
        }
    }
  
    footer.btns {
       text-align: center;
    }
}
</style>