<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-material">
      <div v-for="(item, index) in materialTypeList" :key="index">
        <ImgUploader
          :label="item.name"
          :required="item.required"
          :files="getMaterialsByType(materialList,item.id)"
          :onFileChange="bindFileChange(item.id)"
        />
      </div>
      <footer @click="finish(materialList)">
        <FullButton name="完成" cls="water-edit-footer-btn" />
      </footer>
    </div>
  </div>
</template>

<script>
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import { CellGroup, Field, Button, Popup, Toast, Icon } from "vant";
import ImgUploader from "@/components/imgUploader.vue";
import Input from "@/components/input.vue";
import FullButton from "@/components/fullButton.vue";
import { getMaterialList } from "@/service/business";
export default {
  mixins: [businessMix],
  data() {
    return {
      fileList: [],
      materialList: []
    };
  },
  props: ["title", "changeComponent", "updateForm", "form"],
  computed: {},
  methods: {
    bindFileChange(typeId) {
      return files => {
        let hasType = false;
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
    },
    finish(materialList) {
      let res = this.materialListValid(materialList);
      if (res.result) {
        this.updateForm({ materialList });
        this.goBack();
      } else {
        Toast(res.msg);
      }
    }
  },
  watch: {},
  mounted() {
    let { materialList } = this.form;
    this.materialList = materialList;
  },
  created() {},
  components: {
    Icon,
    CellGroup,
    Field,
    Button,
    Popup,
    Toast,
    Input,
    FullButton,
    ImgUploader
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-material {
  padding-bottom: 88px;
  & > div {
    margin-left: 16px;
  }
  footer {
    position: absolute;
    bottom: 40px;
    width: 100%;
    .button {
      display: block;
      width: 343px;
      line-height: 48px;
      margin: auto;
      text-align: center;
    }
  }
}
</style>