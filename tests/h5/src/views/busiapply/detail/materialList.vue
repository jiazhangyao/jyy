<template>
  <div>
    <NavBar :navTitle="title" :goBack="goBack" />
    <div class="bisiapply-edit-material">
      <div v-for="(item, index) in materialTypeList" :key="index">
        <ImgUploader
          :label="item.name"
          :files="getMaterialsByType(materialList,item.id)"
          disabled="true"
        />
      </div>
      <footer v-if="$route.query.type != 11" @click="goNext()">
        <FullButton name="下一项" cls="water-edit-footer-btn" />
      </footer>
    </div>
  </div>
</template>

<script>
import businessMix from "@/mixins/business.js";
import NavBar from "@/components/navBar.vue";
import ImgUploader from "@/components/imgUploader.vue";
import FullButton from "@/components/fullButton.vue";
import { getMaterialList } from "@/service/business";
import { tabItems, tabsRelateToType } from "../const";
export default {
  mixins: [businessMix],
  data() {
    return {
      fileList: [],
      materialList: []
    };
  },
  props: ["title", "changeComponent", "form"],
  computed: {},
  methods: {},
  watch: {},
  mounted() {
    let { materialList } = this.form;
    this.materialList = materialList;
  },
  created() {},
  components: {
    FullButton,
    ImgUploader
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-material {
  padding-left: 16px;
  padding-bottom: 88px;
  footer {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    .button {
      display: block;
      line-height: 48px;
      margin: auto;
      text-align: center;
    }
  }
}
</style>