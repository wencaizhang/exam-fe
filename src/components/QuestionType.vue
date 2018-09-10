<template>
  <span>{{ type }}</span>
</template>

<script>
import { Checklist, XHeader } from "vux";

export default {
  data() {
    return {
      types: [
        { val: "001", type: "单选题：", max: 1 },
        { val: "002", type: "多选题：", max: 100 },
        { val: "003", type: "判断题：", max: 1 }
      ]
    };
  },
  props: ['typeId'],
  computed: {
    type() {
      const filterTypes = this.types.filter(item => item.val === this.typeId);
      return filterTypes.length ? filterTypes[0]["type"] : "没有题目";
    }
  }
};
</script>

<style scoped>
</style>
