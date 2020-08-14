<template>
  <div class="approve-img">
    <NavBar navTitle="附件" :goBack="goBack" />
    <div class="reject-reason" v-if="auditStatus === 4 && rejectReason">
      <p>驳回/终止原因</p>
      <p class="red">{{rejectReason}}</p>
    </div>
    <div class="img-content">
      <div v-for="(item, index) in data" :key="index">
        <ImgUploader
          :label="item.name"
          :required="item.required"
          :disabled="!approveEditAble || auditStatus === 1"
          :files="getMaterials(materialList, item.id)"
          :onFileChange="bindFileChange(item.id)"
        />
      </div>
    </div>
    <div class="btn-wrap">
      <button class="prev-btn" @click="changeComponent('contactInfo')" :class="showSave ? '' : 'special-position'">上一页</button>
      <button class="save-btn" @click="save" v-if="showSave">保存</button>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapState } from "vuex";
  import ImgUploader from "@/components/imgUploader.vue";
  export default {
    data() {
      return {
        showSave: true,
        materialList: [],
        data: [{
          id: 8,
          name: "工作证",
          minNum: 1,
          maxNum: 5,
          maxSize: 10,
          fileType: "jpg,png,docx,xlsx,pdf",
          remark: "",
          required: true
        },
        {
          id: 9,
          name: "执行公务证",
          minNum: 1,
          maxNum: 5,
          maxSize: 10,
          fileType: "jpg,png,docx,xlsx,pdf",
          remark: "",
          required: true
        },
        {
          id: 99,
          name: "其他",
          minNum: 1,
          maxNum: 5,
          maxSize: 10,
          fileType: "jpg,png,docx,xlsx,pdf",
          remark: "",
          required: false
        }]
      };
    },
    computed: {
      ...mapGetters(["approveImgInfo", "approveEditAble"])
    },
    props: ["changeComponent", "updateData", "auditStatus", "rejectReason"],
    mounted() {
      this.materialList = this.approveImgInfo;
      if (!this.approveEditAble || this.auditStatus === 1) {
        this.showSave = false;
      }else {
        this.showSave = true;
      }
    },
    methods: {
      goBack() {
        this.changeComponent('contactInfo');
      },
      save() {
        this.$store.commit("approve/setImgInfo", this.materialList);
        this.changeComponent('list');
      },
      bindFileChange(typeId) {
        return files => {
          let hasType = false;
          for (const item of this.materialList) {
            if (item.type == typeId) {
              item.files = files;
              hasType = true;
            }
          }
          // 当不存在该类型时，需要将此类型放入数据中
          if (!hasType) {
            this.materialList.push({ type: typeId, files: files });
          }
        };
      },
      getMaterials(materialList, type) {
        for (let material of materialList) {
        if (material.type == type) {
          return material.files;
        }
      }
      return [];
      } 
    },
    components: {
      ImgUploader
    }
  }
</script>
<style lang="less">
  .approve-img {
    background-color: #f5f5f5;

    .img-content {
      padding: 16px;
      padding-bottom: 140px;
    }

    /deep/.van-uploader__wrapper {
      width: 100%;
      height: 100%;

      .van-uploader__input-wrapper {
        width: 100%;
        height: 100%;
        line-height: 88px;
        text-align: center;

        .van-icon {
          margin: 0 auto;
        }
      }
    }

    .btn-wrap {
      position: fixed;
      padding:16px;
      bottom: 0;
      left: 0;
      background-color: #f5f5f5;

      button {
        width: 343px;
        height: 48px;
        background-color: #fff;
        border: 1px solid #309de5;
        color: #309de5;
        font-size: 18px;
        border-radius: 4px;
      }

      .prev-btn {
        margin-bottom: 16px;
      }

      .save-btn {
        background-color: #309de5;
        color: #fff;
      }
    }

  }
</style>