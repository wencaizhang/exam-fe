<template>
  <div>
    <x-header :left-options="{backText: ''}">准备考试</x-header>
    <div :class="$style['home-container']">
      <div :class="$style['fast-entry']">
        <h3 :class="[$style.h3]">注意事项</h3>
        <p>1. xxxxx</p>
        <p>2. xxxxx</p>
        <p>3. xxxxx</p>
      </div>
      <div :class="$style.message">
        <h3>活动信息</h3>
        <p>姓名</p>
        <p>单位</p>
        <p>考试次数</p>
        <p>活动名称</p>
        <p>时间</p>
        <XButton type="primary" text="开始考试" link="/exam"></XButton>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import qs from 'qs';

import { XButton, XHeader } from "vux";
export default {
  data() {
    return {
      isRed: true
    };
  },
  components: {
    XButton,
    XHeader
  },
  methods: {
    getInfo () {
      let url = '/exam/examination/info';
      const data = { 
        data: '7D30FE5031B7A85DCD222D69D0DD29938625350D7D2A79247B160A34623B700E1CBE6B388EA84AB706C401034FDB5E3C31B0BCA5BDA1F94E8999FC531992C40EED83D584FBD4A5074AA78E94891D045B1D53E3B7D132AF7'
      };
      const options = {
        url,
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
      };
      
      this.$http((options))
        .then(function(resp) {
          vm.loading = false;
          if (resp.data.code == 0) {

          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>
<style module>
.h3 {
  text-align: center;
  margin-bottom: 10px;
}
.home-container {
  padding: 40px;
}
.message,
.fast-entry {
  border: 1px solid #ccc;
  padding: 10px;
}
.fast-entry {
  margin-bottom: 20px;
}
.red {
  color: red;
}
</style>
