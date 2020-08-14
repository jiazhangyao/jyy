<template>
  <div class="img-uploader">
    <label v-if="label">
      {{label}}
      <i v-if="required">*</i>
    </label>
    <Row gutter="16">
      <Col span="8" class="van-uploader" v-for="(item, index) in fileList" :key="index">
        <Icon v-if="!disabled" name="clear" @click="delImage(index)" />
        <img :src="fileHost +'/'+item.key+'.'+item.ext" :alt="fileHost +'/'+item.key+'.'+item.ext" />
      </Col>
      <Col v-if="fileList.length==0 && disabled">-</Col>
      <Col span="8" v-if="!disabled">
        <Uploader :after-read="afterRead" capture="camera">
          <Icon v-if="!showImg" name="add" />
          <img :src="showImg" v-if="showImg" />
        </Uploader>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { Uploader, Icon, Toast, Row, Col } from "vant";
import upload from "@/utils/upload";
import lrz from "lrz";
export default {
  data() {
    return {
      fileHost: "/web/api/file",
      fileList: this.files,
      showImg: ""
    };
  },
  props: {
    files: {
      // type: Array,
      // default: () => []
    },
    disabled: {},
    label: {},
    required: {},
    onFileChange: {}
  },
  computed: {
    // ...mapGetters(["fileHost"])
  },
  watch: {
    // 传输慢时，files无法在data上及时更新
    files() {
      this.fileList = this.files;
    }
  },
  methods: {
    delImage(index) {
      this.fileList.splice(index, 1);
    },
    afterRead(file, detail) {
      let { fileHost } = this;
      let $this = this;
      this.showImg = file.content;
      //此处上传接口- -
      lrz(file.file, {
        quality: 0.5
      })
        .then(rst => {
          const data = rst.formData;
          upload(fileHost, data)
            .then(res => {
              $this.showImg = "";
              $this.fileList = $this.fileList || [];
              $this.fileList.push(res.data.data);
              if (this.onFileChange) {
                this.onFileChange($this.fileList);
              }
            })
            .catch(err => {
              $this.showImg = "";
              Toast("上传失败1");
            });
        })
        .catch(err => {
          this.showImg = "";
          Toast("上传失败2");
        });
    }
  },
  mounted() {},
  components: { Uploader, Icon, Row, Col }
};
</script>

<style lang="less">
.img-uploader {
  padding-bottom: 16px;
  border-bottom: 1Px solid rgba(203, 210, 222, 0.5);

  > label {
    font-size: 15px;
    color: #5d6471;
    letter-spacing: 0;
    line-height: 15px;
    padding: 16px 0 0 0;
    display: block;
    i {
      color: #fa0000;
    }
  }
  .van-col {
    margin-top: 16px;
    overflow: hidden;
  }
  .van-uploader {
    display: flex;
    height: 80px;
    background: rgba(203, 210, 222, 0.2);
    overflow: hidden;
    position: relative;
    .van-icon.van-icon-clear {
      position: absolute;
      top: -2px;
      left: 5px;
      color: rgba(0,0,0,.6)!important;
      // color: red !important;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .van-icon {
      display: inline-block;
      font-size: 25px !important;
      margin: auto;
      color: #bfbfbf !important;
    }
  }
}
</style>