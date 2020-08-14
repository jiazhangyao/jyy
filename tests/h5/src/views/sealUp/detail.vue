<template>
  <div class="seal-up-detail">
    <NavBar :navTitle="title" />
    <van-popup v-model="reminderShow">
      <div class="reminderWrap">
        <AutoForm v-model="remindForm" :data="reminderData" class="box clear-line"></AutoForm>
        <p>需查封登记的产权在第一时间归档成功后，会以短信方式提醒预留联系人。</p>
        <section class="btns">
          <Button @save="submit">提交</Button>
        </section>
      </div>
    </van-popup>
    <van-dialog
      v-model="showReminderSuccess"
      title="您的信息已提交成功"
      :closeOnClickOverlay="true"
      :showCancelButton="true"
      confirmButtonText="继续办理"
      confirmButtonColor=" #309DE5"
      cancelButtonText="返回首页"
      cancelButtonColor=" #309DE5"
      :beforeClose="replaceDialogUrl.bind({}, {
        cancel:'/',
        confirm:'/sealUp/sealUpSearch'
      })"
    >
      <div class="padding-top-17"></div>
    </van-dialog>
    <van-popup v-model="addTypes">
      <div class="add-types">
        <h2 class="title">请选择处理类型</h2>
        <ul class="type-ul">
          <li
            class="van-hairline--top type-li"
            v-for="(ele, index) in addTypesData"
            :key="index"
            @click="addTypeRoute(ele)"
          >{{ele}}</li>
          <li class="van-hairline--top type-li" @click="back()">返回</li>
        </ul>
      </div>
    </van-popup>
    <div>
      <section class="btns">
        <lists :listData="navData"></lists>
      </section>
      <section v-for="(item, i) in mainData" :key="i" class="history-item">
        <lists
          :listData="item.mainContents"
          :listWrapCls="listWrapCls"
          :listWrapText="item.listWrapText"
        >
          <template #listWrap="scope">
            <h2
              :class="scope.cls.listTitle"
            >{{scope && scope.text.listTitle ? scope.text.listTitle: '--'}}</h2>
            <h4 :class="scope.cls.type">{{scope && scope.text.type ? scope.text.type : '--'}}</h4>
            <div :class="scope.cls.info">{{scope && scope.text.info ? scope.text.info : '--'}}</div>
            <div
              v-if="scope.text.needShowInfo"
              :class="scope.cls.detail"
              @click="showDetail(i)"
            >{{scope && scope.text.detail ? scope.text.detail : '--'}}</div>
          </template>
        </lists>
      </section>
      <section v-if="!showReminders" class="btns opt-btns">
        <Button @save="add">新增查封</Button>
      </section>
      <section v-else class="btns opt-btns">
        <Button @save="showReminder">归档提醒设置</Button>
      </section>
    </div>
  </div>
</template>

<script>
import nav from "@/mixins/navBar.js";
import { Popup, Dialog } from "vant";
import Lists from "./components/lists";
import Button from "./components/button";
import AutoForm from "@forms/AutoForm";
import { mapState } from "vuex";
export default {
  mixins: [nav],
  components: {
    Lists,
    Button,
    VanPopup: Popup,
    AutoForm
  },
  data() {
    return {
      showReminderSuccess: false,
      title: "不动产信息查询(2/2)",
      maps: [
        ["产权证号", "0121506-676/黑2019（鹤岗市）不动产权第123456号"],
        ["权利人姓名/名称", "工作证"],
        ["房屋状态", "正常"]
      ],
      listWrapCls: {
        listTitle: "listTitle",
        type: "type",
        info: "info",
        detail: "detail"
      },
      listWrapText: {
        listTitle: "hello1",
        type: "11",
        info: "查封信息1",
        detail: "查封详情"
      },
      listsArr: [
        {
          mainContents: [
            ["查封机关", "0121506-676/黑2019（鹤岗市）不动产权第123456号"],
            ["协助执行书", "工作证"],
            ["民事执行书", "正常"]
          ],
          listWrapCls: {
            listTitle: "listTitle",
            type: "type",
            info: "info",
            detail: "detail"
          },
          listWrapText: {
            listTitle: "hello1",
            type: "11",
            info: "查封信息1",
            detail: "查封详情"
          }
        }
      ],
      reminderShow: false,
      remindForm: {},
      reminderData: [
        {
          type: 1,
          key: "name",
          inputType: "text",
          label: "姓名",
          value: "",
          required: false
        },
        {
          type: 1,
          key: "mobile",
          inputType: "text",
          label: "手机号",
          value: "",
          required: false
        }
      ],
      addTypes: false,
      addTypesData: []
    };
  },
  computed: {
    ...mapState({
      navData: state => state.sealUp.navData,
      mainData: state => state.sealUp.mainData,
      showReminders: state => state.sealUp.showReminders,
      immovableDatas: state => state.sealUp.immovableDatas
    })
  },
  methods: {
    showReminder() {
      this.reminderShow = true;
    },
    add() {
      //console.log('this.$store.state.searchDatas', this.$store.state.sealUp.searchDatas)
      this.$store
        .dispatch("sealUp/doTypes", this.$store.state.sealUp.searchDatas)
        .then(res => {
          this.addTypesData = res;
          this.addTypes = true;
        })
        .catch(err => console.log("err", err));
    },
    showDetail(opt) {
      this.$router.replace({
        name: "sealUpDetailDisplay",
        params: { index: opt }
      });
    },
    replaceDialogUrl: function(urlObj, type, done) {
      let url = urlObj[type];
      if (url) {
        this.$router.replace(url);
      } else {
        done();
      }
    },
    submit() {
      let params = {
        ...this.remindForm,
        bdcqzh: this.immovableDatas.estateSealDTO.warrantNumber,
        djlx: "",
        mobile: this.remindForm.mobile,
        remindTel: this.remindForm.mobile,
        name: this.remindForm.name,
        remindName: this.remindForm.name,
        orderNo: "",
        zslx: this.immovableDatas.estateSealDTO.certificateType
      };
      this.$store
        .dispatch("sealUp/doReminder", params)
        .then(res => {
          if (res.success) {
            this.reminderShow = false;
            this.showReminderSuccess = true;
          }
        })
        .catch(err => console.log("err", err));
    },
    back() {
      this.addTypes = false;
    },
    addTypeRoute(opt) {
      let keys = "";
      const types = this.$store.state.sealUp.sealUpTypes;
      for (let i of types) {
        if (opt === i.name) {
          keys = i.key;
        }
      }
      let params = { opt, keys };
      console.log("选中查封类型========", params);
      this.$store.commit("sealUp/changeSealUpType", params);
      this.$store.commit("sealUp/resetAddApplyLists");
      this.$router.replace({ name: "sealUpLink", params: { keys } });
    }
  }
};
</script>

<style lang='less' scoped>
.seal-up-detail {
    // padding: 16px;
    background: #eee;
    min-height: calc(100vh - 44px);
    .van-popup--center {
        width: 90%;
    }
    .reminderWrap {
        padding-bottom: 20px;
    }
    .reminderWrap {
        p {
            padding: 10px;
        }
    }
    /deep/ .box {
        padding: 0 16px;
    }
    /deep/ .clear-line {
        border: 0;
    }
    section {
        margin-top: 10px;
    }
    .history-item {
        background-color: #fff;
        margin:16px;
    }
    .btns {
        text-align: center;
    }
    .opt-btns {
        padding-bottom: 24px;
    }
    .add-types {
        .title {
            text-align: center;
            padding: 15px 0;
        }
        ul {
            padding-botom: 20px;
            text-align: center;
            li {
                padding: 8px 5px;
                text-align: center;
                color: #309DE5;
                font-size: 18px;
            }
        }
    }
}
</style>