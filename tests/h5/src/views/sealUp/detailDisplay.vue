<template>
  <div class="seal-up-detail-display">
    <NavBar :navTitle="title" />
    <div class="seal-info">
        <section v-for="(item, i) in listsArr" :key="i">
            <lists :listData="item.mainContents"></lists>
        </section>
    </div>
    <div class="apply-list" v-for="(item, i) in applyInfo" :key="i">
      <div class="apply-name">
        <span>{{item.name || '--'}}</span>
        <label>{{item.mobile || '--'}}</label>
      </div>
      <div class="apply-work">
        <span>{{item.cardTypeDesc || '--'}}</span>
        <label>{{item.cardNo || '--'}}</label>
      </div>
      <span class="num">申请人{{i + 1}}</span>
    </div>
    <section class="files-box">
      <h4>附件信息</h4>
      <p>如需查看附件，请登录PC端进行查看！</p>
    </section>
    <footer class="btns">
        <Button @save="closure" type="primary-border">续封</Button>
        <Button @save="closure('logOut')" type="primary-border-danger">注销</Button>
    </footer> 
  </div>
</template>

<script>
import nav from "@/mixins/navBar.js";
import Lists from './components/lists'
import Button from './components/button'
import { mapState } from 'vuex';
export default {
  mixins: [nav],
  components: {
      Lists,
      Button
  },
  data() {
      return {
        title: '不动产信息查询(2/2)',
        listsArr:[],
        applyInfo: [],
      }
  },
  created() { 
    const { sealAgency, applyTime, sealType, startTime, civilBook, sealRange, endTime, assistBook, remark, applyInfo } = this.getParamIndex()
    let listArr = {
        mainContents: [['查封机关', sealAgency],
            ['申请时间', applyTime],
            ['查封类型',  sealType],
            ['查封起止时间', startTime + '至' + endTime],
            ['协助执行书', civilBook],
            ['民事执行书', assistBook],
            ['查封范围', sealRange],
            ['附记', remark]]
        }
    this.listsArr.push(listArr)
    this.applyInfo = applyInfo;
  },
  computed: {
    ...mapState('sealUp', [
        'mainData', 'showReminders', 'estateImmovableSealDTOListArr'
    ])
  },
  methods: {
      getParamIndex() {
        const { index } = this.$route.params
        const objs = this.estateImmovableSealDTOListArr[index]
        return objs
      },
      closure(opt) {
        const { index } = this.$route.params
        const paramResult = this.getParamIndex()
        paramResult.orderNum = index
        paramResult.warrantNumber = this.$store.state.sealUp.navData[0][1]
        let params;
        if (opt) {
          this.$store.commit('sealUp/changeClosureNum', 4060)
          params = {opt: '注销', keys: 4060}
        } else {
          this.$store.commit('sealUp/changeClosureNum', 4050)
          params = {opt: '续封', keys: 4050}
        }
        // console.log(params);
        this.$store.commit('sealUp/changeSealUpType', params)
        this.$store.dispatch('sealUp/closure', paramResult)
      },
      logOut() {
          console.log('logOut')
      }
  }
};
</script>

<style lang='less' scoped>
.seal-up-detail-display {
    // padding: 10px;
    background: #eee;
    min-height: calc(100vh - 44px);
    section {
        margin-top: 10px;
    }
    .btns {
        text-align: center;
    }
    .seal-info {
      margin-bottom: 16px;
    }
    .apply-list {
      margin: 16px;
      padding: 20px;
      background: #ffffff;
      position: relative;
      margin-top: 10px;
      .apply-name {
        margin-bottom: 5px;
        span {
          color: #000;
          font-size: 18px;
        }
      }
      .apply-work {
        label {
          color: #000;
        }
      }
      .num {
        display: block;
        padding: 5px 10px;
        background: #309DE5;
        position: absolute;
        top: 0;
        right: 10px;
        color: #ffffff;
      }
    }
    .files-box {
      padding: 20px;
      background: #ffffff;
      margin-top: 10px;
      margin: 16px;
      h4 {
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
}
</style>