<template>
  <div>
    <div class="nav pr">
      <span class="nav-back" v-if="showBack" @click="back"></span>
      <span class="nav-sub-back fl disi" v-if="showBack" @click="back">返回</span>
      <span class="nav-title tc">{{navTitle}}</span>
      <span class="nav-menu disi fr" v-if="showBack" @click="open"></span>
    </div>
    <Drawer ref="drawer" @click="close"/>
  </div>
</template>

<script>
import Drawer from "@/components/drawer.vue";
import { mapGetters } from "vuex";
const PROJECT_NAME = process.env.VUE_APP_PROJECT_NAME;
export default {
  data() {
    return {
      key: ""
    };
  },
  props: {
    navTitle: {
      type: String,
      default: PROJECT_NAME
    },
    showBack: {
      type: Boolean,
      default: true
    },
    goBack: {
      default: undefined
    }
  },
  methods: {
    set(str) {
      this.title = str;
    },

    open() {
      document.body.style.overflow = "hidden";
      this.$refs.drawer.show_drawer = true;
    },
    close() {
      document.body.style.overflow = "scroll";
      this.$refs.drawer.show_drawer = false;
    },
    back() {
      if (this.goBack) {
        this.goBack();
      } else {
        this.$router.back();
      }
    }
  },
  created() {
    // console.log('title',this.$store);
  },
  components: {
    Drawer
  },
  computed: {
    ...mapGetters(["title"])
  }
};
</script>

<style lang="less" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 12px;
  height: 44px;
  z-index: 1000;
  font-size: 16px;
  &::after {
    content: "";
    width: 100%;
    position: absolute;
    height: 0.02667rem;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    bottom: 0;
    left: 0;
    background: #cbd2de;
  }

  & > span {
    display: inline-block;
  }
  .nav-sub-back {
    margin-left: 26px;
  }
  .nav-title {
    font-size: 18px;
    color: #0f213e;
    font-weight: bold;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    max-width: 200px;
  }
  .nav-back {
    &::before {
      content: "";
      position: absolute;
      top: 12px;
      left: 12px;
      height: 22px;
      width: 12px;
      vertical-align: middle;
      line-height: 46px;
      text-align: center;
      background: url("../assets/left-arrow.png") no-repeat center;
      background-size: cover;
    }
  }
}

.nav-menu {
  &::before {
    content: "";
    position: absolute;
    top: 16px;
    right: 12px;
    height: 16px;
    width: 20px;
    vertical-align: middle;
    line-height: 46px;
    text-align: center;
    background: url("../assets/menu.png") no-repeat center;
    background-size: cover;
  }
}
</style>