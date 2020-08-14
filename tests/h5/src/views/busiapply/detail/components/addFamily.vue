<template>
  <div class="bisiapply-edit-family">
    <div v-for="(family, familyIndex) in familyList" :key="'family'+familyIndex">
      <div v-if="hasFamilyMember(family)" class="bisiapply-edit-family-wrap">
        <div class="title">家庭{{familyIndex+1}}</div>
        <div v-for="(member, memberIndex) in family.familyMemberList" :key="'member'+memberIndex">
          <addMember :member="member"></addMember>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addMember from "./addMember.vue";
export default {
  data() {
    return {};
  },
  props: {
    familyList: {}
  },
  computed: {},
  watch: {},
  methods: {
    hasFamilyMember(family) {
      return !!(family.familyMemberList && family.familyMemberList.length);
    },
    finish(v) {
      this.updateForm(v);
      this.goBack();
    }
  },
  mounted() {},
  created() {},
  components: {
    addMember
  }
};
</script>

<style lang="less" scoped>
.bisiapply-edit-family {
  &-wrap {
    background: rgba(203, 210, 222, 0.2);
    width: 343px;
    margin: 16px auto 0 auto;
    padding: 0px 12px;
    .title {
      position: relative;
      padding: 16px 0;
      i.van-icon {
        margin-right: 6px;
        font-size: 16px !important;
        vertical-align: text-bottom;
        position: absolute;
        right: 0;
      }
    }
    .form {
      width: 320px;
      margin: auto;
      .add-btn {
        color: #0061ff;
        line-height: 25px;
        font-size: 15px;
        text-align: center;
        i.van-icon {
          margin-right: 6px;
          padding-top: 25px;
          font-size: 25px !important;
          vertical-align: text-bottom;
          color: #0061ff !important;
        }
      }
    }
  }
  &-infowrap {
    background: rgba(203, 210, 222, 0.2);
    width: 100%;
    padding: 6px 16px;
    color: #5d6471;
  }
}
</style>