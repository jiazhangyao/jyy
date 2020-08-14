<template>
  <div class="seal-up-search">
    <NavBar :navTitle="title" />
    <section>
      <AutoForm v-model="form" :data="identifyData" class="box clear-line">
      </AutoForm>
      <article class="identify"></article>
      <section v-show="adjustIdentify">
        <h4>产权证号</h4>
        <AutoForm v-model="form" :data="searchDataIdentify" class="box">
          <article slot="num" class="describe">
            平房或独幢楼房没有进行实地查看的，请前往不动产登记中心办理实地勘察！
          </article>
          <article slot="id" class="describe">
            平房或独幢楼房没有进行实地查看的，请前往不动产登记中心办理实地勘察！
          </article>
        </AutoForm>
      </section>
      <section class="btns">
        <Button @save="submit" class="btns">查询并办理</Button>
      </section>
    </section>
  </div>
</template>

<script>
import nav from "@/mixins/navBar.js"
import AutoForm from "@forms/AutoForm"
import Button from './components/button'
export default {
  mixins: [nav],
  components: {
    AutoForm,
    Button
  },
  data() {
    return {
      title: "不动产信息查询(1/2)",
      form: "",
      adjustIdentify: true,
      identifyData: [
        {
          type: 3,
          key: "certificateTypes",
          label: "证书类型",
          value: 0,
          show: false,
          //adjustSel: 0,
          data: [{ text: "不动产权证号", key: 1 }, { text: "旧不动产权证号", key: 2 }],
          required: false,
          callback: (value, index) => {
            
            if (index === 0) {
              this.searchDataIdentify = this.searchData
            } else {
              this.searchDataIdentify = this.searchDataIdentifyOld
            }
            //console.log(`选中项${value},索引${index}`);
          }
        } //{ text: "个人", key: 1 }, { text: "企业/单位", key: 2 }
      ],
      searchData: [],
      searchDataIdentifyOld: [
        {
          type: 1, 
          key: "id", 
          inputType: "text",
          label: "证号", 
          value: "", 
          placeholder: "请输入产权证号中数字部分",
          required: false
        }
      ],
      searchDataIdentify: [
        {
          type: 3,
          key: "year",
          label: "黑",
          placeholder: "请选择年份",
          value: -1,
          show: false,
          adjustSel: 0,
          data: [2016, 2017, 2018, 2019, 2020],
          required: false,
          callback: (value, index, item) => {
            console.log(value, index);
          }
        },
        {
          type: 1, 
          key: "num",
          placeholder: "请输入产权证号中数字部分",
          inputType: "text", 
          // label: "鹤岗市 不动产权号", 
          label: "不动产权证号", 
          value: "", 
          required: false 
        },
      ]
    };
  },
  methods: {
    submit() {
      const { certificateTypes, year, city, num, id } = this.form
      let searchDatas = {}
      if (certificateTypes.key === 1) {
        if (year !== -1 && city !== -1 && num !== '') {
          searchDatas = {
            certificateType: certificateTypes.key,
            estateNum: `黑（${year}）鹤岗市不动产权第${num}号`
          }
        }
      } else {
        if (id !== '') {
          searchDatas = {
            certificateType: certificateTypes.key,
            estateNum: id
          }
        }
      }
      if (searchDatas.estateNum) {
        this.$store.commit('sealUp/changeSearchDatas', searchDatas)
        this.$store.dispatch('sealUp/doSearchSealUp', searchDatas)
      } else {
        this.$toast('请将信息填写完整')
      }
    },
  },
  created() {
    this.searchData = this.searchDataIdentify
  }
}
</script>

<style lang='less' scoped>
.seal-up-search {
  /deep/ .box {
    padding: 0 16px;
    color: red;
  }
  /deep/ .clear-line {
    border: 0;
  }
  h4 {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;
      padding: 0 16px;
  }
  /deep/ article.identify {
    width: 100%;
    height: 30px;
    background: #eee;
  }
  /deep/ article.describe  {
     color: #999;
     padding-top: 10px;
  }
  .btns {
    text-align: center;
  }
}
</style>