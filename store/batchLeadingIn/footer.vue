<template>
  <footer class="batch-leading-in-footer">
    <div class="footer-left">
      <span class="footer-add" @click="addLineData">添加商品</span>
      <span class="footer-load">
        <el-upload
          drag
          action="string"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :http-request="uploadFile"
        >
          <div>导入模板</div>
        </el-upload>
      </span>
      <p></p>
      <span @click="handDelete">删除所选商品</span>
      <span @click="clearLoseEfficacy">清空失效商品</span>
      <p></p>
      <a :href="`${baseUrl}/business/cart/downShoppingListTemplate`">下载模板</a>
    </div>
    <div class="footer-right">
      <div>
        <p>总价: <span class="footer-total-price">{{totalAmount}}</span></p>
        <p>(总价不包含物流和快递信息)</p>
      </div>
      <button @click="loadCart">加入购物车</button>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import { baseURL } from '@/api/config'
export default {
 computed: {
    ...mapGetters('batchLeadingIn', [ 'totalAmount' ])
  },
  data() {
    return {
      baseUrl: baseURL
    }
  },
  methods: {
    addLineData() {
      let obj = {
        goodsNum: 0,
        singlePrince: 0,
      };
      this.$store.commit('batchLeadingIn/addRowDatas', obj);
    },
    clearLoseEfficacy() {
      this.$store.commit('batchLeadingIn/clearLoseEfficacy')
    },
    beforeUpload(file) {
      let filename = file.name;
      let arr = filename.split(".")
      if (arr[1] !== "xls" && arr[1] !== "xlsx") {
        this.$message.error('上传文件只能是 excel/xls 格式!');
        return false;
      }
      return arr;
    },
    uploadFile(file, fileList) {
      this.$store.dispatch('batchLeadingIn/postUploads', file)
    },
    loadCart() {
      // this.$router.push('cart')
      this.$store.dispatch('batchLeadingIn/loadsCart').then(res => {
        if (res === 'length') {
            this.$message( {
              type: 'warn',
              title: '提示',
              message: '请先选择商品'
          } )
        }
        if (res === 'skuNum') {
            this.$message( {
              type: 'warn',
              title: '提示',
              message: '商品数量不可为0'
          } )
        }
      })
    },
    handDelete() {
      this.$store.dispatch('batchLeadingIn/handDelte').then(res => {
        res && this.$refs.multipleTable.clearSelection();
      })
    }
  },
};
</script>

<style lang="stylus" scoped>
.batch-leading-in-footer {
  width: 100%;
  height: 60px;
  background: #eee;
  display: flex;
  margin-top: 10px;
  justify-content: space-between;

  >>> .el-upload-dragger {
    width: 50px;
    height: 50px;
    border: 0;
    background: transparent;
    margin-top: 38px;
  }

  .footer-left {
    display: flex;
    align-items: center;
    p, span, a {
      margin-left: 10px;
    }
    p {
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    span {
      &:hover {
        cursor: pointer;
      }
      &.footer-add, &.footer-load {
        color: #00a8cb;
      }
    }
  }

  .footer-right {
    display: flex;
    align-items: center;

    .footer-total-price {
      font-size: 28px;
    }

    button {
      width: 120px;
      height: 60px;
      text-align: center;
      margin-left: 20px;
      border: 0;
      background: #00a8cb;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>