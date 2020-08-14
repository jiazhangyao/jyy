<template>
  <div>
    <NavBar />
    <div class="banner">
      <div class="img">
        <img src="@/assets/home/banner@2x.png" alt />
      </div>
    </div>
    <HomeCard :name="item.name" :data="item.data" v-for="(item,index) in entry" :key="index" />
    <van-dialog
      v-model="showTransferDialog"
      title="请选择办理业务主体"
      :closeOnClickOverlay="true"
      :showCancelButton="true"
      confirmButtonText="土地转移"
      confirmButtonColor=" #309DE5"
      cancelButtonText="房屋转移"
      cancelButtonColor=" #309DE5"
      :beforeClose="pushDialogUrl.bind({}, {
        cancel:'/transferForm/estateSearch/house',
        confirm:'/transferForm/estateSearch/land'
      })"
    >
      <div class="padding-top-17"></div>
    </van-dialog>
    <van-dialog
      v-model="showChafengDialog"
      :closeOnClickOverlay="true"
      title="提示"
      confirmButtonColor=" #309DE5"
      confirmButtonText="前往认证"
      :beforeClose="pushDialogUrl.bind({}, {
        confirm:'TODO'
      })"
    >
      <div>
        <div class="padding-top-17"></div>
        <div class="text-center">您还未进行相关认证！</div>
        <div class="padding-top-17"></div>
      </div>
    </van-dialog>
    <van-popup
      title="标题1"
      v-model="showDiyaDialog"
      position="bottom"
      @confirm="pushDialogUrl.bind({}, { confirm:'TODO' })"
    >
      <van-picker
        show-toolbar
        title="抵押登记"
        :columns="diyaOptions"
        @confirm="diyaconfirm"
        @cancel="showDiyaDialog=false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { mapGetters } from "vuex";
import HomeCard from "@/components/homeCard.vue";

export default {
  data() {
    return {
      showDiyaDialog: false,
      showTransferDialog: false,
      showChafengDialog: false,
      diyaOptions: ["首次登记", "注销登记", "变更登记", "转移登记"],
      entry: [
        {
          name: "业务办理",
          /**
           * url: string
           * 跳转的URL地址
           *
           * judgeHref function
           * 判断当前页是否需要跳转， 不存在该属性，则默认跳转，否则根据返回值跳转
           * return： false 不跳转， true 跳转至url定义的地址， string 跳转到该地址
           *
           */
          data: [
            {
              name: "首次登记",
              url: null,
              logoUrl: require("@/assets/home/首次登记@2x.png"),
              judgeHref: undefined
            },
            {
              name: "变更登记",
              url: null,
              logoUrl: require("@/assets/home/变更登记@2x.png"),
              judgeHref: null
            },
            {
              name: "转移登记",
              url: undefined,
              logoUrl: require("@/assets/home/转移登记@2x.png"),
              judgeHref: this.judgeTransfer
            },
            {
              name: "注销登记",
              url: undefined,
              logoUrl: require("@/assets/home/注销登记@2x.png"),
              judgeHref: undefined
            },
            {
              name: "更正登记",
              url: undefined,
              logoUrl: require("@/assets/home/更正登记@2x.png"),
              judgeHref: ()=>{}
            },
            {
              name: "异议登记",
              url: undefined,
              logoUrl: require("@/assets/home/异议登记@2x.png"),
              judgeHref: undefined
            },
            {
              name: "预告登记",
              url: undefined,
              logoUrl: require("@/assets/home/预告登记@2x.png"),
              judgeHref: undefined
            },
            {
              name: "查封登记",
              url: undefined,
              logoUrl: require("@/assets/home/查封登记@2x.png"),
              judgeHref: this.judgeChafeng
            },
            {
              name: "抵押登记",
              url: undefined,
              logoUrl: require("@/assets/home/抵押登记@2x.png"),
              judgeHref: this.judgeDiya
            },
            {
              name: "换证和遗失补发登记",
              url: undefined,
              logoUrl: require("@/assets/home/补发登记@2x.png"),
              judgeHref: undefined
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userBaseInfo"])
  },
  methods: {
    judgeTransfer(item) {
      // 选择转移登记业务类型
      this.showTransferDialog = true;
      return false;
    },
    judgeChafeng(item) {
      if (Object.keys(this.userBaseInfo).length) {
        let isCompany = this.userBaseInfo.sourceType == 0; // 0是企业，1是个人，2是政府
        let isCourt = isCompany
          ? !!this.userBaseInfo.roleList.find(item => [20, 2001].includes(item.id))
          : false; //20法院管理员，2001法院普通用户
        function cannotDialog() {
          Dialog.alert({
            title: "提示",
            message: "您无法进行此项业务办理！",
            confirmButtonColor: "#309de5",
            confirmButtonText: "我知道了"
          }).then(() => {});
        }
  
        if (isCompany) {
          if (isCourt) {
            this.$router.push("/sealUp/sealUpSearch");
          } else if (this.userBaseInfo.companyId == null) {
            this.showChafengDialog = true; // 未认证,提示认证
          } else {
            cannotDialog();
          }
        } else {
          cannotDialog();
        }
      } else {
        this.$router.push({name: "login"});
      }
    },
    // 点击抵押登记判断
    judgeDiya(item) {
      //  选择抵押登记业务类型
      this.showDiyaDialog = true;
      return false;
    },
    pushDialogUrl: function(urlObj, type, done) {
      let url = urlObj[type];
      if (url) {
        this.$router.push(url);
      } else {
        done();
      }
    },
    diyaconfirm:function (value) {
      let dict={
          "首次登记":"/mortgage/estateSearch/first",
          "注销登记":"/mortgage/estateSearch/cancel",
          "变更登记":"/mortgage/estateSearch/edit",
          "转移登记":"/mortgage/estateSearch/transfer"
      }
      this.$router.push(dict[value]);
    }
  },
  components: {
    HomeCard
  }
};
</script>

<style lang="less" scoped>
.banner {
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  .img {
    padding: 0 16px;
    border-radius: 2px;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    margin: auto;
    span {
      font-size: 11px;
    }
    img {
      width: 100%;
      height: 128px;
    }

    b,
    span {
      display: block;
    }

    & > div {
      position: relative;
      left: 30px;
      top: 28px;
    }

    & > div span {
      padding-top: 8px;
    }
  }
}
.fix-icon {
  position: fixed;
  bottom: 230px;
  right: 5px;
  width: 68.5px;
  transform: rotate(-15deg);
}
.padding-top-17 {
  padding-top: 17px;
}
.text-center {
  text-align: center;
}
</style>
