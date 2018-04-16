<template>
    <div class="">
      <p class="question-type">单选题（ 1分 ）：</p>
      <group title="电能计量点是（）中装接电能计量装置的位置。">
        <radio :options="radio001" @on-change="change"></radio>
    </group>
    </div>
</template>

<script>
import { Radio, Group } from 'vux'

import { XButton } from "vux";
export default {
  data() {
    return {
      // type: 'radio',
      type: 'checkbox',
      radio001: [{
        key: '001',
        value: 'radio001'
      }, {
        key: '002',
        value: 'radio002'
      }],
      value: '',
    };
  },
  components: {
    Radio,
    Group
  },
  methods: {
    change (value, label) {
      console.log('change:', value, label)
      this.value = value;
    }
  }
};
</script>
<style>
.question-type {
  margin: 20px 0;
}
</style>
