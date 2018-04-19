<template>
  <div class="header">
    <flexbox>
      <flexbox-item>
        <x-button class="return" mini type="primary" link="BACK">返回</x-button>
      </flexbox-item>
      <flexbox-item class="text-align-center">
        <span>{{ time }}</span>
      </flexbox-item>
      <flexbox-item class="text-align-right">
        <x-button class="pause" 
          @click.native="handlerButtonClick"
          mini 
          type="warn"
        >
          {{ buttonText }}
        </x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { XButton, Flexbox, FlexboxItem } from "vux";
export default {
  props: [],
  data() {
    return {
      seconds: 0,
      isPause: false,
    };
  },
  components: {
    XButton,
    Flexbox,
    FlexboxItem
  },
  computed: {
    time () {
      var seconds = this.seconds;
      var time = '';
      var points = [
        { value: 60 * 60, suffix: '小时', max: 1 },
        { value: 60, suffix: '分钟', max: 1 },
        { value: 1, suffix: '秒', max: 1 }
      ];

      for (var i = 0; i < points.length; i++) {
        var mode = Math.floor(seconds / points[i].value);
        if (mode >= 1) {
          seconds -= points[i].value * mode
          time += Math.max(mode, points[i].max) + points[i].suffix;
        }
      }
      return time;
    },
    buttonText () {
      return this.isPause ? '继续' : '暂停';
    }
  },
  methods: {
    handlerButtonClick () {
      this.isPause = !this.isPause;
      this.isPause ? this.pause() : this.restart();
    },
    pause () {
      clearInterval(this.timer);
    },
    restart () {
      const vm = this;
      vm.timer = setInterval(() => {
        vm.seconds += 1;
      }, 1000);
    },

  },
  mounted () {
    this.restart();
  }
};
</script>
<style>
.header {
  text-align: center;
}
.return {
  float: left;
}
.pause {
  float: right;
}
</style>
