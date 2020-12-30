<template>
<div class="batch-leading-in-list">
  <el-table
    ref="multipleTable"
    :data="getBatchTable"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column label="领健商品编码" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.storeCode" placeholder="请输入" @input="getDetails($event, scope.$index)"> </el-input>
      </template>
    </el-table-column>
    
    <el-table-column label="数量" align="center">
      <template slot-scope="scope">
        <input-number
          :value="scope.row.skuNum"
          @judgeNums="judgeNum"
          :min="0"
          :max="scope.row.max"
          :disabled="scope.row.max === 0"
          :index="scope.$index"
        ></input-number>

      </template>
    </el-table-column>
    <el-table-column label="商品信息" align="center" width="300">
      <template slot-scope="scope">
        <span :class="{'warn-color': scope.row.loseEfficacy}">{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="规格" align="center" prop="specification">
    </el-table-column>
    <el-table-column label="单位" align="center" prop="unit">
    </el-table-column>
    <el-table-column label="单价" align="center" prop="realPrice">
    </el-table-column>
    <el-table-column label="小计" align="center">
      <template slot-scope="scope">
        <span>{{(scope.row.realPrice * scope.row.skuNum).toFixed(2)}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100" align="center">
      <template slot-scope="scope">
        <span class="del" @click.prevent="deleteRow(scope.$index)"
          >删除</span
        >
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
// import InputNumber from "@/components/InputNumber";
import InputNumber from "./inputs";
export default {
  components: {
    InputNumber,
  },
  computed: {
    ...mapGetters('batchLeadingIn', [ 'getBatchTable' ])
  },
  methods: {
    deleteRow(index) {
      this.$store.dispatch('batchLeadingIn/deleteRow', index)
    },
    getDetails(val, index) {
      if (val.length === 8 || val.length === 13) {
        this.$store.dispatch('batchLeadingIn/getDetail', { val, index })
      }
    },
    handleSelectionChange(val) {
      this.$store.commit('batchLeadingIn/changeMultipleSelection', val)
    },
    judgeNum(val, index) {
      console.log('val', val);
      if (val >= this.getBatchTable[index].max) {
        this.$message( {
            title: '提示',
            message: `最大可销售数量为${this.getBatchTable[index].max}${this.getBatchTable[index].unit}`,
            type: 'warn'
        } )
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
.batch-leading-in-list 
  margin-top 10px
  .warn-color 
    color red
  .del
    &:hover
      cursor pointer

</style>