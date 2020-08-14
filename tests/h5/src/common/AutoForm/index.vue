<template>
  <div>
    <div class="demo1">
      <AutoForm v-model="form" :data="data" @save="shows"></AutoForm>
    </div>
  </div>
</template>

<script>
import AutoForm from "./components/AutoForm";
import { fns } from "./arr";

export default {
  data() {
    return {
        form: {
            demo1: '"234124"',
            id: '1234',
            user: 1
        },
        formData: {},
        data: fns(this.shows).arrs
    };
  },
  methods: {
      shows(opts) {  
        alert(JSON.stringify(opts))
         console.log(opts);  
      },
      alts() {
          console.log(this.form);
      }
  },
  components: { AutoForm }
};
</script>

<style lang="less" scoped>
.demo1 {
  padding: 16px;
}
</style>
