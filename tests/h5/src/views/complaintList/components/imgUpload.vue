<template>
  <div class="img-upload">
    <Uploader :after-read="onRead" capture="camera">
      <div class="wrapper">
        <img src="../../../assets/idcardfront@2x.png" alt="正面" v-if="type==='1'&&!showImg">
        <img src="../../../assets/idcardback@2x.png" alt="正面反面" v-if="type==='2'&&!showImg">
        <img src="../../../assets/cardman@2x.png" alt="手持身份证" v-if="type==='3'&&!showImg">
        <img :src="showImg" alt="认证" v-if="showImg">
        <div class="change-img" v-if="showImg">
          更换照片
          <i class="icon iconfont iconicon_change"></i>
        </div>
      </div>
    </Uploader>
    <div class="des">{{content}}</div>
  </div>
</template>

<script>
import { Uploader, Icon, Toast } from "vant";
import { uploadFile } from "../../../service/common";
import upload from "../../../utils/upload";
import lrz from "lrz";
export default {
  name: "imgUpload",
  props: {
    content: String,
    type: {
      type: String,
      required: true,
      default: "1"
    },
    img: {
      type: String,
      required: true,
      default: ""
    },
    uploadUrl: {
      type: String,
      required: true,
      default: ""
    }
  },
  watch: {
    img(val) {
      this.showImg = val;
    }
  },
  data() {
    return {
      showImg: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onRead(file) {
      let { uploadUrl } = this;
      this.showImg = file.content;
      //此处上传接口- -
      lrz(file.file, {
        quality: 0.5
      })
        .then(rst => {
          const data = rst.formData;
          upload(uploadUrl, data)
            .then(res => {
              this.$emit("uploaded", res.data.data);
            })
            .catch(err => {
              this.showImg = "";
              Toast("上传失败");
            });
        })
        .catch(err => {
          this.showImg = "";
          Toast("上传失败");
        });
    }
  },
  components: {
    Uploader,
    Icon
  }
};
</script>

<style scoped lang="less">
.img-upload {
  margin-top: 12px;
  .wrapper {
    width: 200px;
    height: 116px;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .add-img {
      width: 40px;
      height: 40px;
    }
    .change-img {
      width: 100%;
      height: 100%;
      text-align: center;
      position: absolute;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 116px;
      background: rgba(0, 0, 0, 0.36);
      top: 0;
      i {
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
  .van-uploader {
    i {
      font-size: 40px;
      color: #1e88e5;
    }
  }
  .des {
    font-size: 14px;
    color: #0f213e;
    letter-spacing: 0;
    text-align: center;
    line-height: 14px;
    margin-top: 8px;
  }
}
</style>