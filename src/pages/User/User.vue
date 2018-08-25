<template>
    <div :class="$style.container">
        <header :class="$style.header">
            <div :class="$style.photo">
              <img :class="$style.avatar" v-bind:src="avatar" alt="头像">
            </div>
            <div :class="$style.nick">
              <p>{{ name }}</p>
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
        <group>
            <cell-box is-link :link="{ path: '/history' }">
              我的成绩
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
      avatar: 'http://www.qqzhi.com/uploadpic/2015-01-07/014622445.jpg',
    };
  },
  components: {
    XButton,
    Group,
    CellBox
  },
  computed: {
    name () {
      return this.$store.state.user.name;
    },
    userInfo () {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(resp => {
        if (resp.data.code == 0) {
          this.$store.dispatch('resetAllState')
          this.$router.push({ path: "/login" });
        }
      });
    },
    // history () {
    //   this.$router.push({ name: 'history' });
    // }
  },
  created() {
    if (!this.$store.state.user.userInfo.saved) {
      this.$store.dispatch('getUserInfo');
    }
  }
};
</script>

<style module>
.container {
  height: 100%;
  background-color: #f2f2f2;
  padding-top: 20px;
}
.header {
  height: 80px;
  background-color: #fff;
}
.photo,
.nick {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
}
.nick {
  padding-top: 20px;
}
.photo {
  width: 100px;
  height: 80px;
  padding: 10px 20px;
}
.avatar {
  width: 60px;
  height: 60px;
}

.btns {
  margin: 20px auto;
  width: 80%;
}
</style>