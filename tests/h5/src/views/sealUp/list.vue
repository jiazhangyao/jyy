<template>
  <div class="seal-up-list">
    <NavBar :navTitle="title" />
    <section>
        <lists :listData="navData"></lists>
    </section>
    <div>
        <section v-for="(item, i) in mainData" :key="i">
            <lists :listData="item.mainContents" :listWrapCls="listWrapCls" :listWrapText="item.listWrapText">
                <template #listWrap="scope">
                    <h2 :class="scope.cls.listTitle">{{scope && scope.text.listTitle ? scope.text.listTitle: '--'}}</h2>
                    <h4 :class="scope.cls.type">{{scope && scope.text.type ? scope.text.type : '--'}}</h4>
                    <div :class="scope.cls.info">{{scope && scope.text.info ? scope.text.info : '--'}}</div>           
                    <div :class="scope.cls.detail" @click="showDetail">{{scope && scope.text.detail ? scope.text.detail : '--'}}</div>          
                </template>
            </lists>
        </section>
    </div>
   
    <section class="btns">
        <Button @save="add" class="btns">新增查封</Button>
    </section>
     <footer class="btns">
        <Button @save="add" type="primary-border">续封</Button>
        <Button @save="add" type="primary-border-danger">注销</Button>
    </footer>
  </div>
</template>
<script>
import nav from "@/mixins/navBar.js";
import Lists from './components/lists'
import Button from './components/button'
import { vuexSession } from '../../store'
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
        maps: [['产权证号', '0121506-676/黑2019（鹤岗市）不动产权第123456号'], ['权利人姓名/名称', '工作证'], ['房屋状态', '正常']],
        listWrapCls: {
            listTitle: 'listTitle',
            type: 'type',
            info: 'info',
            detail: "detail"
        },
        listWrapText: {
             listTitle: 'hello1',
             type: '11',
             info: '查封信息1',
             detail: "查封详情"
         },
        listsArr:[
            {
                mainContents: [['查封机关', '0121506-676/黑2019（鹤岗市）不动产权第123456号'], ['协助执行书', '工作证'], ['民事执行书', '正常']],
                listWrapCls: {
                    listTitle: 'listTitle',
                    type: 'type',
                    info: 'info',
                    detail: "detail"
                },
                listWrapText: {
                    listTitle: 'hello1',
                    type: '11',
                    info: '查封信息1',
                    detail: "查封详情"
                }
            }
        ]
      }
  },
  created() {
     console.log('cc', vuexSession) 
  },
  mounted() {
     
  },
  computed: {
    ...mapState({
        navData: state => state.sealUp.navData,
        mainData: state => state.sealUp.mainData
    })
  },
  methods: {
      add() {
          console.log('add')
      },
      showDetail() {
          console.log('detail')
      }
  }
};
</script>
<style lang='less' scoped>
.seal-up-list {
    padding: 10px;
    background: #eee;
    section {
        margin-top: 10px;
    }
    .btns {
        text-align: center;
    }
}
</style>