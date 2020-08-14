<template>
  <div>
    <NavBar :navTitle="title"/>
    <ListCard
      :list="list"
      :pageLoading="pageLoading"
      :finished="finished"
      :onLoad="onLoad"
      :onItemClick="onItemClick"
    >
      <template v-slot:header="item">
        <div>证照编号：{{item.certificateNumber}}</div>
      </template>
      <template v-slot:content="item">
        <div>证照类型：{{item.certificateTypeName}}</div>
        <div>有效期：{{item.effectiveEndDate}}</div>
      </template>
    </ListCard>
  </div>
</template>
<script>
import certificateMix from "@/mixins/eCertificate.js";
import { IdCheck } from "@/service/common";
import ListCard from "@/components/listCard.vue";
import ListCardMix from "@/mixins/listCard.js";
import { getCertificateList } from "@/service/eCertificate";
export default {
  mixins: [certificateMix, ListCardMix],
  data() {
    return {
      title: "我的证照"
    };
  },
  components: {
    ListCard
  },
  methods: {
    onItemClick(item) {
      this.$router.push({
        name: "certificateCard",
        query: { id: item.certificateNumber }
      });
    },
    getData() {
      getCertificateList({ ...this.pageData, authCode: this.authCode }).then(
        res => {
          this.handleInitRes(res);
        }
      );
    }
  },
  created() {}
};
</script>
<style scoped>
</style>
