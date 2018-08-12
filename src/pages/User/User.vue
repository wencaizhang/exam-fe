<template>
    <div class="">
        <header :class="$style.header">
            <div :class="$style.photo">
                <img :class="$style.avatar" v-bind:src="avatar" alt="头像">
            </div>
            <div :class="$style.nick">
                <span>{{ userInfo.userName }}</span>
            </div>
        </header>
        <group>
            <cell-box is-link :link="{ path: '/changeuserinfo' }">
                修改个人信息
            </cell-box>
            <cell-box is-link :link="{ path: '/reset' }">
                密码重置
            </cell-box>
            <cell-box is-link :link="{ path: '/waitforexam' }">
                进入考试
            </cell-box>
        </group>
        <div :class="$style.btns">
          <x-button type="warn" @click.native="logout">安全退出</x-button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import util from "../../util/util.js";
import api from "../../util/api.js";
import { XButton, Group, CellBox } from "vux";

export default {
  data() {
    return {
      avatar: 'http://5b0988e595225.cdn.sohucs.com/images/20171216/a72351d45dee4e6fa270985fb5394f1e.jpeg'
    };
  },
  components: {
    XButton,
    Group,
    CellBox
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    okHandler (resp) {
      const vm = this;
      vm.loading = false;
      if (resp.data.code == 0) {
        util.setUserinfo(null);
        vm.$router.push({ name: 'login' });
      }
    }
  },
  created() {
    this.$store.dispatch('getUserInfo');
  }
};
</script>

<style module>
.header {
  height: 70px;
  line-height: 70px;
  padding: 20px;
}
.photo,
.nick {
  display: inline-block;
  vertical-align: top;
}
.photo {
  width: 70px;
  height: 70px;
}
.avatar {
  width: 80px;
  height: 80px;
}

.btns {
  margin: 20px auto;
  width: 80%;
}
</style>