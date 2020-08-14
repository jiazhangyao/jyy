<template>
  <div class="seal-up-add">
    <section class="imgs">
      <div v-for="(item, index) in materialTypeList" :key="index">
        <ImgUploader
          :label="item.name"
          :onFileChange="bindFileChange(item.id)"
          :disabled="!pageEditable"
          :files="getFilesByType(item.id)"
        />
      </div>
    </section>
    <Footer :toNextPage="down" />
  </div>
</template>

<script>
import Footer from "./components/footer.vue";
import nav from "@/mixins/navBar.js";
import Button from "./components/button";
import { getSealUpType } from "../../service/sealUp";
import ImgUploader from "@/components/imgUploader.vue";
import { mapState } from "vuex";
export default {
  mixins: [nav],
  components: {
    Button,
    ImgUploader,
    Footer
  },
  data() {
    return {
      title: "不动产信息查询2/2",
      isDisabled: false
    };
  },
  created() {},
  computed: {
    ...mapState({
      registerType: state => state.sealUp.registerType,
      materialLists: state => state.sealUp.materialLists,
      materialTypeList: state => state.sealUp.materialTypeList,
      pageEditable: state => state.sealUp.pageEditable
    })
  },
  methods: {
    getFilesByType(type) {
      if (!this.materialLists) {
        return [];
      }
      let files = this.materialLists.find(item => item.materialType == type);
      return files ? files.fileList : [];
    },
    up() {
      this.$router.push("/sealUp/sealUpAddSeal");
    },
    down() {
      //材料上传列表
      const materialList = this.materialLists || [];
    },
    bindFileChange(typeId) {
      return files => {
        let hasType = false;
        this.materialList = this.materialList || [];
        for (const item of this.materialList) {
          if (item.materialType == typeId) {
            item.fileList = files;
            hasType = true;
          }
        }
        // 当不存在该类型时，需要将此类型放入数据中
        if (!hasType) {
          this.materialList.push({ materialType: typeId, fileList: files });
        }
      };
    }
  }
};
</script>

<style lang='less' scoped>
.seal-up-add {
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
      color: #309de5;
      background: transparent;
      border: 1px solid #309de5;
    }
  }

  footer.btns {
    padding-bottom: 20px;
    text-align: center;
  }
  .imgs {
    padding: 0 20px;
  }
}
</style>