<template>
    <div class="">
        <header :class="$style.header">
            <div :class="$style.photo">
                <img :class="$style.avatar" v-bind:src="userInfo.avatar" alt="头像">
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
            <cell-box>
                <div class="logout-box" @click="logout"> 退出 </div>
            </cell-box>
        </group>
    </div>
</template>

<script>
import axios from "axios";
import util from "../../util/util.js";
import api from "../../util/api.js";
import { Group, CellBox } from "vux";
import { debug } from 'util';

export default {
  data() {
    return {
      userInfo: {
        avatar: "http://5b0988e595225.cdn.sohucs.com/images/20171216/a72351d45dee4e6fa270985fb5394f1e.jpeg"
      }
    };
  },
  components: {
    Group,
    CellBox
  },
  methods: {
    logout() {
      api.logout(this.okHandler)
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
    const vm = this;
    let url = "/student/student/getStudentByUserId";
    const options = {
      url,
      method: "GET",
    };
    vm
      .$http(options)
      .then(function(resp) {
        vm.loading = false;

        if (resp.data.code == 0) {
          vm.loginOK = true;
          vm.userInfo = Object.assign({}, vm.userInfo, resp.data.student);
        } else {
        }
      })
      .catch(function(error) {
        console.log(error);
      });
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
</style>