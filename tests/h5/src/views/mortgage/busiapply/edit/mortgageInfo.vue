<template>
  <div>
    <NavBar :navTitle="componentTitle" :goBack="goBack" />
    <section class="add-form">
        <AutoForm v-model="form" :data="showData" class="box"></AutoForm>
    </section>
  <Footer :toNextPage="finish" />

  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import mortgageBusiness from "@/mixins/mortgageBusiness.js";
  import NavBar from "@/components/navBar.vue";
  import Footer from "./components/footer.vue";
  import AutoForm from "@forms/AutoForm";
  export default {
    mixins: [mortgageBusiness],
    data() {
      return {
          form:{},
          showData: [
              {
                  type: 5,
                  key: "startTime",
                  label: "债务履行期开始时间",
                  dateType: "date",
                  value: "",
                  hidden: false,
                  required: true
              },
              {
                  type: 5,
                  key: "endTime",
                  label: "债务履行期结束时间",
                  dateType: "date",
                  value: "",
                  hidden: false,
                  required: true
              },
              {
                  type: 1,
                  key: "executionBook",
                  inputType: "text",
                  label: "被担保债权数额（最高债权数额）",
                  value: "",
                  required: false
              },
              {
                  type: 1,
                  key: "civilAmibitration",
                  inputType: "text",
                  label: "产权评估总额",
                  value: "",
                  required: false
              },
              {
                  type: 4,
                  key: "closeDownRange",
                  value: "",
                  readonly: false,
                  placeholder: "变更说明",
                  info: "变更说明",
                  required: false,
                  maxlength: 2000,
                  minHeight: 60,
                  maxHeight: 140,
                  hidden: false
              }
          ],
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
        AutoForm,
        Footer,
      NavBar,
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
  .add-form {
      padding: 0 10px;
      background: #fff;
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