<template>
  <div :class="$style.container">
    <div :class="$style['fast-entry']">
      <p>通过已有的准考证快速参加考试，具体的准考信息请咨询相关人事。</p>
      <XButton :class="$style.btn" type="primary" text="快速进入考试" link="/waitforexam"></XButton>
    </div>
    <div :class="$style.message">
      <panel header="好消息" :list="list" :type="type"></panel>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

import { XButton, Panel  } from "vux";
export default {
  data() {
    return {
      
      type: '1',
      list: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '消息一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '消息二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      }]
    };
  },
  components: {
    XButton,
    Panel 
  },
  methods: {
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
<style module>
.h3 {
  text-align: center;
  margin-bottom: 10px;
}
/* .message {
  padding: 10%;
} */
.fast-entry {
  padding: 10%;
  position: relative;
}

.fast-entry::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #D9D9D9;
  color: #D9D9D9;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.btn {
  margin-top: 20px;
}
</style>
